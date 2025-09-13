import type { Object3D } from 'three';

import type Unit from './Unit';
import type { SetupContext } from './Unit';
import { Subscription } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UnitModuleState {}

export interface UnitModuleSetupContext extends SetupContext {
  mesh: Object3D;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UnitModuleOptions {}

export default abstract class UnitModule<
  U extends Unit = Unit,
  State extends UnitModuleState = UnitModuleState
> {
  static TYPE: string;

  abstract state: State;

  subscription = new Subscription();

  constructor(
    private _unit: U,
    public readonly debug: boolean
  ) {}

  destroy() {
    this.subscription.unsubscribe();
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

  update(_deltaTime: number) {
    // This method can be overridden by subclasses to handle updates
  }
}
