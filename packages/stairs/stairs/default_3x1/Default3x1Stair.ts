import { Mesh, MeshPhongMaterial, Vector2 } from 'three';
import type { AnimationLoopSubject } from '@cuby-world/app/lib/classes/Renderer';
import Stair, {
  type StairConstructorOptions
} from '@cuby-world/app/lib/classes/Stair';

import glbBase from './assets/stair_default_1x3.glb?url';

import { stairCatalog } from '@cuby-world/stairs/catalog';
import type { Default3x1SkinDescription } from './skins';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';

export default class Default1x3Stair extends Stair {
  static override KEY = 'default_3x1';

  constructor(
    options: Omit<StairConstructorOptions, 'size' | 'entryPositions'>
  ) {
    super({
      ...options,
      size: new Vector2(3, 1),
      entryPositions: { start: new Vector2(-1, 0), end: new Vector2(3, 0) }
    });
  }

  override async setup(context: {
    animationLoop$: AnimationLoopSubject;
  }): Promise<void> {
    await super.setup(context);

    const { object } = await loadGltf(glbBase);

    const skin: Default3x1SkinDescription | undefined = stairCatalog
      .get(this.key)
      ?.skins?.find(skin => skin.id === this.skin) as Default3x1SkinDescription;

    if (skin) {
      if ('color' in skin.options && skin?.options.color) {
        object.traverse(o => {
          if (o instanceof Mesh) {
            o.material = new MeshPhongMaterial({
              color: skin.options.color
            });
          }
        });
      }
    }

    this.addToRoot(object);
  }
}
