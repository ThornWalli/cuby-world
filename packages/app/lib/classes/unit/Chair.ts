import type { Vector3 } from 'three';
import Unit, {
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import ChairUnitModule from '@cuby-world/app/lib/classes/unitModule/Chair';
import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';

export interface ChairUnitOptions extends UnitOptions {
  offset: Vector3;
}

export type ChairUnitModules = UnitModules & {
  chair: ChairUnitModule;
};

export type ChairUnitModuleList = (typeof ChairUnitModule)[] & UnitModuleList;
export default class ChairUnit<
  Options extends ChairUnitOptions = ChairUnitOptions,
  Modules extends ChairUnitModules = ChairUnitModules,
  ModuleList extends ChairUnitModuleList = ChairUnitModuleList
> extends Unit<Options, Modules, ModuleList> {
  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(ChairUnitModule);
    moduleList.push(AnimationUnitModule);
    super(options, moduleList);
  }
}
