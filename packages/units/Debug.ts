import type { Object3D } from 'three';
import { BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three';

import Unit, {
  OBJECT_NAME,
  type UnitConstructorOptions,
  type UnitOptions
} from '../app/lib/classes/Unit';
import { checkerboardTexture } from '../app/lib/utils/texture';

export type DebugOptions = UnitOptions;
export default class Debug extends Unit<DebugOptions> {
  override options = {
    size: 0.5
  };

  constructor(
    options: Omit<
      UnitConstructorOptions<DebugOptions>,
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
    const texture = checkerboardTexture(64, 32, '#ffffff', '#000000');
    const material = new MeshPhongMaterial({ map: texture });

    const size = this.options.size;
    const ratio = 19 / 20;
    const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    mesh.position.set(0, (size * ratio) / 2 + 0.2, 0);

    const dir = new Vector3(1, 0, 0);

    dir.normalize();

    this.materialReady$.next();

    return mesh;
  }
}
