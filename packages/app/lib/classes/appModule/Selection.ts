import { ReplaySubject } from 'rxjs';
import AppModule, { type AppModuleState } from '../AppModule';
import type Unit from '../Unit';
import type { Object3D } from 'three';

interface State extends AppModuleState {
  selectedUnit: Unit | null;
}
export default class SelectionAppModule extends AppModule<State> {
  static override TYPE = 'selection';
  state: State = {
    selectedUnit: null
  };

  observables = {
    selectUnit$: new ReplaySubject<Unit | null>(1)
  };

  override destroy(): void {
    super.destroy();
    Object.values(this.observables).forEach(obs => obs.unsubscribe());
  }

  getSelectedUnit() {
    return this.state.selectedUnit;
  }

  // eslint-disable-next-line complexity
  setSelectedUnit(unit: Unit | null) {
    if (unit && !unit.modules.selection) {
      throw new Error('Unit does not have selection module');
    }

    const player = this.app.modules.player.getCurrentPlayer()!;
    const playerUnit = player!.unit!;
    const selectedObjects = [];

    if (!unit && playerUnit.id === this.state.selectedUnit?.id) {
      return;
    }
    this.state.selectedUnit?.modules.selection?.unselect();
    if (unit) {
      unit.modules.selection?.select();
      this.state.selectedUnit = unit;
      selectedObjects.push(unit.mesh);

      const rotation =
        unit.id !== playerUnit.id &&
        playerUnit.getRotationByPosition(unit.getPosition());
      if (rotation) {
        playerUnit.setRotation(rotation);
      }
    } else {
      this.state.selectedUnit = null;
    }
    this.app.renderer.setSelectedObjects(selectedObjects);
    unit?.modules.selection?.select();
    this.observables.selectUnit$.next(unit);
  }

  setSelectedObjects(objects: Object3D[]) {
    this.app.renderer.setSelectedObjects(objects);
  }
}
