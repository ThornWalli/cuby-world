import type { Object3D } from 'three';

import type Unit from './Unit';
import type { SetupContext } from './Unit';
import { Subscription } from 'rxjs';

export interface UnitModuleSetupContext extends SetupContext {
  mesh: Object3D;
}

export default class UnitModule {
  static TYPE: string;

  subscription = new Subscription();

  constructor(private _unit: Unit) {}

  destroy() {
    this.subscription.unsubscribe();
  }

  get unit() {
    return this._unit;
  }

  get room() {
    return this.unit.room;
  }

  async setup(context: UnitModuleSetupContext): Promise<Object3D> {
    return context.mesh;
  }

  update(_deltaTime: number) {
    // This method can be overridden by subclasses to handle updates
  }
}
