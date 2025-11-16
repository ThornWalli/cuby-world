import { prepareTexture } from '@cuby-world/app/lib/utils/texture';
import { type Texture, Mesh, type Object3D } from 'three';

export function findAllMeshes(object: Object3D) {
  const foundMeshes: Mesh[] = [];
  object.traverse(function (child) {
    if (child instanceof Mesh) {
      foundMeshes.push(child);
    }
  });
  return foundMeshes;
}

export function prepareMeshTexture(object: Object3D) {
  object.traverse(child => {
    if (child instanceof Mesh) {
      if (child.material.map) {
        prepareTexture(child.material.map as Texture, { pixelrated: true });
      }
      child.material = child.material.clone();
    }
  });
}

export function removeMesh(mesh: Mesh) {
  mesh.geometry.dispose();
  if (mesh.material instanceof Array) {
    mesh.material.forEach(mat => mat.dispose());
  } else {
    mesh.material.dispose();
  }
  // mesh.removeFromParent();
  mesh.parent?.remove(mesh);
  mesh.remove();
}
