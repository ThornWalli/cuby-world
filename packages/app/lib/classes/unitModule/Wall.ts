import { Object3D, type Vector3 } from 'three';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import { concatMap, ReplaySubject } from 'rxjs';
import type Unit from '../Unit';

interface Obervables extends UnitModuleObservables {
  hasWall$: ReplaySubject<boolean>;
}

type Options = {
  offset: Vector3;
} & UnitModuleOptions;

type State = UnitModuleState;

export default class WallUnitModule extends UnitModule<
  Options,
  State,
  Obervables
> {
  static override TYPE = 'wall';

  wrapper!: Object3D;
  private hasWall = false;

  constructor(unit: Unit, options: Options, state: State, debug: boolean) {
    super(unit, options, state, debug);
    //#region observables
    this.observables.hasWall$ = new ReplaySubject<boolean>();
    this.observables.hasWall$.next(false);
    //#endregion
  }

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
        this.unit.getPosition(),
        this.unit.getRotation()
      );
    const obj = this.wrapper;
    if (obj) {
      if (wall) {
        obj.position.copy(this.options.offset);
      } else {
        obj.position.set(0, 0, 0);
      }
      this.hasWall = !!wall;
      this.observables.hasWall$.next(this.hasWall);
    }
  }
  getHasWall() {
    return this.hasWall;
  }
}
