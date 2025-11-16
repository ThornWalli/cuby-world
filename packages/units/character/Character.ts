import { Mesh, Vector3, type Object3D } from 'three';
import { Group } from 'three';

import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';

import { loadGltf } from '@cuby-world/app/lib/utils/gltf';

import glbBase from './assets/character.glb?url';

import { OBJECT_USER_DATA } from '@cuby-world/app/lib/utils/object';
import CharacterUnit, {
  type CharacterUnitOptions
} from '@cuby-world/app/lib/classes/unit/Character';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/types/animation';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CharacterOptions extends CharacterUnitOptions {}

export default class Character extends CharacterUnit<CharacterOptions> {
  static override KEY = 'character';
  static override NAME = 'Character';

  constructor(
    options: Omit<
      UnitConstructorOptions<Partial<CharacterOptions>>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      size: new Vector3(1, 1.75, 1),
      name: 'Character',
      accessible: true,
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
        ...options.options
      }
    });
  }

  override async setup(context: SetupContext) {
    this.modules.character.offsets.sitting_idle = new Vector3(-0.075, 0, 0);

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
      const scale = 0.9;
      obj.scale.set(scale, scale, scale);
      obj.translateY(-0.01);
    }

    obj.traverse(mesh => {
      if (mesh instanceof Mesh) {
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        mesh.userData[OBJECT_USER_DATA.IGNORE_INTERSECTION_HOVER] = true;
      }
    });

    this.setMaterialReady();

    meshRoot.add(obj);
    return meshRoot;
  }
}
