import { WALL_EXTENSION_TYPE, type WallExtensionState } from './WallExtension';

import {
  Mesh,
  Vector3,
  type Texture,
  type Material,
  type BufferGeometry,
  DoubleSide,
  ShadowMaterial,
  PlaneGeometry,
  MeshBasicMaterial
} from 'three';
import {
  Box3,
  Vector2,
  MeshStandardMaterial,
  Object3D,
  BufferAttribute
} from 'three';

import { prepareForRaycast } from '../utils/raycast';

import type AssetLoader from './AssetLoader';
import { LOADER, type SpriteLoadDescription } from './AssetLoader';
import {
  findNeighborWallEdges,
  createWallMesh,
  getGroupBounds
} from '../utils/wall';
import {
  WALL_DIRECTION,
  WALL_SIZE,
  WALL_TYPE,
  WALL_WINDOW_SIZE,
  type WallDescription,
  type WallEdge,
  type WallGeometryMap
} from '../types/wall';
import type WallExtension from './WallExtension';
import type { AnimationLoopSubject } from './Renderer';
import assetLoader from '@cuby-world/app/services/assetLoader';
import type { WallSkinIdentifier, WallSkins } from '../types/wall/skins';
import { FLOOR_HEIGHT } from '../utils/ground';

import {
  OBJECT_USER_DATA,
  setMainObjectRecursive,
  OBJECT_NAME
} from '../utils/object';
import { catalog as wallCatalog } from '@cuby-world/walls/walls/catalog';
import { findAllMeshes } from '@cuby-world/units/utils/mesh';
import { concatMap, Subscription } from 'rxjs';
import { prepareTexture } from '../utils/texture';
// import { skinMap } from '@cuby-world/walls/skins';

declare module '../utils/object' {
  interface ObjectUserData {
    WALL: string;
  }
}

OBJECT_USER_DATA.WALL = 'wall';

declare module '../../lib/utils/object' {
  interface ObjectName {
    WALL: string;
    WALL_WRAPPER: string;
  }
}

OBJECT_NAME.WALL = 'wall';
OBJECT_NAME.WALL_WRAPPER = 'wall_wrapper';

enum MESH_WALL_NAME {
  SMALL_WALL = 'small_wall',
  LARGE_WALL = 'large_wall'
}

function getDefaultSkin(): [WallSkinIdentifier, WallSkinIdentifier] {
  return ['default_base', 'default_base'];
}

interface WallState {
  /**
   * @deprecated wird durch die extensions und getType() ersetzt
   */
  type?: WALL_TYPE;
  skins: WallSkins;
  windowType?: WALL_WINDOW_SIZE;
}
export type WallIdentifier = string;

export type WallConstructorOptions = Omit<WallDescription, 'extensions'> & {
  extensions: [typeof WallExtension, WallExtensionState][];
  center?: boolean;
};
export default class Wall {
  static KEY = 'default';

  readonly key = Wall.KEY;

  subscription = new Subscription();

  extensions: WallExtension[] = [];

  state: WallState = {
    type: WALL_TYPE.DEFAULT,
    skins: getDefaultSkin(),
    windowType: WALL_WINDOW_SIZE.MEDIUM
  };

  private editMode = false;

  readonly direction: WALL_DIRECTION;
  public readonly position: Vector3;
  public visible = true;

  private wallMeshes: {
    [WALL_SIZE.SMALL]?: Mesh;
    [WALL_SIZE.LARGE]?: Mesh;
  } = {};

  id: WallIdentifier = crypto.randomUUID();
  private edges: WallEdge[] = [];
  public root: Object3D;
  public wallWrapper: Object3D;
  public extensionRoot: Object3D;
  private center: boolean;
  private wallGeometryMap: WallGeometryMap = new Map();
  private tmpBox = new Box3();
  private size: WALL_SIZE = WALL_SIZE.LARGE;

  constructor(options: WallConstructorOptions) {
    const { skins: skins, direction, position, extensions } = options;
    this.state.skins = skins;
    this.direction = direction;
    this.position = position instanceof Vector3 ? position : new Vector3();
    this.center = options.center ?? false;

    this.extensions = extensions.map(
      ([ExtClass, state]) => new ExtClass({ wall: this, state })
    );

    this.root = this.setupRoot();
    this.wallWrapper = new Object3D();
    this.wallWrapper.name = OBJECT_NAME.WALL_WRAPPER;
    this.root.add(this.wallWrapper);
    setMainObjectRecursive(this.wallWrapper, this.root);

    this.extensionRoot = this.setupExtensionRoot();
  }

  destroy() {
    this.subscription.unsubscribe();
    this.extensions.forEach(ext => ext.destroy());
    this.root.removeFromParent();
    this.root.traverse(mesh => {
      if (mesh instanceof Mesh) {
        mesh!.geometry.dispose();
        if (Array.isArray(mesh!.material)) {
          mesh!.material.forEach(mat => mat.dispose());
        } else {
          (mesh!.material as Material).dispose();
        }
      }
    });
    this.root.remove();
  }

  setEditMode(editMode: boolean) {
    if (this.editMode !== editMode) {
      this.editMode = editMode;
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshWallMeshes({
          wallGeometryMap: this.wallGeometryMap!,
          editMode
        });
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  async setup({
    animationLoop$,
    wallGeometryMap
  }: {
    animationLoop$: AnimationLoopSubject;
    wallGeometryMap: WallGeometryMap;
  }) {
    this.wallGeometryMap = wallGeometryMap;

    await this.refreshWallMeshes({
      editMode: this.editMode,
      wallGeometryMap
    });

    await this.setupExtensions(this.extensions);

    this.subscription.add(
      animationLoop$
        .pipe(
          concatMap(async context => {
            this.extensions.forEach(ext => ext.update(context));
          })
        )
        .subscribe(void 0)
    );

    prepareForRaycast(this.root);
    this.tmpBox.setFromObject(this.root);
  }

  setupRoot() {
    const root = new Object3D();
    root.name = OBJECT_NAME.WALL;

    root.position.copy(
      new Vector3(
        this.position.x,
        this.position.y * FLOOR_HEIGHT,
        this.position.z
      )
    );

    root.userData[OBJECT_USER_DATA.WALL] = this.id;

    setMainObjectRecursive(root, root);

    return root;
  }
  /**
   * Kann überschrieben werden um die Meshes zu definieren, die für Raycaster genutzt werden.
   */
  getRaycasterMeshes(): Object3D[] {
    return findAllMeshes(this.root);
  }

  setupExtensionRoot() {
    const extensionRoot = new Object3D();
    extensionRoot.name = `WallExtensionRoot`;
    this.addToWallWrapper(extensionRoot);
    setMainObjectRecursive(extensionRoot, extensionRoot);

    if (!this.center) {
      if (this.direction === WALL_DIRECTION.VERTICAL) {
        extensionRoot.position.x -= 0.5;
      } else {
        extensionRoot.rotation.y = Math.PI / 2;
        extensionRoot.position.z -= 0.5;
      }
    }
    return extensionRoot;
  }

  addToWallWrapper(object: Object3D) {
    this.wallWrapper.add(object);
    setMainObjectRecursive(object, this.root);
  }

  addToRoot(object: Object3D) {
    this.root.add(object);
    setMainObjectRecursive(object, this.root);
  }

  addToExtensionRoot(object: Object3D) {
    this.extensionRoot.add(object);
  }

  //#region extension

  async addExtension(
    ExtClass: typeof WallExtension,
    animationLoop$: AnimationLoopSubject,
    state?: WallExtensionState
  ) {
    const ext = new ExtClass({ wall: this, state });
    this.extensions.push(ext);
    await this.setupExtensions([ext]);
    return ext;
  }

  removeExtension(extension: WallExtension) {
    const index = this.extensions.findIndex(ext => ext === extension);
    if (index !== -1) {
      const [ext] = this.extensions.splice(index, 1);
      this.extensionRoot.remove(ext!.root);
      ext!.destroy();
      return ext;
    }
  }

  async setupExtensions(extensions: WallExtension[]) {
    const resolvedExts = await Promise.all(
      extensions.map(async wallExtension => {
        await wallExtension.setup();
        return wallExtension;
      })
    );

    resolvedExts.forEach(ext => {
      this.addToExtensionRoot(ext.root);
    });
  }

  getExtensionById<T extends WallExtension>(id: string) {
    return this.extensions.find(ext => ext.id === id) as T | undefined;
  }

  getExtensionByType<T extends WallExtension>(
    type: WALL_EXTENSION_TYPE,
    onlyEnabled = false
  ) {
    return this.extensions.find(
      ext =>
        (!onlyEnabled || (onlyEnabled && ext.isEnabled())) && ext.type === type
    ) as T | undefined;
  }

  getExtensionByTypes<T extends WallExtension>(
    types: WALL_EXTENSION_TYPE[],
    onlyEnabled = false
  ) {
    return this.extensions.filter(
      ext =>
        (!onlyEnabled || (onlyEnabled && ext.isEnabled())) &&
        types.includes(ext.type)
    ) as T[];
  }

  hasExtension(type: WALL_EXTENSION_TYPE) {
    return this.extensions.some(ext => ext.isEnabled() && ext.type === type);
  }

  getWindowSize() {
    const windowExtension = this.getExtensionByType(
      WALL_EXTENSION_TYPE.WINDOW,
      true
    );
    return windowExtension?.state.size || WALL_WINDOW_SIZE.MEDIUM;
  }

  //#endregion

  setStyle(style: WallSkinIdentifier, index: number) {
    if (this.state.skins[index] && this.state.skins[index] !== style) {
      this.state.skins[index] = style;
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshWallMeshes();
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  getType() {
    if (this.hasExtension(WALL_EXTENSION_TYPE.DOOR)) {
      return WALL_TYPE.DOOR;
    } else if (this.hasExtension(WALL_EXTENSION_TYPE.WINDOW)) {
      return WALL_TYPE.WINDOW;
    }
    return WALL_TYPE.DEFAULT;
  }

  toggleVisibility(value?: boolean, mesh: Mesh | Object3D = this.getMesh()) {
    mesh.traverse(child => {
      if (child instanceof Mesh) {
        let materials;
        if (Array.isArray(child.material)) {
          materials = child.material;
        } else {
          materials = [child.material as Material];
        }
        materials.forEach(material => {
          // Ausblenden für Kamera und dunkle Räume.
          if (!value) {
            material.colorWrite = false;
            material.depthWrite = false;
            material.transparent = false;
          } else {
            material.colorWrite = true;
            material.depthWrite = true;
            material.transparent = false;
          }
        });
      }
    });
  }

  setSize(size: WALL_SIZE) {
    if (size === WALL_SIZE.LARGE) {
      this.toggleVisibility(true, this.wallMeshes[WALL_SIZE.LARGE]!);
      this.wallMeshes[WALL_SIZE.SMALL]!.visible = false;
    } else {
      this.toggleVisibility(false, this.wallMeshes[WALL_SIZE.LARGE]!);
      this.wallMeshes[WALL_SIZE.SMALL]!.visible = true;
    }
    this.size = size;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.wallWrapper.visible = visible;
  }

  getTmpBox() {
    return this.tmpBox;
  }

  getSize() {
    return this.size;
  }

  update(wallDescriptions: WallDescription[]) {
    const edges = findNeighborWallEdges(this.toDescription(), wallDescriptions);
    this.edges = edges ?? [];
  }

  getMesh() {
    return this.root?.getObjectByName(
      this.size === WALL_SIZE.LARGE
        ? MESH_WALL_NAME.LARGE_WALL
        : MESH_WALL_NAME.SMALL_WALL
    ) as Mesh;
  }

  async refresh() {
    await this.refreshWallMeshes({
      editMode: this.editMode,
      wallGeometryMap: this.wallGeometryMap!
    });
  }

  shadowHelper: Object3D | null = null;
  clickHelper: Object3D | null = null;

  async refreshWallMeshes(
    {
      editMode,
      wallGeometryMap
    }: {
      editMode: boolean;
      wallGeometryMap: WallGeometryMap;
    } = {
      editMode: this.editMode,
      wallGeometryMap: this.wallGeometryMap!
    }
  ) {
    const skinMap = wallCatalog.get(this.key)!.skinMap;

    Object.values(this.wallMeshes).forEach(obj => {
      if (Array.isArray(obj)) {
        obj.forEach(o => {
          (o.material as Material).dispose?.();
        });
      } else {
        (obj.material as Material).dispose?.();
      }
    });
    const wireframe = false;
    const materials = [
      new MeshStandardMaterial({
        wireframe,
        metalness: 0.0,
        roughness: 1.0,
        transparent: true,
        side: DoubleSide,
        color:
          skinMap.get(this.state.skins[0] || 'default')?.options.color ||
          0x333333
      }), // Front
      new MeshStandardMaterial({
        wireframe,
        metalness: 0.0,
        roughness: 1.0,
        transparent: true,
        side: DoubleSide,
        color:
          skinMap.get(this.state.skins[1] || 'default')?.options.color ||
          0x333333
      }), // Back
      new MeshStandardMaterial({
        wireframe,
        metalness: 0.0,
        roughness: 1.0,
        transparent: true,
        side: DoubleSide,
        color: 0x333333
      }),
      new MeshStandardMaterial({
        wireframe,
        metalness: 0.0,
        roughness: 1.0,
        transparent: true,
        side: DoubleSide,
        color: 0x333333
      }),
      new MeshStandardMaterial({
        wireframe,
        metalness: 0.0,
        roughness: 1.0,
        transparent: true,
        side: DoubleSide,
        color: 0x333333
      }),
      new MeshStandardMaterial({
        wireframe,
        metalness: 0.0,
        roughness: 1.0,
        transparent: true,
        side: DoubleSide,
        color: 0x333333
      }),
      new MeshStandardMaterial({
        wireframe,
        metalness: 0.0,
        roughness: 1.0,
        transparent: true,
        side: DoubleSide,
        color: 0x333333
      })
    ];

    /**
     * Entfernen der alten Meshes
     */

    Object.values(this.wallMeshes).forEach(mesh => {
      this.wallWrapper.remove(mesh!);
      mesh!.remove();
    });
    this.wallMeshes = {};

    // if (!this.wallMeshes[WALL_SIZE.LARGE]) {
    const largeWall = createWallMesh(
      {
        type: this.getType(),
        windowSize: this.getWindowSize(),
        small: false,
        direction: this.direction,
        materials: materials.map(m => m.clone())
      },
      {
        center: this.center,
        edges: this.edges,
        editMode,
        wallGeometryMap
      }
    );
    largeWall.name = MESH_WALL_NAME.LARGE_WALL;
    largeWall.userData[OBJECT_USER_DATA.IGNORE_RAYCASTER] = true;
    largeWall.castShadow = true;
    largeWall.receiveShadow = false;

    this.wallMeshes[WALL_SIZE.LARGE] = largeWall;
    this.addToWallWrapper(largeWall);

    const smallWall = createWallMesh(
      {
        type: this.getType(),
        windowSize: this.getWindowSize(),
        small: true,
        direction: this.direction,
        materials: materials.map(m => m.clone())
      },
      {
        center: this.center,
        edges: this.edges,
        editMode,
        wallGeometryMap
      }
    );
    smallWall.name = MESH_WALL_NAME.SMALL_WALL;
    smallWall.userData[OBJECT_USER_DATA.IGNORE_RAYCASTER] = true;
    smallWall.visible = this.size === WALL_SIZE.SMALL;

    this.wallMeshes[WALL_SIZE.SMALL] = smallWall;
    this.addToWallWrapper(smallWall);

    //#region click helper
    if (!this.shadowHelper) {
      this.shadowHelper = createShadowHelper(largeWall.geometry);
      this.addToRoot(this.shadowHelper);
    }
    if (!this.clickHelper) {
      this.clickHelper = createClickHelper({ direction: this.direction });
      this.addToRoot(this.clickHelper);
    }
    //#endregion

    if (this.state.skins.length) {
      await Promise.all(
        this.state.skins.map(async (style, index: number) => {
          let path: string | undefined = undefined;
          const texture = skinMap.get(style || 'default')?.options.texture;
          let normal, disaplacement;
          if (texture) {
            path = texture.path;
            normal = texture.normal;
            disaplacement = texture.displacement;
          }
          if (path) {
            return [
              await setupMaterial(
                {
                  index: 0,
                  direction: this.direction,
                  maps: {
                    color: path,
                    normal,
                    disaplacement
                  },
                  options: {
                    position: new Vector2(0, 0),
                    dimension: new Vector2(512, 1024)
                  }
                },
                largeWall.geometry,
                assetLoader
              ),
              await setupMaterial(
                {
                  index: 0,
                  direction: this.direction,
                  maps: {
                    color: path,
                    normal,
                    disaplacement
                  },
                  options: {
                    position: new Vector2(512, 0),
                    dimension: new Vector2(512, 205)
                  }
                },
                smallWall.geometry,
                assetLoader
              )
            ];
          }
          return [
            (largeWall.material as Material[])[index],
            (smallWall.material as Material[])[index]
          ];
        })
      ).then(([styleA, styleB]) => {
        const largeMaterials = [...(largeWall.material as Material[])];
        largeMaterials[0] = styleA?.[0] || largeMaterials[0]!;
        largeMaterials[1] = styleB?.[0] || largeMaterials[1]!;
        largeWall.material = largeMaterials as MeshStandardMaterial[];

        const smallMaterials = [...(smallWall.material as Material[])];
        smallMaterials[0] = styleA?.[1] || smallMaterials[0]!;
        smallMaterials[1] = styleB?.[1] || smallMaterials[1]!;
        smallWall.material = smallMaterials as MeshStandardMaterial[];

        this.toggleVisibility(this.size === WALL_SIZE.LARGE, largeWall);
      });
    }
  }

  equal(lastWall: Wall | null) {
    return this.id === lastWall?.id;
  }

  toDescription(): WallDescription {
    return {
      direction: this.direction,
      position: this.position,
      skins: this.state.skins,
      extensions: this.extensions.map(ext => ({
        key: ext.key,
        state: ext.state
      }))
    };
  }

  /**
   * @deprecated use toDescription()
   */
  toJSON(): WallDescription {
    return this.toDescription();
  }
}

const materialsMap = new Map<string, MeshStandardMaterial>();
async function setupMaterial(
  {
    index = 0,
    direction = WALL_DIRECTION.HORIZONTAL,
    maps,
    options
  }: {
    index: number;
    direction: WALL_DIRECTION;
    maps: {
      color: string;
      ambient?: string | null;
      normal?: string | null;
      disaplacement?: string | null;
    };
    options: {
      density?: number;
      position: Vector2;
      dimension: Vector2;
    };
  },
  geometry: BufferGeometry | null = null,
  assetLoader: AssetLoader
) {
  const key = JSON.stringify({
    geometry: geometry?.id,
    index,
    direction,
    maps,
    options
  });

  if (!materialsMap.has(key)) {
    const texture = await assetLoader.add<Texture, SpriteLoadDescription>({
      loader: LOADER.SPRITE,
      value: maps.color,
      options: { density: 2, ...options }
    });

    let ambientMap = null;
    if (maps.ambient) {
      ambientMap = await assetLoader.add<Texture, SpriteLoadDescription>({
        loader: LOADER.SPRITE,
        value: maps.ambient,
        options: { density: 2, ...options }
      });
    }

    let normalMap = null;
    if (maps.normal) {
      normalMap = await assetLoader.add<Texture, SpriteLoadDescription>({
        loader: LOADER.SPRITE,
        value: maps.normal,
        options: { density: 2, ...options }
      });
    }

    let displacementMap = null;
    if (maps.disaplacement) {
      displacementMap = await assetLoader.add<Texture, SpriteLoadDescription>({
        loader: LOADER.SPRITE,
        value: maps.disaplacement,
        options: { density: 2, ...options }
      });
    }

    const { min, size } = getGroupBounds(geometry!, index)!;
    const pos = geometry!.attributes.position!;
    const uv = new Float32Array(pos.count * 2);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      if (direction === WALL_DIRECTION.HORIZONTAL) {
        uv[i * 2] = (x - min.x) / size.x;
        uv[i * 2 + 1] = (y - min.y) / size.y;
      } else {
        uv[i * 2] = (pos.getZ(i) - min.z) / size.z;
        uv[i * 2 + 1] = (y - min.y) / size.y;
      }
    }

    geometry!.setAttribute('uv', new BufferAttribute(uv, 2));

    prepareTexture(texture, { pixelrated: true });
    texture.flipY = true;
    const material = new MeshStandardMaterial({
      map: texture,
      aoMap: ambientMap,
      normalMap: normalMap,
      displacementMap: displacementMap,
      side: DoubleSide
    });
    materialsMap.set(key, material);
  }

  return materialsMap.get(key)?.clone();
}

function createShadowHelper(geometry: BufferGeometry) {
  const shadowHelper = new Mesh(
    geometry,
    new ShadowMaterial({
      color: 0x333333
    })
  );
  shadowHelper.castShadow = false;
  shadowHelper.name = 'shadow_helper';
  shadowHelper.visible = true;
  shadowHelper.raycast = () => void 0;
  shadowHelper.userData[OBJECT_USER_DATA.IGNORE_RAYCASTER] = true;

  return shadowHelper;
}

function createClickHelper({ direction }: { direction: WALL_DIRECTION }) {
  const group = new Object3D();

  const front = new Mesh(
    new PlaneGeometry(0.8, FLOOR_HEIGHT),
    new MeshBasicMaterial({
      color: 0x333333,
      wireframe: true
    })
  );
  front.position.set(-0.11, FLOOR_HEIGHT / 2 - 0.1, 0);
  front.rotateY(-Math.PI / 2);
  front.userData[OBJECT_USER_DATA.WALL_SELECT_FRONT] = true;
  front.name = 'click_helper';
  group.add(front);

  const back = new Mesh(
    new PlaneGeometry(0.8, FLOOR_HEIGHT),
    new MeshBasicMaterial({
      color: 0x333333,
      wireframe: true
    })
  );
  back.position.set(0.15, FLOOR_HEIGHT / 2 - 0.1, 0);
  back.rotateY(Math.PI / 2);
  back.userData[OBJECT_USER_DATA.WALL_SELECT_BACK] = true;
  back.name = 'click_helper';
  group.add(back);

  group.visible = false;

  if (direction === WALL_DIRECTION.VERTICAL) {
    group.position.x -= 0.5;
  } else {
    group.rotation.y = Math.PI / 2;
    group.position.z -= 0.5;
  }

  return group;
}
