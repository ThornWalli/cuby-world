import type { UnitOptions } from './../../app/lib/classes/Unit';
import { MATERIAL_NAME } from './../../app/lib/utils/material';
import { DoubleSide, MeshPhongMaterial, Object3D, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/shelf_1.glb?url';
import { replaceMaterialByName } from '@cuby-world/app/lib/utils/material';
import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import WallUnit from '@cuby-world/app/lib/classes/unit/Wall';

export type ShelfOptions = UnitOptions & {
  color: number | string;
};

export default class Shelf_1<
  Options extends ShelfOptions = ShelfOptions
> extends WallUnit<Options> {
  static override KEY = 'shelf_1';
  static override NAME = 'Shelf_1';

  constructor(
    options: Omit<UnitConstructorOptions<Options>, 'name' | 'selectable'> = {}
  ) {
    super({
      ...options,
      name: 'Shelf_1',
      wallOnly: false,
      accessible: true,
      selectable: true,
      placeable: true,
      options: {
        color: 0xffeeaa,
        ...options.options
      } as Options,
      moduleStates: {
        wall: {
          offset: new Vector3(-0.275, 0, 0)
        }
      }
    });
  }
  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);
    const obj = object.getObjectByName('empty')!;
    obj.name = OBJECT_NAME.MESH;
    obj.position.set(0, 0, 0); // reset Position

    replaceMaterialByName(
      obj,
      MATERIAL_NAME.BASE,
      new MeshPhongMaterial({
        color: this.options.color,
        side: DoubleSide,
        shadowSide: DoubleSide
      })
    );

    this.observables.materialReady$.next();

    meshRoot.add(obj);

    return meshRoot;
  }
}
