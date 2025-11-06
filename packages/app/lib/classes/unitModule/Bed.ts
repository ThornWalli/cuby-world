import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import { UNIT_TYPE } from '../../types/unit';
import type { Vector3 } from 'three';
import type { UnitOptions } from '../Unit';

declare module '../../types/unit' {
  interface UnitType {
    BED: 'bed';
  }
}

UNIT_TYPE.BED = 'bed';

declare module '../../utils/object' {
  interface ObjectName {
    BED: 'bed';
  }
}

OBJECT_NAME.BED = 'bed';

export interface BedUnitOptions extends UnitOptions {
  offset: Vector3;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends UnitModuleObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BedState extends UnitModuleState {}
export default class BedUnitModule extends UnitModule<BedState, Obervables> {
  static override TYPE = 'bed';

  override async setup(context: UnitModuleSetupContext) {
    context.unit.addType(UNIT_TYPE.BED);
    context.unit.root.userData[OBJECT_NAME.BED] = true;
    return context.mesh;
  }
}
