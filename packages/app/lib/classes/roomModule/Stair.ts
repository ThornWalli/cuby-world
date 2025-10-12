import type { Mesh, Vector2 } from 'three';
import { Object3D } from 'three';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import Stair from '../Stair';
import type { StairDescription } from '../Stair';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends RoomModuleObservables {}

interface State extends RoomModuleState {
  stairs: Stair[];
}

export default class StairModule extends RoomModule<State, Observables> {
  static override TYPE = 'stair';

  state: State = {
    stairs: []
  };

  root?: Object3D = new Object3D();
  meshes: Mesh[] = [];

  override setup(): void {
    super.setup();

    const description = this.room.description;

    this.addStairs(description.stairs);
  }

  addStairs(stairs: StairDescription[]) {
    this.state.stairs = stairs.map(desc => new Stair(desc));
  }

  //#region getters/setters

  getStairs() {
    return this.state.stairs;
  }

  //#endregion

  //#region methods

  isStairAt(position: Vector2) {
    return this.state.stairs.some(stair => {
      return stair.position.x === position.x && stair.position.z === position.y;
    });
  }

  //#endregion
}
