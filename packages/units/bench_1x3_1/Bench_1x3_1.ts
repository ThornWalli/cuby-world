import { Object3D, Vector2, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/bench_1x3_1.glb?url';
import BenchUnit, {
  type BenchUnitOptions
} from '@cuby-world/app/lib/classes/unit/Bench';

export type BenchOptions = BenchUnitOptions;
export default class Bench_1x3_1 extends BenchUnit<BenchOptions> {
  static override KEY = 'bench_1x3_1';
  static override NAME = 'Bench 1x3 1';

  constructor(
    options: Omit<
      UnitConstructorOptions<BenchOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Bench 1x3 1',
      accessible: true,
      selectable: true,
      placeable: true,
      size: new Vector3(1, 0.3, 3),
      options: {
        ...options.options,
        offset: new Vector3(0, -0.3, 0)
      },
      moduleOptions: {
        bench: {
          slots: [
            {
              position: new Vector2(0, 0)
            },
            {
              position: new Vector2(0, 1)
            },
            {
              position: new Vector2(0, 2)
            }
          ]
        }
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
