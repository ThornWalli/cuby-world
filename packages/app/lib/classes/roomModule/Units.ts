import {
  type Frustum,
  type Matrix4,
  type Vector3,
  Box3,
  type Camera
} from 'three';
import RoomModule, { type RoomModuleState } from '../RoomModule';
import type Unit from '../Unit';
import UnitChunkManager from '../UnitChunkManager';
import { distinctUntilChanged, map } from 'rxjs';
import { ArrayKeyMap } from '../ArrayKeyMap';
import type { AnimationLoopValue } from '../Renderer';

interface State extends RoomModuleState {
  visibleUnits: Unit[];
  units: Map<string, Unit>;
}

export default class UnitsModule extends RoomModule<State> {
  static override TYPE = 'units';

  /**
   * Gibt eine Liste an Units zurück die auf der Position liegen.
   */
  untiPositionMap: UnitPositionMap = new UnitPositionMap();
  chunkManager: UnitChunkManager = new UnitChunkManager();

  state: State = {
    visibleUnits: [],
    units: new Map<string, Unit>()
  };

  //#region methods

  getUnits() {
    return Array.from(this.state.units.values());
  }

  async setupUnits(units: Unit[]) {
    await Promise.all(
      units.map(unit => {
        this.add(unit);
      })
    );
  }

  async add(unit: Unit) {
    await unit.setup({
      unit,
      assetLoader: this.room.app.assetLoader,
      room: this.room
    });

    unit.subscription.add(
      unit.position$
        .pipe(
          map(pos => pos.clone().floor()),
          distinctUntilChanged((prev, next) => prev.equals(next))
        )
        .subscribe(() => {
          this.untiPositionMap.add(unit);
          this.chunkManager.assignToChunk(unit);
        })
    );
    this.state.units.set(unit.id, unit);
    this.chunkManager.assignToChunk(unit);
    this.room.mesh.add(unit.root);
  }

  remove(unit: Unit) {
    this.state.units.delete(unit.id);
    this.chunkManager.removeFromChunk(unit);
    this.room.mesh.remove(unit.root);
  }

  getById(id: string): Unit | undefined {
    return this.state.units.get(id);
  }

  isPositionFree(position: Vector3, ignoredUnits?: Unit[]) {
    return (
      this.untiPositionMap
        .getByPosition(position)
        .filter(
          unit =>
            !unit.accessible && (!ignoredUnits || !ignoredUnits.includes(unit))
        ).length === 0
    );
  }

  override update(v: AnimationLoopValue) {
    this.state.visibleUnits.forEach(unit => {
      unit.update(v);
    });
  }

  override updateThrottle(time: number, { camera }: { camera: Camera }) {
    const units = this.chunkManager.updateVisibility(camera);
    this.state.visibleUnits = Array.from(units);
  }

  updateUnitsVisibility(frustum: Frustum, projScreenMatrix: Matrix4) {
    frustum.setFromProjectionMatrix(projScreenMatrix);
    return this.state.units.values().reduce((result, unit) => {
      const box = new Box3().setFromObject(unit.root);
      unit.root.visible = frustum.intersectsBox(box);
      result.push(unit);
      return result;
    }, [] as Unit[]);
  }

  //#endregion
}

class UnitPositionMap {
  data = new ArrayKeyMap<[number, number, number], Unit[]>();
  listsByUnits = new Map<string, Unit[][]>();

  getKey(position: Vector3) {
    return position.clone().floor().toArray().toString();
  }

  getByPosition(position: Vector3) {
    return this.data.get(position.toArray()) || [];
  }

  remove(unit: Unit) {
    if (this.listsByUnits.has(unit.id)) {
      const lists = this.listsByUnits.get(unit.id)!;
      lists.forEach(list => {
        const index = list.indexOf(unit);
        if (index !== -1) {
          list.splice(index, 1);
        }
      });
    }
  }

  add(unit: Unit) {
    // Entferne die Unit aus allen vorherigen Positionen
    this.remove(unit);

    unit.getMatrixPositions().forEach(pos => {
      const list = this.data.get(pos.toArray()) || [];
      list.push(unit);
      if (!this.listsByUnits.has(unit.id)) {
        this.listsByUnits.set(unit.id, []);
      }
      this.listsByUnits.get(unit.id)?.push(list);

      this.data.set(pos.toArray(), list);
    });
  }
}
