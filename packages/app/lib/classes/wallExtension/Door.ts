import type Wall from '../Wall';
import WallExtension, {
  WALL_EXTENSION_TYPE,
  type WallExtensionState
} from '../WallExtension';

export interface DoorState extends WallExtensionState {
  hasDoor?: boolean;
  opened: boolean;
}

export enum DOOR_ACTION {
  NONE = 'none',
  OPENING_LEFT = 'opening_left',
  OPENING_RIGHT = 'opening_right',
  CLOSING = 'closing'
}

export default class DoorWallExtension<
  State extends DoorState = DoorState
> extends WallExtension<State> {
  static override TYPE = WALL_EXTENSION_TYPE.DOOR;

  constructor({ wall, state }: { wall: Wall; state?: State }) {
    super({
      wall,
      state: { hasDoor: true, ...(state ?? ({} as State)), opened: false }
    });
  }

  private action = DOOR_ACTION.NONE;

  isOpening() {
    return this.isOpeningLeft() || this.isOpeningRight();
  }
  isOpeningLeft() {
    return this.action === DOOR_ACTION.OPENING_LEFT;
  }
  isOpeningRight() {
    return this.action === DOOR_ACTION.OPENING_RIGHT;
  }

  isClosing() {
    return this.isClosingLeft() || this.isClosingRight();
  }
  isClosingLeft() {
    return this.action === DOOR_ACTION.CLOSING && this.isOpeningLeft();
  }
  isClosingRight() {
    return this.action === DOOR_ACTION.CLOSING && this.isOpeningRight();
  }

  setOpenedState() {
    if (this.isOpening()) {
      this.setOpened(true);
      this.setAction(DOOR_ACTION.NONE);
    }
  }

  setClosedState() {
    if (this.isClosing()) {
      this.setOpened(false);
      this.setAction(DOOR_ACTION.NONE);
    }
  }

  isOpen() {
    if (this.state.hasDoor) {
      return this.state.opened;
    }
    return true;
  }

  setAction(action: DOOR_ACTION) {
    this.action = action;
  }

  setOpened(opened: boolean) {
    this.state.opened = opened;
  }

  open(rightMovement = false) {
    if (this.isOpen()) {
      return true;
    } else if (this.canOpen()) {
      this.setAction(
        rightMovement ? DOOR_ACTION.OPENING_RIGHT : DOOR_ACTION.OPENING_LEFT
      );
      return true;
    }
    return false;
  }

  close() {
    if (!this.isOpen()) {
      return true;
    } else if (this.canOpen()) {
      this.setAction(DOOR_ACTION.CLOSING);
      return true;
    }
    return false;
  }

  // TODO: Logik implementieren
  canOpen() {
    return true;
  }
}
