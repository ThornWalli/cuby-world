import type { Texture } from 'three';
import { ClampToEdgeWrapping, LinearFilter, Mesh, Object3D } from 'three';
import type AssetLoader from '../classes/AssetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LOADER } from '../classes/AssetLoader';
import { OBJECT_NAME } from '../classes/Unit';

export async function loadGltf(
  url: string,
  assetLoader: AssetLoader
): Promise<{
  object: Object3D;
  animations: GLTF['animations'];
}> {
  const object = new Object3D();

  const gltf: GLTF = await assetLoader.add<GLTF>({
    loader: LOADER.GLTF,
    url
  });

  const model = gltf.scene.clone();

  prepareTexture(model);

  model.position.y = 0;

  model.name = OBJECT_NAME.MESH;
  model.traverse(object => {
    if (object instanceof Mesh) {
      // object.castShadow = true;
      // object.receiveShadow = true;
      // const texture = object.material.map;
      // texture.wrapS = ClampToEdgeWrapping;
      // texture.wrapT = ClampToEdgeWrapping;
    }
  });

  object.add(model);

  return { object, animations: gltf.animations };
}

function prepareTexture(object: Object3D) {
  object.traverse(child => {
    if (child instanceof Mesh && child.material.map) {
      const tex = child.material.map as Texture;
      tex.wrapS = ClampToEdgeWrapping;
      tex.wrapT = ClampToEdgeWrapping;
      tex.minFilter = LinearFilter;
      tex.magFilter = LinearFilter;

      tex.needsUpdate = true;
    }
  });
}
