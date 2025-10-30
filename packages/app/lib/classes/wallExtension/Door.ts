import { ReplaySubject } from 'rxjs';
import type Wall from '../Wall';
import WallExtension, {
  WALL_EXTENSION_TYPE,
  type WallExtensionState
} from '../WallExtension';

export interface DoorObservables {
  action$: ReplaySubject<DOOR_ACTION>;
}

export interface DoorState extends WallExtensionState {
  hasDoor?: boolean;
  opened: boolean;
}

export enum DOOR_ACTION {
  CLOSED = 'closed',
  OPEN_LEFT = 'open_left',
  OPEN_RIGHT = 'open_right',
  OPENED_LEFT = 'opened_left',
  OPENED_RIGHT = 'opened_right'
}

export default class DoorWallExtension<
  State extends DoorState = DoorState,
  Observables extends DoorObservables = DoorObservables
> extends WallExtension<State, Observables> {
  isOpenedLeft() {
    return this.state.opened && this.action === DOOR_ACTION.OPENED_LEFT;
  }
  isOpenedRight() {
    return this.state.opened && this.action === DOOR_ACTION.OPENED_RIGHT;
  }
  static override TYPE = WALL_EXTENSION_TYPE.DOOR;

  constructor({ wall, state }: { wall: Wall; state?: State }) {
    super({
      wall,
      state: { hasDoor: true, ...(state ?? ({} as State)), opened: false }
    });

    this.observables.action$ = new ReplaySubject<DOOR_ACTION>(1);
    this.observables.action$.next(DOOR_ACTION.CLOSED);
  }

  private action = DOOR_ACTION.CLOSED;

  isOpeningLeft() {
    return this.action === DOOR_ACTION.OPEN_LEFT;
  }

  isOpeningRight() {
    return this.action === DOOR_ACTION.OPEN_RIGHT;
  }

  isOpening() {
    return (
      this.action === DOOR_ACTION.OPEN_LEFT ||
      this.action === DOOR_ACTION.OPEN_RIGHT
    );
  }

  isClosing() {
    return this.action === DOOR_ACTION.CLOSED;
  }

  isOpen() {
    if (this.state.hasDoor) {
      return this.state.opened;
    }
    return true;
  }

  setAction(action: DOOR_ACTION) {
    if (this.action === action) return;
    console.log(`Setting door action to ${action}`);
    this.action = action;
    this.observables.action$.next(action);
  }

  setOpened(opened: boolean) {
    this.state.opened = opened;
    const action =
      this.action === DOOR_ACTION.OPEN_LEFT
        ? DOOR_ACTION.OPENED_LEFT
        : DOOR_ACTION.OPENED_RIGHT;
    this.setAction(opened ? action : DOOR_ACTION.CLOSED);
  }

  open(rightMovement = false) {
    if (this.isOpen()) {
      return true;
    } else if (this.canOpen()) {
      this.setAction(
        rightMovement ? DOOR_ACTION.OPEN_RIGHT : DOOR_ACTION.OPEN_LEFT
      );
      return true;
    }
    return false;
  }

  close() {
    if (!this.isOpen()) {
      return true;
    } else if (this.canOpen()) {
      this.setAction(DOOR_ACTION.CLOSED);
      return true;
    }
    return false;
  }

  // TODO: Logik implementieren
  canOpen() {
    return true;
  }
}
