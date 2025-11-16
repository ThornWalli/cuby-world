import type { Vector3 } from 'three';
import Unit, {
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import BedUnitModule from '@cuby-world/app/lib/classes/unitModule/Bed';
import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';

export interface BedUnitOptions extends UnitOptions {
  offset: Vector3;
}

export type BedUnitModules = UnitModules & {
  bed: BedUnitModule;
};

export type BedUnitModuleList = (typeof BedUnitModule)[] & UnitModuleList;
export default class BedUnit<
  Options extends BedUnitOptions = BedUnitOptions,
  Modules extends BedUnitModules = BedUnitModules,
  ModuleList extends BedUnitModuleList = BedUnitModuleList
> extends Unit<Options, Modules, ModuleList> {
  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(BedUnitModule);
    moduleList.push(AnimationUnitModule);
    super(options, moduleList);
  }
}
