import type {
  UnitConstructorOptions,
  UnitModuleList,
  UnitModules,
  UnitOptions
} from '../Unit';
import LightUnitModule from '../unitModule/Light';
import Unit from '../Unit';

export type LightUnitModules = UnitModules & {
  light: LightUnitModule;
};
export type LightUnitModuleList = (typeof LightUnitModule)[] & UnitModuleList;

export default class LightUnit<
  Options extends UnitOptions = UnitOptions,
  Modules extends LightUnitModules = LightUnitModules,
  ModuleList extends LightUnitModuleList = LightUnitModuleList
> extends Unit<Options, Modules, ModuleList> {
  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(LightUnitModule);
    super(
      {
        accessible: false,
        ...options
      },
      moduleList
    );
  }
}
