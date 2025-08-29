import { Reflector } from 'three/addons/objects/Reflector.js';
import { BoxGeometry, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

import Unit, {
  OBJECT_NAME,
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '../app/lib/classes/Unit';

export type MirrorOptions = UnitOptions;
export default class Mirror extends Unit<MirrorOptions> {
  static override KEY = 'mirror';
  static override NAME = 'Mirror';

  constructor(
    options: Omit<
      UnitConstructorOptions<MirrorOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Mirror',
      selectable: true,
      placeable: true,
      accessible: true
    });
  }

  override createMesh(_context: SetupContext) {
    const geometry = new PlaneGeometry(0.8, 1);
    const material = new MeshBasicMaterial({ color: 0x777777 });
    const mesh = new Mesh(geometry, material);

    mesh.name = OBJECT_NAME.MESH;
    mesh.rotation.set(0, Math.PI / 2, 0);
    mesh.position.set(-0.5, 0.5, 0);

    const mirrorGeometry = new BoxGeometry(0.6, 0.8, 0.1);
    const mirror = new Reflector(mirrorGeometry, {
      clipBias: 1,
      textureWidth: 256 * window.devicePixelRatio,
      textureHeight: 256 * window.devicePixelRatio,
      color: 0xffffff
    });
    mirror.position.set(0, 0, 0);

    mesh.add(mirror);

    this.materialReady$.next();
    return mesh;
  }
}
