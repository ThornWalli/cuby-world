import { Vector3, type Object3D } from 'three';
import type {
  AppModuleControllerObservables,
  AppModuleControllerState
} from '../../../AppModuleController';
import AppModuleController from '../../../AppModuleController';
import { ROTATION } from '@cuby-world/app/lib/types';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  ReplaySubject,
  Subject,
  Subscription,
  switchMap
} from 'rxjs';
import type Stair from '../../../Stair';
import type App from '../../../App';
import type { ArrayKeyMap } from '../../../ArrayKeyMap';
import {
  prepareWalls,
  type DirectionWallDescription,
  type DirectionWallDescriptionKey
} from '@cuby-world/app/lib/utils/wall';
import type { PreparedPosition } from '@cuby-world/app/lib/utils/matrix';
import { OBJECT_NAME } from '../../../../utils/object';
import { FLOOR_HEIGHT } from '@cuby-world/app/lib/utils/ground';
import { OUTLINE_TYPE, type AnimationLoopValue } from '../../../Renderer';
import { resolveStair } from '@cuby-world/app/lib/utils/stair';
import { canWalkBetweenPositions } from '@cuby-world/app/lib/utils/pathfindng';
import type { StairItem } from '@cuby-world/app/lib/types/stair/catalog';
import type { StairIdentifier } from '@cuby-world/app/lib/types/stair';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';

export interface Observables extends AppModuleControllerObservables {
  currentStair$: ReplaySubject<Stair | undefined>;
  apply$: Subject<Stair>;
  rotate$: Subject<Stair>;
  move$: Subject<{
    stair: Stair;
    position: Vector3;
  }>;
  moveStart$: Subject<void>;
  moveEnd$: Subject<void>;
  abort$: Subject<void>;
  remove$: Subject<void>;

  //
  tmpPosition$: ReplaySubject<Vector3 | undefined>;
}

interface TempState {
  position?: Vector3;
  rotation?: ROTATION;
  object?: Object3D | null;
}

export interface State extends AppModuleControllerState {
  item: StairIdentifier | null;
  skin: StairSkinIdentifier | null;
  rotation: ROTATION;
  currentStair?: Stair;
  temp: TempState;
  placeable: boolean;
  moving: boolean;
}

export default class PlannerController<
  S extends State = State,
  O extends Observables = Observables
> extends AppModuleController<S, O> {
  override state: S = {
    item: null,
    skin: null,
    rotation: ROTATION.EAST,
    temp: {},
    placeable: true,
    moving: false
  } as S;

  preparedWalls?: ArrayKeyMap<
    DirectionWallDescriptionKey,
    DirectionWallDescription
  > = undefined;

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.currentStair$ = new ReplaySubject<Stair | undefined>(1);
    this.observables.tmpPosition$ = new ReplaySubject<Vector3 | undefined>(1);
    this.observables.apply$ = new Subject<Stair>();
    this.observables.rotate$ = new Subject<Stair>();
    this.observables.move$ = new Subject<{
      stair: Stair;
      position: Vector3;
    }>();
    this.observables.moveStart$ = new Subject<void>();
    this.observables.moveEnd$ = new Subject<void>();
    this.observables.abort$ = new Subject<void>();
    this.observables.remove$ = new Subject<void>();
    //#endregion
  }

  override setup() {
    super.setup();

    this.subscription.add(
      this.app.modules.room.observables.room$
        .pipe(
          filter(Boolean),
          switchMap(room => room.modules.floor.observables.floor$),
          concatMap(async floorIndex => {
            this.preparedWalls = prepareWalls(
              this.app.modules.room
                .getRoom()!
                .modules.wall.getWallsByFloor([floorIndex])
            );
          })
        )
        .subscribe(void 0)
    );
    this.subscription.add(
      this.app.modules.room.observables.select$
        .pipe(concatMap(this.onSelect.bind(this)))
        .subscribe(void 0)
    );
  }

  //#region events

  // eslint-disable-next-line complexity
  private async onSelect({
    preparedPositions
  }: {
    preparedPositions: PreparedPosition[];
  }) {
    console.log('onSelect');
    const obj = this.getObject();
    if (this.state.moving && obj && this.state.placeable) {
      const groundIntersect = preparedPositions.find(pos => {
        return pos.object?.name === OBJECT_NAME.GROUND;
      });
      if (groundIntersect) {
        const position = groundIntersect!.matrixPosition!;
        // Vllt. direkt über die instance setzen? Oder wegen apply?
        obj.position.set(position.x, position.y * FLOOR_HEIGHT, position.z);
        this.setTmpPosition(position.clone());
        this.state.moving = false;
        this.observables.moveEnd$.next();
      }
      return;
    }

    const stairId = preparedPositions.find(pos => {
      return pos.object?.userData[OBJECT_NAME.STAIR];
    })?.object?.userData[OBJECT_NAME.STAIR];
    if (stairId && this.state.currentStair?.id !== stairId) {
      const stair = this.app.modules.room
        .getRoom()
        ?.modules.stair.getStairById(stairId);
      if (!stair) {
        throw new Error('Stair not found');
      }
      this.setCurrentStair(stair);
    } else if (!stairId) {
      this.setCurrentStair(undefined);
    }
  }

  private async onHover(position: Vector3) {
    const stair = this.state.currentStair;
    if (this.state.moving && stair) {
      stair.setPosition(new Vector3(position.x, position.y, position.z));

      if (stair && this.checkPlaceable(stair, stair.rotation)) {
        this.state.placeable = true;
        this.app.renderer.registerOutlineObject(
          stair.root,
          OUTLINE_TYPE.DEFAULT
        );
      } else {
        this.state.placeable = false;
        this.app.renderer.registerOutlineObject(stair.root, OUTLINE_TYPE.ERROR);
      }

      this.observables.move$.next({
        stair,
        position: position.clone()
      });
    }
  }

  //#endregion

  //#region methods

  public async apply() {
    if (!this.state.placeable) {
      return;
    }
    const room = this.app.modules.room.getRoom()!;
    let stair = this.state.currentStair;
    /**
     * Wenn keine Treppe selektiert ist, neue Treppe erstellen
     */
    if (!stair?.room) {
      if (!this.state.item) {
        throw new Error('No item selected');
      }
      if (!this.state.skin) {
        throw new Error('No skin selected');
      }
      stair = (
        await room.modules.stair.addStairs([
          {
            type: this.state.item,
            skin: this.state.skin,
            position: this.state.temp.position!,
            rotation: this.state.temp.rotation || ROTATION.EAST
          }
        ])
      )[0]!;
    } else {
      if (this.state.temp.position) {
        stair.position.copy(this.state.temp.position!.clone());
      }
      this.app.modules.room.getRoom()!.modules.stair.updateStairs([stair]);
    }
    this.reset();
    this.observables.apply$.next(stair);
  }

  public rotate() {
    const stair = this.state.currentStair!;
    if (stair && this.checkPlaceable(stair, stair.getRightRotation(0))) {
      stair.rotateRight(0);
    } else if (stair && this.checkPlaceable(stair, stair.getRightRotation(1))) {
      stair.rotateRight(1);
    }
    this.state.temp.rotation = stair.rotation;
    this.observables.rotate$.next(stair);
  }

  public move() {
    this.state.moving = true;
    this.observables.moveStart$.next();
  }

  public abort() {
    this.reset();
    this.observables.abort$.next();
  }
  public remove() {
    this.app.modules.room
      .getRoom()!
      .modules.stair.removeStairs([this.state.currentStair!]);
    this.reset();
    this.observables.remove$.next();
  }

  reset() {
    this.removeTmp();
    this.setCurrentStair(undefined);
    this.state.item = null;
  }

  private async createTmpObject(
    item: StairIdentifier,
    skin: StairSkinIdentifier,
    { rotation }: { rotation: ROTATION }
  ) {
    const room = this.app.modules.room.getRoom()!;

    if (this.state.temp.object) {
      this.state.temp.object.removeFromParent();
      this.state.temp.object.remove();
      this.state.temp.object = undefined;
    }

    const [Stair, description] = await resolveStair({
      type: item,
      skin: skin,
      position: new Vector3(0, 0, 0),
      rotation
    });
    const stair = new Stair(description);

    const animationLoop$ = new ReplaySubject<AnimationLoopValue>(1);
    animationLoop$.next({ time: 0, delta: 0 });
    await stair.setup({ animationLoop$ });
    room.addToRoot(stair.root);
    this.state.temp.object = stair.root;
    this.setCurrentStair(stair);

    this.move();
  }

  private removeTmp() {
    this.setTmpPosition(undefined);
    if (this.state.temp.object) {
      this.state.temp.object.removeFromParent();
      this.state.temp.object.remove();
      this.state.temp.object = null;
    }
  }

  private checkPlaceable(stair: Stair, rotation: ROTATION): boolean {
    if (this.preparedWalls && stair) {
      let lastPos: Vector3 | null = null;
      const positions = stair.getMatrixPositions(rotation);

      for (const p of positions) {
        if (
          lastPos &&
          canWalkBetweenPositions(lastPos, p, {
            preparedWalls: this.preparedWalls
          })
        ) {
          return false;
        }

        lastPos = p.clone();
      }
    }
    return true;
  }
  //#endregion

  interactionSubscription = new Subscription();
  private registerInteractionSubscriptions() {
    this.unregisterInteractionSubscriptions();
    const subscription = this.interactionSubscription;
    subscription.add(
      fromEvent<KeyboardEvent>(document, 'keydown').subscribe(event => {
        const keyboardEvent = event;
        if (keyboardEvent.key === 'Escape') {
          this.abort();
        }
      })
    );

    subscription.add(
      this.app.modules.room.observables.room$
        .pipe(
          filter(Boolean),
          switchMap(room => room!.modules.ground.observables.hover$),
          debounceTime(50),
          distinctUntilChanged((prev, curr) => prev.equals(curr)),
          concatMap(this.onHover.bind(this))
        )
        .subscribe(void 0)
    );
  }
  private unregisterInteractionSubscriptions() {
    this.interactionSubscription.unsubscribe();
    this.interactionSubscription = new Subscription();
  }

  //#region getter / setter

  private setCurrentStair(stair?: Stair) {
    if (this.state.currentStair) {
      this.app.renderer.unregisterAllOutlinesObject(
        this.state.currentStair.root
      );
    }
    if (stair) {
      if (stair === this.state.currentStair) {
        this.state.currentStair = undefined;
        return;
      }
      this.state.temp.position = stair.position.clone();
      this.state.temp.rotation = stair.rotation;
      this.app.renderer.registerOutlineObject(stair.root);
      this.registerInteractionSubscriptions();
    } else {
      this.unregisterInteractionSubscriptions();
      this.removeTmp();
    }
    this.observables.currentStair$.next(stair);
    this.state.currentStair = stair;
  }

  private setTmpPosition(position?: Vector3) {
    this.state.temp.position = position;
  }

  private getObject() {
    return this.state.currentStair?.root || this.state.temp.object;
  }

  getItem() {
    return this.state.item;
  }

  async setItem(item: StairItem | null) {
    this.state.item = item?.id ?? null;
    this.state.skin = item?.options.skin ?? null;
    if (item) {
      await this.createTmpObject(item.id, item.options.skin, {
        rotation: this.state.rotation
      });
      this.observables.moveStart$.next();
    } else {
      this.reset();
    }
  }

  async setSkin(skin: StairSkinIdentifier | null) {
    this.state.skin = skin;
    if (this.state.item && this.state.skin) {
      await this.createTmpObject(this.state.item, this.state.skin, {
        rotation: this.state.rotation
      });
    }
  }

  //#endregion
}
