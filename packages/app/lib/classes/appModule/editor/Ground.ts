import type { GroundAction } from '@cuby-world/app/components/editor/panel/GroundActions.vue';
import type { AppModuleState, SceneSelectContext } from '../../AppModule';
import type { FACE_INDEX } from '@cuby-world/app/lib/types/wall';
import type Wall from '../../Wall';
import AppModule from '../../AppModule';
import { GROUND_ACTION } from '@cuby-world/app/lib/types/editor';
import { concatMap, filter, Subscription, switchMap } from 'rxjs';
import { Vector3 } from 'three';
import type { GroundStyleMap } from '../../roomModule/Ground';
import type { GroundStyle } from '@cuby-world/app/lib/types/ground/style';

interface State extends AppModuleState {
  action: GroundAction;
  style: GroundStyle;
  selection?: {
    faceIndex: FACE_INDEX;
    wall: Wall | null;
  };
}
export default class EditorGroundModule extends AppModule<State> {
  static override TYPE = 'editorGround';

  interactionSubscription = new Subscription();

  state: State = {
    action: {
      primary: GROUND_ACTION.NONE
    },
    style: {
      id: 'default',
      options: { color: '#ff00ff' }
    }
  };

  observables = {
    select$: this.app.renderer.observables.pointerDown$.pipe()
  };

  private async onClick(position: Vector3) {
    if (this.state.action.secondary === GROUND_ACTION.GROUND_SINGLE_SET) {
      const room = this.app.modules.room.getRoom()!;
      const groundModule = room.modules.ground;
      const groundStyleMap = groundModule.getGroundStyleMap();

      groundStyleMap.set(position.x, position.z, this.state.style);
      this.lastGroundData = [];
      groundModule.refreshGround();
    } else if (
      this.state.action.secondary === GROUND_ACTION.GROUND_MULTIPLE_SET
    ) {
      if (!this.multipleSet?.startPosition) {
        this.multipleSet = { startPosition: position.clone() };
      } else {
        const room = this.app.modules.room.getRoom()!;
        const groundModule = room.modules.ground;
        const groundStyleMap = groundModule.getGroundStyleMap();
        //
        const startX = Math.min(this.multipleSet.startPosition.x, position.x);
        const endX = Math.max(this.multipleSet.startPosition.x, position.x);
        const startZ = Math.min(this.multipleSet.startPosition.z, position.z);
        const endZ = Math.max(this.multipleSet.startPosition.z, position.z);
        for (let x = startX; x <= endX; x++) {
          for (let z = startZ; z <= endZ; z++) {
            groundStyleMap.set(x, z, this.state.style);
          }
        }
        this.multipleSet = null;
        this.lastGroundData = [];
        groundModule.refreshGround();
      }
    }
  }

  private multipleSet: { startPosition: Vector3 } | null = null;

  private lastGroundData: {
    position: Vector3;
    groundStyle: GroundStyle;
  }[] = [];

  private currentGroundStyleMap: GroundStyleMap | null = null;
  private async onHover(position: Vector3) {
    const room = this.app.modules.room.getRoom()!;
    const groundModule = room.modules.ground;
    this.currentGroundStyleMap =
      this.currentGroundStyleMap || groundModule.getGroundStyleMap();

    const groundStyleMap = groundModule.getGroundStyleMap();
    this.lastGroundData.forEach(data => {
      groundStyleMap.set(data?.position.x, data?.position.z, data?.groundStyle);
    });
    this.lastGroundData = [];

    let startPosition = (this.multipleSet?.startPosition || position).clone();
    startPosition = startPosition.min(position);
    let endPosition = (this.multipleSet?.startPosition || position).clone();
    endPosition = endPosition.max(position);
    // const startX = Math.min(startPosition.x, position.x);
    // const endX = Math.max(startPosition.x, position.x);
    // const startZ = Math.min(startPosition.z, position.z);
    // const endZ = Math.max(startPosition.z, position.z);

    for (let x = startPosition.x; x <= endPosition.x; x++) {
      for (let z = startPosition.z; z <= endPosition.z; z++) {
        this.lastGroundData.push({
          position: new Vector3(x, 0, z),
          groundStyle: groundStyleMap.get(x, z)
        });
        groundStyleMap.set(x, z, this.state.style);
      }
    }
    groundModule.refreshGround();
  }

  resetHover() {
    if (this.lastGroundData.length) {
      const room = this.app.modules.room.getRoom()!;
      const groundModule = room.modules.ground;
      const groundStyleMap = groundModule.getGroundStyleMap();

      this.lastGroundData.forEach(data => {
        groundStyleMap.set(
          data?.position.x,
          data?.position.z,
          data?.groundStyle
        );
      });
      groundModule.refreshGround();

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

    this.interactionSubscription.unsubscribe();
    this.interactionSubscription = new Subscription();

    if (primary === GROUND_ACTION.MODE_STYLE) {
      this.registerSubscriptions();
    }
  }

  setStyle(style: GroundStyle) {
    if ('id' in style || 'texture' in style) {
      this.state.style = style as GroundStyle;
    }
    this.state.style = style;
  }

  registerSubscriptions() {
    this.interactionSubscription.add(
      this.app.modules.room.observables.room$
        .pipe(
          filter(Boolean),
          switchMap(room => room!.modules.ground.observables.click$),
          concatMap(this.onClick.bind(this))
        )
        .subscribe(void 0)
    );

    this.interactionSubscription.add(
      this.app.modules.room.observables.room$
        .pipe(
          filter(Boolean),
          switchMap(room => room!.modules.ground.observables.hover$),
          concatMap(this.onHover.bind(this))
        )
        .subscribe(void 0)
    );
    this.interactionSubscription.add(
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
    this.resetHover();
  }

  override onSceneSelect(_context: SceneSelectContext): boolean {
    if (this.state.action.primary === GROUND_ACTION.NONE) {
      return false;
    }
    return true;
  }
}
