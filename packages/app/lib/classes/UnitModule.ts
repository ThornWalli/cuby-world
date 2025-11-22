import type { Object3D } from 'three';

import type Unit from './Unit';
import type { SetupContext } from './Unit';
import { Subscription, type SubscriptionLike } from 'rxjs';
import type { AnimationLoopValue } from './Renderer';

export type UnitModuleObservables = {
  [key: string]: SubscriptionLike | unknown;
};

export type UnitModuleState = Record<string, unknown>;

export interface UnitModuleSetupContext extends SetupContext {
  root: Object3D;
  mesh: Object3D;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UnitModuleOptions {}

export default abstract class UnitModule<
  Options extends UnitModuleOptions = UnitModuleOptions,
  State extends UnitModuleState = UnitModuleState,
  Obervables extends UnitModuleObservables = UnitModuleObservables,
  U extends Unit = Unit
> {
  static TYPE: string;

  subscription = new Subscription();

  observables: Obervables = {} as Obervables;

  constructor(
    private _unit: U,
    public options: Options = {} as Options,
    public state: State = {} as State,
    public readonly debug: boolean
  ) {}

  destroy() {
    this.subscription.unsubscribe();
    Object.values(this.observables).forEach(obs =>
      (obs as SubscriptionLike).unsubscribe()
    );
  }

  get unit() {
    return this._unit;
  }

  get currentRoom() {
    return this.unit.modules.room?.getRoom();
  }

  async setup(context: UnitModuleSetupContext): Promise<Object3D> {
    return context.mesh;
  }

  update(_v: AnimationLoopValue) {
    // This method can be overridden by subclasses to handle updates
  }

  getOptions() {
    return {
      ...this.options
    };
  }

  getState() {
    return {
      ...this.state
    };
  }
}
