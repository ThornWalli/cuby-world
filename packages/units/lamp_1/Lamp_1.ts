import {
  PointLight,
  type MeshStandardMaterial,
  type Mesh,
  type Texture
} from 'three';
import { Color, Object3D, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/lamp_1.glb?url';
import { skinsMap } from './skins';
import type {
  Options as LightUnitOptions,
  Modules as LightUnitModules,
  ModuleList as LightUnitModuleList
} from '@cuby-world/app/lib/classes/unit/Light';
import LightUnit from '@cuby-world/app/lib/classes/unit/Light';
import assetLoader from '@cuby-world/app/services/assetLoader';
import { prepareTexture } from '@cuby-world/app/lib/utils/texture';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';

export type Modules = LightUnitModules & {};
export type ModuleList = LightUnitModuleList;
export interface LampOptions extends LightUnitOptions {
  color: number | string;
}
export default class Lamp_1 extends LightUnit<LampOptions> {
  static override KEY = 'lamp_1';
  static override NAME = 'Lamp_1';

  private light?: PointLight;
  private lightBulb?: Mesh;
  private texture: Texture | null = null;

  constructor(
    options: Omit<
      UnitConstructorOptions<LampOptions>,
      'name' | 'selectable'
    > = {},
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    super(
      {
        ...options,
        name: 'Lamp_1',
        accessible: false,
        selectable: true,
        placeable: true,
        rotateable: false,
        size: new Vector3(1, 0.6, 1)
      },
      moduleList as ModuleList
    );
  }

  setLightActive(active: boolean) {
    if (this.light && this.lightBulb) {
      const intensity = this.modules.light.getIntensity();
      const material = this.lightBulb.material as MeshStandardMaterial;
      material.emissiveIntensity = intensity;
      material.map = !active ? this.texture! : null;
      material.emissiveMap = active ? this.texture! : null;
      material.needsUpdate = true;
      this.light.intensity = intensity;
    }
  }

  override onActive() {
    this.setLightActive(true);
  }

  override onInactive() {
    this.setLightActive(false);
  }

  override onIntensity(intensity: number) {
    if (this.light && this.lightBulb) {
      const material = this.lightBulb.material as MeshStandardMaterial;
      material.emissiveIntensity = intensity;
      material.needsUpdate = true;
      this.light.intensity = intensity;
    }
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);

    const lightBulb = object.getObjectByName('light_bulb')! as Mesh;
    this.lightBulb = lightBulb;

    const skin = skinsMap.get(this.getSkin())!;

    const material = lightBulb.material as MeshStandardMaterial;

    material.emissive = new Color(skin.options.color);
    material.emissiveIntensity = this.modules.light.getIntensity();

    const [texture]: Texture[] = await Promise.all([
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: skin.options.texture!
      })
    ]);

    prepareTexture(texture!, { pixelrated: true });
    this.texture = texture!;
    material.map = texture!;

    this.setMaterialReady();

    meshRoot.traverse(child => {
      child.receiveShadow = false;
      child.castShadow = true;
    });

    const light = new PointLight(skin.options.color, 3, 3);
    this.light = light;
    light.decay = 0;
    light.intensity = this.modules.light.getIntensity();

    light.castShadow = true;
    // light.shadow.bias = -0.001;
    light.shadow.mapSize.set(64, 64);
    light.shadow.radius = 2;
    light.position.set(0, 0, 0);

    lightBulb.add(light);

    meshRoot.add(object);

    this._meshRoot = meshRoot;
    // _context.room?.app.renderer.scene.add(new PointLightHelper(light, 0.1));

    return meshRoot;
  }

  //#region visibility
  private _meshRoot?: Object3D;
  private _lastRootVisible: boolean | null = null;
  override setVisible(visible: boolean) {
    super.setVisible(visible);
  }
  override setRootVisible(
    visible = this.getVisible() && this.getChunkVisible()
  ) {
    if (this._lastRootVisible !== visible && this.light && this._meshRoot) {
      this._meshRoot.visible = visible;
      this.light.intensity = visible ? this.modules.light.getIntensity() : 0;
    }
    this._lastRootVisible = visible;
  }
  //#endregion
}
