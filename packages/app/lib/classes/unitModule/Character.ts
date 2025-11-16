import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';
import { concatMap, EMPTY, merge, ReplaySubject, switchMap } from 'rxjs';
import type { Vector3 } from 'three';
import { Object3D } from 'three';
import type TeleporterUnit from '../unit/Teleporter';
import { ANIMATION_ACTION } from '../../types/animation';
import { loadRoomById } from '../../utils/rooms';
import SlotUnitModule from './Slot';
import type { ChairUnitOptions } from '../unit/Chair';
import type { BenchUnitOptions } from '../unit/Bench';
import type { BedOptions } from './Bed';

interface Obervables extends UnitModuleObservables {
  sitting$: ReplaySubject<Unit<BenchUnitOptions | ChairUnitOptions> | null>;
  lying$: ReplaySubject<Unit<BedOptions> | null>;
}

type Options = UnitModuleOptions;
type State = {
  sitting: boolean;
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
    this.observables.sitting$ = new ReplaySubject<Unit<
      BenchUnitOptions | ChairUnitOptions
    > | null>(1);
    this.observables.sitting$.next(null);
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
    if (this.state.lying) {
      console.log('Is already lying down');
      return false;
    } else if (isBed(unit)) {
      this.state.lying = true;

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

      if (
        targetUnit
          .getModuleByType<SlotUnitModule>(SlotUnitModule)
          .addUsedUnit(this.unit)
      ) {
        this.state.usedUnit = targetUnit;
        this.observables.lying$.next(unit);

        return true;
      }
      return false;
    } else {
      console.log('Cannot sit down, not a bed', unit);
      return false;
    }
  }

  getUsedUnit() {
    return this.state.usedUnit;
  }

  useSitSlot(
    unit: Unit<BenchUnitOptions | ChairUnitOptions>,
    position: Vector3
  ) {
    const slot = unit
      .getModuleByType<SlotUnitModule>(SlotUnitModule)
      .findFreeSlot(position);

    if (isSitable(unit)) {
      this.state.sitting = true;

      const subscription =
        this.unit.modules.movement.observables.moveStart$.subscribe(() => {
          this.cancelSit();
          subscription.unsubscribe();
        });

      const wrapper = this.root!;
      const targetUnit = unit as Unit<BenchUnitOptions | ChairUnitOptions>;
      if (targetUnit) {
        this.unit.modules.animation!.setAnimationAction(
          ANIMATION_ACTION.SITTING_IDLE
        );
        this.unit.setRotation(slot?.rotation ?? targetUnit.getRotation());
        wrapper.position.copy(targetUnit.options.offset);
        if (this.offsets.sitting_idle) {
          wrapper.position.add(this.offsets.sitting_idle);
        }
      } else {
        wrapper.position.y = 0;
        this.unit.modules.animation!.setAnimationAction(ANIMATION_ACTION.IDLE);
      }

      if (
        targetUnit
          .getModuleByType<SlotUnitModule>(SlotUnitModule)
          .addUsedUnit(this.unit)
      ) {
        this.state.usedUnit = targetUnit;
        this.observables.sitting$.next(unit);
        console.log('Sitting down', unit);

        return true;
      }
      return false;
    } else {
      console.log('Cannot sit down, not a chair', unit);
      return false;
    }
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
    this.state.lying = false;
    this.state.usedUnit
      ?.getModuleByType<SlotUnitModule>(SlotUnitModule)
      .removeUsedUnit(this.unit);
    this.state.usedUnit = null;
    this.observables.lying$.next(null);
    console.log('Standing up');
  }

  cancelSit() {
    this.root!.position.y = 0;
    this.state.sitting = false;
    this.state.usedUnit
      ?.getModuleByType<SlotUnitModule>(SlotUnitModule)
      .removeUsedUnit(this.unit);
    this.state.usedUnit = null;
    this.observables.sitting$.next(null);
    console.log('Standing up');
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
