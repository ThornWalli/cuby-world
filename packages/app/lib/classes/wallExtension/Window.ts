import type Wall from '../Wall';
import WallExtension, {
  WALL_EXTENSION_TYPE,
  type WallExtensionState
} from '../WallExtension';

export interface WindowState extends WallExtensionState {
  size: 'small' | 'medium' | 'large';
}

export default class WindowWallExtension<
  State extends WindowState = WindowState
> extends WallExtension<State> {
  static override TYPE = WALL_EXTENSION_TYPE.WINDOW;

  constructor({ wall, state }: { wall: Wall; state?: State }) {
    super({ wall, state: { ...(state ?? ({} as State)) } });
  }
}
