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
import { skinsMap } from './skins';
import {
  getEntryConditionDirections,
  RELATIVE_ENTRY
} from '@cuby-world/app/lib/utils/pathfindng';
import WallUnitModule from '@cuby-world/app/lib/classes/unitModule/Wall';
import type {
  Options as ShelfUnitOptions,
  Modules as ShelfUnitModules,
  ModuleList as SinkUnitModuleList
} from '@cuby-world/app/lib/classes/unit/Shelf';
import ShelfUnit from '@cuby-world/app/lib/classes/unit/Shelf';

export type Modules = ShelfUnitModules & {
  wall: WallUnitModule;
};
export type ModuleList = (typeof WallUnitModule)[] & SinkUnitModuleList;
export type Options = ShelfUnitOptions & {
  color: number | string;
};

export default class Shelf_1 extends ShelfUnit<Options, Modules, ModuleList> {
  static override KEY = 'shelf_1';
  static override NAME = 'Shelf_1';
  private meshRoot?: Object3D;

  constructor(
    options: Omit<UnitConstructorOptions<Options>, 'name' | 'selectable'> = {},
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(WallUnitModule);
    super(
      {
        ...options,
        name: 'Shelf_1',
        size: new Vector3(1, 1.8, 1),
        accessible: true,
        wallOnly: false,
        selectable: true,
        placeable: true,
        moduleOptions: {
          wall: {
            offset: new Vector3(-0.275, 0, 0)
          }
        }
      },
      moduleList
    );
  }

  override setup(context: SetupContext) {
    this.subscription.add(
      this.modules.wall.observables.hasWall$.subscribe(hasWall => {
        if (hasWall) {
          this.meshRoot?.position.set(0, 0, 0);
        } else {
          this.meshRoot?.position.set(-0.375, 0, 0);
        }
      })
    );
    return super.setup(context);
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();
    this.meshRoot = meshRoot;

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

  override getConditionDirections() {
    return getEntryConditionDirections(
      this.getPosition().clone(),
      this.getRotation(),
      [RELATIVE_ENTRY.FRONT, RELATIVE_ENTRY.LEFT, RELATIVE_ENTRY.RIGHT]
    );
  }
}
