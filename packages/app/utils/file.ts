import type { Object3D } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { loadGltf } from '../lib/utils/gltf';

export function getGltfObjectFromFile(file: File) {
  return new Promise<{
    object: Object3D;
    animations: GLTF['animations'];
  }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        resolve(await loadGltf(e.target?.result as ArrayBuffer, true));
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
