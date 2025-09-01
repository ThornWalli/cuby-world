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
import image_cuby_back from './assets/back.png';
// import image_cuby_front from './assets/front.png';

import image_cuby_face_default from './assets/face/default.png';
import image_cuby_face_dead from './assets/face/dead.png';
import image_cuby_face_sleep_1 from './assets/face/sleep_1.png';
import image_cuby_face_sleep_2 from './assets/face/sleep_2.png';
import image_cuby_face_speak_1 from './assets/face/speak_1.png';

import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import { defaultMaterial } from '../utils/material';

const NAME_MESH = 'Mesh';

export enum CUBY_COLOR {
  BLUE = 'blue',
  GREEN = 'green',
  BROWN = 'brown',
  ORANGE = 'orange',
  LIGHTORANGE = 'lightorange',
  DARKBROWN = 'darkbrown'
}

export const CUBY_NAME = {
  [CUBY_COLOR.BLUE]: 'Blue ',
  [CUBY_COLOR.GREEN]: 'Green ',
  [CUBY_COLOR.BROWN]: 'Brown ',
  [CUBY_COLOR.ORANGE]: 'Orange ',
  [CUBY_COLOR.LIGHTORANGE]: 'Light Orange ',
  [CUBY_COLOR.DARKBROWN]: 'Dark Brown '
};

export const colors = [
  0x0066ff, 0x447821, 0x800000, 0xff7f2a, 0xffb380, 0x502d16
];
export interface CubyOptions extends UnitOptions {
  size: number;
  state: CUBY_STATE;
  color: CUBY_COLOR;
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
    options: Omit<
      UnitConstructorOptions<Partial<CubyOptions>>,
      'name' | 'selectable'
    > = {}
  ) {
    super(
      {
        ...options,
        name: 'Cuby',
        selectable: true,
        placeable: true,
        options: {
          size: 0.5,
          color: CUBY_COLOR.BLUE,
          state: CUBY_STATE.DEFAULT,
          ...options.options
        }
      },
      [UnitAnimation]
    );
    this.clock = new Clock();
  }

  assetsByCubyState?: { [key in CUBY_STATE]: MeshPhongMaterial[] };
  override createMesh({ assetLoader }: SetupContext) {
    const size = this.options.size;
    const ratio = 19 / 20;
    const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

    const mesh: Mesh = new Mesh(geometry, defaultMaterial());

    setupMaterials(this, mesh, assetLoader).then(assets => {
      this.assetsByCubyState = assets;
      this.setCubyState(this.options.state);
      this.materialReady$.next();
    });

    mesh.name = NAME_MESH;
    mesh.castShadow = true;
    mesh.position.set(0, (size * ratio) / 2 + 0.2, 0);

    return mesh;
  }

  setCubyState(state: CUBY_STATE) {
    if (!this.assetsByCubyState) {
      throw new Error('Cuby materials not ready yet');
    }
    const mesh = this.mesh;
    mesh.material = this.assetsByCubyState[state];
  }
}

enum CUBY_STATE {
  DEFAULT,
  DEAD,
  SLEEP_1,
  SLEEP_2,
  SPEAK_1
}

async function setupMaterials(unit: Cuby, mesh: Mesh, textures: AssetLoader) {
  const faceAssets = {
    [CUBY_STATE.DEFAULT]: image_cuby_face_default,
    [CUBY_STATE.DEAD]: image_cuby_face_dead,
    [CUBY_STATE.SLEEP_1]: image_cuby_face_sleep_1,
    [CUBY_STATE.SLEEP_2]: image_cuby_face_sleep_2,
    [CUBY_STATE.SPEAK_1]: image_cuby_face_speak_1
  };

  const texturesByFace = Object.fromEntries(
    await Promise.all(
      Object.entries(faceAssets).map(async ([face, url]) => {
        return [
          face,
          (
            await Promise.all(
              [
                url, // image_cuby_front,
                image_cuby_back,
                image_cuby_left,
                image_cuby_right,
                image_cuby_top,
                image_cuby_bottom
              ].map(url =>
                textures.add<Texture>({ loader: LOADER.TEXTURE, url })
              )
            )
          ).map(
            texture =>
              new MeshPhongMaterial({
                transparent: true,
                map: texture,
                color: 0xffffff,
                shininess: 100,
                specular: 0xffffff
              })
          )
        ];
      })
    )
  );

  // background mesh
  if (!mesh.getObjectByName('cuby_background')) {
    const backgroundMesh = new Mesh(
      mesh.geometry.clone(),
      new MeshPhongMaterial({ color: unit.options.color })
    );
    backgroundMesh.name = 'cuby_background';
    mesh.add(backgroundMesh);
  }

  return texturesByFace;
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
