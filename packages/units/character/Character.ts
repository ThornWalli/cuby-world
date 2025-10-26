import type { AnimationMixer } from 'three';
import { BoxGeometry, Mesh, Clock } from 'three';

import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { defaultMaterial } from '../utils/material';
import type { MovementModuleOptions } from '@cuby-world/app/lib/classes/unitModule/Movement';
import CharacterUnitModule from '@cuby-world/app/lib/classes/unitModule/Character';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CharacterOptions extends UnitOptions<MovementModuleOptions> {}

type CharacterUnitModules = UnitModules & {
  character: CharacterUnitModule;
};

type CharacterUnitModuleList = (typeof CharacterUnitModule)[] & UnitModuleList;
export default class Character extends Unit<
  CharacterOptions,
  CharacterUnitModules,
  CharacterUnitModuleList
> {
  static override KEY = 'character';
  static override NAME = 'Character';

  clock: Clock = new Clock();
  mixer?: AnimationMixer;

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
            stepDuration: 325,
            rotationDuration: 125
          },
          ...options.options
        }
      },
      [CharacterUnitModule] as unknown as CharacterUnitModuleList
    );
  }

  override async createMesh(_context: SetupContext) {
    const size = 1;
    const ratio = 19 / 20;
    const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);
    const mesh: Mesh = new Mesh(geometry, defaultMaterial());

    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    mesh.position.set(0, (size * ratio) / 2 + 0.2, 0);

    return mesh;
  }
}
