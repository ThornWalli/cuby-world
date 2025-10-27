import type {
  UnitConstructorOptions,
  UnitModuleList,
  UnitModules,
  UnitOptions
} from '../Unit';
import Unit from '../Unit';
import WallUnitModule from '../unitModule/Wall';

export type WallUnitModules = UnitModules & {
  wall: WallUnitModule;
};

export type WallUnitModuleList = (typeof WallUnitModule)[] & UnitModuleList;

export default class WallUnit<
  Options extends UnitOptions = UnitOptions,
  Modules extends WallUnitModules = WallUnitModules,
  ModuleList extends WallUnitModuleList = WallUnitModuleList
> extends Unit<Options, Modules, ModuleList> {
  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(WallUnitModule);
    super(options, moduleList);
  }
}
