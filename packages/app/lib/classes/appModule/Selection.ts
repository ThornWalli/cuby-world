import { ReplaySubject } from 'rxjs';
import AppModule, { type AppModuleState } from '../AppModule';
import type Unit from '../Unit';
import type { Object3D } from 'three';

interface State extends AppModuleState {
  selectedUnit?: Unit;
}
export default class SelectionAppModule extends AppModule<State> {
  static override TYPE = 'selection';
  state: State = {
    selectedUnit: undefined
  };

  selectUnit$ = new ReplaySubject<Unit | undefined>(1);

  getSelectedUnit() {
    return this.state.selectedUnit;
  }

  setSelectedUnit(unit: Unit | undefined) {
    const player = this.app.modules.player.getPlayer()!;
    const selectedObjects = [];

    if (!unit && player!.unit!.id === this.state.selectedUnit?.id) {
      return;
    }
    this.state.selectedUnit?.modules.selection?.unselect();
    if (unit) {
      unit.modules.selection?.select();
      this.state.selectedUnit = unit;
      selectedObjects.push(unit.mesh);
    } else {
      this.state.selectedUnit = undefined;
    }
    this.app.renderer.setSelectedObjects(selectedObjects);
    this.selectUnit$.next(unit);
  }

  setSelectedObjects(objects: Object3D[]) {
    this.app.renderer.setSelectedObjects(objects);
  }
}
