import type { Object3D } from 'three';
import { BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three';

import Unit, {
  OBJECT_NAME,
  type UnitConstructorOptions,
  type UnitOptions
} from '../app/lib/classes/Unit';

export interface BlockOptions extends UnitOptions {
  size: Vector3;
  color: number;
}
export default class Block extends Unit<BlockOptions> {
  static override KEY = 'box';
  static override NAME = 'Box';

  constructor(
    options: Omit<
      UnitConstructorOptions<BlockOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Block',
      selectable: true,
      options: {
        size: new Vector3(1, 1 / 3, 1),
        color: 0xd70000,
        ...options.options
      }
    });
  }

  override createMesh() {
    const material = new MeshPhongMaterial({ color: this.options.color });

    const size = this.options.size;
    const geometry = new BoxGeometry(size.x, size.y, size.z);

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    mesh.position.set(0, size.y / 2, 0);

    this.materialReady$.next();
    return mesh;
  }
}
