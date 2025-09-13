import type { AnimationMixer, Texture } from 'three';
import {
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  Clock,
  LoopPingPong,
  PlaneGeometry
} from 'three';

import Unit, {
  OBJECT_NAME,
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { getHoverClip } from '@cuby-world/app/lib/utils/animation';
import type { UnitModuleSetupContext } from '@cuby-world/app/lib/classes/UnitModule';
import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';

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

import image_sleep_1 from './assets/sleep/sleep_1.png';
import image_sleep_2 from './assets/sleep/sleep_2.png';
import image_sleep_3 from './assets/sleep/sleep_3.png';
import image_sleep_4 from './assets/sleep/sleep_4.png';

import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import { defaultMaterial } from '../utils/material';
import type { MovementModuleOptions } from '@cuby-world/app/lib/classes/unitModule/Movement';

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

export const CUBY_COLOR_VALUE = {
  [CUBY_COLOR.BLUE]: 0x0066ff,
  [CUBY_COLOR.GREEN]: 0x447821,
  [CUBY_COLOR.BROWN]: 0x800000,
  [CUBY_COLOR.ORANGE]: 0xff7f2a,
  [CUBY_COLOR.LIGHTORANGE]: 0xffb380,
  [CUBY_COLOR.DARKBROWN]: 0x502d16
};

export const colors = [
  0x0066ff, 0x447821, 0x800000, 0xff7f2a, 0xffb380, 0x502d16
];
export interface CubyOptions extends UnitOptions<MovementModuleOptions> {
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
          movement: {
            diagonalMovement: true,
            stepDuration: 325,
            rotationDuration: 125
          },
          size: 0.6,
          color: CUBY_COLOR.BLUE,
          state: CUBY_STATE.DEFAULT,
          ...options.options
        }
      },
      [UnitAnimation]
    );

    this.clock = new Clock();
  }

  override destroy(): void {
    super.destroy();
    clearInterval(this._sleepPlain?.userData.interval);
  }

  sleepTimer?: number;
  override async setup(context: SetupContext) {
    await super.setup(context);
    if (this.root.getObjectByName(OBJECT_NAME.MESH_ANIMATION)) {
      const sleepPlain = createSleepPlain();
      sleepPlain.rotateY(Math.PI / 2);
      sleepPlain.position.set(0, 1, 0.45);
      this.root.getObjectByName(OBJECT_NAME.MESH_ANIMATION)!.add(sleepPlain);
      this._sleepPlain = sleepPlain;
    }
    this.subscription.add(
      this.modules.movement.moveStart$.subscribe(() => {
        this.wakeUp();
      })
    );
    this.subscription.add(
      this.modules.movement.moveEnd$.subscribe(() => {
        this.sleep();
      })
    );
  }

  wakeUp() {
    window.clearTimeout(this.sleepTimer);
    this.stopSleepIndicator();
    this.setCubyState(CUBY_STATE.DEFAULT);
  }

  sleep() {
    const durationFactor = 1;
    window.clearTimeout(this.sleepTimer);
    this.sleepTimer = window.setTimeout(() => {
      this.setCubyState(CUBY_STATE.SLEEP_1);
      this.sleepTimer = window.setTimeout(() => {
        this.setCubyState(CUBY_STATE.SLEEP_2);

        this.startSleepIndicator();
      }, 5000 * durationFactor);
    }, 5000 * durationFactor);
  }

  assetsByCubyState?: { [key in CUBY_STATE]: MeshPhongMaterial[] };
  private _sleepPlain?: Mesh;
  override createMesh({ assetLoader }: SetupContext) {
    const size = this.options.size;
    const ratio = 19 / 20;
    const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

    const mesh: Mesh = new Mesh(geometry, defaultMaterial());

    setupBodyMaterials(this, mesh, assetLoader).then(assets => {
      this.assetsByCubyState = assets;
      this.setCubyState(this.options.state);
      this.materialReady$.next();
    });

    mesh.name = OBJECT_NAME.MESH;
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

  setColor(color: CUBY_COLOR) {
    this.options.color = color;
    const backgroundMesh = this.mesh.getObjectByName('cuby_background') as Mesh;
    if (backgroundMesh) {
      (backgroundMesh.material as MeshPhongMaterial).color.set(
        CUBY_COLOR_VALUE[color]
      );
    }
  }

  private _sleepFrameDuration = 1600;
  private _sleepTimeout?: ReturnType<typeof setTimeout>;
  startSleepIndicator() {
    let index = 0;
    const sleepPlain = this.root.getObjectByName('sleep_plain') as Mesh;
    if (!sleepPlain) return;

    const mesh = sleepPlain;
    setupSleepMaterials(this.assetLoader!).then(assets => {
      mesh.material = assets[index]!;
      mesh.visible = true;
      mesh.userData.interval = setInterval(() => {
        index = (index + 1) % assets.length;
        mesh.material = assets[index]!;
      }, this._sleepFrameDuration);
    });
  }

  stopSleepIndicator() {
    const sleepPlain = this.root.getObjectByName('sleep_plain') as Mesh;
    if (sleepPlain) {
      clearInterval(sleepPlain.userData.interval);
      sleepPlain.visible = false;
    }
    clearTimeout(this._sleepTimeout);
  }
}

enum CUBY_STATE {
  DEFAULT,
  DEAD,
  SLEEP_1,
  SLEEP_2,
  SPEAK_1
}

function createSleepPlain() {
  const size = 0.3;
  const ratio = 48 / 34;
  const geometry = new PlaneGeometry(size, ratio * size);

  const mesh = new Mesh(geometry, defaultMaterial());
  mesh.name = 'sleep_plain';
  mesh.visible = false;

  return mesh;
}

async function setupSleepMaterials(textures: AssetLoader) {
  const assets = [image_sleep_1, image_sleep_2, image_sleep_3, image_sleep_4];

  const materials = (
    await Promise.all(
      assets.map(url => textures.add<Texture>({ loader: LOADER.TEXTURE, url }))
    )
  ).map(
    texture =>
      new MeshPhongMaterial({
        transparent: true,
        side: 2,
        map: texture,
        color: 0xffffff,
        shininess: 100,
        specular: 0xffffff
      })
  );

  return materials;
}

async function setupBodyMaterials(
  unit: Cuby,
  mesh: Mesh,
  textures: AssetLoader
) {
  const faceAssets = {
    [CUBY_STATE.DEFAULT]: image_cuby_face_default,
    [CUBY_STATE.DEAD]: image_cuby_face_dead,
    [CUBY_STATE.SLEEP_1]: image_cuby_face_sleep_1,
    [CUBY_STATE.SLEEP_2]: image_cuby_face_sleep_2,
    [CUBY_STATE.SPEAK_1]: image_cuby_face_speak_1
  };

  const texturesByFace: {
    [key in CUBY_STATE]: MeshPhongMaterial[];
  } = Object.fromEntries(
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
      new MeshPhongMaterial({ color: CUBY_COLOR_VALUE[unit.options.color] })
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
