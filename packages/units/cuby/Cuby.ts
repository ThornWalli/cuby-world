import type { AnimationMixer, Texture } from 'three';
import {
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  Clock,
  LoopPingPong
} from 'three';

import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModules,
  type UnitOptions
} from '../../app/lib/classes/Unit';
import { getHoverClip } from '../../app/lib/utils/animation';
import type { UnitModuleSetupContext } from '../../app/lib/classes/UnitModule';
import { AnimationUnitModule } from '../../app/lib/classes/unitModule/Animation';

import image_cuby_top from './assets/top.png';
import image_cuby_bottom from './assets/bottom.png';
import image_cuby_left from './assets/left.png';
import image_cuby_right from './assets/right.png';
import image_cuby_front from './assets/front.png';
import image_cuby_back from './assets/back.png';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import { defaultMaterial } from '../utils/material';

const NAME_MESH = 'Mesh';

export interface CubyOptions extends UnitOptions {
  size: number;
}
export default class Cuby extends Unit<
  CubyOptions,
  UnitModules & { animation: UnitAnimation }
> {
  static override KEY = 'cuby';
  static override NAME = 'Cuby';

  clock: Clock = new Clock();
  mixer?: AnimationMixer;

  constructor(
    options: Omit<UnitConstructorOptions, 'name' | 'selectable'> = {}
  ) {
    super(
      {
        ...options,
        name: 'Cuby',
        selectable: true,
        options: {
          size: 0.5,
          ...options.options
        }
      },
      [UnitAnimation]
    );
    this.clock = new Clock();
  }

  override createMesh({ assetLoader }: SetupContext) {
    const size = this.options.size;
    const ratio = 19 / 20;
    const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

    const mesh: Mesh = new Mesh(geometry, defaultMaterial());

    setupMaterials(assetLoader, mesh, () => {
      this.materialReady$.next();
    });

    mesh.name = NAME_MESH;
    mesh.castShadow = true;
    mesh.position.set(0, (size * ratio) / 2 + 0.2, 0);

    return mesh;
  }
}

function setupMaterials(
  textures: AssetLoader,
  mesh: Mesh,
  cb?: CallableFunction
) {
  Promise.all(
    [
      image_cuby_front,
      image_cuby_back,
      image_cuby_left,
      image_cuby_right,
      image_cuby_top,
      image_cuby_bottom
    ].map(url => textures.add<Texture>({ loader: LOADER.TEXTURE, url }))
  ).then(textures => {
    mesh.material = textures.map(
      texture =>
        new MeshPhongMaterial({
          map: texture,
          shininess: 100, // Glanz (hoch für "hell")
          specular: 0xffffff // weiße Lichtreflexe
        })
    );
    if (cb) {
      cb();
    }
  });
}

class UnitAnimation extends AnimationUnitModule {
  override async setup(context: UnitModuleSetupContext) {
    const mesh = await super.setup(context);

    const hoverClip = getHoverClip();
    const action = this.mixer.clipAction(hoverClip);
    action.setLoop(LoopPingPong, Infinity);

    window.setTimeout(() => {
      action.play();
    }, Math.random() * 250);

    console.log('Cuby setup complete with animation:', action);

    return mesh;
  }
  override update(_deltaTime: number) {
    this.mixer?.update(this.clock.getDelta());
  }
}
