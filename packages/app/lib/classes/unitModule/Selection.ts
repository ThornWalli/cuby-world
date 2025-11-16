import { Subject } from 'rxjs';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleOptions,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';

interface Obervables extends UnitModuleObservables {
  select$: Subject<boolean>;
}

type Options = UnitModuleOptions;
type State = UnitModuleState;
export default class SelectionUnitModule extends UnitModule<
  Options,
  State,
  Obervables
> {
  static override TYPE = 'selection';

  constructor(unit: Unit, options: Options, state: State, debug: boolean) {
    super(unit, options, state, debug);
    //#region observables
    this.observables.select$ = new Subject<boolean>();
    //#endregion
  }

  select() {
    this.observables.select$.next(true);
  }

  unselect() {
    if (!this.observables.select$.closed) {
      this.observables.select$.next(false);
    }
  }
}
