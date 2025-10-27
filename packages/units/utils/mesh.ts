import {
  type Texture,
  ClampToEdgeWrapping,
  Mesh,
  type Object3D,
  LinearFilter
} from 'three';

export function findAllMeshes(object: Object3D) {
  const foundMeshes: Mesh[] = [];
  object.traverse(function (child) {
    if (child instanceof Mesh) {
      foundMeshes.push(child);
    }
  });
  return foundMeshes;
}

export function prepareTexture(object: Object3D) {
  object.traverse(child => {
    if (child instanceof Mesh) {
      if (child.material.map) {
        const tex = child.material.map as Texture;
        tex.wrapS = ClampToEdgeWrapping;
        tex.wrapT = ClampToEdgeWrapping;
        tex.minFilter = LinearFilter;
        tex.magFilter = LinearFilter;
        tex.needsUpdate = true;
      }
      child.material = child.material.clone();
    }
  });
}
