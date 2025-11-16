import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import { UNIT_TYPE } from '../../types/unit';
import type Unit from '../Unit';
import type { UnitIdentifier } from '../Unit';
import type TeleporterUnit from '../unit/Teleporter';

declare module '../../types/unit' {
  interface UnitType {
    TELEPORTER: 'teleporter';
  }
}

UNIT_TYPE.TELEPORTER = 'teleporter';

declare module '../../utils/object' {
  interface ObjectName {
    TELEPORTER: 'teleporter';
  }
}

OBJECT_NAME.TELEPORTER = 'teleporter';

export enum TELEPORTER_TYPE {
  ENTRANCE = 'entrance',
  TELEPORTER = 'teleporter'
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends UnitModuleObservables {}

export type TeleporterOptions = UnitModuleOptions;
export interface TeleporterState extends UnitModuleState {
  type: TELEPORTER_TYPE;
  targetRoomId?: string;
  targetRoomTeleporterId?: UnitIdentifier;
}
export default class TeleporterUnitModule extends UnitModule<
  TeleporterOptions,
  TeleporterState,
  Obervables
> {
  async enter(unit: Unit) {
    const teleporterUnit = this.unit as TeleporterUnit;

    await teleporterUnit.modules.teleporter.beforeEnter(unit);

    await unit.modules.movement.moveTo(
      this.unit.getPosition().clone(),
      undefined,
      {
        silence: true,
        ignoreAbort: true
      }
    );

    await teleporterUnit.modules.teleporter.afterEnter(unit);
  }
  async leave(unit: Unit) {
    const teleporterUnit = this.unit as TeleporterUnit;

    unit.setPosition(teleporterUnit.getPosition());
    unit.setRotation(teleporterUnit.getRotation());
    // this.unit.modules.room?.getRoom()?.app.renderer.updateCamera(unit.position);

    await teleporterUnit.modules.teleporter.beforeLeave(unit);

    await unit.modules.movement.moveTo(
      this.unit.getRealEntryPosition(),
      undefined,
      {
        silence: true,
        ignoreAbort: true
      }
    );
    await teleporterUnit.modules.teleporter.afterLeave(unit);
  }
  static override TYPE = 'teleporter';

  usedUnit: Unit | null = null;

  override async setup(context: UnitModuleSetupContext) {
    context.unit.addType(UNIT_TYPE.CHAIR);
    context.unit.root.userData[OBJECT_NAME.CHAIR] = true;

    return context.mesh;
  }

  getUsedUnit() {
    return this.usedUnit;
  }

  setUsedUnit(unit: Unit | null) {
    this.usedUnit = unit;
  }

  getType() {
    return this.state.type;
  }
  setType(type: TELEPORTER_TYPE) {
    this.state.type = type;
  }
  getTargetRoomId() {
    return this.state.targetRoomId;
  }
  setTargetRoomId(targetRoomId?: string) {
    this.state.targetRoomId = targetRoomId;
  }
  getTargetRoomTeleporterId() {
    return this.state.targetRoomTeleporterId;
  }
  setTargetRoomTeleporterId(targetRoomTeleporterId?: UnitIdentifier) {
    this.state.targetRoomTeleporterId = targetRoomTeleporterId;
  }

  async beforeEnter(_unit: Unit) {
    if (this.debug) {
      console.debug('TELEPORTER', 'before enter', this.unit);
    }

    await (this.unit as TeleporterUnit).beforeEnter();
  }
  async afterEnter(_unit: Unit) {
    if (this.debug) {
      console.debug('TELEPORTER', 'after enter', this.unit);
    }

    await (this.unit as TeleporterUnit).afterEnter();
  }

  async beforeLeave(_unit: Unit) {
    if (this.debug) {
      console.debug('TELEPORTER', 'before leave', this.unit);
    }
    await (this.unit as TeleporterUnit).beforeLeave();
  }
  async afterLeave(_unit: Unit) {
    if (this.debug) {
      console.debug('TELEPORTER', 'after leave', this.unit);
    }
    await (this.unit as TeleporterUnit).afterLeave();
  }
}
