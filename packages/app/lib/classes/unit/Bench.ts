import type { Vector3 } from 'three';
import { Vector2 } from 'three';
import Unit, {
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '../Unit';
import BenchUnitModule from '../unitModule/Bench';
import { AnimationUnitModule } from '../unitModule/Animation';
import { rotateVector2 } from '../../utils/vector';
import { invertRotation } from '../../utils/rotation';

export interface BenchUnitOptions extends UnitOptions {
  offset: Vector3;
}

export type BenchUnitModules = UnitModules & {
  bench: BenchUnitModule;
};

export type BenchUnitModuleList = (typeof BenchUnitModule)[] & UnitModuleList;
export default class BenchUnit<
  Options extends BenchUnitOptions = BenchUnitOptions,
  Modules extends BenchUnitModules = BenchUnitModules,
  ModuleList extends BenchUnitModuleList = BenchUnitModuleList
> extends Unit<Options, Modules, ModuleList> {
  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(BenchUnitModule);
    moduleList.push(AnimationUnitModule);
    super(options, moduleList);
  }

  override getEntryPosition(targetPosition?: Vector3) {
    const slots = this.modules.bench.getSlots().filter(slot => !slot.blocked);
    const target = targetPosition ? targetPosition.clone() : undefined;
    const slot = slots.find(slot => {
      if (target) {
        return target.equals(slot.position);
      }
      return true;
    });

    if (slot) {
      console.log('found slot', slot.position);
      return rotateVector2(
        new Vector2(slot.position.x, slot.position.z),
        invertRotation(this.getRotation())
      );
    }

    return super.getEntryPosition();
  }
}
