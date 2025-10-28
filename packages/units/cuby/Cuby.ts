import {
  ClampToEdgeWrapping,
  Group,
  LinearFilter,
  type AnimationMixer,
  type Object3D,
  type Texture,
  SRGBColorSpace
} from 'three';
import { Mesh, MeshPhongMaterial, Clock, PlaneGeometry, Vector2 } from 'three';

import {
  OBJECT_NAME,
  OBJECT_USER_DATA
} from '@cuby-world/app/lib/utils/object';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import {
  ANIMATION_ACTION,
  AnimationUnitModule
} from '@cuby-world/app/lib/classes/unitModule/Animation';

import image_spritesheet_sleep from './assets/spritesheet/sleep.png';

import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import {
  LOADER,
  type SpriteLoadDescription
} from '@cuby-world/app/lib/classes/AssetLoader';
import { defaultMaterial } from '../utils/material';
import type { MovementModuleOptions } from '@cuby-world/app/lib/classes/unitModule/Movement';
import CharacterUnitModule from '@cuby-world/app/lib/classes/unitModule/Character';

import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/cuby.glb?url';
import assetLoader from '@cuby-world/app/services/assetLoader';

import textureDefault from './assets/uv/default.svg?url';
import textureSpeak from './assets/uv/speak_1.svg?url';
import textureSleep1 from './assets/uv/sleep_1.svg?url';
import textureSleep2 from './assets/uv/sleep_2.svg?url';

declare module '@cuby-world/app/lib/utils/object' {
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

type CubyUnitModules = UnitModules & {
  character: CharacterUnitModule;
  animation: AnimationUnitModule;
};

type CubyUnitModuleList = (typeof CharacterUnitModule)[] & UnitModuleList;
export default class Cuby extends Unit<
  CubyOptions,
  CubyUnitModules,
  CubyUnitModuleList
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
          hasControls: false,
          movement: {
            diagonalMovement: true,
            stepDuration: 550,
            stairStepDuration: 1100,
            rotationDuration: 125
          },
          size: 0.55,
          color: CUBY_COLOR.BLUE,
          state: CUBY_STATE.DEFAULT,
          ...options.options
        }
      },
      [
        CharacterUnitModule,
        AnimationUnitModule
      ] as unknown as CubyUnitModuleList
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

    this.modules.animation.getAction(
      ANIMATION_ACTION.STAIR_FALLBACK
    )!.timeScale = 2.2;
    this.modules.animation.getAction(ANIMATION_ACTION.WALK)!.timeScale = 1.4;
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

  textureByCubyState?: {
    [key: string]: Texture;
  };
  assetsByCubyState?: { [key in CUBY_STATE]: MeshPhongMaterial[] };
  private _sleepPlain?: Mesh;
  override async createMesh(_context: SetupContext) {
    const meshRoot = new Group();

    const { scene, object, animations } = await loadGltf(glbBase);

    this.modules.animation.setAnimations(animations);
    // const obj = object.getObjectByName('empty')!;
    let obj: Object3D | Group = object;
    if (this.isPreview()) {
      obj = scene;
    } else {
      obj.scale.set(0.9, 0.9, 0.9);
    }

    const meshes: Mesh[] = [];
    obj.traverse(child => {
      if (child instanceof Mesh) {
        meshes.push(child);
      }
    });

    loadUVTextures(assetLoader).then(loadedTextures => {
      this.textureByCubyState = loadedTextures;
      const texture = this.textureByCubyState![this.options.state]!;
      this.setTexture(texture, meshRoot);
      this.observables.materialReady$.next();
    });

    meshRoot.name = OBJECT_NAME.MESH;
    meshRoot.add(obj);
    return meshRoot;
    // const size = this.options.size;
    // const ratio = 19 / 20;
    // const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

    // const mesh: Mesh = new Mesh(geometry, defaultMaterial());

    // await setupBodyMaterials(this, mesh, assetLoader).then(assets => {
    //   this.assetsByCubyState = assets;
    //   this.setCubyState(this.options.state, mesh);
    //   this.observables.materialReady$.next();
    // });

    // mesh.name = OBJECT_NAME.MESH;
    // mesh.castShadow = true;
    // mesh.position.set(0, (size * ratio) / 2 + 0.2, 0);

    // return mesh;
  }

  setTexture(texture: Texture, group?: Object3D) {
    const meshes: Mesh[] = [];
    (group || this.root.getObjectByName(OBJECT_NAME.MESH)!).traverse(child => {
      if (child instanceof Mesh) {
        meshes.push(child);
      }
    });
    meshes.forEach(mesh => {
      texture.flipY = false;
      texture.wrapS = ClampToEdgeWrapping;
      texture.wrapT = ClampToEdgeWrapping;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.colorSpace = SRGBColorSpace;
      (mesh.material as MeshPhongMaterial).map = texture;
      (mesh.material as MeshPhongMaterial).needsUpdate = true;

      (mesh.material as MeshPhongMaterial).onBeforeCompile = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        shader: any
      ) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_fragment>',
          `
      #ifdef USE_MAP
        vec4 texColor = texture2D(map, vMapUv);
        // Nur dort, wo Buchstaben sind (alpha > 0.1), Textur zeigen
        diffuseColor.rgb = mix(diffuseColor.rgb, texColor.rgb, texColor.a);
      #endif
    `
        );
      };
    });
  }

  setCubyState(state: CUBY_STATE) {
    this.options.state = state;
    if (!this.textureByCubyState) {
      throw new Error('Cuby materials not ready yet');
    }
    console.log('setCubyState', state);
    const texture = this.textureByCubyState![state]!;
    this.setTexture(texture);
  }

  setColor(color: CUBY_COLOR, group?: Object3D) {
    this.options.color = color;

    const meshes: Mesh[] = [];
    (group || this.root.getObjectByName(OBJECT_NAME.MESH)!).traverse(child => {
      if (child instanceof Mesh) {
        meshes.push(child);
      }
    });
    meshes.forEach(mesh => {
      (mesh.material as MeshPhongMaterial).color.set(CUBY_COLOR_VALUE[color]);
    });
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
        value: image_spritesheet_sleep,
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

function loadUVTextures(assetLoader: AssetLoader) {
  return Promise.all([
    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: textureDefault
      })
      .then(t => [CUBY_STATE.DEFAULT, t]),
    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: textureSpeak
      })
      .then(t => [CUBY_STATE.SPEAK_1, t]),
    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: textureSleep1
      })
      .then(t => [CUBY_STATE.SLEEP_1, t]),
    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: textureSleep2
      })
      .then(t => [CUBY_STATE.SLEEP_2, t])
  ]).then(Object.fromEntries);
}

// class UnitAnimation extends AnimationUnitModule {
//   override async setup(context: UnitModuleSetupContext) {
//     const mesh = await super.setup(context);

//     const hoverClip = getHoverClip();
//     const action = this.mixer.clipAction(hoverClip);
//     action.setLoop(LoopPingPong, Infinity);

//     window.setTimeout(() => {
//       action.play();
//     }, Math.random() * 250);

//     console.log('Cuby setup complete with animation:', action);

//     return mesh;
//   }
//   override update({ delta }: AnimationLoopValue) {
//     this.mixer?.update(delta);
//   }
// }
