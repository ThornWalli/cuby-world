import { Object3D, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/chair_1.glb?url';
import ChairUnit, {
  type ChairUnitOptions
} from '@cuby-world/app/lib/classes/unit/Chair';

export type ChairOptions = ChairUnitOptions;
export default class Chair_1 extends ChairUnit<ChairOptions> {
  static override KEY = 'chair_1';
  static override NAME = 'Chair_1';

  constructor(
    options: Omit<
      UnitConstructorOptions<ChairOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Chair_1',
      accessible: true,
      selectable: true,
      placeable: true,
      size: new Vector3(1, 0.3, 1),
      options: {
        offset: new Vector3(0, -0.3, 0)
      }
    });
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);

    meshRoot.position.set(0, 0, 0);

    this.setMaterialReady();

    meshRoot.add(object);

    meshRoot.traverse(child => {
      child.castShadow = true;
    });

    return meshRoot;
  }
}
