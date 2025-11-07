import { Subscription, Subject, fromEvent, concatMap } from 'rxjs';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState,
  type SceneSelectContext
} from '../AppModule';
import type Unit from '../Unit';
import { Vector3 } from 'three';
import type App from '../App';
import {
  matrixPositionToPosition,
  type PreparedPosition
} from '../../utils/matrix';
import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import { getYPositionByPosition } from '../../utils/room';
import { WALL_EXTENSION_TYPE } from '../WallExtension';
import { getRotationByPositionAndWall } from '../../utils/wall';
import { invertRotation } from '../../utils/rotation';
import BedUnitModule from '../unitModule/Bed';
import ChairUnitModule from '../unitModule/Chair';

interface Observables extends AppModuleObservables {
  abort$: Subject<Unit>;
  start$: Subject<{ unit: Unit }>;
  stop$: Subject<Vector3>;
  apply$: Subject<Unit>;
  move$: Subject<{ unit: Unit; position: Vector3 }>;

  unit$: Subject<Unit>;
}

interface State extends AppModuleState {
  disallowPlace: boolean;
  unit: Unit | null;
}
export default class PlacementAppModule extends AppModule<State, Observables> {
  setDisallowPlace(disallowPlace: boolean) {
    this.state.disallowPlace = disallowPlace;
  }
  static override TYPE = 'placement';
  state: State = {
    disallowPlace: false,
    unit: null
  };

  unitSubscription?: Subscription;

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.abort$ = new Subject<Unit>();
    this.observables.start$ = new Subject<{ unit: Unit }>();
    this.observables.stop$ = new Subject<Vector3>();
    this.observables.apply$ = new Subject<Unit>();
    this.observables.move$ = new Subject<{ unit: Unit; position: Vector3 }>();
    this.observables.unit$ = new Subject<Unit>();
    //#endregion
  }

  getPlaceUnit() {
    return this.state.unit;
  }

  abort() {
    if (!this.state.unit) {
      throw new Error('No unit is being placed');
    }
    const unit = this.state.unit;

    if (!unit.modules.placement) {
      throw new Error('Unit does not have placement module');
    }

    if (this.lastPosition) {
      unit.setPosition(this.lastPosition);
    }
    unit.modules.placement.abort();

    this.state.unit = null;
    this.observables.abort$.next(unit);
  }

  setUnit(unit: Unit) {
    this.state.unit = unit;
    this.observables.unit$.next(unit);
  }

  startPlace(unit: Unit) {
    if (!unit.modules.placement) {
      throw new Error('Unit does not have placement module');
    }

    this.setUnit(unit);
    unit.modules.placement.startPlace();

    this.startPlacement(unit);
    this.observables.start$.next({ unit });
  }

  private stopPlacement() {
    if (!this.state.unit) {
      throw new Error('No unit is being placed');
    }
    const unit = this.state.unit;
    if (!unit.modules.placement) {
      throw new Error('Unit does not have placement module');
    }
    this._placementSubscription?.unsubscribe();

    const position = this.state.unit.getPosition();
    this.state.unit = null;

    this.observables.stop$.next(position);
    unit.modules.placement.stopPlace();
  }

  private lastPosition: Vector3 | null = null;
  private _placementSubscription?: Subscription;
  private startPlacement(unit: Unit) {
    this.lastPosition = unit.getPosition().clone();
    const room = this.app.modules.room.getRoom();

    if (!room) {
      throw new Error('No room available for placement subscription');
    }

    const subscription = new Subscription();

    subscription.add(
      this.app.modules.room.observables.hover$
        .pipe(
          concatMap((preparedPositions: PreparedPosition[]) => {
            if (!unit.wallOnly) {
              preparedPositions = preparedPositions.filter(
                pos => !pos.object?.userData[OBJECT_NAME.WALL]
              );
            } else {
              preparedPositions = preparedPositions.filter(
                pos =>
                  room.modules.wall.getWallById(
                    pos.object!.userData[OBJECT_NAME.WALL]
                  )?.visible
              );
            }
            return this.onMove(preparedPositions);
          })
        )
        .subscribe(void 0)
    );

    subscription.add(
      this.app.modules.room.observables.select$
        .pipe(concatMap(this.onApply.bind(this)))
        .subscribe(void 0)
    );

    subscription.add(
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          concatMap(async event => {
            const keyboardEvent = event;
            if (keyboardEvent.key === 'Escape') {
              return this.abort();
            }
          })
        )
        .subscribe(void 0)
    );

    this._placementSubscription = subscription;
  }

  async onMove(preparedPositions: PreparedPosition[]) {
    const preparedPosition = preparedPositions[0];
    this.setUnitPosition(this.state.unit!, preparedPosition);
  }

  async onApply() {
    if (!this.state.disallowPlace && this.state.unit) {
      const unit = this.state.unit;
      this.stopPlacement();
      this.app.modules.selection.setSelectedUnit(null);
      this.observables.apply$.next(unit);
    }
  }

  // eslint-disable-next-line complexity
  setUnitPosition(unit: Unit, preparedPosition?: PreparedPosition) {
    if (!preparedPosition) return false;

    const room = this.app.modules.room.getRoom()!;
    const wallId = preparedPosition?.object?.userData[OBJECT_NAME.WALL];

    const worldPosition = preparedPosition.worldPosition!;
    const wall = room.modules.wall.getWallById(wallId);

    /**
     * Skip wall if it has door or window extension
     */
    if (
      wall?.hasExtension(WALL_EXTENSION_TYPE.DOOR) ||
      wall?.hasExtension(WALL_EXTENSION_TYPE.WINDOW)
    ) {
      return false;
    }

    const rotation = wall
      ? getRotationByPositionAndWall(worldPosition, wall)
      : null;
    unit.setPosition(worldPosition);

    const ignoredUnits = [unit];

    if (unit.getModule(BedUnitModule.TYPE)) {
      ignoredUnits.push(
        unit.getModule<BedUnitModule>(BedUnitModule.TYPE).getUsedUnit()!
      );
    }

    if (unit.getModule(ChairUnitModule.TYPE)) {
      ignoredUnits.push(
        unit.getModule<BedUnitModule>(ChairUnitModule.TYPE).getUsedUnit()!
      );
    }

    const position = preparedPosition.matrixPosition!;
    const resolvedPos = unit.wallOnly
      ? worldPosition
      : matrixPositionToPosition(
          new Vector3(
            position.x,
            getYPositionByPosition(room, position, ignoredUnits),
            position.z
          )
        );

    unit.setPosition(resolvedPos);
    this.observables.move$.next({
      unit,
      position: resolvedPos
    });

    if (rotation) {
      unit.setRotation(invertRotation(rotation));
    }
    return true;
  }
  override onSceneSelect(_context: SceneSelectContext): boolean {
    return !!this.state.unit;
  }
}
