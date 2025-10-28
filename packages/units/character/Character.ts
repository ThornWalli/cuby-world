import { Mesh, type Object3D } from 'three';
import { Group } from 'three';

import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import type { MovementModuleOptions } from '@cuby-world/app/lib/classes/unitModule/Movement';
import CharacterUnitModule from '@cuby-world/app/lib/classes/unitModule/Character';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';

import glbBase from './assets/character.glb?url';
import {
  ANIMATION_ACTION,
  AnimationUnitModule
} from '@cuby-world/app/lib/classes/unitModule/Animation';
import { OBJECT_USER_DATA } from '@cuby-world/app/lib/utils/object';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CharacterOptions extends UnitOptions<MovementModuleOptions> {}

type CharacterUnitModules = UnitModules & {
  character: CharacterUnitModule;
  animation: AnimationUnitModule;
};

type CharacterUnitModuleList = (typeof CharacterUnitModule)[] & UnitModuleList;
export default class Character extends Unit<
  CharacterOptions,
  CharacterUnitModules,
  CharacterUnitModuleList
> {
  static override KEY = 'character';
  static override NAME = 'Character';

  constructor(
    options: Omit<
      UnitConstructorOptions<Partial<CharacterOptions>>,
      'name' | 'selectable'
    > = {}
  ) {
    super(
      {
        ...options,
        name: 'Character',
        selectable: true,
        placeable: true,
        options: {
          hasControls: false,
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
      },
      [
        CharacterUnitModule,
        AnimationUnitModule
      ] as unknown as CharacterUnitModuleList
    );
  }

  override async setup(context: SetupContext) {
    await super.setup(context);

    this.modules.animation.getAction(
      ANIMATION_ACTION.STAIR_FALLBACK
    )!.timeScale = 2.2;
    this.modules.animation.getAction(ANIMATION_ACTION.WALK)!.timeScale = 1.4;
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Group();

    const { scene, object, animations } = await loadGltf(glbBase);

    this.modules.animation.setAnimations(animations);
    // const obj = object.getObjectByName('empty')!;
    let obj: Object3D | Group = object;
    if (this.isPreview()) {
      obj = scene;
    } else {
      obj.scale.set(0.9, 0.9, 0.9);
    }

    obj.traverse(mesh => {
      if (mesh instanceof Mesh) {
        mesh.userData[OBJECT_USER_DATA.IGNORE_INTERSECTION_HOVER] = true;
      }
    });

    this.observables.materialReady$.next();

    meshRoot.add(obj);
    return meshRoot;
  }
}
