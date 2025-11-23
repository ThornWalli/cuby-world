import { Object3D } from 'three';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/table_1.glb?url';

export default class Table_1 extends Unit<UnitOptions> {
  static override KEY = 'table_1';
  static override NAME = 'Table_1';

  constructor(
    options: Omit<
      UnitConstructorOptions<UnitOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Table_1',
      accessible: false,
      selectable: true,
      placeable: true
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
