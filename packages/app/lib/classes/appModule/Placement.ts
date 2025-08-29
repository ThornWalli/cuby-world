import type { Subscription } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import AppModule, { type AppModuleState } from '../AppModule';
import type Unit from '../Unit';
import type { Vector3 } from 'three';

interface State extends AppModuleState {
  placedUnit: Unit | null;
}
export default class PlacementAppModule extends AppModule<State> {
  static override TYPE = 'placement';
  state: State = {
    placedUnit: null
  };

  unitSubscription?: Subscription;

  abortPlace$ = new ReplaySubject<Unit>(1);
  startPlace$ = new ReplaySubject<Unit>(1);
  stopPlace$ = new ReplaySubject<Vector3>(1);

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
    this.abortPlace$.next(unit);
    unit.modules.placement.abortPlace();
  }

  startPlace(unit: Unit) {
    if (!unit.modules.placement) {
      throw new Error('Unit does not have placement module');
    }

    this.state.placedUnit = unit;
    this.startPlace$.next(unit);
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
    this.stopPlace$.next(position);
    unit.modules.placement.stopPlace();
  }
}
