// import type { Color, Object3D } from 'three';
// import { BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three';

// import Unit, {
//   OBJECT_NAME,
//   type UnitConstructorOptions,
//   type UnitOptions
// } from '@cuby-world/app/lib/classes/Unit';

// import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// export enum WALL_SIDE {
//   WEST = 'west',
//   EAST = 'east',
//   NORTH = 'north',
//   SOUTH = 'south'
// }
// export interface WallOptions extends UnitOptions {
//   color?: string | number | Color;
// }
// export default class Wall extends Unit<WallOptions> {
//   static override KEY = 'wall';
//   static override NAME = 'Wall';

//   private width = 0.15;
//   private height = 2;

//   constructor(
//     options: Omit<
//       UnitConstructorOptions<WallOptions>,
//       'name' | 'selectable'
//     > = {}
//   ) {
//     super({
//       ...options,
//       name: 'Wall',
//       accessible: true,
//       options: {
//         color: 0xd70000,
//         ...options.options
//       }
//     });
//   }

//   createDortGeometry(size: Vector3) {
//     const a = new BoxGeometry(size.x, size.y, size.z * 0.1);
//     a.translate(0, 0, -0.45);
//     const b = new BoxGeometry(size.x, size.y, size.z * 0.1);
//     b.translate(0, 0, 0.45);
//     const c = new BoxGeometry(size.x, size.y * 0.1, size.z);
//     c.translate(0, 0.9, 0);
//     return mergeGeometries([a, b, c]);
//   }

//   // eslint-disable-next-line complexity
//   override createMesh() {
//     const material = new MeshPhongMaterial({ color: this.options.color });
//     const size = new Vector3(this.width, this.height, 1);

//     const wallSides = (this.options.sides ?? []).map(s => s.rotation);
//     const geometries = [];
//     if (wallSides.includes(WALL_SIDE.WEST)) {
//       const geometryLeft = new BoxGeometry(size.z, size.y, size.x);
//       geometries.push(geometryLeft);
//     }
//     if (wallSides.includes(WALL_SIDE.NORTH)) {
//       const a = new BoxGeometry(size.x, size.y, size.z * 0.1);
//       a.translate(0, 0, -0.45);
//       const b = new BoxGeometry(size.x, size.y, size.z * 0.1);
//       b.translate(0, 0, 0.45);
//       const c = new BoxGeometry(size.x, size.y * 0.1, size.z);
//       c.translate(0, 0.9, 0);

//       const geometryUp = mergeGeometries([a, b, c]);
//       // const geometryUp = new BoxGeometry(size.x, size.y, size.z);
//       geometryUp.translate(-0.5, 0, -0.5);
//       geometries.push(geometryUp);
//     }

//     if (wallSides.includes(WALL_SIDE.EAST)) {
//       const geometryRight = new BoxGeometry(size.z, size.y, size.x);
//       geometryRight.translate(0, 0, -1);
//       geometries.push(geometryRight);
//     }
//     if (wallSides.includes(WALL_SIDE.SOUTH)) {
//       const geometryDown = new BoxGeometry(size.x, size.y, size.z);
//       geometryDown.translate(0.5, 0, -0.5);
//       geometries.push(geometryDown);
//     }

//     if (
//       wallSides.includes(WALL_SIDE.WEST) &&
//       wallSides.includes(WALL_SIDE.NORTH)
//     ) {
//       const geometryLeftUp = new BoxGeometry(size.x, size.y, size.x);
//       geometryLeftUp.translate(-0.5, 0, 0);
//       geometries.push(geometryLeftUp);
//     }

//     if (
//       wallSides.includes(WALL_SIDE.WEST) &&
//       wallSides.includes(WALL_SIDE.SOUTH)
//     ) {
//       const geometryLeftDown = new BoxGeometry(size.x, size.y, size.x);
//       geometryLeftDown.translate(0.5, 0, 0);
//       geometries.push(geometryLeftDown);
//     }

//     if (
//       wallSides.includes(WALL_SIDE.EAST) &&
//       wallSides.includes(WALL_SIDE.NORTH)
//     ) {
//       const geometryRightUp = new BoxGeometry(size.x, size.y, size.x);
//       geometryRightUp.translate(-0.5, 0, -1);
//       geometries.push(geometryRightUp);
//     }

//     if (
//       wallSides.includes(WALL_SIDE.EAST) &&
//       wallSides.includes(WALL_SIDE.SOUTH)
//     ) {
//       const geometryRightDown = new BoxGeometry(size.x, size.y, size.x);
//       geometryRightDown.translate(0.5, 0, -1);
//       geometries.push(geometryRightDown);
//     }

//     const mergedGeometry = mergeGeometries(geometries);

//     mergedGeometry.translate(0, 0, 0.5 - size.x + size.x);
//     // material.opacity = 0.4;
//     // material.transparent = true;
//     const mesh: Object3D = new Mesh(mergedGeometry, material);
//     mesh.name = OBJECT_NAME.MESH;

//     mesh.castShadow = true;
//     mesh.position.set(0, size.y / 2, 0);

//     this.materialReady$.next();
//     return mesh;
//   }
// }
