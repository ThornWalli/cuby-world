import { fromEvent, ReplaySubject } from 'rxjs';
import type Wall from '../Wall';
import WallExtension, {
  WALL_EXTENSION_TYPE,
  type WallExtensionState
} from '../WallExtension';
import { ANIMATION_ACTION } from '../../types/animation';
import { LoopOnce, type AnimationAction } from 'three';

export interface DoorObservables {
  action$: ReplaySubject<DOOR_ACTION>;
}

export interface DoorState extends WallExtensionState {
  hasDoor?: boolean;
}

export enum DOOR_ACTION {
  CLOSED = 'closed',
  OPEN_LEFT = 'open_left',
  OPEN_RIGHT = 'open_right',
  CLOSE_LEFT = 'close_left',
  CLOSE_RIGHT = 'close_right'
}

export default class DoorWallExtension<
  State extends DoorState = DoorState,
  Observables extends DoorObservables = DoorObservables
> extends WallExtension<State, Observables> {
  static override TYPE = WALL_EXTENSION_TYPE.DOOR;
  private action = DOOR_ACTION.CLOSED;

  private opened: boolean = false;
  /**
   * Milliseconds
   */
  duration: number = 300;
  /**
   * Milliseconds
   */
  closeDelay: number = 3000;

  constructor({ wall, state }: { wall: Wall; state?: State }) {
    state = {
      hasDoor: true,
      ...state
    } as State;
    super({
      wall,
      state
    });

    this.observables.action$ = new ReplaySubject<DOOR_ACTION>(1);
    this.observables.action$.next(DOOR_ACTION.CLOSED);
  }

  override async setup() {
    this.subscription.add(
      this.modules.animation.observables.addAction$.subscribe(
        (action: AnimationAction) => {
          action.setDuration(this.duration / 1000);
          action.setLoop(LoopOnce, 0);
          action.clampWhenFinished = true;
        }
      )
    );

    await super.setup();

    if (!this.state.hasDoor) {
      const inner = this.root.getObjectByName('inner');
      if (inner) {
        inner.rotateY(Math.PI / 2);
        inner.visible = false;
      }
    } else {
      this.subscription.add(
        fromEvent(this.modules.animation.mixer, 'finished').subscribe(() => {
          if (this.isOpening()) {
            this.setOpened(true);
          } else if (this.isClosing()) {
            this.setOpened(false);
          }
        })
      );

      this.subscription.add(
        this.observables.action$.subscribe(action => {
          this.modules.animation.setAnimationAction(
            doorActionToAnimtionAction(action),
            this.duration / 1000
          );
        })
      );
    }
  }

  setAction(action: DOOR_ACTION) {
    this.action = action;
    this.observables.action$.next(action);
  }

  isOpening() {
    return (
      this.action === DOOR_ACTION.OPEN_LEFT ||
      this.action === DOOR_ACTION.OPEN_RIGHT
    );
  }

  isClosing() {
    return (
      this.action === DOOR_ACTION.CLOSE_LEFT ||
      this.action === DOOR_ACTION.CLOSE_RIGHT
    );
  }

  isOpen() {
    if (this.state.hasDoor) {
      return this.opened;
    }
    return true;
  }

  setOpened(opened: boolean) {
    this.opened = opened;
  }

  open(rightMovement = false) {
    if (this.isOpen()) {
      return true;
    } else if (this.canOpen()) {
      if (this.isOpening()) {
        return true;
      }

      this.setAction(
        rightMovement ? DOOR_ACTION.OPEN_RIGHT : DOOR_ACTION.OPEN_LEFT
      );

      window.setTimeout(() => {
        this.close();
      }, this.closeDelay);
      return true;
    }
    return false;
  }

  close() {
    if (!this.isOpen()) {
      return true;
    } else if (this.canOpen()) {
      this.setAction(
        this.action === DOOR_ACTION.OPEN_LEFT
          ? DOOR_ACTION.CLOSE_LEFT
          : DOOR_ACTION.CLOSE_RIGHT
      );
      return true;
    }
    return false;
  }

  // TODO: Logik implementieren
  canOpen() {
    return true;
  }
}

export function doorActionToAnimtionAction(
  action: DOOR_ACTION
): ANIMATION_ACTION {
  switch (action) {
    case DOOR_ACTION.CLOSED:
      return ANIMATION_ACTION.CLOSED;
    case DOOR_ACTION.OPEN_LEFT:
      return ANIMATION_ACTION.OPEN_LEFT;
    case DOOR_ACTION.OPEN_RIGHT:
      return ANIMATION_ACTION.OPEN_RIGHT;
    case DOOR_ACTION.CLOSE_LEFT:
      return ANIMATION_ACTION.CLOSE_LEFT;
    case DOOR_ACTION.CLOSE_RIGHT:
      return ANIMATION_ACTION.CLOSE_RIGHT;
  }
}
