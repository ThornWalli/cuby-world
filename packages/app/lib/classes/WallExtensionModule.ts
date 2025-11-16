import type { Object3D } from 'three';

import { Subscription, type SubscriptionLike } from 'rxjs';
import type { AnimationLoopValue } from './Renderer';
import type WallExtension from './WallExtension';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SetupContext {}

export type WallExtensionModuleObservables = {
  [key: string]: SubscriptionLike | unknown;
};

export type WallExtensionModuleState = Record<string, unknown>;

export interface WallExtensionModuleSetupContext extends SetupContext {
  mesh: Object3D;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WallExtensionModuleOptions {}

export default abstract class WallExtensionModule<
  State extends WallExtensionModuleState = WallExtensionModuleState,
  Obervables extends
    WallExtensionModuleObservables = WallExtensionModuleObservables,
  E extends WallExtension = WallExtension
> {
  static TYPE: string;
  public state: State = {} as State;

  subscription = new Subscription();

  observables: Obervables = {} as Obervables;

  constructor(
    private _wallExtension: E,
    public readonly debug: boolean
  ) {}

  destroy() {
    this.subscription.unsubscribe();
    Object.values(this.observables).forEach(obs =>
      (obs as SubscriptionLike).unsubscribe()
    );
  }

  get wallExtension() {
    return this._wallExtension;
  }

  async setup(context: WallExtensionModuleSetupContext): Promise<Object3D> {
    return context.mesh;
  }

  update(_v: AnimationLoopValue) {
    // This method can be overridden by subclasses to handle updates
  }

  getState() {
    return {
      ...this.state
    };
  }
}
