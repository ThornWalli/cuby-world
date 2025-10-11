/* eslint-disable complexity */
import type { GroundAction } from '@cuby-world/app/components/editor/panel/GroundActions.vue';
import type {
  AppModuleObservables,
  AppModuleState,
  SceneSelectContext
} from '../../AppModule';
import type { FACE_INDEX } from '@cuby-world/app/lib/types/wall';
import type Wall from '../../Wall';
import AppModule from '../../AppModule';
import { GROUND_ACTION } from '@cuby-world/app/lib/types/editor';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  Subscription,
  switchMap
} from 'rxjs';
import { Vector3 } from 'three';
import type { GrountStyleIdentifier } from '@cuby-world/app/lib/utils/ground/skins';
import type App from '../../App';
import type GroundStyleMap from '../../GroundStyleMap';

interface Observables extends AppModuleObservables {
  select$: unknown;
}

interface State extends AppModuleState {
  action: GroundAction;
  skinId: GrountStyleIdentifier;
  selection?: {
    faceIndex: FACE_INDEX;
    wall: Wall | null;
  };
}
export default class EditorGroundModule extends AppModule<State, Observables> {
  static override TYPE = 'editorGround';

  interactionSubscription = new Subscription();

  state: State = {
    action: {
      primary: GROUND_ACTION.NONE
    },
    skinId: 'default'
  };

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.select$ =
      this.app.renderer.observables.pointerDown$.pipe();
    //#endregion
  }

  private async onClick(position: Vector3) {
    console.log(this.state.action);
    if (this.state.action.secondary === GROUND_ACTION.REMOVE_SINGLE_SET) {
      const room = this.app.modules.room.getRoom()!;
      const groundModule = room.modules.ground;
      const groundStyleMap = groundModule.getGroundStyleMap();
      console.log('REMOVE_SINGLE_SET', position);

      groundStyleMap.set(position.x, position.y, position.z);
      this.lastGroundData = [];
      groundModule.refreshGround(room.modules.floor.getFloor());
    } else if (
      this.state.action.secondary === GROUND_ACTION.REMOVE_MULTIPLE_SET
    ) {
      if (!this.multipleSet?.startPosition) {
        this.multipleSet = { startPosition: position.clone() };
      } else {
        const room = this.app.modules.room.getRoom()!;
        const groundModule = room.modules.ground;
        const groundStyleMap = groundModule.getGroundStyleMap();

        const startX = Math.min(this.multipleSet.startPosition.x, position.x);
        const endX = Math.max(this.multipleSet.startPosition.x, position.x);
        const startZ = Math.min(this.multipleSet.startPosition.z, position.z);
        const endZ = Math.max(this.multipleSet.startPosition.z, position.z);
        for (let x = startX; x <= endX; x++) {
          for (let z = startZ; z <= endZ; z++) {
            groundStyleMap.delete(x, this.multipleSet.startPosition.y, z);
          }
        }
        this.multipleSet = null;
        this.lastGroundData = [];
        groundModule.refreshGround(room.modules.floor.getFloor());
      }
    } else if (this.state.action.secondary === GROUND_ACTION.STYLE_SINGLE_SET) {
      const room = this.app.modules.room.getRoom()!;
      const groundModule = room.modules.ground;
      const groundStyleMap = groundModule.getGroundStyleMap();

      groundStyleMap.set(position.x, position.y, position.z, this.state.skinId);
      this.lastGroundData = [];
      groundModule.refreshGround(room.modules.floor.getFloor());
    } else if (
      this.state.action.secondary === GROUND_ACTION.STYLE_MULTIPLE_SET
    ) {
      if (!this.multipleSet?.startPosition) {
        this.multipleSet = { startPosition: position.clone() };
      } else {
        const room = this.app.modules.room.getRoom()!;
        const groundModule = room.modules.ground;
        const groundStyleMap = groundModule.getGroundStyleMap();

        const startX = Math.min(this.multipleSet.startPosition.x, position.x);
        const endX = Math.max(this.multipleSet.startPosition.x, position.x);
        const startZ = Math.min(this.multipleSet.startPosition.z, position.z);
        const endZ = Math.max(this.multipleSet.startPosition.z, position.z);
        for (let x = startX; x <= endX; x++) {
          for (let z = startZ; z <= endZ; z++) {
            console.log(this.state.skinId);
            groundStyleMap.set(
              x,
              this.multipleSet.startPosition.y,
              z,
              this.state.skinId
            );
          }
        }
        this.multipleSet = null;
        this.lastGroundData = [];
        groundModule.refreshGround(room.modules.floor.getFloor());
      }
    }
  }

  private multipleSet: { startPosition: Vector3 } | null = null;

  private lastGroundData: {
    position: Vector3;
    groundStyle?: GrountStyleIdentifier;
  }[] = [];

  private currentGroundStyleMap: GroundStyleMap | null = null;
  private async onHover(position: Vector3) {
    const room = this.app.modules.room.getRoom()!;
    const groundModule = room.modules.ground;
    this.currentGroundStyleMap =
      this.currentGroundStyleMap || groundModule.getGroundStyleMap();

    const groundStyleMap = groundModule.getGroundStyleMap();
    this.lastGroundData.forEach(data => {
      groundStyleMap.set(
        data?.position.x,
        data?.position.y,
        data?.position.z,
        data?.groundStyle
      );
    });
    this.lastGroundData = [];

    let startPosition = (this.multipleSet?.startPosition || position).clone();
    startPosition = startPosition.min(position);
    let endPosition = (this.multipleSet?.startPosition || position).clone();
    endPosition = endPosition.max(position);

    for (let x = startPosition.x; x <= endPosition.x; x++) {
      for (let z = startPosition.z; z <= endPosition.z; z++) {
        this.lastGroundData.push({
          position: new Vector3(x, startPosition.y, z),
          groundStyle: groundStyleMap.get(x, startPosition.y, z)
        });
        groundStyleMap.set(
          x,
          startPosition.y,
          z,
          this.state.action.primary === GROUND_ACTION.REMOVE
            ? 'hidden'
            : this.state.skinId
        );
      }
    }
    groundModule.refreshGround(room.modules.floor.getFloor());
  }

  reset() {
    if (this.lastGroundData.length) {
      const room = this.app.modules.room.getRoom()!;
      const groundModule = room.modules.ground;
      const groundStyleMap = groundModule.getGroundStyleMap();

      this.lastGroundData.forEach(data => {
        groundStyleMap.set(
          data?.position.x,
          data?.position.y,
          data?.position.z,
          data?.groundStyle
        );
      });

      this.multipleSet = null;
      groundModule.refreshGround(room.modules.floor.getFloor());
      this.lastGroundData = [];
    }

    this.currentGroundStyleMap = null;
  }

  setAction(action: GroundAction) {
    const { primary } = action;
    const lastAction = this.state.action;

    if (
      lastAction.primary === primary &&
      lastAction.secondary === action.secondary
    ) {
      return;
    }

    this.state.action = action;

    if (
      this.state.skinId &&
      (primary === GROUND_ACTION.STYLE || primary === GROUND_ACTION.REMOVE)
    ) {
      this.registerSubscriptions();
    } else {
      this.unregisterSubscriptions();
      this.reset();
    }
  }

  setSkin(skinId: GrountStyleIdentifier) {
    if (!skinId) {
      this.unregisterSubscriptions();
      this.reset();
    } else {
      this.registerSubscriptions();
    }
    this.state.skinId = skinId;
  }

  unregisterSubscriptions() {
    this.interactionSubscription.unsubscribe();
    this.interactionSubscription = new Subscription();
  }

  registerSubscriptions() {
    this.unregisterSubscriptions();
    const subscription = this.interactionSubscription;
    subscription.add(
      fromEvent<KeyboardEvent>(document, 'keydown').subscribe(event => {
        const keyboardEvent = event;
        if (keyboardEvent.key === 'Escape') {
          this.reset();
        }
      })
    );

    subscription.add(
      this.app.modules.room.observables.room$
        .pipe(
          filter(Boolean),
          switchMap(room => room!.modules.ground.observables.click$),
          concatMap(this.onClick.bind(this))
        )
        .subscribe(void 0)
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

    subscription.add(
      this.app.modules.room.observables.room$
        .pipe(
          filter(Boolean),
          switchMap(room => room!.modules.ground.observables.pointerOut$),
          concatMap(this.onPointerOut.bind(this))
        )
        .subscribe(void 0)
    );
  }

  async onPointerOut() {
    this.reset();
  }

  override onSceneSelect(_context: SceneSelectContext): boolean {
    if (this.state.action.primary === GROUND_ACTION.NONE) {
      return false;
    }
    return true;
  }
}
