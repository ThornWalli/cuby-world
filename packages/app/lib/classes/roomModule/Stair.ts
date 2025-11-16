import type { Mesh, Vector3 } from 'three';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import type Stair from '../Stair';
import { resolveStairs } from '../../utils/stair';
import type { AnimationLoopSubject } from '../Renderer';
import type { StairDescription } from '../../types/stair';
import { Subject } from 'rxjs';
import type Room from '../Room';

interface Observables extends RoomModuleObservables {
  refresh$: Subject<Stair[]>;
}

interface State extends RoomModuleState {
  stairs: Stair[];
}

export default class StairModule extends RoomModule<State, Observables> {
  static override TYPE = 'stair';

  state: State = {
    stairs: []
  };

  meshes: Mesh[] = [];

  constructor(room: Room, debug: boolean = false) {
    super(room, debug);
    //#region observables
    this.observables.refresh$ = new Subject<Stair[]>();
    //#endregion
  }

  override setup() {
    super.setup();

    const description = this.room.description;

    this.addStairs(description.stairs);

    this.subscription.add(
      this.room.modules.floor.observables.floor$.subscribe(floorIndex => {
        this.updateVisiblity(floorIndex);
      })
    );
  }
  updateVisiblity(floorIndex?: number) {
    this.state.stairs.forEach(stair => stair.setVisible(false));
    floorIndex = floorIndex ?? this.room.modules.floor.getFloor();
    for (let f = 0; f <= floorIndex; f++) {
      this.state.stairs
        .filter(stair => stair.position.y === f)
        .forEach(stair => stair.setVisible(true));
    }
  }

  removeStairs(stairs: Stair[]) {
    this.state.stairs = this.state.stairs.filter(
      stair => !stairs.includes(stair)
    );

    stairs.forEach(stair => {
      this.room.app.renderer.modules.intersection?.globalListener.removeMeshes(
        stair.getRaycasterMeshes()
      );
      stair.destroy();
    });
    this.observables.refresh$.next(this.state.stairs);
  }

  async addStairs(
    stairs: StairDescription[],
    animationLoop$: AnimationLoopSubject = this.room.app.renderer.observables
      .animationLoop$
  ) {
    const resolvedStairs = [];

    for (const [StairClass, description] of await resolveStairs(stairs)) {
      const stair = new StairClass(description);

      await stair.setup({
        room: this.room,
        animationLoop$
      });

      resolvedStairs.push(stair);
      this.room.app.renderer.modules.intersection?.globalListener.addMeshes(
        stair.getRaycasterMeshes()
      );
      this.room.addToRoot(stair.root!);
    }

    this.state.stairs = [...this.state.stairs, ...resolvedStairs];
    this.updateVisiblity();
    this.observables.refresh$.next(this.state.stairs);
    return resolvedStairs;
  }

  //#region getters/setters

  getStairs() {
    return this.state.stairs;
  }

  //#endregion

  //#region methods

  updateStairs(stairs: Stair[]) {
    this.observables.refresh$.next(stairs);
  }

  isStairAt(position: Vector3) {
    return this.state.stairs.some(stair => {
      const positions = stair.getMatrixPositions();
      return positions.find(pos => {
        return pos.equals(position);
      });
    });
  }

  getStairById(id: string) {
    return this.state.stairs.find(stair => stair.id === id);
  }

  getStairsByPositions(startPosition: Vector3, endPosition?: Vector3) {
    if (endPosition) {
      const isDown = endPosition.y - startPosition.y < 0;
      return this.state.stairs.filter(stair => {
        if (isDown) {
          // Eins aufrechnen, weil Treppe unten anfängt
          return stair.position.y + 1 === startPosition.y;
        } else {
          return stair.position.y === startPosition.y;
        }
      });
    } else {
      return this.state.stairs.filter(
        stair =>
          stair.position.y === startPosition.y ||
          stair.position.y + 1 === startPosition.y
      );
    }
  }

  //#endregion
}
