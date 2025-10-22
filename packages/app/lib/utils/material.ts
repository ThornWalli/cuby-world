import { Mesh, type Material, type Object3D } from 'three';

export interface MaterialName {
  /**
   * Basismaterial, welches für die meisten Flächen verwendet wird
   */
  BASE: 'base';
}

export const MATERIAL_NAME: MaterialName = {
  BASE: 'base'
};

export function replaceMaterialByName(
  object: Object3D,
  materialName: string,
  newMaterial: Material
) {
  object.traverse(child => {
    if (child instanceof Mesh) {
      if (Array.isArray(child.material)) {
        child.material = child.material.map(mat =>
          mat.name === materialName ? newMaterial : mat
        );
      } else {
        if (child.material.name === materialName) {
          child.material = newMaterial;
        }
      }
    }
  });
}

export function normalizeMaterialList(material: Material | Material[]) {
  if (Array.isArray(material)) {
    return material;
  } else {
    return [material];
  }
}
