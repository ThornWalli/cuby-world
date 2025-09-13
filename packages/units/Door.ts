import type { Object3D } from 'three';
import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  Vector3
} from 'three';

import Unit, {
  OBJECT_NAME,
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';

export type DoorOptions = UnitOptions;
export default class Door extends Unit<DoorOptions> {
  static override KEY = 'door';
  static override NAME = 'Door';

  constructor(
    options: Omit<
      UnitConstructorOptions<DoorOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Door',
      selectable: true,
      placeable: true,
      accessible: true
    });
    this.size = new Vector3(1, 0, 1);
  }

  override createMesh() {
    const geometry = new PlaneGeometry(0.8, 1);
    geometry.translate(0, 0.5, 0.5);
    geometry.rotateY(Math.PI / 2);
    const material = new MeshPhongMaterial({ color: 0x333333 });

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    material.side = DoubleSide;

    this.materialReady$.next();
    return mesh;
  }
}
