import type { Vector3, Texture, Material, BufferGeometry, Mesh } from 'three';
import {
  Box3,
  Vector2,
  MeshPhongMaterial,
  Object3D,
  ClampToEdgeWrapping,
  BufferAttribute
} from 'three';

import image_wall_texture_1 from '../../assets/wall/texture_1.png?url';

import { WALL_TYPE } from './RoomDescription';
import { prepareForRaycast } from '../utils/raycast';

import type AssetLoader from './AssetLoader';
import { LOADER, type SpriteLoadDescription } from './AssetLoader';
import {
  type WALL_GEOMETRY_TYPE,
  type WALL_GEOMETRY,
  type WallConnection,
  findNeighborWallEdges,
  createWallMesh,
  getGroupBounds,
  type WallEdge
} from '../utils/wall';
import type { WallStyle } from '../utils/wall/style';

enum MESH_WALL_NAME {
  SMALL_WALL = 'small_wall',
  LARGE_WALL = 'large_wall'
}

export enum WALL_SIZE {
  SMALL = 'small',
  LARGE = 'large'
}
export enum WALL_WINDOW_TYPE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export interface WallDescription<Position = Vector2> {
  type: WALL_TYPE;
  direction: WALL_DIRECTION;
  position: Position;
  style: [WallStyle | null, WallStyle | null];

  /**
   * @deprecated
   */
  startPosition?: Position;
  /**
   * @deprecated
   */
  endPosition?: Position;
}

function getDefaultStyle(): [WallStyle, WallStyle] {
  return [
    {
      id: 'texture_1',
      texture: {
        url: image_wall_texture_1
      },
      color: 0x888888
    },
    {
      id: 'texture_1',
      texture: {
        url: image_wall_texture_1
      },
      color: 0x888888
    }
  ];
}

export interface WallOptions {
  type: WALL_TYPE;
  direction: WALL_DIRECTION;
  size: WALL_SIZE;
  windowType?: WALL_WINDOW_TYPE;
  left: WALL_GEOMETRY_TYPE;
  right: WALL_GEOMETRY_TYPE;
}

export enum WALL_DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

interface WallState {
  type: WALL_TYPE;
  style: [WallStyle | null, WallStyle | null];
  windowType?: WALL_WINDOW_TYPE;
}

export default class Wall {
  equal(lastWall: Wall | null) {
    return this.id === lastWall?.id;
  }
  state: WallState = {
    type: WALL_TYPE.DEFAULT,
    style: getDefaultStyle(),

    windowType: WALL_WINDOW_TYPE.MEDIUM
  };

  readonly direction: WALL_DIRECTION;

  private id = crypto.randomUUID();
  private edges: WallEdge[] = [];
  private editMode = false;
  public visible = true;
  public position: Vector3;
  public root?: Object3D;

  wallGeometries?: Map<WALL_GEOMETRY, BufferGeometry | null>;

  tmpBox = new Box3();

  description: WallDescription;

  constructor(options: {
    description: WallDescription;
    type: WALL_TYPE;
    direction: WALL_DIRECTION;
    position: Vector3;
    connection?: WallConnection;
    style?: [WallStyle | null, WallStyle | null];
    editMode?: boolean;
  }) {
    this.description = options.description;

    this.editMode = options.editMode ?? false;
    this.state.type = options.type;
    this.position = options.position;
    if (options.style) {
      this.state.style = options.style;
    }
    this.direction = options.direction;
  }

  setEditMode(editMode: boolean) {
    if (this.editMode !== editMode) {
      this.editMode = editMode;
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshObjects({
          root: this.root!,
          wallGeometries: this.wallGeometries!,
          editMode
        });
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  setStyle(style: WallStyle, index: number) {
    if (this.state.style[index] && this.state.style[index].id !== style.id) {
      this.tmpState = null;
      this.state.style[index] = style;
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshObjects();
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  setType(type: WALL_TYPE) {
    if (this.state.type !== type) {
      this.tmpState = null;
      this.state.type = type;
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshObjects({
          root: this.root!,
          wallGeometries: this.wallGeometries!,
          editMode: this.editMode
        });
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  private tmpState: WallState | null = null;
  async saveTmpState({ type, style, windowType }: Partial<WallState>) {
    this.tmpState = this.state;
    this.state = {
      ...this.state,
      type: type ?? this.state.type,
      style: style ?? this.state.style,
      windowType: windowType ?? this.state.windowType
    };
    const mesh = this.getMesh();
    if (mesh) {
      await this.refreshObjects({
        root: this.root!,
        wallGeometries: this.wallGeometries!,
        editMode: this.editMode
      });
      this.tmpBox.setFromObject(this.root!);
    }
  }

  restoreTmpState() {
    if (this.tmpState) {
      this.state = this.tmpState;
      this.resetTmpState();
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshObjects({
          root: this.root!,
          wallGeometries: this.wallGeometries!,
          editMode: this.editMode
        });
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  resetTmpState() {
    this.tmpState = null;
  }

  toDescription(): WallDescription {
    return {
      type: this.state.type,
      direction: this.direction,
      position: new Vector2(this.position.x, this.position.z),
      style: this.state.style
    };
  }

  toJSON(): WallDescription {
    return this.toDescription();
  }

  destroy() {
    this.root?.removeFromParent();
    this.root = undefined;
  }

  update(wallDescriptions: WallDescription[]) {
    const edges = findNeighborWallEdges(this.description, wallDescriptions);

    this.edges = edges ?? [];
  }

  setup({
    assetLoader,
    wallGeometries
  }: {
    assetLoader: AssetLoader;
    wallGeometries: Map<WALL_GEOMETRY, BufferGeometry | null>;
  }) {
    this.wallGeometries = wallGeometries;
    this.root = this.createRoot({ assetLoader, wallGeometries });
    this.tmpBox.setFromObject(this.root);
    prepareForRaycast(this.root);
  }

  show() {
    if (!this.visible) {
      this.objects[WALL_SIZE.LARGE]!.visible = true;
      this.objects[WALL_SIZE.SMALL]!.visible = false;
      this.visible = true;
    }
  }

  hide() {
    if (this.visible) {
      this.objects[WALL_SIZE.LARGE]!.visible = false;
      this.objects[WALL_SIZE.SMALL]!.visible = true;
      this.visible = false;
    }
  }

  objects: {
    [WALL_SIZE.SMALL]?: Mesh;
    [WALL_SIZE.LARGE]?: Mesh;
  } = {};

  async refreshObjects(
    {
      root,
      editMode,
      wallGeometries
    }: {
      root: Object3D;
      editMode: boolean;
      wallGeometries: Map<WALL_GEOMETRY, BufferGeometry | null>;
    } = {
      root: this.root!,
      editMode: this.editMode,
      wallGeometries: this.wallGeometries!
    },
    async = false
  ) {
    Object.values(this.objects).forEach(obj => {
      obj?.removeFromParent();
      obj?.geometry.dispose();
      if (Array.isArray(obj)) {
        obj.forEach(o => {
          (o.material as Material).dispose?.();
        });
      } else {
        (obj.material as Material).dispose?.();
      }
    });

    const materials = [
      new MeshPhongMaterial({ color: this.state.style[0]?.color || 0x333333 }), // Front
      new MeshPhongMaterial({ color: this.state.style[1]?.color || 0x333333 }), // Back
      new MeshPhongMaterial({ color: 0x333333 }), // Top
      new MeshPhongMaterial({ color: 0x333333 }), // Right
      new MeshPhongMaterial({ color: 0x333333 }), // Right
      new MeshPhongMaterial({ color: 0x333333 }), // Left
      new MeshPhongMaterial({ color: 0x333333 }), // ??
      new MeshPhongMaterial({ color: 0x333333 }), // ??
      new MeshPhongMaterial({ color: 0x333333 }), // ??
      new MeshPhongMaterial({ color: 0x333333 }), // ??
      new MeshPhongMaterial({ color: 0x333333 }), // ??
      new MeshPhongMaterial({ color: 0x333333 }), // ??
      new MeshPhongMaterial({ color: 0x333333 })
    ];

    const largeWall = createWallMesh(
      {
        type: this.state.type,
        windowType: this.state.windowType,
        small: false,
        direction: this.direction,
        materials
      },
      {
        edges: this.edges,
        editMode,
        wallGeometries
      }
    );
    largeWall.name = MESH_WALL_NAME.LARGE_WALL;
    largeWall.visible = this.visible;
    largeWall.userData = { wall: this, ignoreSelect: true };

    const smallWall = createWallMesh(
      {
        type: this.state.type,
        windowType: this.state.windowType,
        small: true,
        direction: this.direction,
        materials
      },
      {
        edges: this.edges,
        editMode,
        wallGeometries
      }
    );
    smallWall.name = MESH_WALL_NAME.SMALL_WALL;
    smallWall.visible = !this.visible;
    smallWall.userData = { wall: this, ignoreSelect: true };

    if (this.assetLoader && this.state.style.length) {
      const promise = Promise.all(
        this.state.style.map(async (style, index: number) => {
          if (style?.texture && 'url' in style.texture) {
            return [
              await setupMaterial(
                {
                  index: 0,
                  direction: this.direction,
                  url: style.texture.url,
                  options: {
                    position: new Vector2(0, 0),
                    dimension: new Vector2(100, 200)
                  }
                },
                largeWall.geometry,
                this.assetLoader!
              ),
              await setupMaterial(
                {
                  index: 0,
                  direction: this.direction,
                  url: style.texture.url,
                  options: {
                    position: new Vector2(100, 0),
                    dimension: new Vector2(100, 40)
                  }
                },
                smallWall.geometry,
                this.assetLoader!
              )
            ];
          }
          return [materials[index], materials[index]];
        })
      ).then(([styleA, styleB]) => {
        const [largeMaterial, smallMaterial, ..._] = materials;

        const largeMaterials = [...largeWall.material];
        largeMaterials[0] = styleA?.[0] || largeMaterial!;
        largeMaterials[1] = styleB?.[0] || largeMaterial!;
        largeWall.material = largeMaterials;

        const smallMaterials = [...largeWall.material];
        smallMaterials[0] = styleA?.[1] || smallMaterial!;
        smallMaterials[1] = styleB?.[1] || smallMaterial!;
        smallWall.material = smallMaterials;
      });
      if (async) {
        await promise;
      }
    }

    root?.add(smallWall);
    root?.add(largeWall);

    this.objects = {
      [WALL_SIZE.SMALL]: smallWall,
      [WALL_SIZE.LARGE]: largeWall
    };
  }

  private assetLoader: AssetLoader | null = null;
  createRoot({
    assetLoader,
    wallGeometries
  }: {
    assetLoader: AssetLoader;
    wallGeometries: Map<WALL_GEOMETRY, BufferGeometry | null>;
  }) {
    const group = new Object3D();
    this.assetLoader = assetLoader;

    this.refreshObjects({
      root: group,
      editMode: this.editMode,
      wallGeometries
    });

    group.userData = { wall: this };
    group.position.copy(this.position);
    return group;
  }

  getMesh() {
    return this.root?.getObjectByName(
      this.visible ? MESH_WALL_NAME.LARGE_WALL : MESH_WALL_NAME.SMALL_WALL
    ) as Mesh;
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
      map: texture
      // side: DoubleSide
    });
    materialsMap.set(key, material);
  }

  return materialsMap.get(key);
}
