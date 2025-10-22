import type { Object3D } from 'three';
import { BufferGeometry, Mesh } from 'three';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
  MeshBVH
} from 'three-mesh-bvh';

Mesh.prototype.raycast = acceleratedRaycast;

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;

export function prepareForRaycast(object: Object3D) {
  object.traverse(obj => {
    if (obj instanceof Mesh && obj.geometry) {
      obj.geometry.computeBoundsTree = MeshBVH;
      obj.geometry.boundsTree = new MeshBVH(obj.geometry);
    }
  });
}
