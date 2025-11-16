import type { Vector3, Camera } from 'three';
import RoomModule, {
  type RoomModuleObservables,
  type RoomModuleState
} from '../RoomModule';
import type Unit from '../Unit';
import UnitChunkManager from '../UnitChunkManager';
import { Subject, concatMap, distinctUntilChanged, map } from 'rxjs';
import { ArrayKeyMap } from '../ArrayKeyMap';
import type { AnimationLoopValue } from '../Renderer';
import { FLOOR_HEIGHT } from '../../utils/ground';
import type Room from '../Room';
import type { ConditionDirectionsDescription } from '../../utils/pathfindng';

interface Observables extends RoomModuleObservables {
  addUnit$: Subject<Unit>;
  removeUnit$: Subject<Unit>;
}

interface State extends RoomModuleState {
  visibleUnits: Unit[];
  units: Map<string, Unit>;
}

export default class UnitsModule extends RoomModule<State, Observables> {
  getConditionalDirections(): ConditionDirectionsDescription[] {
    return this.getUnits()
      .map(unit => unit.getConditionDirections())
      .flat();
  }

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

  constructor(room: Room, debug: boolean) {
    super(room, debug);
    //#region observables
    this.observables.addUnit$ = new Subject<Unit>();
    this.observables.removeUnit$ = new Subject<Unit>();
    //#endregion
  }

  override destroy(): void {
    super.destroy();
    this.state.units.forEach(unit => unit.destroy());
  }

  override setup() {
    super.setup();
    this.subscription.add(
      this.room.modules.floor.observables.floor$
        .pipe(
          concatMap(async floorIndex => {
            this.updateVisiblity(floorIndex);
          })
        )
        .subscribe(void 0)
    );
  }

  //#region methods

  getUnits() {
    return Array.from(this.state.units.values());
  }

  getUnitById(id: string) {
    return this.state.units.get(id);
  }

  /**
   * TODO: Ggf. muss hier noch eine Map aus performancegründen her
   */
  getUnitsByFloor(floor: number) {
    return this.getUnits().filter(
      unit => Math.floor(unit.position.y) === floor
    );
  }

  getUnitsByPosition(position: Vector3) {
    function getFloorFromPosition(pos: Vector3) {
      return Math.floor(pos.y);
    }
    const floor = getFloorFromPosition(position);

    const withoutFloor = position.clone().setY(0);
    return this.getUnitsByFloor(floor).filter(unit =>
      unit.isIntersectByPosition(withoutFloor)
    );
  }

  async setupUnits(units: Unit[]) {
    await Promise.all(units.map(unit => this.add(unit)));
  }

  async add(unit: Unit) {
    await unit.setup({
      unit,
      assetLoader: this.room.app.assetLoader,
      room: this.room
    });

    unit.subscription.add(
      unit.observables.position$
        .pipe(
          map(pos => pos.clone().floor()),
          distinctUntilChanged((prev, next) => prev.equals(next))
        )
        .subscribe(() => {
          this.untiPositionMap.add(unit);
          this.chunkManager.assignToChunk(unit);
          this.updateVisiblity(this.room.modules.floor.getFloor(), [unit]);
        })
    );
    this.state.units.set(unit.id, unit);
    this.chunkManager.assignToChunk(unit);
    unit.root.position.set(
      unit.position.x,
      unit.position.y * FLOOR_HEIGHT,
      unit.position.z
    );
    this.untiPositionMap.add(unit);
    this.room.addToRoot(unit.root);
    this.updateVisiblity(this.room.modules.floor.getFloor(), [unit]);
    this.observables.addUnit$.next(unit);
  }

  remove(unit: Unit) {
    this.room.app.renderer.modules.intersection?.globalListener.removeMeshes(
      unit.getRaycasterMeshes()
    );
    this.state.units.delete(unit.id);
    this.chunkManager.removeFromChunk(unit);
    this.room.root.remove(unit.root);
    this.untiPositionMap.remove(unit);
  }

  getById<U extends Unit = Unit>(id: string): U | undefined {
    return this.state.units.get(id) as U | undefined;
  }

  isPositionFree(position: Vector3, ignoredUnits?: Unit[]) {
    return (
      this.untiPositionMap.getByPosition(position).filter(unit => {
        return (
          !unit.accessible && (!ignoredUnits || !ignoredUnits.includes(unit))
        );
      }).length === 0
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

  updateVisiblity(
    floorIndex?: number,
    units: Unit[] = Array.from(this.state.units.values())
  ) {
    units.forEach(unit => unit.setVisible(false));
    floorIndex = floorIndex ?? this.room.modules.floor.getFloor();
    for (let f = 0; f <= floorIndex; f++) {
      this.getUnitsByFloor(f).forEach(unit => unit.setVisible(true));
    }
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
