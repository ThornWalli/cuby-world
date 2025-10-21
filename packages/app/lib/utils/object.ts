import type { Material, Mesh, Object3D, Texture } from 'three';

export interface ObjectUserData {
  MAIN_OBJECT: string;
}

export const OBJECT_USER_DATA: ObjectUserData = {
  MAIN_OBJECT: 'mainObject'
} as ObjectUserData;

export function setMainObjectRecursive(object: Object3D, mainObject: Object3D) {
  object.traverse(o => {
    o.userData[OBJECT_USER_DATA.MAIN_OBJECT] = mainObject.id;
  });
}
export function disposeObject3D(object: Object3D): void {
  for (const child of object.children) {
    disposeObject3D(child);
  }

  const mesh = object as Mesh;

  if (mesh.geometry) {
    mesh.geometry.dispose();
  }
  const material = mesh.material;
  if (material) {
    if (Array.isArray(material)) {
      for (const mat of material) disposeMaterial(mat);
    } else {
      disposeMaterial(material);
    }
  }
}

function disposeMaterial(material: Material): void {
  for (const value of Object.values(material)) {
    const texture = value as Texture;
    if (texture && texture.isTexture) {
      texture.dispose();
    }
  }
  material.dispose();
}
