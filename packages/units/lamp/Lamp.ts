import type { CubeTexture } from 'three';
import {
  LoopPingPong,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PointLight,
  SphereGeometry
} from 'three';

import Unit, {
  OBJECT_NAME,
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModules,
  type UnitOptions
} from '../../app/lib/classes/Unit';
import { getHoverClip } from '../../app/lib/utils/animation';
import type { UnitModuleSetupContext } from '../../app/lib/classes/UnitModule';
import { AnimationUnitModule } from '../../app/lib/classes/unitModule/Animation';

import image_sky_box_1_nx from './assets/sky_box_1/nx.png';
import image_sky_box_1_ny from './assets/sky_box_1/ny.png';
import image_sky_box_1_nz from './assets/sky_box_1/nz.png';
import image_sky_box_1_px from './assets/sky_box_1/px.png';
import image_sky_box_1_py from './assets/sky_box_1/py.png';
import image_sky_box_1_pz from './assets/sky_box_1/pz.png';
import { defaultMaterial } from '../utils/material';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';

export interface LampOptions extends UnitOptions {
  size: number;
}

export default class Lamp extends Unit<
  LampOptions,
  UnitModules & { animation: UnitAnimation }
> {
  static override KEY = 'lamp';
  static override NAME = 'Lamp';

  constructor(
    options: Omit<
      UnitConstructorOptions<LampOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super(
      {
        ...options,
        name: 'Lamp',
        selectable: true,
        options: {
          size: 0.5,
          ...options.options
        }
      },
      [UnitAnimation]
    );
  }

  override createMesh({ assetLoader }: SetupContext) {
    const geometry = new SphereGeometry(0.3, 32, 16);
    // const material = new MeshBasicMaterial({ color: 0xffff00 });

    const mesh = new Mesh(geometry, defaultMaterial());

    setupMaterials(assetLoader, mesh, () => {
      this.materialReady$.next();
    });

    const lampGeometry = new SphereGeometry(0.1, 32, 16);
    const lampMaterial = new MeshBasicMaterial({ color: 0xffff00 });
    const innerMesh = new Mesh(lampGeometry, lampMaterial);

    mesh.add(innerMesh);
    mesh.name = OBJECT_NAME.MESH;
    mesh.position.set(0, 0.5, 0);

    const light = new PointLight(0xffffff, 3, 10);
    light.position.set(0, 0, 0);
    light.castShadow = true;

    light.shadow.mapSize.width = 128;
    light.shadow.mapSize.height = 128;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 50;
    light.shadow.camera.updateProjectionMatrix();

    mesh.add(light);

    this.materialReady$.next();
    return mesh;
  }
}

function setupMaterials(
  assetLoader: AssetLoader,
  mesh: Mesh,
  cb?: CallableFunction
) {
  assetLoader
    .add<CubeTexture>({
      loader: LOADER.CUBE_TEXTURE,
      url: [
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
  override update(_deltaTime: number) {
    this.mixer?.update(this.clock.getDelta());
  }
}
