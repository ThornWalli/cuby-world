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
    CHAIR: 'chair';
  }
}

UNIT_TYPE.CHAIR = 'chair';

declare module '../../utils/object' {
  interface ObjectName {
    CHAIR: 'chair';
  }
}

OBJECT_NAME.CHAIR = 'chair';

export interface ChairUnitOptions extends UnitOptions {
  offset: Vector3;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends UnitModuleObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChairState extends UnitModuleState {}
export default class ChairUnitModule extends UnitModule<
  ChairState,
  Obervables
> {
  static override TYPE = 'chair';

  override async setup(context: UnitModuleSetupContext) {
    context.unit.addType(UNIT_TYPE.CHAIR);
    context.unit.root.userData[OBJECT_NAME.CHAIR] = true;
    return context.mesh;
  }
}
