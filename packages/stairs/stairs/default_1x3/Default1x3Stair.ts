import { Mesh, MeshPhongMaterial, Object3D, Vector2 } from 'three';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import type { AnimationLoopSubject } from '@cuby-world/app/lib/classes/Renderer';
import Stair, {
  type StairConstructorOptions
} from '@cuby-world/app/lib/classes/Stair';
import assetLoader from '@cuby-world/app/services/assetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import glbBase from './assets/stair_default_1x3.glb?url';
import { OBJECT_NAME } from '@cuby-world/app/lib/classes/Unit';
import skins from '@cuby-world/stairs/skins';

export default class Default1x3Stair extends Stair {
  static override KEY = 'stair_default_1x3';

  constructor(
    options: Omit<StairConstructorOptions, 'size' | 'entryPositions'>
  ) {
    super({
      ...options,
      size: new Vector2(1, 3),
      entryPositions: { start: new Vector2(-1, 0), end: new Vector2(3, 0) }
    });
  }

  override async setup(context: {
    animationLoop$: AnimationLoopSubject;
  }): Promise<void> {
    await super.setup(context);

    const { object } = await loadGltf(assetLoader);

    if (skins.has(this.skin)) {
      const skin = skins.get(this.skin);
      if (skin?.options.color) {
        object.traverse(o => {
          if (o instanceof Mesh) {
            o.material = new MeshPhongMaterial({
              color: skin.options.color
            });
          }
        });
      }
    }

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
