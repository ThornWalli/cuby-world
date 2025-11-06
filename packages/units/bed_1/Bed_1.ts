import { Object3D, Vector3 } from 'three';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/bed_1.glb?url';
import BedUnitModule from '@cuby-world/app/lib/classes/unitModule/Bed';
import type { BedUnitOptions } from '@cuby-world/app/lib/classes/unitModule/Bed';

type BedUnitModules = UnitModules & {
  bed: BedUnitModules;
};

type BedUnitModuleList = (typeof BedUnitModule)[] & UnitModuleList;

export type BedOptions = BedUnitOptions;
export default class Bed_1 extends Unit<
  BedOptions,
  BedUnitModules,
  BedUnitModuleList
> {
  static override KEY = 'bed_1';
  static override NAME = 'Bed_1';

  constructor(
    options: Omit<
      UnitConstructorOptions<BedOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super(
      {
        ...options,
        name: 'Bed_1',
        accessible: true,
        selectable: true,
        placeable: true,
        size: new Vector3(2, 0.3, 1),
        options: {
          offset: new Vector3(-0.6, -0.45, 0)
        }
      },
      [BedUnitModule] as unknown as BedUnitModuleList
    );
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);

    meshRoot.position.set(0, 0, 0);

    this.observables.materialReady$.next();

    meshRoot.add(object);

    meshRoot.traverse(child => {
      child.castShadow = true;
    });

    return meshRoot;
  }
}
