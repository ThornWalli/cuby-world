import type { SubscriptionLike } from 'rxjs';
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
  observables: Record<string, SubscriptionLike> = {};

  constructor(
    public room: Room,
    readonly debug: boolean
  ) {}
  setup() {
    // This method can be overridden by subclasses to set up specific handlers
  }

  destroy() {
    Object.values(this.observables).forEach(o => o.unsubscribe());
    this.subscription.unsubscribe();
  }

  update(_time: number) {
    // This method can be overridden by subclasses to handle updates
  }

  updateThrottle(_time: number, _options?: { camera: Camera }) {
    // This method can be overridden by subclasses to handle throttled updates
  }

  updateThrottle500ms(_time: number, _options?: { camera: Camera }) {
    // This method can be overridden by subclasses to handle 500ms throttled updates
  }

  updateThrottle1Sec(_time: number, _options?: { camera: Camera }) {
    // This method can be overridden by subclasses to handle 1 second throttled updates
  }
}
