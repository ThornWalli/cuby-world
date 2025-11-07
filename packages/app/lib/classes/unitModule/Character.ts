import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';
import { concatMap, EMPTY, merge, ReplaySubject, switchMap } from 'rxjs';
import { ANIMATION_ACTION } from './Animation';
import type { ChairUnitOptions } from './Chair';
import type { Vector3 } from 'three';
import { Object3D } from 'three';
import type { BedUnitOptions } from './Bed';
import BedUnitModule from './Bed';
import ChairUnitModule from './Chair';

interface Obervables extends UnitModuleObservables {
  sitting$: ReplaySubject<Unit<ChairUnitOptions> | null>;
  lying$: ReplaySubject<Unit<BedUnitOptions> | null>;
}

type State = {
  sitting: boolean;
  lying: boolean;
  usedUnit: Unit | null;
} & UnitModuleState;

export default class CharacterUnitModule extends UnitModule<State, Obervables> {
  static override TYPE = 'character';

  offsets: Partial<Record<ANIMATION_ACTION, Vector3>> = {};
  wrapper: Object3D;

  constructor(unit: Unit, state: State, debug: boolean) {
    state = { ...state, sitting: state.sitting ?? false };
    super(unit, state, debug);

    //#region observables
    this.observables.sitting$ =
      new ReplaySubject<Unit<ChairUnitOptions> | null>(1);
    this.observables.sitting$.next(null);
    this.observables.lying$ = new ReplaySubject<Unit<BedUnitOptions> | null>(1);
    this.observables.lying$.next(null);
    //#endregion

    const wrapper = new Object3D();
    this.wrapper = wrapper;
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

    this.wrapper.add(context.mesh);
    return this.wrapper;
  }

  useBed(unit: Unit<BedUnitOptions>) {
    if (isBed(unit)) {
      this.state.lying = true;

      const subscription =
        this.unit.modules.movement.observables.moveStart$.subscribe(() => {
          this.cancelBed();
          subscription.unsubscribe();
        });

      const wrapper = this.wrapper!;
      const targetUnit = unit as Unit<BedUnitOptions>;
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
        wrapper.position.set(0, 0, 0);
        this.unit.modules.animation!.setAnimationAction(ANIMATION_ACTION.IDLE);
      }

      targetUnit
        .getModule<BedUnitModule>(BedUnitModule.TYPE)
        .setUsedUnit(this.unit);

      this.state.usedUnit = targetUnit;
      this.observables.lying$.next(unit);

      return true;
    } else {
      console.log('Cannot sit down, not a bed', unit);
      return false;
    }
  }

  getUsedUnit() {
    return this.state.usedUnit;
  }

  useChair(unit: Unit<ChairUnitOptions>) {
    if (isChair(unit)) {
      this.state.sitting = true;

      const subscription =
        this.unit.modules.movement.observables.moveStart$.subscribe(() => {
          this.cancelChair();
          subscription.unsubscribe();
        });

      const wrapper = this.wrapper!;
      const targetUnit = unit as Unit<ChairUnitOptions>;
      if (targetUnit) {
        this.unit.modules.animation!.setAnimationAction(
          ANIMATION_ACTION.SITTING_IDLE
        );
        this.unit.setRotation(targetUnit.getRotation());
        wrapper.position.copy(targetUnit.options.offset);
        if (this.offsets.sitting_idle) {
          wrapper.position.add(this.offsets.sitting_idle);
        }
      } else {
        wrapper.position.y = 0;
        this.unit.modules.animation!.setAnimationAction(ANIMATION_ACTION.IDLE);
      }

      targetUnit
        .getModule<ChairUnitModule>(ChairUnitModule.TYPE)
        .setUsedUnit(this.unit);

      this.state.usedUnit = targetUnit;
      this.observables.sitting$.next(unit);
      console.log('Sitting down', unit);

      return true;
    } else {
      console.log('Cannot sit down, not a chair', unit);
      return false;
    }
  }

  cancelBed() {
    this.wrapper!.position.y = 0;
    this.state.lying = false;
    this.state.usedUnit
      ?.getModule<BedUnitModule>(BedUnitModule.TYPE)
      .setUsedUnit(null);
    this.state.usedUnit = null;
    this.observables.lying$.next(null);
    console.log('Standing up');
  }

  cancelChair() {
    this.wrapper!.position.y = 0;
    this.state.sitting = false;
    this.state.usedUnit
      ?.getModule<ChairUnitModule>(ChairUnitModule.TYPE)
      .setUsedUnit(null);
    this.state.usedUnit = null;
    this.observables.sitting$.next(null);
    console.log('Standing up');
  }
}

/**
 * Überprüft ob die Unit ein Stuhl ist
 */
function isChair(unit: Unit) {
  return 'chair' in unit.modules && unit.modules.chair;
}

/**
 * Überprüft ob die Unit ein Bett ist
 */
function isBed(unit: Unit) {
  return 'bed' in unit.modules && unit.modules.bed;
}
