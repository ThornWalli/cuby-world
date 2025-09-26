/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Texture, Material, BufferGeometry, Vector3, Mesh } from 'three';
import { Box3, Vector2, MeshPhongMaterial, Object3D } from 'three';

import image_wall_default from '../../assets/wall/default.png?url';

import { WALL_TYPE } from './RoomDescription';
import { prepareForRaycast } from '../utils/raycast';

import type AssetLoader from './AssetLoader';
import { LOADER } from './AssetLoader';
import {
  type WALL_GEOMETRY_TYPE,
  type WALL_GEOMETRY,
  type WallConnection,
  findNeighborWallEdges,
  createWallMesh
} from '../utils/wall';

enum MESH_WALL_NAME {
  SMALL_WALL = 'small_wall',
  LARGE_WALL = 'large_wall'
}

export enum WALL_SIZE {
  SMALL = 'standard',
  LARGE = 'large'
}

export interface WallDescription<Position = Vector2> {
  type: WALL_TYPE;
  direction: WALL_DIRECTION;
  position: Position;
  color: (string | number)[];

  /**
   * @deprecated
   */
  startPosition?: Position;
  /**
   * @deprecated
   */
  endPosition?: Position;
}

export enum WALL_EDGE_TYPE {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  TOP_LEFT = 'top_left',
  TOP_RIGHT = 'top_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_RIGHT = 'bottom_right',
  TEST = 'test',
  CROSS = 'cross',
  T_CROSS_LEFT = 't_cross_left',
  T_CROSS_I_LEFT = 't_cross_left_i', // Nur für innere ecken
  T_CROSS_RIGHT = 't_cross_right',
  T_CROSS_I_RIGHT = 't_cross_right_i', // Nur für innere ecken
  T_CROSS_TOP = 't_cross_top',
  T_CROSS_I_TOP = 't_cross_top_i', // Nur für innere ecken
  T_CROSS_BOTTOM = 't_cross_bottom',
  T_CROSS_I_BOTTOM = 't_cross_i_bottom' // Nur für innere ecken
}
export interface WallEdge {
  wall: WallDescription;
  // position: Vector2;
  // direction: WALL_DIRECTION;
  type: WALL_TYPE;
  offset: Vector2;
  edgeType: WALL_EDGE_TYPE;
}

export interface WallOptions {
  type: WALL_TYPE;
  direction: WALL_DIRECTION;
  small?: boolean;
  left: WALL_GEOMETRY_TYPE;
  right: WALL_GEOMETRY_TYPE;
}

export enum WALL_DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

interface WallState {
  type: WALL_TYPE;
  color: (string | number)[];
}

export default class Wall {
  state: WallState = {
    type: WALL_TYPE.DEFAULT,
    color: [0x000000, 0xffffff]
  };

  readonly direction: WALL_DIRECTION;

  private edges: WallEdge[] = [];
  private editMode = false;
  public visible = true;
  public position: Vector3;
  public root?: Object3D;

  wallGeometries?: Map<WALL_GEOMETRY, BufferGeometry | null>;

  tmpBox = new Box3();

  setEditMode(editMode: boolean) {
    if (this.editMode !== editMode) {
      this.editMode = editMode;
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshObjects({
          root: this.root!,
          wallGeometries: this.wallGeometries!,
          type: this.state.type,
          editMode
        });
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  // /**
  //  * TODO: Wenn auch Texturen verwendet werden, kann diese ggf. wieder entfernt werden.
  //  */
  // setColor(color: string | number) {
  //   if (this.color !== color) {
  //     this.color = color;
  //     const mesh = this.getMesh();
  //     if (mesh) {
  //       this.refreshObjects();
  //       this.tmpBox.setFromObject(this.root!);
  //     }
  //   }
  // }

  setType(type: WALL_TYPE) {
    if (this.state.type !== type) {
      this.state.type = type;
      const mesh = this.getMesh();
      if (mesh) {
        this.refreshObjects({
          root: this.root!,
          wallGeometries: this.wallGeometries!,
          type,
          editMode: this.editMode
        });
        this.tmpBox.setFromObject(this.root!);
      }
    }
  }

  setTmpType(type: WALL_TYPE = this.state.type) {
    const mesh = this.getMesh();
    if (mesh) {
      this.refreshObjects({
        root: this.root!,
        wallGeometries: this.wallGeometries!,
        type,
        editMode: this.editMode
      });
      this.tmpBox.setFromObject(this.root!);
    }
  }

  toDescription(): WallDescription {
    return {
      type: this.state.type,
      direction: this.direction,
      position: new Vector2(this.position.x, this.position.z),
      color: this.state.color
    };
  }

  toJSON(): WallDescription {
    return this.toDescription();
  }

  description: WallDescription;

  constructor(options: {
    description: WallDescription;
    type: WALL_TYPE;
    direction: WALL_DIRECTION;
    position: Vector3;
    connection?: WallConnection;
    color?: (string | number)[];
    editMode?: boolean;
  }) {
    this.description = options.description;

    this.editMode = options.editMode ?? false;
    this.state.type = options.type;
    this.position = options.position;
    if (options.color) {
      this.state.color = options.color;
    }
    this.direction = options.direction;
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

  refreshObjects(
    {
      root,
      type,
      editMode,
      wallGeometries
    }: {
      root: Object3D;
      type: WALL_TYPE;
      editMode: boolean;
      wallGeometries: Map<WALL_GEOMETRY, BufferGeometry | null>;
    } = {
      root: this.root!,
      type: this.state.type,
      editMode: this.editMode,
      wallGeometries: this.wallGeometries!
    }
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
      new MeshPhongMaterial({ color: this.state.color[0] }),
      new MeshPhongMaterial({ color: this.state.color[1] }),
      new MeshPhongMaterial({ color: 0x333333 }),
      new MeshPhongMaterial({ color: 0x333333 }),
      new MeshPhongMaterial({ color: 0x333333 }),
      new MeshPhongMaterial({ color: 0x333333 }),
      new MeshPhongMaterial({ color: 0x333333 })
    ];

    const largeWall = createWallMesh(
      {
        type,
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
    largeWall.userData = { wall: this, ignoreSelect: true };

    const smallWall = createWallMesh(
      {
        type,
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
    smallWall.visible = false;
    smallWall.userData = { wall: this, ignoreSelect: true };

    root?.add(smallWall);
    root?.add(largeWall);

    // this.assetLoader
    //   .add<Texture>({ loader: LOADER.TEXTURE, url: wallUV })
    //   .then(texture => {
    //     texture.flipY = false;
    //     texture.wrapS = ClampToEdgeWrapping; // RepeatWrapping;
    //     texture.wrapT = ClampToEdgeWrapping; // ClampToEdgeWrapping
    //     texture.repeat.set(1, 1);
    //     texture.offset.set(0, 0);

    //     largeWall.material.map = texture;
    //     (largeWall.material as MeshPhongMaterial).needsUpdate = true;

    //     smallWall.material.map = texture;
    //     (smallWall.material as MeshPhongMaterial).needsUpdate = true;
    //   });

    this.objects = {
      [WALL_SIZE.SMALL]: smallWall,
      [WALL_SIZE.LARGE]: largeWall
    };
  }

  createRoot({
    assetLoader,
    wallGeometries
  }: {
    assetLoader: AssetLoader;
    wallGeometries: Map<WALL_GEOMETRY, BufferGeometry | null>;
  }) {
    const group = new Object3D();

    this.refreshObjects({
      root: group,
      type: this.state.type,
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

const materials = new Map<string, Promise<Material>>();

async function setupMaterial<T = MeshPhongMaterial>(assetLoader: AssetLoader) {
  if (materials.has(image_wall_default)) {
    return materials.get(image_wall_default) as Promise<T>;
  } else {
    const { resolve, promise } = Promise.withResolvers<Material>();
    materials.set(image_wall_default, promise);
    const texture = await assetLoader.add<Texture>({
      loader: LOADER.TEXTURE,
      url: image_wall_default
    });

    const material = new MeshPhongMaterial({
      transparent: true,
      map: texture,
      color: 0xffffff,
      shininess: 100,
      specular: 0xffffff
    });
    resolve(material);

    return material as T;
  }
}
