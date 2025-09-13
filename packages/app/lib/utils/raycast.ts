import type { Object3D } from 'three';
import { Mesh } from 'three';
import { acceleratedRaycast, MeshBVH } from 'three-mesh-bvh';

Mesh.prototype.raycast = acceleratedRaycast;

export function prepareForRaycast(object: Object3D) {
  object.traverse(obj => {
    if (obj instanceof Mesh && obj.geometry) {
      obj.geometry.computeBoundsTree = MeshBVH;
      obj.geometry.boundsTree = new MeshBVH(obj.geometry);
    }
  });
}
