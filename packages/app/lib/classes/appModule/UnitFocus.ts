import {
  concatMap,
  distinctUntilChanged,
  EMPTY,
  map,
  ReplaySubject,
  switchMap
} from 'rxjs';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import type Unit from '../Unit';
import type App from '../App';

interface Observables extends AppModuleObservables {
  focusedUnit$: ReplaySubject<Unit | undefined>;
}

interface State extends AppModuleState {
  focusedUnit?: Unit;
}
export default class UnitFocusAppModule extends AppModule<State, Observables> {
  static override TYPE = 'unitFocus';

  state: State = {};

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.focusedUnit$ = new ReplaySubject<Unit | undefined>(1);
    //#endregion
  }

  override setup(): void {
    super.setup();
    this.subscription.add(
      this.observables.focusedUnit$
        .pipe(
          switchMap(
            unit =>
              unit?.observables.position$.pipe(
                map(position => ({ unit, floor: Math.ceil(position.y) }))
              ) || EMPTY
          ),
          distinctUntilChanged((prev, curr) => prev.floor === curr.floor),
          concatMap(async ({ unit, floor }) => {
            unit.modules.room?.currentRoom?.modules.floor.setFloor(floor);
          })
        )
        .subscribe(void 0)
    );
  }

  get focusedUnit() {
    return this.state.focusedUnit;
  }

  setPlayerAsFocusedUnit() {
    const player = this.app.modules.player.getCurrentPlayer();
    if (!player?.unit) {
      throw new Error('No player unit to focus on');
    }
    this.setFocusedUnit(player.unit);
  }

  focusUnit(unit: Unit = this.state.focusedUnit!) {
    if (unit) {
      const controls = this.app.renderer.controls;
      controls.target.copy(unit.root.position);
      controls.object.position.copy(this.app.renderer.camera.position);
      controls.update();
    }
  }

  setFocusedUnit(unit?: Unit) {
    const lastFocusedUnit = this.state.focusedUnit;
    this.state.focusedUnit = unit;
    const controls = this.app.renderer.controls;
    if (!unit) {
      this.app.renderer.enableControls();
      if (lastFocusedUnit) {
        this.focusUnit(lastFocusedUnit);
      }
    } else {
      this.app.renderer.disableControls();
      controls.update();
    }
    this.observables.focusedUnit$.next(unit);
  }

  unfocusUnit() {
    this.setFocusedUnit(undefined);
  }
}
