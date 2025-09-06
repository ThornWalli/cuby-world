import { Subject } from 'rxjs';
import UnitModule, { type UnitModuleState } from '../UnitModule';

type State = UnitModuleState;
export default class SelectionUnitModule extends UnitModule {
  static override TYPE = 'selection';

  state: State = {};

  select$ = new Subject<boolean>();

  select() {
    this.select$.next(true);
  }

  unselect() {
    this.select$.next(false);
  }
}
