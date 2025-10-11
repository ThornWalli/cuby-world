import { Subject } from 'rxjs';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';

interface Obervables extends UnitModuleObservables {
  select$: Subject<boolean>;
}

type State = UnitModuleState;
export default class SelectionUnitModule extends UnitModule<State, Obervables> {
  static override TYPE = 'selection';

  constructor(unit: Unit, state: State, debug: boolean) {
    super(unit, state, debug);
    this.observables.select$ = new Subject<boolean>();
  }

  select() {
    this.observables.select$.next(true);
  }

  unselect() {
    this.observables.select$.next(false);
  }
}
