import { Object3D } from 'three';

import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '../app/lib/classes/Unit';

export type CustomOptions = UnitOptions;
export default class Custom extends Unit<CustomOptions> {
  static override KEY = 'custom';
  static override NAME = 'Custom';

  constructor(
    options: Omit<
      UnitConstructorOptions<CustomOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Custom',
      selectable: true,
      placeable: true
    });
  }

  override createMesh(_context: SetupContext) {
    const object = new Object3D();
    return object;
  }
}
