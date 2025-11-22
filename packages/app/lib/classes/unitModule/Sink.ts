import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import type { UnitModuleSetupContext } from '../UnitModule';
import { UNIT_TYPE } from '../../types/unit';
import type Unit from '../Unit';
import type { SlotObervables, SlotUnitModuleOptions, SlotState } from './Slot';
import SlotUnitModule, { SLOT_TYPE } from './Slot';
import { Vector2 } from 'three';
import { ANIMATION_ACTION } from '../../types/animation';

declare module '../../types/unit' {
  interface UnitType {
    SINK: 'sink';
  }
}

UNIT_TYPE.SINK = 'sink';

declare module '../../utils/object' {
  interface ObjectName {
    SINK: 'sink';
  }
}

OBJECT_NAME.SINK = 'sink';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends SlotObervables {}

export type SinkOptions = SlotUnitModuleOptions;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SinkState extends SlotState {}
export default class SinkUnitModule extends SlotUnitModule<
  SinkOptions,
  SinkState,
  Obervables
> {
  static override TYPE = 'sink';

  usedUnit: Unit | null = null;
  constructor(
    unit: Unit,
    options: SinkOptions,
    state: SinkState,
    debug: boolean
  ) {
    options = {
      ...options,
      slots: options.slots ?? [
        {
          type: SLOT_TYPE.STAND,
          position: new Vector2(0, 0)
        }
      ]
    };
    super(unit, options, state, debug);
  }

  override async setup(context: UnitModuleSetupContext) {
    const root = await super.setup(context);
    context.unit.addType(UNIT_TYPE.SINK);
    context.unit.root.userData[OBJECT_NAME.SINK] = true;
    return root;
  }

  override getAnimationAction() {
    return ANIMATION_ACTION.SINK_IDLE;
  }
}
