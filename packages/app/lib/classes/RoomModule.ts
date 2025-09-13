import { Subscription } from 'rxjs';
import type Room from './Room';
import type { Camera } from 'three';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RoomModuleState {}

export default abstract class RoomModule<
  State extends RoomModuleState = RoomModuleState
> {
  static TYPE: string;

  abstract state: State;

  subscription = new Subscription();
  constructor(
    public room: Room,
    readonly debug: boolean
  ) {}
  setup() {
    // This method can be overridden by subclasses to set up specific handlers
  }

  destroy() {
    this.subscription.unsubscribe();
  }

  update(_time: number) {
    // This method can be overridden by subclasses to handle updates
  }

  updateThrottle(_time: number, _options?: { camera: Camera }) {
    // This method can be overridden by subclasses to handle throttled updates
  }
}
