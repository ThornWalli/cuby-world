import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import type { Object3D } from 'three';

export function getGltfObjectFromFile(assetLoader: AssetLoader, file: File) {
  return new Promise<Object3D>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
          const gltf = await assetLoader.loaders[LOADER.GLTF].parseAsync(
            arrayBuffer,
            'test'
          );
          resolve(gltf.scene);
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
