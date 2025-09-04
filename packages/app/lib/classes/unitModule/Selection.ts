import { Subject } from 'rxjs';
import UnitModule from '../UnitModule';

export default class SelectionUnitModule extends UnitModule {
  static override TYPE = 'selection';

  select$ = new Subject<boolean>();

  select() {
    this.select$.next(true);
  }

  unselect() {
    this.select$.next(false);
  }
}
