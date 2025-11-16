import type { Object3D } from 'three';
import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';

import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import Unit, {
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';

export type BoxOptions = UnitOptions;
export default class Box extends Unit<BoxOptions> {
  static override KEY = 'box';
  static override NAME = 'Box';

  constructor(
    options: Omit<
      UnitConstructorOptions<BoxOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      size: new Vector3(0.5, 0.5, 0.5),
      name: 'Box',
      selectable: true,
      placeable: true
    });
  }

  override async createMesh() {
    const material = new MeshStandardMaterial({
      roughness: 1.0,
      metalness: 0.0,
      color: 0xff0000
    });

    const size = this.getSize();
    const ratio = 14 / 20;
    const geometry = new BoxGeometry(size.x * 1, size.y * ratio, size.z * 1);

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    mesh.position.set(0, (size.y * ratio) / 2, 0);

    this.setMaterialReady();

    return mesh;
  }
}
