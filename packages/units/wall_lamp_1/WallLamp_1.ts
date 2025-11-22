import type { Mesh } from 'three';
import { MeshStandardMaterial, Object3D, PointLight, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/wall_lamp_1.glb?url';
import { skinsMap } from './skins';
import WallLightUnit from '@cuby-world/app/lib/classes/unit/wall/Light';
import WallUnitModule from '@cuby-world/app/lib/classes/unitModule/Wall';
import type {
  Options as LightUnitOptions,
  Modules as LightUnitModules,
  ModuleList as LightUnitModuleList
} from '@cuby-world/app/lib/classes/unit/Light';

export type Modules = LightUnitModules & {
  wall: WallUnitModule;
};
export type ModuleList = LightUnitModuleList & (typeof WallUnitModule)[];
export interface WallLampBoxOptions extends LightUnitOptions {
  color: number | string;
}
export default class WallLamp_1 extends WallLightUnit<WallLampBoxOptions> {
  static override KEY = 'wallLamp_1';
  static override NAME = 'WallLamp_1';

  private light?: PointLight;
  private lightBulb?: Mesh;

  constructor(
    options: Omit<
      UnitConstructorOptions<WallLampBoxOptions>,
      'name' | 'selectable'
    > = {},
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(WallUnitModule);
    super(
      {
        ...options,
        name: 'WallLamp_1',
        wallOnly: true,
        accessible: true,
        selectable: true,
        placeable: true,
        rotateable: false,
        size: new Vector3(1, 0.1, 1),
        moduleOptions: {
          wall: {
            offset: new Vector3(-0.4, 1.4, 0)
          }
        }
      },
      moduleList
    );
  }

  override setup(context: SetupContext): Promise<void> {
    this.subscription.add(
      this.modules.light.observables.active$.subscribe((active: boolean) => {
        if (this.light && this.lightBulb) {
          this.light.visible = active;
          (this.lightBulb.material as MeshStandardMaterial).emissiveIntensity =
            active ? 1 : 0;
        }
      })
    );

    return super.setup(context);
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);
    const obj = object.getObjectByName('empty')!;
    obj.position.set(0, 0, 0); // reset Position

    if (this.isPreview()) {
      const obj = object.getObjectByName('empty')!;
      obj.position.set(-0.025, 0, -0.025);
    }

    const lightBulb = object.getObjectByName('light_bulb')! as Mesh;
    this.lightBulb = lightBulb;

    lightBulb.castShadow = false;
    lightBulb.receiveShadow = false;

    const skin = skinsMap.get(this.getSkin())!;

    lightBulb.material = new MeshStandardMaterial({
      color: skin.options.color,
      emissive: skin.options.color,
      emissiveIntensity: 1
    });

    const light = new PointLight(this.options.color, 3, 3);
    this.light = light;
    light.decay = 0;
    light.visible = false;

    light.castShadow = true;
    // light.shadow.bias = -0.001;
    light.shadow.mapSize.set(64, 64);
    light.shadow.radius = 2;
    light.position.set(0.4, 0, 0);

    lightBulb.add(light);

    this.setMaterialReady();
    meshRoot.add(object);

    // _context.room?.app.renderer.scene.add(new PointLightHelper(light, 0.1));

    return meshRoot;
  }
}
