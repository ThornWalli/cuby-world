import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import type { UnitModuleSetupContext } from '../UnitModule';
import { UNIT_TYPE } from '../../types/unit';
import type Unit from '../Unit';
import SlotUnitModule, {
  type SlotObervables,
  type SlotUnitModuleOptions,
  type SlotState
} from './Slot';
import { Vector2 } from 'three';

declare module '../../types/unit' {
  interface UnitType {
    BENCH: 'bench';
  }
}

UNIT_TYPE.BENCH = 'bench';

declare module '../../utils/object' {
  interface ObjectName {
    BENCH: 'bench';
  }
}

OBJECT_NAME.BENCH = 'bench';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends SlotObervables {}

export type BenchOptions = SlotUnitModuleOptions;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BenchState extends SlotState {}
export default class BenchUnitModule extends SlotUnitModule<
  BenchOptions,
  BenchState,
  Obervables
> {
  static override TYPE = 'bench';

  constructor(
    unit: Unit,
    options: BenchOptions,
    state: BenchState,
    debug: boolean
  ) {
    options = {
      ...options,
      slots: options.slots ?? [
        {
          position: new Vector2(0, 0),
          blocked: false
        },
        {
          position: new Vector2(0, 1),
          blocked: false
        }
      ]
    };
    super(unit, options, state, debug);
  }

  override async setup(context: UnitModuleSetupContext) {
    const root = await super.setup(context);
    context.unit.addType(UNIT_TYPE.BENCH);
    context.unit.root.userData[OBJECT_NAME.BENCH] = true;
    return root;
  }
}
