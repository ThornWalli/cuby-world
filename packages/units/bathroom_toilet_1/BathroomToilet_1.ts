import { Object3D, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/bathroom_toilet_1.glb?url';
import ToiletUnit, {
  type ToiletUnitModuleList,
  type ToiletUnitModules,
  type ToiletUnitOptions
} from '@cuby-world/app/lib/classes/unit/Toilet';
import WallUnitModule from '@cuby-world/app/lib/classes/unitModule/Wall';

export type Modules = ToiletUnitModules & {
  wall: WallUnitModule;
};
export type ModuleList = (typeof WallUnitModule)[] & ToiletUnitModuleList;

export type BathroomToiletOptions = ToiletUnitOptions;
export default class BathroomToilet_1 extends ToiletUnit<
  BathroomToiletOptions,
  Modules,
  ModuleList
> {
  static override KEY = 'bathroom_toilet_1';
  static override NAME = 'Bathroom Toilet 1';

  constructor(
    options: Omit<
      UnitConstructorOptions<BathroomToiletOptions>,
      'name' | 'selectable'
    > = {},
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(WallUnitModule);
    super(
      {
        ...options,
        name: 'Bathroom Toilet 1',
        accessible: true,
        selectable: true,
        placeable: true,
        size: new Vector3(1, 0.4, 1),
        options: {
          offset: new Vector3(0.05, -0.375, 0)
        },
        moduleOptions: {
          wall: {
            offset: new Vector3(-0.05, 0, 0)
          }
        }
      },
      moduleList
    );
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object, animations } = await loadGltf(glbBase);

    this.modules.animation?.setAnimations(animations);

    meshRoot.position.set(0, 0, 0);

    this.setMaterialReady();

    meshRoot.add(object);

    meshRoot.traverse(child => {
      child.castShadow = true;
    });

    return meshRoot;
  }
}
