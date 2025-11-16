import type { UnitOptions } from './../../app/lib/classes/Unit';
import { MATERIAL_NAME } from './../../app/lib/utils/material';
import { DoubleSide, MeshStandardMaterial, Object3D, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/shelf_1.glb?url';
import { replaceMaterialByName } from '@cuby-world/app/lib/utils/material';
import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import WallUnit from '@cuby-world/app/lib/classes/unit/Wall';
import { skinsMap } from './skins';

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
      size: new Vector3(1, 1.8, 1),
      wallOnly: false,
      selectable: true,
      placeable: true,
      moduleOptions: {
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

    const skin = skinsMap.get(this.getSkin())!;

    replaceMaterialByName(
      obj,
      MATERIAL_NAME.BASE,
      new MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        color: skin.options.color,
        side: DoubleSide,
        shadowSide: DoubleSide
      })
    );

    this.setMaterialReady();

    meshRoot.add(obj);

    meshRoot.traverse(child => {
      child.castShadow = true;
    });

    return meshRoot;
  }
}
