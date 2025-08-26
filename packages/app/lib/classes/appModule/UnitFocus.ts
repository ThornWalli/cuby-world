import { ReplaySubject } from 'rxjs';
import AppModule, { type AppModuleState } from '../AppModule';
import type Unit from '../Unit';

interface State extends AppModuleState {
  focusedUnit?: Unit;
}
export default class UnitFocusAppModule extends AppModule<State> {
  static override TYPE = 'unitFocus';

  state: State = {};

  focusedUnit$ = new ReplaySubject<Unit | undefined>(1);

  get focusedUnit() {
    return this.state.focusedUnit;
  }

  setPlayerAsFocusedUnit() {
    const player = this.app.modules.player.getPlayer();
    if (!player?.unit) {
      throw new Error('No player unit to focus on');
    }
    this.setFocusedUnit(player.unit);
  }

  setFocusedUnit(unit?: Unit) {
    const lastFocusedUnit = this.state.focusedUnit;
    this.state.focusedUnit = unit;
    const controls = this.app.renderer.controls;
    if (!unit) {
      controls.enabled = true;
      if (lastFocusedUnit) {
        controls.object.position.copy(this.app.renderer.camera.position);
        controls.target.copy(lastFocusedUnit.root.position);
        controls.update();
      }
    } else {
      controls.enabled = false;
      controls.update();
    }
    this.focusedUnit$.next(unit);
  }

  unfocusUnit() {
    this.setFocusedUnit(undefined);
  }
}
