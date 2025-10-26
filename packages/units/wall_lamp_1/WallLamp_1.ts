import type { Mesh } from 'three';
import { MeshStandardMaterial, Object3D, PointLight, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions,
  UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/wall_lamp_1.glb?url';
import WallUnit from '@cuby-world/app/lib/classes/unit/Wall';

export interface WallLampBoxOptions extends UnitOptions {
  color: number | string;
}
export default class WallLamp_1 extends WallUnit<WallLampBoxOptions> {
  static override KEY = 'wallLamp_1';
  static override NAME = 'WallLamp_1';

  constructor(
    options: Omit<
      UnitConstructorOptions<WallLampBoxOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'WallLamp_1',
      wallOnly: true,
      accessible: true,
      selectable: true,
      placeable: true,
      options: {
        canRotate: false,
        color: 0xffeeaa,
        ...options.options
      },
      moduleStates: {
        wall: {
          offset: new Vector3(-0.4, 1.6, 0)
        }
      }
    });
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);
    const obj = object.getObjectByName('empty')!;
    obj.position.set(0, 0, 0); // reset Position

    if (this.isPreview()) {
      const obj = object.getObjectByName('empty')!;
      obj.position.set(-0.025, 0, -0.025);
      // obj?.rotateY(Math.PI);
    }

    const lightBulb = object.getObjectByName('light_bulb')!;
    lightBulb.castShadow = false;
    lightBulb.receiveShadow = false;

    (lightBulb as Mesh).material = new MeshStandardMaterial({
      color: this.options.color,
      emissive: this.options.color,
      emissiveIntensity: 1
    });

    const light = new PointLight(this.options.color, 1, 3);
    light.decay = 2;
    light.castShadow = true;
    light.shadow.mapSize.set(128, 128);
    light.shadow.radius = 2;
    light.position.set(0.4, 0, 0);

    lightBulb.add(light);

    this.observables.materialReady$.next();
    meshRoot.add(object);
    return meshRoot;
  }
}
