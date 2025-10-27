import { ReplaySubject } from 'rxjs';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import type Unit from '../Unit';
import type App from '../App';

interface Observables extends AppModuleObservables {
  selectUnit$: ReplaySubject<Unit | null>;
}

interface State extends AppModuleState {
  selectedUnit: Unit | null;
}
export default class SelectionAppModule extends AppModule<State, Observables> {
  static override TYPE = 'selection';
  state: State = {
    selectedUnit: null
  };

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.selectUnit$ = new ReplaySubject<Unit | null>(1);
    //#endregion
  }

  override destroy(): void {
    super.destroy();
  }

  getSelectedUnit() {
    return this.state.selectedUnit;
  }
  setSelectedUnit(unit: Unit | null) {
    if (unit && !unit.modules.selection) {
      throw new Error('Unit does not have selection module');
    }

    const player = this.app.modules.player.getCurrentPlayer()!;
    const playerUnit = player!.unit!;

    if (!unit && playerUnit.id === this.state.selectedUnit?.id) {
      return;
    }

    if (this.state.selectedUnit) {
      this.state.selectedUnit.modules.selection?.unselect();
      this.app.renderer.unregisterOutlineObject(this.state.selectedUnit.root);
      this.state.selectedUnit = null;
    }

    if (unit) {
      unit.modules.selection?.select();
      this.state.selectedUnit = unit;

      const rotation =
        unit.id !== playerUnit.id &&
        playerUnit.getRotationByPosition(unit.getPosition());
      if (rotation) {
        playerUnit.setRotation(rotation);
      }
      this.app.renderer.registerOutlineObject(unit.root);
    } else {
      this.state.selectedUnit = null;
    }
    // this.app.renderer.addSelectedObject(selectedObjects);
    // unit?.modules.selection?.select();
    this.observables.selectUnit$.next(unit);
  }

  /**
   * Hebt die selektierung auf.
   */
  apply() {
    this.setSelectedUnit(null);
  }
  abort() {
    this.setSelectedUnit(null);
  }
  remove() {
    this.app.modules.room
      .getRoom()
      ?.modules.units.remove(this.state.selectedUnit!);
    this.setSelectedUnit(null);
  }
  move() {
    this.app.modules.placement.startPlace(this.state.selectedUnit!);
  }
  rotate() {
    this.state.selectedUnit?.rotateRight();
  }
}
