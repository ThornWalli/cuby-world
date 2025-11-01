import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LOADER } from '../classes/AssetLoader';
import { OBJECT_NAME } from '../utils/object';
import assetLoader from '@cuby-world/app/services/assetLoader';
import { clone as skeletonClone } from 'three/addons/utils/SkeletonUtils.js';
import { Group, Mesh, type Object3D } from 'three';

export async function loadGltf(
  value: string | ArrayBuffer,
  parse?: boolean
): Promise<{
  scene: Object3D;
  object: Group;
  animations: GLTF['animations'];
}> {
  const gltf: GLTF = await assetLoader.add<GLTF>({
    loader: LOADER.GLTF,
    value,
    parse
  });

  const object = new Group();
  const scene = gltf.scene;
  scene.name = OBJECT_NAME.MESH;

  object.add(skeletonClone(scene));

  // clone materials
  object.traverse(child => {
    if (child instanceof Mesh && child.material) {
      if (Array.isArray(child.material)) {
        child.material = child.material.map(mat => mat.clone());
      } else {
        child.material = child.material.clone();
      }
    }
  });

  return { scene: scene, object, animations: gltf.animations };
}
