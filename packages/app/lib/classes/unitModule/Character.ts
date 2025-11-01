import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';
import { ReplaySubject } from 'rxjs';
import { ANIMATION_ACTION } from './Animation';
import type { ChairUnitOptions } from './Chair';
import type { Vector3 } from 'three';
import { Object3D } from 'three';

interface Obervables extends UnitModuleObservables {
  sitting$: ReplaySubject<Unit<ChairUnitOptions> | null>;
}

type State = {
  sitting: boolean;
} & UnitModuleState;
export default class CharacterUnitModule extends UnitModule<State, Obervables> {
  static override TYPE = 'character';

  offsets: Partial<Record<ANIMATION_ACTION, Vector3>> = {};

  constructor(unit: Unit, state: State, debug: boolean) {
    state = { ...state, sitting: state.sitting ?? false };
    super(unit, state, debug);

    //#region observables
    this.observables.sitting$ =
      new ReplaySubject<Unit<ChairUnitOptions> | null>(1);
    this.observables.sitting$.next(null);
    //#endregion

    const wrapper = new Object3D();
    this.wrapper = wrapper;
  }

  // override setup(context: UnitModuleSetupContext): Promise<Object3D> {
  //   this.subscription.add(
  //     this.observables.sitting$.subscribe(sittingUnit => {
  //   )
  // }

  wrapper: Object3D;
  override async setup(context: UnitModuleSetupContext) {
    this.wrapper.add(context.mesh);
    return this.wrapper;
  }

  sit(unit: Unit<ChairUnitOptions>) {
    if (isChair(unit)) {
      this.state.sitting = true;

      const subscription =
        this.unit.modules.movement.observables.moveStart$.subscribe(() => {
          this.unsit();
          subscription.unsubscribe();
        });

      const wrapper = this.wrapper!;
      const sittingUnit = unit as Unit<ChairUnitOptions>;
      if (sittingUnit) {
        this.unit.modules.animation!.setAnimationAction(
          ANIMATION_ACTION.SITTING_IDLE
        );
        this.unit.setRotation(sittingUnit.getRotation());
        wrapper.position.copy(sittingUnit.options.offset);
        if (this.offsets.sitting_idle) {
          wrapper.position.add(this.offsets.sitting_idle);
        }
      } else {
        wrapper.position.y = 0;
        this.unit.modules.animation!.setAnimationAction(ANIMATION_ACTION.IDLE);
      }

      this.observables.sitting$.next(unit);
      console.log('Sitting down', unit);

      return true;
    } else {
      console.log('Cannot sit down, not a chair', unit);
      return false;
    }
  }

  unsit() {
    this.wrapper!.position.y = 0;
    this.state.sitting = false;
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
