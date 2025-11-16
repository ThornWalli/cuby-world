import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import type { UnitModuleSetupContext } from '../UnitModule';
import { UNIT_TYPE } from '../../types/unit';
import type Unit from '../Unit';
import type { SlotObervables, SlotUnitModuleOptions, SlotState } from './Slot';
import SlotUnitModule from './Slot';
import { Vector2 } from 'three';

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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends SlotObervables {}

export type ChairOptions = SlotUnitModuleOptions;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChairState extends SlotState {}
export default class ChairUnitModule extends SlotUnitModule<
  ChairOptions,
  ChairState,
  Obervables
> {
  static override TYPE = 'chair';

  usedUnit: Unit | null = null;
  constructor(
    unit: Unit,
    options: ChairOptions,
    state: ChairState,
    debug: boolean
  ) {
    options = {
      ...options,
      slots: options.slots ?? [
        {
          position: new Vector2(0, 0)
        }
      ]
    };
    super(unit, options, state, debug);
  }

  override async setup(context: UnitModuleSetupContext) {
    const root = await super.setup(context);
    context.unit.addType(UNIT_TYPE.CHAIR);
    context.unit.root.userData[OBJECT_NAME.CHAIR] = true;
    return root;
  }
}
