import { Object3D } from 'three';
import type Wall from './Wall';
import { Subscription } from 'rxjs';
import type { AnimationLoopSubject } from './Renderer';

export enum WALL_EXTENSION_TYPE {
  DOOR = 'door',
  WINDOW = 'window',
  DECORATION = 'decoration'
}

export interface WallExtensionDescription<
  State extends WallExtensionState = WallExtensionState
> {
  key: string;
  state?: State;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WallExtensionState = Record<string, any>;

export default class WallExtension<
  State extends WallExtensionState = WallExtensionState
> {
  /**
   * Der Typ muss eindeutig sein und dem Muster "<Kategorie>-<Name>" folgen, z.B. "door-default"
   */
  static KEY: string;
  static TYPE: WALL_EXTENSION_TYPE;

  private enabled = true;

  wall: Wall;
  state: State = {} as State;
  root: Object3D = new Object3D();

  subscription = new Subscription();

  constructor({ wall, state }: { wall: Wall; state?: State }) {
    this.wall = wall;
    if (state) {
      this.state = state;
    }
  }

  destroy(): void {
    this.subscription.unsubscribe();
    this.root.remove();
  }

  setup(_context: { animationLoop$: AnimationLoopSubject }): void {
    // Override in subclass if needed
  }

  get key(): string {
    return (this.constructor as typeof WallExtension).KEY;
  }
  get type(): WALL_EXTENSION_TYPE {
    return (this.constructor as typeof WallExtension).TYPE;
  }

  isEnabled() {
    return this.enabled;
  }

  enable() {
    this.enabled = true;
    this.root.visible = true;
  }

  disable() {
    this.enabled = false;
    this.root.visible = false;
  }
}
