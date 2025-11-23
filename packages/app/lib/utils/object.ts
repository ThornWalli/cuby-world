import type { Mesh, Material, Object3D, Texture } from 'three';

export interface ObjectName {
  BASE: 'base';
  UNIT: 'Unit';
  MESH: 'Mesh';
  MESH_OUTLINE: 'MeshOutline';
  MESH_ANIMATION: 'MeshAnimation';
  RAYCASTER: 'Raycaster';
}

export const OBJECT_NAME: ObjectName = {
  BASE: 'base',
  UNIT: 'Unit',
  MESH: 'Mesh',
  MESH_OUTLINE: 'MeshOutline',
  MESH_ANIMATION: 'MeshAnimation',
  RAYCASTER: 'Raycaster'
} as ObjectName;

export interface ObjectUserData {
  MAIN_OBJECT: string;
  WALL_SELECT_FRONT: string;
  WALL_SELECT_BACK: string;
}

export const OBJECT_USER_DATA: ObjectUserData = {
  MAIN_OBJECT: 'mainObject',
  WALL_SELECT_FRONT: 'wallSelectFront',
  WALL_SELECT_BACK: 'wallSelectBack'
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

export function disposeMaterial(material: Material): void {
  for (const value of Object.values(material)) {
    const texture = value as Texture;
    if (texture && texture.isTexture) {
      texture.dispose();
    }
  }
  material.dispose();
}
