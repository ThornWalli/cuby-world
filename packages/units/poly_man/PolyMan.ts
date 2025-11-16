import { type MeshStandardMaterial, Mesh, Vector3, type Object3D } from 'three';
import { Group } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/poly_man.glb?url';

import { OBJECT_USER_DATA } from '@cuby-world/app/lib/utils/object';
import type { UnitSkinIdentifier } from '@cuby-world/app/lib/utils/unit/skins';
import { DEFAULT_PLAYER_SKIN_ID } from '@cuby-world/app/lib/classes/Player';
import { skinsMap } from './skins';
import type { CharacterUnitOptions } from '@cuby-world/app/lib/classes/unit/Character';
import CharacterUnit from '@cuby-world/app/lib/classes/unit/Character';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/types/animation';

export interface Options extends CharacterUnitOptions {
  color: string | number;
}

export default class PolyMan extends CharacterUnit<Options> {
  static override KEY = 'poly_man';
  static override NAME = 'Poly Man';

  constructor(
    options: Omit<
      UnitConstructorOptions<Partial<Options>>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      size: new Vector3(1, 1.8, 1),
      name: 'Poly Character',
      selectable: true,
      placeable: true,
      controls: false,
      options: {
        movement: {
          diagonalMovement: true,
          // stepDuration: 700,
          // stairStepDuration: 3000,
          // rotationDuration: 125
          stepDuration: 550,
          stairStepDuration: 1100,
          rotationDuration: 125
        },
        color: skinsMap.get(DEFAULT_PLAYER_SKIN_ID)!.options.color,
        ...options.options
      }
    });
  }

  override async setup(context: SetupContext) {
    this.modules.character.offsets.sitting_idle = new Vector3(-0.075, -0.06, 0);

    await super.setup(context);

    this.modules.animation.getAction(
      ANIMATION_ACTION.STAIR_FALLBACK
    )!.timeScale = 2.2;
    this.modules.animation.getAction(ANIMATION_ACTION.WALK)!.timeScale = 1.4;
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Group();
    this.setMeshRoot(meshRoot);

    const { scene, object, animations } = await loadGltf(glbBase);

    this.modules.animation.setAnimations(animations);
    // const obj = object.getObjectByName('empty')!;
    let obj: Object3D | Group = object;
    if (this.isPreview()) {
      obj = scene;
    } else {
      const scale = 1;
      obj.scale.set(scale, scale, scale);
      obj.translateY(-0.01);
    }

    obj.traverse(mesh => {
      if (mesh instanceof Mesh) {
        (mesh.material as MeshStandardMaterial).color.set(this.options.color);
        mesh.userData[OBJECT_USER_DATA.IGNORE_INTERSECTION_HOVER] = true;
      }
    });

    this.setMaterialReady();

    meshRoot.add(obj);
    return meshRoot;
  }

  setSkin(skinId: UnitSkinIdentifier) {
    const options =
      skinsMap.get(skinId)?.options ||
      skinsMap.get(DEFAULT_PLAYER_SKIN_ID)!.options;
    if (options.color) {
      this.setColor(options.color);
    }
  }

  private setColor(color: string | number, _group?: Object3D) {
    this.root.traverse(child => {
      if (child instanceof Mesh) {
        (child.material as MeshStandardMaterial).color.set(color);
      }
    });
  }
}
