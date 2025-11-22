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
    SHELF: 'shelf';
  }
}

UNIT_TYPE.SHELF = 'shelf';

declare module '../../utils/object' {
  interface ObjectName {
    SHELF: 'shelf';
  }
}

OBJECT_NAME.SHELF = 'shelf';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends SlotObervables {}

export type ShelfOptions = SlotUnitModuleOptions;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ShelfState extends SlotState {}
export default class ShelfUnitModule extends SlotUnitModule<
  ShelfOptions,
  ShelfState,
  Obervables
> {
  static override TYPE = 'shelf';

  usedUnit: Unit | null = null;
  constructor(
    unit: Unit,
    options: ShelfOptions,
    state: ShelfState,
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
    return ANIMATION_ACTION.SHELF_IDLE;
  }
}
