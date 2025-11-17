import type { UnitConstructorOptions, UnitOptions } from '../../Unit';
import LightUnitModule from '../../unitModule/Light';
import WallUnit, {
  type WallUnitModuleList,
  type WallUnitModules
} from '../Wall';

export type WallLightUnitModules = WallUnitModules & {
  light: LightUnitModule;
};
export type WallLightUnitModuleList = (typeof LightUnitModule)[] &
  WallUnitModuleList;

export default class WallLightUnit<
  Options extends UnitOptions = UnitOptions,
  Modules extends WallLightUnitModules = WallLightUnitModules,
  ModuleList extends WallLightUnitModuleList = WallLightUnitModuleList
> extends WallUnit<Options, Modules, ModuleList> {
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
