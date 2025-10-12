import { Mesh, Object3D, Vector2 } from 'three';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import type { AnimationLoopSubject } from '@cuby-world/app/lib/classes/Renderer';
import Stair, {
  type StairConstructorOptions
} from '@cuby-world/app/lib/classes/Stair';
import assetLoader from '@cuby-world/app/services/assetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import glbBase from './assets/stair.glb?url';
import { OBJECT_NAME } from '@cuby-world/app/lib/classes/Unit';

export default class DefaultStair extends Stair {
  static override KEY = 'stair_default';

  constructor(
    options: Omit<StairConstructorOptions, 'size' | 'entryPositions'>
  ) {
    super({
      ...options,
      size: new Vector2(1, 3),
      entryPositions: { start: new Vector2(0, -1), end: new Vector2(0, 4) }
    });
  }

  override async setup(context: {
    animationLoop$: AnimationLoopSubject;
  }): Promise<void> {
    await super.setup(context);

    const { object } = await loadGltf(assetLoader);

    this.root.add(object);
  }
}

async function loadGltf(assetLoader: AssetLoader): Promise<{
  object: Object3D;
}> {
  const object = new Object3D();

  const gltf: GLTF = await assetLoader.add<GLTF>({
    loader: LOADER.GLTF,
    url: glbBase
  });

  const model = gltf.scene.clone();

  model.name = OBJECT_NAME.MESH;
  model.traverse(object => {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  object.add(model);

  return { object };
}
