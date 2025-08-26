import type { Object3D } from 'three';

import type Unit from './Unit';
import type { SetupContext } from './Unit';

export interface UnitModuleSetupContext extends SetupContext {
  mesh: Object3D;
}

export default class UnitModule {
  static TYPE: string;
  constructor(private _unit: Unit) {}

  get unit() {
    return this._unit;
  }

  async setup(context: UnitModuleSetupContext): Promise<Object3D> {
    return context.mesh;
  }

  update(_deltaTime: number) {
    // This method can be overridden by subclasses to handle updates
  }
}
