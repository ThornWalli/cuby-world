import type {
  UnitConstructorOptions,
  UnitModuleList,
  UnitModules,
  UnitOptions
} from '../Unit';
import LightUnitModule from '../unitModule/Light';
import Unit from '../Unit';

export type Options = UnitOptions;
export type Modules = UnitModules & {
  light: LightUnitModule;
};
export type ModuleList = (typeof LightUnitModule)[] & UnitModuleList;

export default class LightUnit<
  O extends UnitOptions = UnitOptions,
  M extends Modules = Modules,
  ML extends ModuleList = ModuleList
> extends Unit<O, M, ML> {
  constructor(
    options: UnitConstructorOptions<O>,
    moduleList: ML = [] as unknown as ML
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
