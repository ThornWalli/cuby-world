import { Mesh, type Object3D } from 'three';

export function findAllMeshes(object: Object3D) {
  const foundMeshes: Mesh[] = [];
  object.traverse(function (child) {
    if (child instanceof Mesh) {
      foundMeshes.push(child);
    }
  });
  return foundMeshes;
}
