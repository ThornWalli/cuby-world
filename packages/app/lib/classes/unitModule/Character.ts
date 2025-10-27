import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';
import { ReplaySubject } from 'rxjs';

interface Obervables extends UnitModuleObservables {
  sitting$: ReplaySubject<boolean>;
}

type State = {
  sitting: boolean;
} & UnitModuleState;
export default class CharacterUnitModule extends UnitModule<State, Obervables> {
  static override TYPE = 'character';

  constructor(unit: Unit, state: State, debug: boolean) {
    state = { ...state, sitting: state.sitting ?? false };
    super(unit, state, debug);

    //#region observables
    this.observables.sitting$ = new ReplaySubject<boolean>(1);
    this.observables.sitting$.next(this.state.sitting);
    //#endregion
  }

  sit(unit: Unit) {
    if (isChair(unit)) {
      this.state.sitting = true;
      this.observables.sitting$.next(this.state.sitting);
      console.log('Sitting down', unit);
      return true;
    } else {
      console.log('Cannot sit down, not a chair', unit);
      return false;
    }
  }
  unsit() {
    this.state.sitting = false;
    this.observables.sitting$.next(this.state.sitting);
    console.log('Standing up');
  }
}

/**
 * Überprüft ob die Unit ein Stuhl ist
 */
function isChair(unit: Unit) {
  return 'chair' in unit.modules && unit.modules.chair;
}
