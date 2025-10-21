import { DoubleSide, Mesh, MeshPhongMaterial, Object3D, Vector2 } from 'three';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import type { AnimationLoopSubject } from '@cuby-world/app/lib/classes/Renderer';
import Stair, {
  type StairConstructorOptions
} from '@cuby-world/app/lib/classes/Stair';
import assetLoader from '@cuby-world/app/services/assetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import glbBase from './assets/stair_default_1x1.glb?url';
import { OBJECT_NAME } from '@cuby-world/app/lib/classes/Unit';
import type { Default1x1SkinDescription } from './skins';
import { stairCatalog } from '@cuby-world/stairs/catalog';

export default class Default1x1Stair extends Stair {
  static override KEY = 'default_1x1';

  constructor(
    options: Omit<StairConstructorOptions, 'size' | 'entryPositions'>
  ) {
    super({
      ...options,
      size: new Vector2(1, 1),
      entryPositions: { start: new Vector2(-1, 0), end: new Vector2(-1, 0) }
    });
  }

  override async setup(context: {
    animationLoop$: AnimationLoopSubject;
  }): Promise<void> {
    await super.setup(context);

    const { object } = await loadGltf(assetLoader);

    const skin: Default1x1SkinDescription | undefined = stairCatalog
      .get(this.key)
      ?.skins?.find(skin => skin.id === this.skin) as Default1x1SkinDescription;

    if (skin) {
      if ('color' in skin.options && skin?.options.color) {
        if (skin?.options.color) {
          object.traverse(o => {
            if (o instanceof Mesh) {
              o.material = new MeshPhongMaterial({
                color: skin.options.color,
                side: DoubleSide
              });
            }
          });
        }
      }
    }

    this.addToRoot(object);
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
