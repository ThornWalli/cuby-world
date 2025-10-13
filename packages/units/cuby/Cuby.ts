import type { AnimationMixer, Texture } from 'three';
import {
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  Clock,
  LoopPingPong,
  PlaneGeometry,
  Vector2
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

import image_spritesheet_cuby from './assets/spritesheet/cuby.png';
import image_spritesheet_sleep from './assets/spritesheet/sleep.png';

import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import {
  LOADER,
  type SpriteLoadDescription
} from '@cuby-world/app/lib/classes/AssetLoader';
import { defaultMaterial } from '../utils/material';
import type { MovementModuleOptions } from '@cuby-world/app/lib/classes/unitModule/Movement';
import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';
import { OBJECT_USER_DATA } from '@cuby-world/app/lib/utils/objectMeta';

declare module '@cuby-world/app/lib/utils/objectMeta' {
  interface ObjectUserData {
    INTERVAL: string;
  }
}

OBJECT_USER_DATA.INTERVAL = 'interval';

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
          size: 0.55,
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
    clearInterval(this._sleepPlain?.userData[OBJECT_USER_DATA.INTERVAL]);
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
      this.modules.movement.observables.moveStart$.subscribe(() => {
        this.wakeUp();
      })
    );
    this.subscription.add(
      this.modules.movement.observables.moveEnd$.subscribe(() => {
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
  override async createMesh({ assetLoader }: SetupContext) {
    const size = this.options.size;
    const ratio = 19 / 20;
    const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

    const mesh: Mesh = new Mesh(geometry, defaultMaterial());

    await setupBodyMaterials(this, mesh, assetLoader).then(assets => {
      this.assetsByCubyState = assets;
      this.setCubyState(this.options.state, mesh);
      this.materialReady$.next();
    });

    mesh.name = OBJECT_NAME.MESH;
    mesh.castShadow = true;
    mesh.position.set(0, (size * ratio) / 2 + 0.2, 0);

    return mesh;
  }

  setCubyState(state: CUBY_STATE, mesh: Mesh = this.mesh) {
    if (!this.assetsByCubyState) {
      throw new Error('Cuby materials not ready yet');
    }
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
      mesh.userData[OBJECT_USER_DATA.INTERVAL] = setInterval(() => {
        index = (index + 1) % assets.length;
        mesh.material = assets[index]!;
      }, this._sleepFrameDuration);
    });
  }

  stopSleepIndicator() {
    const sleepPlain = this.root.getObjectByName('sleep_plain') as Mesh;
    if (sleepPlain) {
      clearInterval(sleepPlain.userData[OBJECT_USER_DATA.INTERVAL]);
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
async function setupSleepMaterials(assetLoader: AssetLoader) {
  const frames = [
    {
      position: new Vector2(0, 0),
      dimension: new Vector2(34, 48)
    },
    {
      position: new Vector2(34, 0),
      dimension: new Vector2(34, 48)
    },
    {
      position: new Vector2(64, 0),
      dimension: new Vector2(34, 48)
    },
    {
      position: new Vector2(98, 0),
      dimension: new Vector2(34, 48)
    }
  ];
  return Promise.all(
    frames.map(async options => {
      const texture = await assetLoader.add<Texture, SpriteLoadDescription>({
        loader: LOADER.SPRITE,
        url: image_spritesheet_sleep,
        options: { density: 2, ...options }
      });

      return new MeshPhongMaterial({
        transparent: true,
        side: 2,
        map: texture,
        color: 0xffffff,
        shininess: 100,
        specular: 0xffffff
      });
    })
  );
}

async function setupBodyMaterials(
  unit: Cuby,
  mesh: Mesh,
  assetLoader: AssetLoader
) {
  const faces = [
    CUBY_STATE.DEFAULT,
    CUBY_STATE.SLEEP_1,
    CUBY_STATE.SLEEP_2,
    CUBY_STATE.SPEAK_1,
    CUBY_STATE.DEAD
  ];

  const frames = [
    // back
    {
      position: new Vector2(0, 19),
      dimension: new Vector2(20, 19)
    },
    // left
    {
      position: new Vector2(20, 19),
      dimension: new Vector2(20, 19)
    },
    // right
    {
      position: new Vector2(40, 19),
      dimension: new Vector2(20, 19)
    },
    // top
    {
      position: new Vector2(0, 38),
      dimension: new Vector2(20, 20)
    },
    // bottom
    {
      position: new Vector2(20, 38),
      dimension: new Vector2(20, 20)
    }
  ];

  const sideFrames = await Promise.all(
    frames.map(async options => {
      const texture = await assetLoader.add<Texture, SpriteLoadDescription>({
        loader: LOADER.SPRITE,
        url: image_spritesheet_cuby,
        options: { density: 10, ...options }
      });

      return new MeshPhongMaterial({
        transparent: true,
        side: 2,
        map: texture,
        color: 0xffffff,
        shininess: 100,
        specular: 0xffffff
      });
    })
  );

  const texturesByFace = Object.fromEntries(
    await Promise.all(
      faces.map(async (key, index) => {
        const texture = await assetLoader.add<Texture, SpriteLoadDescription>({
          loader: LOADER.SPRITE,
          url: image_spritesheet_cuby,
          options: {
            density: 10,
            position: new Vector2(index * 20, 0),
            dimension: new Vector2(20, 19)
          }
        });

        const faceMaterial = new MeshPhongMaterial({
          transparent: true,
          side: 2,
          map: texture,
          color: 0xffffff,
          shininess: 100,
          specular: 0xffffff
        });

        return [key, [faceMaterial, ...sideFrames]];
      })
    )
  );
  //   )
  // );

  // // directions: front, back, left, right, top, bottom
  // return Array(5).fill(0).map((_, i) => {
  //   const texture = await assetLoader.add<Texture, SpriteLoadDescription>({
  //     loader: LOADER.SPRITE,
  //     url: image_cuby,
  //     options: { density: 5, {
  //       position: new Vector2(i * 20, i * 19),
  //     } }
  //   });

  // })

  // })

  // const texturesByFace: {
  //   [key in CUBY_STATE]: MeshPhongMaterial[];
  // } = Object.fromEntries(
  //   await Promise.all(
  //     frames.map(async ({ key, options }) => {
  //       const texture = await assetLoader.add<Texture, SpriteLoadDescription>({
  //         loader: LOADER.SPRITE,
  //         url: image_cuby,
  //         options: { density: 5, ...options }
  //       });

  //       return [
  //         key,
  //         new MeshPhongMaterial({
  //           transparent: true,
  //           side: 2,
  //           map: texture,
  //           color: 0xffffff,
  //           shininess: 100,
  //           specular: 0xffffff
  //         })
  //       ];
  //     })
  //   )
  // Object.entries(faceAssets).map(async ([face, url]) => {
  //   return [
  //     face,
  //     (
  //       await Promise.all(
  //         [
  //           url, // image_cuby_front,
  //           image_cuby_back,
  //           image_cuby_left,
  //           image_cuby_right,
  //           image_cuby_top,
  //           image_cuby_bottom
  //         ].map(url =>
  //           assetLoader.add<Texture>({ loader: LOADER.TEXTURE, url })
  //         )
  //       )
  //     ).map(
  //       texture =>
  //         new MeshPhongMaterial({
  //           transparent: true,
  //           map: texture,
  //           color: 0xffffff,
  //           shininess: 100,
  //           specular: 0xffffff
  //         })
  //     )
  //   ];
  // })
  // );

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
  override update({ delta }: AnimationLoopValue) {
    this.mixer?.update(delta);
  }
}
