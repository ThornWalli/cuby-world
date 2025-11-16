import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import type { UnitModuleSetupContext } from '../UnitModule';
import { UNIT_TYPE } from '../../types/unit';
import type Unit from '../Unit';
import type { SlotObervables, SlotUnitModuleOptions, SlotState } from './Slot';
import SlotUnitModule from './Slot';
import { Vector2, Vector3 } from 'three';

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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends SlotObervables {}

export interface BedOptions extends SlotUnitModuleOptions {
  offset: Vector3;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BedState extends SlotState {}
export default class BedUnitModule extends SlotUnitModule<
  BedOptions,
  BedState,
  Obervables
> {
  static override TYPE = 'bed';

  usedUnit: Unit | null = null;
  constructor(
    unit: Unit,
    options: BedOptions,
    state: BedState,
    debug: boolean
  ) {
    options = {
      ...options,
      offset: new Vector3(0, 0, 0),
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
    context.unit.addType(UNIT_TYPE.BED);
    context.unit.root.userData[OBJECT_NAME.BED] = true;
    return root;
  }
}

// import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
// import UnitModule, {
//   type UnitModuleObservables,
//   type UnitModuleOptions,
//   type UnitModuleSetupContext,
//   type UnitModuleState
// } from '../UnitModule';
// import { UNIT_TYPE } from '../../types/unit';
// import { Vector3 } from 'three';
// import type { UnitOptions } from '../Unit';
// import type Unit from '../Unit';

// declare module '../../types/unit' {
//   interface UnitType {
//     BED: 'bed';
//   }
// }

// UNIT_TYPE.BED = 'bed';

// declare module '../../utils/object' {
//   interface ObjectName {
//     BED: 'bed';
//   }
// }

// OBJECT_NAME.BED = 'bed';

// export interface BedUnitOptions extends UnitOptions {
//   offset: Vector3;
// }

// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// interface Obervables extends UnitModuleObservables {}

// export type BedOptions = UnitModuleOptions;
// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface BedState extends UnitModuleState {}
// export default class BedUnitModule extends UnitModule<
//   BedOptions,
//   BedState,
//   Obervables
// > {
//   static override TYPE = 'bed';

//   override state: BedState = {
//     offset: new Vector3(0, 0, 0),
//     unit: null
//   };

//   usedUnit: Unit | null = null;

//   override async setup(context: UnitModuleSetupContext) {
//     context.unit.addType(UNIT_TYPE.BED);
//     context.unit.root.userData[OBJECT_NAME.BED] = true;
//     return context.mesh;
//   }

// }
