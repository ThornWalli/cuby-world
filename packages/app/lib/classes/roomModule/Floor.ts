import { ReplaySubject } from 'rxjs';
import type { FloorIndex } from '../../types/floor';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import type Room from '../Room';
import { FLOOR_HEIGHT } from '../../utils/ground';

interface Observables extends RoomModuleObservables {
  floor$: ReplaySubject<FloorIndex>;
}

interface State extends RoomModuleState {
  floor: FloorIndex;
  maxFloor: FloorIndex;
}

export default class FloorModule extends RoomModule<State, Observables> {
  static override TYPE = 'floor';

  state: State = {
    floor: 0,
    maxFloor: 0
  };

  constructor(room: Room, debug: boolean = false) {
    super(room, debug);
    this.observables.floor$ = new ReplaySubject<FloorIndex>(0);
    this.observables.floor$.next(this.state.floor);
  }

  override setup(): void {
    super.setup();

    this.subscription.add(
      this.room.modules.ground.observables.refreshGround$.subscribe(
        groundStyleMap => {
          this.state.maxFloor = groundStyleMap
            .getPositions()
            .reduce((max, position) => Math.max(max, position.y), 0);
        }
      )
    );
  }

  //#region getters/setters

  getFloorHeight() {
    return this.state.floor * FLOOR_HEIGHT;
  }

  getFloor() {
    return this.state.floor;
  }

  getMinFloor() {
    return 0;
  }

  getMaxFloor() {
    return this.state.maxFloor + 1;
  }

  setFloor(floor: FloorIndex) {
    const minFloor = this.getMinFloor();
    const maxFloor = this.getMaxFloor();
    if (floor < minFloor) floor = minFloor;
    if (floor > maxFloor) floor = maxFloor;

    if (this.state.floor !== floor) {
      this.state.floor = floor;
      this.observables.floor$.next(floor);
    }
  }

  setFloorUp() {
    this.setFloor(this.state.floor + 1);
  }

  setFloorDown() {
    this.setFloor(this.state.floor - 1);
  }

  //#endregion
}
