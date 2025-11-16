import {
  type Group,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  type Vector2,
  type Vector3
} from 'three';
import Unit, {
  type PreviewOptions,
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import TeleporterUnitModule from '@cuby-world/app/lib/classes/unitModule/Teleporter';
import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';

export interface TeleporterUnitOptions extends UnitOptions {
  offset: Vector3;
  entryPosition: Vector2;
}

export type TeleporterUnitModules = UnitModules & {
  teleporter: TeleporterUnitModule;
};

export type TeleporterUnitModuleList = (typeof TeleporterUnitModule)[] &
  UnitModuleList;
export default class TeleporterUnit<
  Options extends TeleporterUnitOptions = TeleporterUnitOptions,
  Modules extends TeleporterUnitModules = TeleporterUnitModules,
  ModuleList extends TeleporterUnitModuleList = TeleporterUnitModuleList
> extends Unit<Options, Modules, ModuleList> {
  override previewOptions: PreviewOptions = {
    ground: false
  };
  meshRoot!: Group;

  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(TeleporterUnitModule);
    moduleList.push(AnimationUnitModule);
    super(options, moduleList);
  }

  setMeshRoot(meshRoot: Group) {
    this.meshRoot = meshRoot;
  }

  override getEntryPosition() {
    return this.options.entryPosition;
  }
  override async setup(context: SetupContext) {
    const root = super.setup(context);

    //#region Debug Entry Position
    if (this.debug) {
      const entryPosition = this.getEntryPosition();
      const startMesh = new Mesh(
        new BoxGeometry(0.1, 0.1, 0.1),
        new MeshBasicMaterial({ color: 0x00ff00 })
      );
      startMesh.position.set(entryPosition.y, 0, entryPosition.x);
      this.addToRoot(startMesh);
    }
    //#endregion

    return root;
  }

  async beforeEnter() {
    // can be overridden
  }
  async afterEnter() {
    // can be overridden
  }
  async beforeLeave() {
    // can be overridden
  }
  async afterLeave() {
    // can be overridden
  }

  override getSettingControls() {
    return [
      {
        title: 'Teleporter Settings',
        component: () =>
          import('../../../components/unitSettings/Teleporter.vue')
      }
    ];
  }
}
