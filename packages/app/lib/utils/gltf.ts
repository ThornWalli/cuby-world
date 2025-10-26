import type { Texture } from 'three';
import { ClampToEdgeWrapping, LinearFilter, Mesh, Object3D } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LOADER } from '../classes/AssetLoader';
import { OBJECT_NAME } from '../utils/object';
import assetLoader from '@cuby-world/app/services/assetLoader';

export async function loadGltf(
  value: string | ArrayBuffer,
  parse?: boolean
): Promise<{
  object: Object3D;
  animations: GLTF['animations'];
}> {
  const object = new Object3D();

  const gltf: GLTF = await assetLoader.add<GLTF>({
    loader: LOADER.GLTF,
    value,
    parse
  });

  const model = gltf.scene.clone();

  prepare(model);

  model.name = OBJECT_NAME.MESH;

  object.add(model);

  return { object, animations: gltf.animations };
}

function prepare(object: Object3D) {
  object.traverse(child => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

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
