import {
  Vector3,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  Vector2
} from 'three';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import type { AnimationLoopSubject } from '@cuby-world/app/lib/classes/Renderer';
import Stair, {
  type StairConstructorOptions
} from '@cuby-world/app/lib/classes/Stair';
import assetLoader from '@cuby-world/app/services/assetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import glbBase from './assets/stair_default_1x1.glb?url';
import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import type { Default1x1SkinDescription } from './skins';
import { stairCatalog } from '@cuby-world/stairs/catalog';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/classes/unitModule/Animation';
import type { PathPartDescription } from '@cuby-world/app/lib/utils/pathfindng';
import { ROTATION } from '@cuby-world/app/lib/utils/rotation';

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

  /**
   * Überschreiben weil Fahrstuhl.
   */
  override getAnimationAction(_startPosition: Vector3) {
    return ANIMATION_ACTION.IDLE;
  }

  override getMovementPath(_startPosition: Vector3): PathPartDescription[] {
    const { start, end } = this.getEntryPositions();
    let offset: [Vector3, Vector3, Vector3] = [
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0)
    ];
    if (this.rotation === ROTATION.EAST) {
      offset = [
        new Vector3(-1, 0, 0),
        new Vector3(-1, 0, 0),
        new Vector3(0, 0, 0)
      ];
    } else if (this.rotation === ROTATION.WEST) {
      offset = [
        new Vector3(1, 0, 0),
        new Vector3(1, 0, 0),
        new Vector3(0, 0, 0)
      ];
    } else if (this.rotation === ROTATION.SOUTH) {
      offset = [
        new Vector3(0, 0, -1),
        new Vector3(0, 0, -1),
        new Vector3(0, 0, 0)
      ];
    } else if (this.rotation === ROTATION.NORTH) {
      offset = [
        new Vector3(0, 0, 1),
        new Vector3(0, 0, 1),
        new Vector3(0, 0, 0)
      ];
    }

    if (
      start.equals(this.getCounterpartEntryPositionByPosition(_startPosition))
    ) {
      return [
        { position: start.clone() },
        {
          position: start.clone().add(offset[0])
        },
        {
          position: end.clone().add(offset[1]),
          animationAction: ANIMATION_ACTION.IDLE
        },
        { position: end.clone().add(offset[2]) }
      ];
    } else {
      return [
        { position: end.clone() },
        {
          position: end.clone().add(offset[0])
        },
        {
          position: start.clone().add(offset[1]),
          animationAction: ANIMATION_ACTION.IDLE
        },
        { position: start.clone().add(offset[2]) }
      ];
    }
  }
}
async function loadGltf(assetLoader: AssetLoader): Promise<{
  object: Object3D;
}> {
  const object = new Object3D();

  const gltf: GLTF = await assetLoader.add<GLTF>({
    loader: LOADER.GLTF,
    value: glbBase
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
