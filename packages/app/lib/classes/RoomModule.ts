import type { SubscriptionLike } from 'rxjs';
import { Subscription } from 'rxjs';
import type Room from './Room';
import type { Camera } from 'three';
import type { AnimationLoopValue } from './Renderer';
import { APP_MODE } from './App';

export type RoomModuleObservables = {
  [key: string]: SubscriptionLike | unknown;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RoomModuleState {}

export default abstract class RoomModule<
  State extends RoomModuleState = RoomModuleState,
  Observables extends RoomModuleObservables = RoomModuleObservables
> {
  static TYPE: string;

  abstract state: State;

  subscription = new Subscription();
  observables: Observables = {} as Observables;

  constructor(
    public room: Room,
    readonly debug: boolean
  ) {}
  setup() {
    // This method can be overridden by subclasses to set up specific handlers
  }

  destroy() {
    Object.values(this.observables).forEach(o =>
      (o as SubscriptionLike).unsubscribe()
    );
    this.subscription.unsubscribe();
  }

  isEditMode() {
    return this.room.app.config.mode === APP_MODE.EDITOR;
  }

  update(_v: AnimationLoopValue) {
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
