import type { Object3D } from 'three';
import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  Vector3
} from 'three';

import Unit, {
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';

export interface BaseDoorOptions extends UnitOptions {
  open: boolean;
}
class BaseDoor<
  Options extends BaseDoorOptions = BaseDoorOptions
> extends Unit<Options> {}

export type DoorOptions = BaseDoorOptions;
export default class Door extends BaseDoor<DoorOptions> {
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
    this.setSize(new Vector3(1, 0, 1));
  }

  override async createMesh() {
    const geometry = new PlaneGeometry(0.8, 1);
    geometry.translate(0, 0.5, 0.5);
    geometry.rotateY(Math.PI / 2);
    const material = new MeshPhongMaterial({ color: 0x333333 });

    const mesh: Object3D = new Mesh(geometry, material);
    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    material.side = DoubleSide;

    this.observables.materialReady$.next();
    return mesh;
  }
}
