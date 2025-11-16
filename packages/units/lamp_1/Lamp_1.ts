import type { CubeTexture } from 'three';
import {
  LoopPingPong,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointLight,
  SphereGeometry
} from 'three';

import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { getHoverClip } from '@cuby-world/app/lib/utils/animation';
import type { UnitModuleSetupContext } from '@cuby-world/app/lib/classes/UnitModule';
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
import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';

export interface LampOptions extends UnitOptions {
  size: number;
}

export default class Lamp_1 extends Unit<
  LampOptions,
  UnitModules & { animation: UnitAnimation }
> {
  static override KEY = 'lamp_1';
  static override NAME = 'Lamp 1';

  constructor(
    options: Omit<
      UnitConstructorOptions<LampOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super(
      {
        ...options,
        name: 'Lamp 1',
        selectable: true,
        placeable: true,
        options: {
          size: 0.5,
          ...options.options
        }
      },
      [UnitAnimation]
    );
  }

  override async createMesh({ assetLoader }: SetupContext) {
    const geometry = new SphereGeometry(0.3, 32, 16);
    // const material = new MeshBasicMaterial({ color: 0xffff00 });

    const mesh = new Mesh(geometry, defaultMaterial());

    // const lampGeometry = new SphereGeometry(0.1, 32, 16);
    // const lampMaterial = new MeshBasicMaterial({ color: 0xffff00 });

    // const light = new PointLight(0xffffff, 1, 8);
    // light.position.set(0, 0, 0);
    // light.castShadow = true;

    // light.shadow.mapSize.width = 128;
    // light.shadow.mapSize.height = 128;
    // light.shadow.camera.near = 1;
    // light.shadow.camera.far = 50;
    // light.shadow.camera.updateProjectionMatrix();

    // mesh.add(light);

    const lampGeometry = new SphereGeometry(0.1, 32, 16);
    const lampMaterial = new MeshStandardMaterial({
      emissive: 0xffff99,
      emissiveIntensity: 2
    });
    const innerMesh = new Mesh(lampGeometry, lampMaterial);
    mesh.add(innerMesh);

    mesh.name = OBJECT_NAME.MESH;
    mesh.position.set(0, 0.5, 0);

    setupMaterials(assetLoader, mesh, () => {
      this.setMaterialReady();
    });

    const light = new PointLight(0xffeeaa, 1, 2);
    light.decay = 2;
    light.castShadow = true;
    light.shadow.mapSize.set(128, 128);
    light.shadow.radius = 4;

    mesh.add(light);
    return mesh;
  }
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

class UnitAnimation extends AnimationUnitModule {
  override async setup(context: UnitModuleSetupContext) {
    const mesh = await super.setup(context);

    const hoverClip = getHoverClip(0.03);
    const action = this.mixer.clipAction(hoverClip);
    action.setLoop(LoopPingPong, Infinity);

    window.setTimeout(() => {
      action.play();
    }, Math.random() * 1000);

    return mesh;
  }
  override update({ delta }: AnimationLoopValue) {
    this.mixer?.update(delta);
  }
}
