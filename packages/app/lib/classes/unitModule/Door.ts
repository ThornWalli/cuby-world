import { ReplaySubject } from 'rxjs';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';

interface State extends UnitModuleState {
  open: boolean;
}

interface Obervables extends UnitModuleObservables {
  open$: ReplaySubject<boolean>;
}

export default class DoorUnitModule extends UnitModule<State, Obervables> {
  static override TYPE = 'door';

  constructor(unit: Unit, state: State, debug: boolean) {
    super(unit, state, debug);
    this.observables.open$ = new ReplaySubject<boolean>(1);
    console.log('Door state', state);
  }

  isOpen() {
    return this.state.open;
  }

  open() {
    this.state.open = true;
    this.observables.open$.next(true);
  }

  close() {
    this.state.open = false;
    this.observables.open$.next(false);
  }
}
