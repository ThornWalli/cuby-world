import type { BufferGeometry } from 'three';
import { Vector3, BoxGeometry, MeshPhongMaterial, Mesh, Object3D } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { WALL_TYPE } from './RoomDescription';
import { prepareForRaycast } from '../utils/raycast';

enum MESH_WALL_NAME {
  SMALL_WALL = 'small_wall',
  LARGE_WALL = 'large_wall'
}

export enum WALL_SIZE {
  SMALL = 'standard',
  LARGE = 'large'
}
export default class Wall {
  public visible = false;
  public type: WALL_TYPE;
  private color: string | number = 0xff0000;
  public position: Vector3;
  public root?: Object3D;
  private direction: WALL_DIRECTION;

  constructor(options: {
    type: WALL_TYPE;
    direction: WALL_DIRECTION;
    position: Vector3;
    color?: string | number;
  }) {
    this.type = options.type;
    this.position = options.position;
    if (options.color) {
      this.color = options.color;
    }
    this.direction = options.direction;
  }

  setup() {
    this.root = this.createRoot();
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
    [WALL_SIZE.SMALL]?: Object3D;
    [WALL_SIZE.LARGE]?: Object3D;
  } = {};

  createRoot() {
    const size = new Vector3(0.15, 2, 1.15);
    const material = new MeshPhongMaterial({ color: this.color });

    const largeWall = createWallMesh(size, this.direction, material, this.type);
    largeWall.name = MESH_WALL_NAME.LARGE_WALL;
    largeWall.userData = { ignoreSelect: true };

    const smallWall = createWallMesh(
      new Vector3(size.x, size.y * 0.2, size.z),
      this.direction,
      material,
      this.type
    );
    smallWall.name = MESH_WALL_NAME.SMALL_WALL;
    smallWall.visible = false;
    smallWall.userData = { ignoreSelect: true };

    this.objects = {
      [WALL_SIZE.SMALL]: smallWall,
      [WALL_SIZE.LARGE]: largeWall
    };

    const group = new Object3D();
    group.add(smallWall);
    group.add(largeWall);
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

export enum WALL_DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

function createWallGeometry(size: Vector3, direction: WALL_DIRECTION) {
  const geometry = new BoxGeometry(size.x, size.y, size.z);
  if (direction === WALL_DIRECTION.VERTICAL) {
    geometry.translate(-0.5, size.y / 2, 0);
  } else {
    geometry.translate(0, size.y / 2, -1);
    geometry.rotateY(Math.PI / 2);
    geometry.translate(1, 0, -0.5);
  }
  return geometry;
}

function createDoorGeometry(size: Vector3, direction: WALL_DIRECTION) {
  const geometries: BufferGeometry[] = [];
  const a = new BoxGeometry(size.x, size.y, size.z * 0.1);
  a.translate(0, 0, -0.45);
  geometries.push(a);
  const b = new BoxGeometry(size.x, size.y, size.z * 0.1);
  b.translate(0, 0, 0.45);
  geometries.push(b);
  if (size.y >= 1) {
    const c = new BoxGeometry(size.x, size.y * 0.1, size.z);
    c.translate(0, 0.9, 0);
    geometries.push(c);
  }
  const geometry = mergeGeometries(geometries);
  geometry.translate(0, 0, 0.5 - size.x + size.x);

  if (direction === WALL_DIRECTION.VERTICAL) {
    geometry.translate(-0.5, size.y / 2, -0.5);
  } else {
    geometry.translate(0, size.y / 2, -1);
    geometry.rotateY(Math.PI / 2);
    geometry.translate(0.5, 0, -0.5);
  }
  return geometry;
}

function createWallMesh(
  size: Vector3,
  direction: WALL_DIRECTION,
  material: MeshPhongMaterial,
  type: WALL_TYPE
) {
  let mergedGeometry: BufferGeometry;

  if (type === WALL_TYPE.DOOR) {
    mergedGeometry = createDoorGeometry(size, direction);
  } else {
    mergedGeometry = createWallGeometry(size, direction);
  }
  // material.opacity = 0.4;
  // material.transparent = true;
  const mesh = new Mesh(mergedGeometry, material);
  mesh.castShadow = true;

  return mesh;
}
