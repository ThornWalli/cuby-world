import type { CubeTexture } from 'three';
import {
  AnimationClip,
  LoopPingPong,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointLight,
  SphereGeometry,
  VectorKeyframeTrack
} from 'three';

import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';

import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';

import image_sky_box_1_nx from './assets/sky_box_1/nx.png';
import image_sky_box_1_ny from './assets/sky_box_1/ny.png';
import image_sky_box_1_nz from './assets/sky_box_1/nz.png';
import image_sky_box_1_px from './assets/sky_box_1/px.png';
import image_sky_box_1_py from './assets/sky_box_1/py.png';
import image_sky_box_1_pz from './assets/sky_box_1/pz.png';
import { defaultMaterial } from '../utils/material';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';

import LightUnit from '@cuby-world/app/lib/classes/unit/Light';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/types/animation';
import type {
  Options as LightUnitOptions,
  Modules as LightUnitModules,
  ModuleList as LightUnitModuleList
} from '@cuby-world/app/lib/classes/unit/Light';

export type Modules = LightUnitModules & {
  animation: AnimationUnitModule;
};
export type ModuleList = LightUnitModuleList & (typeof AnimationUnitModule)[];

export interface LampOptions extends LightUnitOptions {
  size: number;
}

export default class Lamp_1 extends LightUnit<LampOptions> {
  static override KEY = 'lamp_test';
  static override NAME = 'Lamp Test';

  private lightActive: boolean = false;
  private light?: PointLight;

  constructor(
    options: Omit<
      UnitConstructorOptions<LampOptions>,
      'name' | 'selectable'
    > = {},
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(AnimationUnitModule);
    super(
      {
        ...options,
        name: 'Lamp Test',
        selectable: true,
        placeable: true,
        options: {
          size: 0.5,
          ...options.options
        }
      },
      moduleList
    );
  }

  override async setup(context: SetupContext): Promise<void> {
    await super.setup(context);

    this.modules.animation
      ?.getAction(ANIMATION_ACTION.IDLE)
      ?.setLoop(LoopPingPong, Infinity);
  }
  getInnerMesh() {
    return this._meshRoot?.getObjectByName('inner_mesh') as Mesh;
  }

  override onActive(): void {
    if (this.light) {
      this.light.intensity = 1;
      (this.getInnerMesh().material as MeshStandardMaterial).color.set(
        0xffffff
      );
      (this.getInnerMesh().material as MeshStandardMaterial).emissiveIntensity =
        1;
      this.lightActive = true;
    }
    this.modules.animation?.setAnimationAction(ANIMATION_ACTION.IDLE);
  }

  override onInactive(): void {
    if (this.light) {
      this.light.intensity = 0;
      (this.getInnerMesh().material as MeshStandardMaterial).color.set(
        0x000000
      );
      (this.getInnerMesh().material as MeshStandardMaterial).emissiveIntensity =
        0;
      this.lightActive = false;
    }
    this.modules.animation?.setAnimationAction(ANIMATION_ACTION.NONE);
  }

  override async createMesh({ assetLoader }: SetupContext) {
    const geometry = new SphereGeometry(0.3, 32, 16);

    const meshRoot = new Mesh(geometry, defaultMaterial());

    const lampGeometry = new SphereGeometry(0.1, 32, 16);
    const lampMaterial = new MeshStandardMaterial({
      emissive: 0xffff99,
      emissiveIntensity: 1
    });
    const innerMesh = new Mesh(lampGeometry, lampMaterial);
    innerMesh.name = 'inner_mesh';
    innerMesh.castShadow = true;
    innerMesh.receiveShadow = false;
    meshRoot.add(innerMesh);

    meshRoot.name = OBJECT_NAME.MESH;
    meshRoot.position.set(0, 0.5, 0);

    setupMaterials(assetLoader, meshRoot, () => {
      this.setMaterialReady();
    });

    const light = new PointLight(0xffeeaa, 1, 2);
    this.light = light;
    light.intensity = 0;
    light.decay = 2;
    light.castShadow = true;
    light.shadow.mapSize.set(64, 64);
    light.shadow.radius = 4;

    meshRoot.add(light);

    this._meshRoot = meshRoot;

    this.modules.animation?.setAnimations([
      getHoverClip(0.05),
      getNoneClip(-0.2)
    ]);

    return meshRoot;
  }

  //#region visibility
  private _meshRoot?: Mesh;
  private _lastRootVisible: boolean | null = null;
  override setVisible(visible: boolean) {
    super.setVisible(visible);
  }
  override setRootVisible(
    visible = this.getVisible() && this.getChunkVisible()
  ) {
    if (this._lastRootVisible !== visible && this.light && this._meshRoot) {
      this._meshRoot.visible = visible;
      this.light.intensity = this.lightActive && visible ? 1 : 0;
    }
    this._lastRootVisible = visible;
  }
  //#endregion
}

async function setupMaterials(
  assetLoader: AssetLoader,
  mesh: Mesh,
  cb?: CallableFunction
) {
  await assetLoader
    .add<CubeTexture>({
      loader: LOADER.CUBE_TEXTURE,
      value: [
        image_sky_box_1_px,
        image_sky_box_1_nx,
        image_sky_box_1_py,
        image_sky_box_1_ny,
        image_sky_box_1_pz,
        image_sky_box_1_nz
      ]
    })
    .then(textures => {
      mesh.material = new MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transparent: true,
        transmission: 1, // Wichtig für die Lichtdurchlässigkeit wie bei Glas
        thickness: 0.1, // Dicke des Glases für Lichtbrechungseffekte
        envMap: textures
      });
    });
  if (cb) {
    cb();
  }
}

function getHoverClip(strength = 0.05, duration = 2) {
  const times = [0, duration];
  const values = [-strength, strength];

  const hoverTrack = new VectorKeyframeTrack('.position[y]', times, values);
  const clip = new AnimationClip(ANIMATION_ACTION.IDLE, -1, [hoverTrack]);

  return clip;
}

function getNoneClip(strength = 0) {
  const times = [0, 1];
  const values = [strength, strength];

  const noneTrack = new VectorKeyframeTrack('.position[y]', times, values);
  const clip = new AnimationClip(ANIMATION_ACTION.NONE, -1, [noneTrack]);

  return clip;
}
