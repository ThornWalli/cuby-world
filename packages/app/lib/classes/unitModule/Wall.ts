import { Object3D, type Vector3 } from 'three';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import { concatMap } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Obervables extends UnitModuleObservables {}

type State = {
  offset: Vector3;
} & UnitModuleState;
export default class WallUnitModule extends UnitModule<State, Obervables> {
  static override TYPE = 'wall';

  wrapper!: Object3D;

  override async setup(context: UnitModuleSetupContext): Promise<Object3D> {
    this.wrapper = new Object3D();
    const wrapper = this.wrapper;

    this.subscription.add(
      this.unit.observables.ready$
        .pipe(concatMap(async () => this.refresh()))
        .subscribe(void 0)
    );

    this.subscription.add(
      this.unit.observables.position$
        .pipe(concatMap(async () => this.refresh()))
        .subscribe(void 0)
    );

    wrapper.add(context.mesh);

    return wrapper;
  }

  refresh() {
    const wall =
      this.unit.modules.room?.currentRoom?.modules.wall.getBackSideWallByPositionAndRotation(
        this.unit.position,
        this.unit.rotation
      );
    const obj = this.wrapper;
    if (obj) {
      if (wall) {
        obj.position.copy(this.state.offset);
      } else {
        obj.position.set(0, 0, 0);
      }
    }
  }
}
