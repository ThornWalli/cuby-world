import type { Mesh, Vector3 } from 'three';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import type Stair from '../Stair';
import type { StairDescription } from '../Stair';
import { resolveStairs } from '../../utils/stair';
import type { AnimationLoopSubject } from '../Renderer';

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

  meshes: Mesh[] = [];

  override setup(): void {
    super.setup();

    const description = this.room.description;

    this.addStairs(description.stairs, {
      animationLoop$: this.room.app.renderer.observables.animationLoop$
    });
  }

  async addStairs(
    stairs: StairDescription[],
    {
      animationLoop$
    }: {
      animationLoop$: AnimationLoopSubject;
    }
  ) {
    const resolvedStairs = [];

    for (const [StairClass, description] of await resolveStairs(stairs)) {
      const stair = new StairClass(description);

      await stair.setup({
        animationLoop$
      });

      resolvedStairs.push(stair);

      this.room.mesh.add(stair.root!);
    }
    console.log('resolvedStairs', resolvedStairs);

    this.state.stairs = resolvedStairs;
  }

  //#region getters/setters

  getStairs() {
    return this.state.stairs;
  }

  //#endregion

  //#region methods

  isStairAt(position: Vector3) {
    return this.state.stairs.some(stair => {
      const size = stair.getSizeByRotation();
      for (let x = 0; x < size.x; x++) {
        for (let y = 0; y < size.y; y++) {
          if (
            stair.position.x + x === position.x &&
            stair.position.y === position.y &&
            stair.position.z + y === position.z
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }

  getStairsByPositions(startPosition: Vector3, endPosition: Vector3) {
    const isDown = endPosition.y - startPosition.y < 0;
    return this.state.stairs.filter(stair => {
      if (isDown) {
        // Eins aufrechnen, weil Treppe unten anfängt
        return stair.position.y + 1 === startPosition.y;
      } else {
        return stair.position.y === startPosition.y;
      }
    });
  }

  //#endregion
}
