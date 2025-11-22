import { Vector3 } from 'three';
import Unit, {
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import ShelfUnitModule from '@cuby-world/app/lib/classes/unitModule/Shelf';
import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';
import {
  getEntryConditionDirections,
  RELATIVE_ENTRY
} from '../../utils/pathfindng';

export interface Options extends UnitOptions {
  offset: Vector3;
}

export type Modules = UnitModules & {
  shelf: ShelfUnitModule;
};

export type ModuleList = (typeof ShelfUnitModule)[] & UnitModuleList;
export default class ShelfUnit<
  O extends Options = Options,
  M extends Modules = Modules,
  ML extends ModuleList = ModuleList
> extends Unit<O, M, ML> {
  duration: number = 0;
  constructor(
    options: UnitConstructorOptions<O>,
    moduleList: ML = [] as unknown as ML
  ) {
    moduleList.push(ShelfUnitModule);
    moduleList.push(AnimationUnitModule);

    super(
      {
        ...options,
        options: {
          ...(options.options as O),
          offset: options.options?.offset || new Vector3(0, 0, 0)
        }
      },
      moduleList
    );
  }
  override getConditionDirections() {
    return getEntryConditionDirections(
      this.getPosition().clone(),
      this.getRotation(),
      [RELATIVE_ENTRY.LEFT, RELATIVE_ENTRY.RIGHT, RELATIVE_ENTRY.FRONT]
    );
  }
}
