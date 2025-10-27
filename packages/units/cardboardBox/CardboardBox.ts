import { Object3D, Vector3 } from 'three';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/cardboardBox.glb?url';

export type CardboardBoxOptions = UnitOptions;
export default class CardboardBox extends Unit<CardboardBoxOptions> {
  static override KEY = 'cardboardBox';
  static override NAME = 'CardboardBox';

  constructor(
    options: Omit<
      UnitConstructorOptions<CardboardBoxOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Doormate_1',
      size: new Vector3(1, 0.2, 1),
      accessible: false,
      selectable: true,
      placeable: true
    });
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);

    this.observables.materialReady$.next();
    meshRoot.add(object);
    return meshRoot;
  }
}
