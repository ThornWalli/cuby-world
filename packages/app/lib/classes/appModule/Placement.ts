import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import type Unit from '../Unit';
import type { Vector3 } from 'three';
import type App from '../App';

interface Observables extends AppModuleObservables {
  abortPlace$: Subject<Unit>;
  startPlace$: Subject<Unit>;
  stopPlace$: Subject<Vector3>;
}

interface State extends AppModuleState {
  placedUnit: Unit | null;
}
export default class PlacementAppModule extends AppModule<State, Observables> {
  static override TYPE = 'placement';
  state: State = {
    placedUnit: null
  };

  unitSubscription?: Subscription;

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.abortPlace$ = new Subject<Unit>();
    this.observables.startPlace$ = new Subject<Unit>();
    this.observables.stopPlace$ = new Subject<Vector3>();
    //#endregion
  }

  getPlaceUnit() {
    return this.state.placedUnit;
  }

  hasPlace() {
    return !!this.state.placedUnit;
  }

  abortPlace() {
    if (!this.state.placedUnit) {
      throw new Error('No unit is being placed');
    }
    const unit = this.state.placedUnit;

    if (!unit.modules.placement) {
      throw new Error('Unit does not have placement module');
    }

    this.state.placedUnit = null;
    this.observables.abortPlace$.next(unit);
    unit.modules.placement.abortPlace();
  }

  startPlace(unit: Unit) {
    if (!unit.modules.placement) {
      throw new Error('Unit does not have placement module');
    }

    this.state.placedUnit = unit;
    this.observables.startPlace$.next(unit);
    unit.modules.placement.startPlace();
  }

  stopPlace() {
    if (!this.state.placedUnit) {
      throw new Error('No unit is being placed');
    }
    const unit = this.state.placedUnit;
    if (!unit.modules.placement) {
      throw new Error('Unit does not have placement module');
    }
    const position = this.state.placedUnit.getPosition();
    this.state.placedUnit = null;
    this.observables.stopPlace$.next(position);
    unit.modules.placement.stopPlace();
  }
}
