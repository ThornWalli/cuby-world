import { WALL_EXTENSION_TYPE, type WallExtensionState } from './WallExtension';

import {
  type Mesh,
  Vector3,
  type Texture,
  type Material,
  type BufferGeometry
} from 'three';
import {
  Box3,
  Vector2,
  MeshPhongMaterial,
  Object3D,
  ClampToEdgeWrapping,
  BufferAttribute
} from 'three';

import { prepareForRaycast } from '../utils/raycast';

import type AssetLoader from './AssetLoader';
import { LOADER, type SpriteLoadDescription } from './AssetLoader';
import {
  findNeighborWallEdges,
  createWallMesh,
  getGroupBounds,
  createWallGeometry
} from '../utils/wall';
import {
  WALL_DIRECTION,
  WALL_SIZE,
  WALL_TYPE,
  WALL_WINDOW_SIZE,
  type WallDescription,
  type WallEdge,
  type WallTextureMap,
  type WallGeometryMap
} from '../types/wall';
import type WallExtension from './WallExtension';
import type { AnimationLoopSubject } from './Renderer';
import assetLoader from '@cuby-world/app/services/assetLoader';
import type { WallSkinIdentifier, WallSkins } from '../types/wall/skins';
import { FLOOR_HEIGHT } from '../utils/ground';
import { skins } from '@cuby-world/walls';
import { OBJECT_USER_DATA } from '../utils/objectMeta';

declare module '../utils/objectMeta' {
  interface ObjectUserData {
    WALL: string;
  }
}

OBJECT_USER_DATA.WALL = 'wall';

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

export type WallConstructorOptions = Omit<WallDescription, 'extensions'> & {
  extensions: [typeof WallExtension, WallExtensionState][];
  center?: boolean;
};
export default class Wall {
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

  private id = crypto.randomUUID();
  private edges: WallEdge[] = [];
  public root: Object3D = new Object3D();
  public extensionRoot: Object3D = new Object3D();
  private center: boolean;

  wallGeometryMap: WallGeometryMap = new Map();
  wallTextureMap: WallTextureMap = new Map();

  tmpBox = new Box3();

  constructor(options: WallConstructorOptions) {
    const { skins: skins, direction, position, extensions } = options;
    this.state.skins = skins;
    this.direction = direction;
    this.position = position instanceof Vector3 ? position : new Vector3();
    this.center = options.center ?? false;

    this.extensions = extensions.map(
      ([ExtClass, state]) => new ExtClass({ wall: this, state })
    );
  }

  destroy() {
    this.root?.removeFromParent();
  }

  setEditMode(editMode: boolean) {
    if (this.editMode !== editMode) {
      this.editMode = editMode;
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshWallMeshes({
          root: this.root!,
          wallGeometryMap: this.wallGeometryMap!,
          editMode
        });
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  async setup({
    animationLoop$,
    wallGeometryMap,
    wallTextureMap
  }: {
    animationLoop$: AnimationLoopSubject;
    wallGeometryMap: WallGeometryMap;
    wallTextureMap: WallTextureMap;
  }) {
    this.wallGeometryMap = wallGeometryMap;
    this.wallTextureMap = wallTextureMap;
    this.setupRoot();

    await this.refreshWallMeshes({
      root: this.root,
      editMode: this.editMode,
      wallGeometryMap
    });

    await this.setupExtensions(this.extensions, animationLoop$);
    prepareForRaycast(this.root);
    this.tmpBox.setFromObject(this.root);
  }

  setupRoot() {
    const root = this.root;
    root.add(this.extensionRoot);

    if (!this.center) {
      if (this.direction === WALL_DIRECTION.VERTICAL) {
        this.extensionRoot.position.x -= 0.5;
      } else {
        this.extensionRoot.rotation.y = Math.PI / 2;
        this.extensionRoot.position.z -= 0.5;
      }
    }

    root.userData[OBJECT_USER_DATA.WALL] = this;

    root.position.copy(
      new Vector3(
        this.position.x,
        this.position.y * FLOOR_HEIGHT,
        this.position.z
      )
    );
  }

  //#region extension

  async addExtension(
    ExtClass: typeof WallExtension,
    animationLoop$: AnimationLoopSubject,
    state?: WallExtensionState
  ) {
    const ext = new ExtClass({ wall: this, state });
    this.extensions.push(ext);
    await this.setupExtensions([ext], animationLoop$);
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

  async setupExtensions(
    extensions: WallExtension[],
    animationLoop$: AnimationLoopSubject
  ) {
    const resolvedExts = await Promise.all(
      extensions.map(async ext => {
        await ext.setup({ animationLoop$ });
        return ext;
      })
    );

    resolvedExts.forEach(ext => {
      this.extensionRoot.add(ext.root);
    });
  }

  getExtension<T extends WallExtension>(
    type: WALL_EXTENSION_TYPE,
    onlyEnabled = false
  ) {
    return this.extensions.find(
      ext =>
        (!onlyEnabled || (onlyEnabled && ext.isEnabled())) && ext.type === type
    ) as T | undefined;
  }

  getExtensionByType<T extends WallExtension>(
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
    const windowExtension = this.getExtension(WALL_EXTENSION_TYPE.WINDOW, true);
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

  toggleVisibility(value?: boolean, mesh: Mesh = this.getMesh()) {
    let materials;
    if (Array.isArray(mesh.material)) {
      materials = mesh.material;
    } else {
      materials = [mesh.material as Material];
    }
    materials.forEach(mat => {
      const material = mat as MeshPhongMaterial;
      material.opacity = value ? 1 : 0;
    });
  }

  show() {
    if (!this.visible) {
      this.toggleVisibility(true, this.wallMeshes[WALL_SIZE.LARGE]!);
      this.wallMeshes[WALL_SIZE.SMALL]!.visible = false;
      this.visible = true;
    }
  }

  hide() {
    if (this.visible) {
      this.toggleVisibility(false, this.wallMeshes[WALL_SIZE.LARGE]!);
      this.wallMeshes[WALL_SIZE.SMALL]!.visible = true;
      this.visible = false;
    }
  }

  update(wallDescriptions: WallDescription[]) {
    const edges = findNeighborWallEdges(this.toDescription(), wallDescriptions);
    this.edges = edges ?? [];
  }

  getMesh() {
    return this.root?.getObjectByName(
      this.visible ? MESH_WALL_NAME.LARGE_WALL : MESH_WALL_NAME.SMALL_WALL
    ) as Mesh;
  }

  async refresh() {
    await this.refreshWallMeshes({
      root: this.root!,
      editMode: this.editMode,
      wallGeometryMap: this.wallGeometryMap!
    });
  }

  async refreshWallMeshes(
    {
      root,
      editMode,
      wallGeometryMap
    }: {
      root: Object3D;
      editMode: boolean;
      wallGeometryMap: WallGeometryMap;
    } = {
      root: this.root!,
      editMode: this.editMode,
      wallGeometryMap: this.wallGeometryMap!
    }
  ) {
    Object.values(this.wallMeshes).forEach(obj => {
      if (Array.isArray(obj)) {
        obj.forEach(o => {
          (o.material as Material).dispose?.();
        });
      } else {
        (obj.material as Material).dispose?.();
      }
    });
    const materials = [
      new MeshPhongMaterial({
        transparent: true,
        color:
          skins.get(this.state.skins[0] || 'default')?.options.color || 0x333333
      }), // Front
      new MeshPhongMaterial({
        transparent: true,
        color:
          skins.get(this.state.skins[1] || 'default')?.options.color || 0x333333
      }), // Back
      new MeshPhongMaterial({
        transparent: true,
        color: 0x333333
      }),
      new MeshPhongMaterial({
        transparent: true,
        color: 0x333333
      }),
      new MeshPhongMaterial({
        transparent: true,
        color: 0x333333
      }),
      new MeshPhongMaterial({
        transparent: true,
        color: 0x333333
      }),
      new MeshPhongMaterial({
        transparent: true,
        color: 0x333333
      })
    ];

    let largeWall = this.wallMeshes[WALL_SIZE.LARGE]!;
    if (!this.wallMeshes[WALL_SIZE.LARGE]) {
      largeWall = createWallMesh(
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
      largeWall.userData[OBJECT_USER_DATA.WALL] = this;
      largeWall.userData[OBJECT_USER_DATA.IGNORE_SELECT] = this;

      this.wallMeshes[WALL_SIZE.LARGE] = largeWall;
      root.add(largeWall);
    } else {
      const { geometry } = createWallGeometry(
        this.direction,
        this.getType(),
        WALL_SIZE.LARGE,
        this.getWindowSize(),
        {
          edges: this.edges,
          wallGeometryMap: this.wallGeometryMap
        }
      );
      largeWall.material = materials.map(m => m.clone());
      largeWall.geometry.dispose();
      largeWall.geometry = geometry!;
    }

    let smallWall = this.wallMeshes[WALL_SIZE.SMALL]!;
    if (!this.wallMeshes[WALL_SIZE.SMALL]) {
      smallWall = createWallMesh(
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
      smallWall.visible = !this.visible;
      smallWall.userData[OBJECT_USER_DATA.WALL] = this;
      smallWall.userData[OBJECT_USER_DATA.IGNORE_SELECT] = this;

      this.wallMeshes[WALL_SIZE.SMALL] = smallWall;
      root.add(smallWall);
    } else {
      const { geometry } = createWallGeometry(
        this.direction,
        this.getType(),
        WALL_SIZE.SMALL,
        this.getWindowSize(),
        {
          edges: this.edges,
          wallGeometryMap: this.wallGeometryMap
        }
      );
      smallWall.material = materials.map(m => m.clone());
      smallWall.geometry.dispose();
      smallWall.geometry = geometry!;
    }

    if (this.state.skins.length) {
      await Promise.all(
        this.state.skins.map(async (style, index: number) => {
          let url: string | undefined = undefined;
          const texture = skins.get(style || 'default')?.options.texture;
          if (texture && 'id' in texture) {
            if (this.wallTextureMap.has(texture.id)) {
              url = this.wallTextureMap.get(texture.id)?.url;
            } else {
              console.warn(`Texture id ${texture.id} not found`);
            }
          } else if (texture && 'url' in texture) {
            url = texture.url;
          }
          if (url) {
            return [
              await setupMaterial(
                {
                  index: 0,
                  direction: this.direction,
                  url,
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
                  url,
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
        largeWall.material = largeMaterials;

        const smallMaterials = [...(smallWall.material as Material[])];
        smallMaterials[0] = styleA?.[1] || smallMaterials[0]!;
        smallMaterials[1] = styleB?.[1] || smallMaterials[1]!;
        smallWall.material = smallMaterials;
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

const materialsMap = new Map<string, MeshPhongMaterial>();
async function setupMaterial(
  {
    index = 0,
    direction = WALL_DIRECTION.HORIZONTAL,
    url,
    options
  }: {
    index: number;
    direction: WALL_DIRECTION;
    url: string;
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
    url,
    options
  });

  if (!materialsMap.has(key)) {
    const texture = await assetLoader.add<Texture, SpriteLoadDescription>({
      loader: LOADER.SPRITE,
      url,
      options: { density: 2, ...options }
    });

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

    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;

    texture.needsUpdate = true;

    const material = new MeshPhongMaterial({
      map: texture,
      transparent: true
      // side: DoubleSide
    });
    materialsMap.set(key, material);
  }

  return materialsMap.get(key)?.clone();
}
