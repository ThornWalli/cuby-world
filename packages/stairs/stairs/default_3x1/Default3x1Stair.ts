import { Vector3, Mesh, MeshPhongMaterial, Vector2 } from 'three';
import type { AnimationLoopSubject } from '@cuby-world/app/lib/classes/Renderer';
import Stair, {
  type StairConstructorOptions
} from '@cuby-world/app/lib/classes/Stair';

import glbBase from './assets/stair_default_1x3.glb?url';

import { stairCatalog } from '@cuby-world/stairs/catalog';
import type { Default3x1SkinDescription } from './skins';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import type { PathPartDescription } from '@cuby-world/app/lib/utils/pathfindng';
import { ROTATION } from '@cuby-world/app/lib/utils/rotation';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/classes/unitModule/Animation';

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

  override getMovementPath(_startPosition: Vector3): PathPartDescription[] {
    const { start, end } = this.getEntryPositions();

    let offset = new Vector3(0, 0, 0);
    if (this.rotation === ROTATION.EAST) {
      offset = new Vector3(1, 0, 0);
    } else if (this.rotation === ROTATION.WEST) {
      offset = new Vector3(-1, 0, 0);
    } else if (this.rotation === ROTATION.SOUTH) {
      offset = new Vector3(0, 0, 1);
    } else if (this.rotation === ROTATION.NORTH) {
      offset = new Vector3(0, 0, -1);
    }

    if (
      start.equals(this.getCounterpartEntryPositionByPosition(_startPosition))
    ) {
      return [
        {
          position: start
        },
        {
          position: end.clone().add(offset),
          animationAction: ANIMATION_ACTION.STAIR_FALLBACK
        },
        { position: end }
      ];
    } else {
      return [
        {
          position: end
        },
        {
          position: end.clone().add(offset)
        },
        {
          position: start,
          animationAction: ANIMATION_ACTION.STAIR_FALLBACK
        }
      ];
    }
  }
}
