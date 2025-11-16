import type { Color, Object3D } from 'three';
import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';

import Unit, {
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';

export interface BlockOptions extends UnitOptions {
  color: string | number | Color;
  size: Vector3;
}
export default class Block extends Unit<BlockOptions> {
  static override KEY = 'block';
  static override NAME = 'Block';

  constructor(
    options: Omit<
      UnitConstructorOptions<BlockOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    const size = options.options?.size ?? new Vector3(1, 1 / 3, 1);
    super({
      size,
      ...options,
      name: 'Block',
      selectable: true,
      placeable: true,
      options: {
        color: 0xd70000,
        size,
        ...(options.options ?? {})
      }
    });
  }

  override async createMesh() {
    const material = new MeshStandardMaterial({
      roughness: 1.0,
      metalness: 0.0,
      color: this.options.color
    });

    const size = this.getSize();
    const geometry = new BoxGeometry(size.z, size.y, size.x);

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    mesh.position.set(0, size.y / 2, 0);

    // mesh.add(helper());

    this.setMaterialReady();

    return mesh;
  }
}

// function helper() {
//   const material = new MeshPhongMaterial({ color: 0xff0000 });
//   const geometry = new BoxGeometry(1, 1, 1);
//   const mesh: Object3D = new Mesh(geometry, material);
//   mesh.name = OBJECT_NAME.MESH;
//   mesh.castShadow = true;
//   mesh.position.set(0, 1 / 2 + 0.5, 0);

//   return mesh;
// }
