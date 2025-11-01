import { type MeshPhongMaterial, Mesh, Vector3, type Object3D } from 'three';
import { Group } from 'three';
import Unit, {
  type PreviewOptions,
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import type { MovementModuleOptions } from '@cuby-world/app/lib/classes/unitModule/Movement';
import CharacterUnitModule from '@cuby-world/app/lib/classes/unitModule/Character';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/poly_character.glb?url';
import {
  ANIMATION_ACTION,
  AnimationUnitModule
} from '@cuby-world/app/lib/classes/unitModule/Animation';
import { OBJECT_USER_DATA } from '@cuby-world/app/lib/utils/object';
import type { UnitSkinIdentifier } from '@cuby-world/app/lib/utils/unit/skins';
import { DEFAULT_PLAYER_SKIN_ID } from '@cuby-world/app/lib/classes/Player';
import { skinsMap } from './skins';

type PolyCharacterUnitModules = UnitModules & {
  character: CharacterUnitModule;
  animation: AnimationUnitModule;
};

export interface PolyCharacterOptions
  extends UnitOptions<MovementModuleOptions> {
  color: string | number;
}

type CharacterUnitModuleList = (typeof CharacterUnitModule)[] & UnitModuleList;
export default class PolyCharacter extends Unit<
  PolyCharacterOptions,
  PolyCharacterUnitModules,
  CharacterUnitModuleList
> {
  static override KEY = 'poly_character';
  static override NAME = 'Poly Character';

  override previewOptions: PreviewOptions = {
    ground: false
  };

  constructor(
    options: Omit<
      UnitConstructorOptions<Partial<PolyCharacterOptions>>,
      'name' | 'selectable'
    > = {}
  ) {
    super(
      {
        ...options,
        size: new Vector3(1, 1.8, 1),
        name: 'Poly Character',
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
          color: skinsMap.get(DEFAULT_PLAYER_SKIN_ID)!.options.color,
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

    this.modules.character.offsets.sitting_idle = new Vector3(-0.075, -0.06, 0);
    this.modules.animation.getAction(
      ANIMATION_ACTION.STAIR_FALLBACK
    )!.timeScale = 2.2;
    this.modules.animation.getAction(ANIMATION_ACTION.WALK)!.timeScale = 1.4;
  }

  meshRoot!: Group;

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Group();
    this.meshRoot = meshRoot;

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
        (mesh.material as MeshPhongMaterial).color.set(this.options.color);
        mesh.userData[OBJECT_USER_DATA.IGNORE_INTERSECTION_HOVER] = true;
      }
    });

    this.observables.materialReady$.next();

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
        debugger;
        (child.material as MeshPhongMaterial).color.set(color);
      }
    });
  }
}
