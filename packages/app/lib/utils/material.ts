import type { Material } from 'three';

export function normalizeMaterialList(material: Material | Material[]) {
  if (Array.isArray(material)) {
    return material;
  } else {
    return [material];
  }
}
