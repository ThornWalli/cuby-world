import type { Vector3 } from 'three';
import RoomModule, {
  type RoomModuleObservables,
  type RoomModuleState
} from '../RoomModule';
import type Unit from '../Unit';
import UnitChunkManager from '../UnitChunkManager';
import {
  EMPTY,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  switchMap
} from 'rxjs';
import type { AnimationLoopValue } from '../Renderer';
import { FLOOR_HEIGHT } from '../../utils/ground';
import type Room from '../Room';
import {
  mergeDirectionalConditions,
  type ConditionDirectionsDescription
} from '../../utils/pathfindng';
import { getFloorRange } from '../../utils/floor';
import UnitPositionMap from '../UnitPositionMap';

interface Observables extends RoomModuleObservables {
  addUnit$: Subject<Unit>;
  removeUnit$: Subject<Unit>;
}

interface State extends RoomModuleState {
  visibleUnits: Unit[];
  units: Map<string, Unit>;
}

export default class UnitsModule extends RoomModule<State, Observables> {
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
    this.state.units.clear();
    this.state.visibleUnits = [];
  }

  override setup() {
    super.setup();
    this.subscription.add(
      this.room.modules.floor.observables.floor$.subscribe(floorIndex =>
        this.updateUnitVisiblity(floorIndex)
      )
    );
    this.subscription.add(
      merge(
        this.observables.addUnit$.pipe(map(() => null)),
        this.room.app.renderer.observables.controlsChange$,
        this.room.app.modules.player.observables.currentPlayer$.pipe(
          switchMap(player => player?.observables.unit$ || EMPTY),
          switchMap(({ unit }) => unit.observables.position$)
        )
      )
        .pipe(debounceTime(20))
        .subscribe(() => {
          this.state.visibleUnits = Array.from(
            this.chunkManager.updateVisibility(this.room.app.renderer.camera)
          );
        })
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
          this.updateUnitVisiblity(this.room.modules.floor.getFloor(), [unit]);
        })
    );
    this.state.units.set(unit.id, unit);
    unit.root.position.set(
      unit.position.x,
      unit.position.y * FLOOR_HEIGHT,
      unit.position.z
    );

    this.room.addToRoot(unit.root);

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
    this.state.visibleUnits.forEach(unit => unit.update(v));
  }

  // override updateThrottle(time: number, { camera }: { camera: Camera }) {
  //   const units = this.chunkManager.updateVisibility(camera);
  //   this.state.visibleUnits = Array.from(units);
  // }

  private _updateVisiblity_lastFloorIndex: number | null = null;
  updateUnitVisiblity(floorIndex?: number, units?: Unit[]) {
    const force = !!units;
    units = units || Array.from(this.state.units.values());
    floorIndex = floorIndex ?? this.room.modules.floor.getFloor();

    if (force || this._updateVisiblity_lastFloorIndex !== floorIndex) {
      const floors = getFloorRange(floorIndex);
      units.forEach(unit =>
        unit.setVisible(floors.includes(Math.floor(unit.position.y)))
      );
    }
    this._updateVisiblity_lastFloorIndex = floorIndex;
  }
  //#endregion

  getConditionalDirections(): ConditionDirectionsDescription[] {
    return mergeDirectionalConditions(
      this.getUnits()
        .map(unit => unit.getConditionDirections())
        .flat()
    );
  }
}
