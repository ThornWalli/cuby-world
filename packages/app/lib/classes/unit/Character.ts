import type { Group } from 'three';
import Unit, {
  type PreviewOptions,
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import type { MovementModuleOptions } from '@cuby-world/app/lib/classes/unitModule/Movement';
import CharacterUnitModule from '@cuby-world/app/lib/classes/unitModule/Character';
import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CharacterUnitOptions
  extends UnitOptions<MovementModuleOptions> {}

type CharacterUnitModules = UnitModules & {
  character: CharacterUnitModule;
  animation: AnimationUnitModule;
};

type CharacterUnitModuleList = (typeof CharacterUnitModule)[] & UnitModuleList;
export default class CharacterUnit<
  Options extends CharacterUnitOptions = CharacterUnitOptions,
  Modules extends CharacterUnitModules = CharacterUnitModules,
  ModuleList extends CharacterUnitModuleList = CharacterUnitModuleList
> extends Unit<Options, Modules, ModuleList> {
  override previewOptions: PreviewOptions = {
    ground: false
  };
  meshRoot!: Group;

  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(CharacterUnitModule);
    moduleList.push(AnimationUnitModule);
    super(options, moduleList);
  }

  setMeshRoot(meshRoot: Group) {
    this.meshRoot = meshRoot;
  }
}
