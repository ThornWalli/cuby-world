import type { Object3D } from 'three';
import { BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three';

import Unit, {
  OBJECT_NAME,
  type UnitConstructorOptions,
  type UnitOptions
} from '../app/lib/classes/Unit';

export interface BlockOptions extends UnitOptions {
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
      size: new Vector3(1, 1 / 3, 1),
      ...options,
      name: 'Block',
      selectable: true,
      placeable: true,
      options: {
        color: 0xd70000,
        ...options.options
      }
    });
  }

  override createMesh() {
    const material = new MeshPhongMaterial({ color: this.options.color });

    const size = this.size;
    const geometry = new BoxGeometry(size.z, size.y, size.x);

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    mesh.position.set(0, size.y / 2, 0);

    mesh.add(helper());

    this.materialReady$.next();
    return mesh;
  }
}

function helper() {
  const material = new MeshPhongMaterial({ color: 0xff0000 });
  const geometry = new BoxGeometry(1, 1, 1);
  const mesh: Object3D = new Mesh(geometry, material);
  mesh.name = OBJECT_NAME.MESH;
  mesh.castShadow = true;
  mesh.position.set(0, 1 / 2 + 0.5, 0);

  return mesh;
}
