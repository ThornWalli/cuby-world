import type { Object3D } from 'three';
import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

import Unit, {
  OBJECT_NAME,
  type UnitConstructorOptions,
  type UnitOptions
} from '../app/lib/classes/Unit';

export type BoxOptions = UnitOptions;
export default class Box extends Unit<BoxOptions> {
  static override KEY = 'box';
  static override NAME = 'Box';

  override options = {
    size: 0.5
  };

  constructor(
    options: Omit<
      UnitConstructorOptions<BoxOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Box',
      selectable: true
    });
  }

  override createMesh() {
    const material = new MeshPhongMaterial({ color: 0xff0000 });

    const size = this.options.size;
    const ratio = 14 / 20;
    const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    mesh.position.set(0, (size * ratio) / 2, 0);

    this.materialReady$.next();
    return mesh;
  }
}
