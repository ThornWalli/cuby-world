import type { Vector3 } from 'three';
import Unit, {
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import SinkUnitModule from '@cuby-world/app/lib/classes/unitModule/Sink';
import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';

export interface Options extends UnitOptions {
  offset: Vector3;
}

export type Modules = UnitModules & {
  sink: SinkUnitModule;
};

export type ModuleList = (typeof SinkUnitModule)[] & UnitModuleList;
export default class SinkUnit<
  O extends Options = Options,
  M extends Modules = Modules,
  ML extends ModuleList = ModuleList
> extends Unit<O, M, ML> {
  duration: number = 0;
  constructor(
    options: UnitConstructorOptions<O>,
    moduleList: ML = [] as unknown as ML
  ) {
    moduleList.push(SinkUnitModule);
    moduleList.push(AnimationUnitModule);
    super(options, moduleList);
  }
}
