import { Object3D, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/bathroom_sink_1.glb?url';

import {
  getEntryConditionDirections,
  RELATIVE_ENTRY
} from '@cuby-world/app/lib/utils/pathfindng';
import SinkUnit, {
  type Modules as SinkUnitModules,
  type ModuleList as SinkUnitModuleList,
  type Options as SinkUnitOptions
} from '@cuby-world/app/lib/classes/unit/Sink';
import WallUnitModule from '@cuby-world/app/lib/classes/unitModule/Wall';

export type Modules = SinkUnitModules & {
  wall: WallUnitModule;
};
export type ModuleList = (typeof WallUnitModule)[] & SinkUnitModuleList;

export type Options = SinkUnitOptions;
export default class BathroomSink_1 extends SinkUnit<
  Options,
  Modules,
  ModuleList
> {
  static override KEY = 'bathroom_sink_1';
  static override NAME = 'Bathroom Sink 1';
  private meshRoot?: Object3D;

  constructor(
    options: Omit<UnitConstructorOptions<Options>, 'name' | 'selectable'> = {},
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(WallUnitModule);
    super(
      {
        ...options,
        name: 'Bathroom Sink 1',
        accessible: true,
        selectable: true,
        placeable: true,
        size: new Vector3(1, 0, 1),
        options: {
          offset: new Vector3(-0.25, 0, 0)
        },
        moduleOptions: {
          wall: {
            offset: new Vector3(-0.18, 0, 0)
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
          this.meshRoot?.position.set(-0.2, 0, 0);
        }
      })
    );
    return super.setup(context);
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();
    this.meshRoot = meshRoot;
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

  override getConditionDirections() {
    return getEntryConditionDirections(
      this.getPosition().clone(),
      this.getRotation(),
      [RELATIVE_ENTRY.FRONT]
    );
  }
}
