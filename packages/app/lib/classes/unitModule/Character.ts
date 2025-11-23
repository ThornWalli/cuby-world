import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';
import { concatMap, delay, EMPTY, merge, ReplaySubject, switchMap } from 'rxjs';
import type { Vector3 } from 'three';
import { Object3D } from 'three';
import type TeleporterUnit from '../unit/Teleporter';
import { ANIMATION_ACTION } from '../../types/animation';
import { loadRoomById } from '../../utils/rooms';
import SlotUnitModule from './Slot';
import type { ChairUnitOptions } from '../unit/Chair';
import type { BenchUnitOptions } from '../unit/Bench';
import type { BedOptions } from './Bed';
import { invertRotation } from '../../utils/rotation';
import type { Options as SinkUnitOptions } from '../unit/Sink';
import WallUnitModule from './Wall';

interface Obervables extends UnitModuleObservables {
  slotted$: ReplaySubject<boolean>;
  sitting$: ReplaySubject<Unit | null>;
  standing$: ReplaySubject<Unit | null>;
  lying$: ReplaySubject<Unit<BedOptions> | null>;
}

type Options = UnitModuleOptions;
type State = {
  slotted: boolean;
  sitting: boolean;
  standing: boolean;
  lying: boolean;
  usedUnit: Unit | null;
} & UnitModuleState;

export default class CharacterUnitModule extends UnitModule<
  Options,
  State,
  Obervables
> {
  static override TYPE = 'character';

  offsets: Partial<Record<ANIMATION_ACTION, Vector3>> = {};
  root: Object3D;

  constructor(unit: Unit, options: Options, state: State, debug: boolean) {
    state = { ...state, sitting: state.sitting ?? false };
    super(unit, options, state, debug);

    //#region observables
    this.observables.slotted$ = new ReplaySubject<boolean>(1);
    this.observables.slotted$.next(false);
    this.observables.sitting$ = new ReplaySubject<Unit | null>(1);
    this.observables.sitting$.next(null);
    this.observables.standing$ = new ReplaySubject<Unit | null>(1);
    this.observables.standing$.next(null);
    this.observables.lying$ = new ReplaySubject<Unit<BedOptions> | null>(1);
    this.observables.lying$.next(null);
    //#endregion

    this.root = new Object3D();
  }

  override async setup(context: UnitModuleSetupContext) {
    let lastLying: boolean = false;
    this.subscription.add(
      this.observables.lying$
        .pipe(
          switchMap(unit => {
            const lying = !!unit;
            if (lying && unit) {
              this.unit.disableRotation();
              return merge(
                unit.observables.position$,
                unit.observables.rotate$
              ).pipe(
                concatMap(async () => {
                  lastLying = lying;
                  this.unit.setPosition(unit.getPosition());
                  this.unit.setRotation(unit.getRotation());
                })
              );
            } else if (!lying && lastLying) {
              this.unit.enableRotation();
            }
            lastLying = lying;
            return EMPTY;
          })
        )
        .subscribe(void 0)
    );

    this.root.add(context.mesh);

    return this.root;
  }

  async useTeleporter(unit: TeleporterUnit) {
    await unit.modules.teleporter.enter(this.unit);

    // Nur der Client führt den Raumwechsel durch
    if (this.unit.modules.player.isClient()) {
      if (unit.modules.teleporter.state.targetRoomId) {
        // Raum wechsel
        await this.unit.modules.room?.currentRoom?.app.enterRoom(
          await loadRoomById(unit.modules.teleporter.state.targetRoomId),
          unit.modules.teleporter.state.targetRoomTeleporterId
        );
      } else {
        const teleporterUnit =
          this.unit.modules.room?.currentRoom?.modules.units.getById(
            unit.modules.teleporter.state.targetRoomTeleporterId!
          ) as TeleporterUnit;

        await teleporterUnit.modules.teleporter.leave(this.unit);
      }
    }
  }

  useBed(unit: Unit<BedOptions>) {
    if (this.isLying()) {
      console.log('Is already lying down');
      return false;
    } else if (isBed(unit)) {
      const subscription =
        this.unit.modules.movement.observables.moveStart$.subscribe(() => {
          this.cancelBed();
          subscription.unsubscribe();
        });

      const wrapper = this.root!;
      const targetUnit = unit as Unit<BedOptions>;
      if (targetUnit) {
        this.unit.modules.animation!.setAnimationAction(
          ANIMATION_ACTION.LAYING_SLEEPING
        );
        this.unit.setPosition(targetUnit.getPosition());
        this.unit.setRotation(targetUnit.getRotation());
        wrapper.position.copy(targetUnit.options.offset);
        if (this.offsets.laying_sleeping) {
          wrapper.position.add(this.offsets.laying_sleeping);
        }
      } else {
        // wrapper.position.set(0, 0, 0);
        this.unit.modules.animation!.setAnimationAction(ANIMATION_ACTION.IDLE);
      }

      if (targetUnit.getModuleByType(SlotUnitModule)?.addUsedUnit(this.unit)) {
        this.setUsedUnit(targetUnit);
        this.setLying(unit);
        this.setSlotted(true);

        return true;
      }
      return false;
    } else {
      console.log('Cannot sit down, not a bed', unit);
      return false;
    }
  }

  useStandSlot(unit: Unit, position: Vector3) {
    if (this.isStanding()) {
      console.log('Is already lying down');
      return false;
    } else {
      const slotModule = unit.getModuleByType<SlotUnitModule>(SlotUnitModule);
      if (!slotModule) {
        throw new Error('Unit has no slot module');
      }
      const slot = slotModule.findFreeSlot(position);

      if (isSitable(unit)) {
        const subscription =
          this.unit.modules.movement.observables.moveStart$.subscribe(() => {
            this.cancelStand();
            subscription.unsubscribe();
          });

        const root = this.root!;
        const targetUnit = unit as Unit<SinkUnitOptions>; // TODO: ???
        if (targetUnit) {
          this.unit.modules.animation!.setAnimationAction(
            slotModule.getAnimationAction()
          );
          this.unit.setRotation(
            slot?.rotation ?? invertRotation(targetUnit.getRotation())
          );
          const wallModule = targetUnit.getModule<WallUnitModule>(
            WallUnitModule.TYPE
          );
          const position = targetUnit.options.offset.clone();
          if (wallModule) {
            position.add(wallModule.options.offset).divideScalar(2);
          }
          root.position.copy(position);
          if (this.offsets[slotModule.getAnimationAction()]) {
            root.position.add(this.offsets[slotModule.getAnimationAction()]!);
          }
        } else {
          root.position.y = 0;
          this.unit.modules.animation!.setAnimationAction(
            ANIMATION_ACTION.IDLE
          );
        }

        if (slotModule.addUsedUnit(this.unit)) {
          this.setUsedUnit(targetUnit);
          this.setStanding(unit);
          this.setSlotted(true);

          return true;
        }
        return false;
      } else {
        console.log('Cannot sit down, not a chair', unit);
        return false;
      }
    }
  }

  useSeatSlot(unit: Unit, position: Vector3) {
    if (this.isSitting()) {
      console.log('Is already sitting');
      return false;
    } else {
      const slotModule = unit.getModuleByType<SlotUnitModule>(SlotUnitModule);

      if (!slotModule) {
        throw new Error('Unit has no slot module');
      }

      const slot = slotModule.findFreeSlot(position);

      if (isSitable(unit)) {
        this.state.sitting = true;

        const subscription = this.unit.modules.movement.observables.moveStart$
          .pipe(delay(300))
          .subscribe(() => {
            this.cancelSit();
            subscription.unsubscribe();
          });

        const root = this.root!;
        const targetUnit = unit as Unit<BenchUnitOptions | ChairUnitOptions>;
        if (targetUnit) {
          this.unit.modules.animation!.setAnimationAction(
            slotModule.getAnimationAction()
          );
          this.unit.setRotation(slot?.rotation ?? targetUnit.getRotation());
          root.position.copy(targetUnit.options.offset);
          if (this.offsets[slotModule.getAnimationAction()]) {
            root.position.add(this.offsets[slotModule.getAnimationAction()]!);
          }
        } else {
          root.position.y = 0;
          this.unit.modules.animation!.setAnimationAction(
            ANIMATION_ACTION.IDLE
          );
        }

        if (slotModule.addUsedUnit(this.unit)) {
          this.setUsedUnit(targetUnit);
          this.setSitting(unit);
          this.setSlotted(true);

          return true;
        }
        return false;
      } else {
        console.log('Cannot sit down, not a chair', unit);
        return false;
      }
    }
  }

  hasUsedUnit() {
    return !!this.state.usedUnit;
  }
  getUsedUnit() {
    return this.state.usedUnit;
  }
  setUsedUnit(unit: Unit | null) {
    this.state.usedUnit = unit;
  }

  isSlotted() {
    return this.state.slotted;
  }
  setSlotted(slotted: boolean) {
    this.state.slotted = slotted;
    this.observables.slotted$.next(slotted);
  }

  isStanding() {
    return this.state.standing;
  }
  setStanding(unit: Unit | null) {
    this.state.standing = !!unit;
    this.observables.standing$.next(unit);
  }

  isLying() {
    return this.state.lying;
  }
  setLying(unit: Unit<BedOptions> | null) {
    this.state.lying = !!unit;
    this.observables.lying$.next(unit);
  }

  isSitting() {
    return this.state.sitting;
  }
  setSitting(unit: Unit | null) {
    this.state.sitting = !!unit;
    this.observables.sitting$.next(unit);
    console.log('Sitting down', unit);
  }

  // useChair(unit: Unit<ChairUnitOptions>) {
  //   if (isSitable(unit)) {
  //     this.state.sitting = true;

  //     const subscription =
  //       this.unit.modules.movement.observables.moveStart$.subscribe(() => {
  //         this.cancelChair();
  //         subscription.unsubscribe();
  //       });

  //     const wrapper = this.wrapper!;
  //     const targetUnit = unit as Unit<ChairUnitOptions>;
  //     if (targetUnit) {
  //       this.unit.modules.animation!.setAnimationAction(
  //         ANIMATION_ACTION.SITTING_IDLE
  //       );
  //       this.unit.setRotation(targetUnit.getRotation());
  //       wrapper.position.copy(targetUnit.options.offset);
  //       if (this.offsets.sitting_idle) {
  //         wrapper.position.add(this.offsets.sitting_idle);
  //       }
  //     } else {
  //       wrapper.position.y = 0;
  //       this.unit.modules.animation!.setAnimationAction(ANIMATION_ACTION.IDLE);
  //     }

  //     targetUnit
  //       .getModule<ChairUnitModule>(ChairUnitModule.TYPE)
  //       .setUsedUnit(this.unit);

  //     this.state.usedUnit = targetUnit;
  //     this.observables.sitting$.next(unit);
  //     console.log('Sitting down', unit);

  //     return true;
  //   } else {
  //     console.log('Cannot sit down, not a chair', unit);
  //     return false;
  //   }
  // }

  cancelBed() {
    this.root.position.set(0, 0, 0);
    this.state.usedUnit
      ?.getModuleByType<SlotUnitModule>(SlotUnitModule)
      ?.removeUsedUnit(this.unit);
    this.setLying(null);
    this.setUsedUnit(null);
  }

  cancelStand() {
    this.root!.position.set(0, 0, 0);

    this.state.usedUnit
      ?.getModuleByType<SlotUnitModule>(SlotUnitModule)
      ?.removeUsedUnit(this.unit);
    this.setStanding(null);
    this.setUsedUnit(null);
  }

  cancelSit() {
    this.root!.position.set(0, 0, 0);
    this.state.usedUnit
      ?.getModuleByType<SlotUnitModule>(SlotUnitModule)
      ?.removeUsedUnit(this.unit);
    this.setSitting(null);
    this.setUsedUnit(null);
  }
}

/**
 * Überprüft ob die Unit ein Stuhl ist
 */
function isSitable(unit: Unit) {
  return unit.hasModuleType(SlotUnitModule);
}

/**
 * Überprüft ob die Unit ein Bett ist
 */
function isBed(unit: Unit) {
  return 'bed' in unit.modules && unit.modules.bed;
}
