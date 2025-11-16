import { Group, Vector3, type Object3D, type Texture } from 'three';
import {
  Mesh,
  MeshStandardMaterial,
  Clock,
  PlaneGeometry,
  Vector2
} from 'three';

import {
  OBJECT_NAME,
  OBJECT_USER_DATA
} from '@cuby-world/app/lib/utils/object';
import type {
  PreviewOptions,
  SetupContext,
  UnitConstructorOptions,
  UnitOptions
} from '@cuby-world/app/lib/classes/Unit';

import image_spritesheet_sleep from './assets/spritesheet/sleep.png';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import {
  LOADER,
  type SpriteLoadDescription
} from '@cuby-world/app/lib/classes/AssetLoader';
import { defaultMaterial } from '../utils/material';
import type { MovementModuleOptions } from '@cuby-world/app/lib/classes/unitModule/Movement';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/cuby.glb?url';
import assetLoader from '@cuby-world/app/services/assetLoader';
import textureDefault from './assets/uv/default.svg?url';
import textureSpeak from './assets/uv/speak_1.svg?url';
import textureSleep1 from './assets/uv/sleep_1.svg?url';
import textureSleep2 from './assets/uv/sleep_2.svg?url';
import type { UnitSkinIdentifier } from '@cuby-world/app/lib/utils/unit/skins';
import { DEFAULT_PLAYER_SKIN_ID } from '@cuby-world/app/lib/classes/Player';
import { skinsMap } from './skins';
import type { TextureMaps } from '@cuby-world/app/lib/types/textures';
import CharacterUnit from '@cuby-world/app/lib/classes/unit/Character';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/types/animation';

declare module '@cuby-world/app/lib/utils/object' {
  interface ObjectUserData {
    INTERVAL: string;
  }
}

OBJECT_USER_DATA.INTERVAL = 'interval';

export interface CubyOptions extends UnitOptions<MovementModuleOptions> {
  state: CUBY_STATE;
  color: string | number;
}

export default class Cuby extends CharacterUnit<CubyOptions> {
  static override KEY = 'cuby';
  static override NAME = 'Cuby';

  clock: Clock = new Clock();

  override previewOptions: PreviewOptions = {
    ground: false
  };

  constructor(
    options: Omit<
      UnitConstructorOptions<Partial<CubyOptions>>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Cuby',
      selectable: true,
      placeable: true,
      controls: false,
      options: {
        movement: {
          diagonalMovement: true,
          stepDuration: 550,
          stairStepDuration: 1100,
          rotationDuration: 125
        },
        color: skinsMap.get(DEFAULT_PLAYER_SKIN_ID)!.options.color,
        state: CUBY_STATE.DEFAULT,
        ...options.options
      }
    });

    this.clock = new Clock();
  }

  override destroy(): void {
    super.destroy();
    clearInterval(this._sleepPlain?.userData[OBJECT_USER_DATA.INTERVAL]);
  }

  sleepTimer?: number;
  override async setup(context: SetupContext) {
    this.modules.character.offsets.laying_sleeping = new Vector3(
      0.075,
      0.75,
      0
    );
    this.modules.character.offsets.sitting_idle = new Vector3(0.075, 0.75, 0);

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

  setSkin(skinId: UnitSkinIdentifier) {
    const options =
      skinsMap.get(skinId)?.options ||
      skinsMap.get(DEFAULT_PLAYER_SKIN_ID)!.options;
    if (options.color) {
      this.setColor(options.color);
    }
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
    [key: string]: TextureMaps;
  };
  assetsByCubyState?: { [key in CUBY_STATE]: MeshStandardMaterial[] };
  private _sleepPlain?: Mesh;
  override async createMesh(_context: SetupContext) {
    const meshRoot = new Group();
    this.setMeshRoot(meshRoot);

    const { scene, object, animations } = await loadGltf(glbBase);

    this.modules.animation.setAnimations(animations);

    let obj: Object3D | Group = object;
    if (this.isPreview()) {
      obj = scene;
    } else {
      obj.scale.set(0.9, 0.9, 0.9);
    }

    const meshes: Mesh[] = [];
    obj.traverse(mesh => {
      if (mesh instanceof Mesh) {
        mesh.receiveShadow = false;
        mesh.castShadow = true;
        (mesh.material as MeshStandardMaterial).color.set(this.options.color);
        meshes.push(mesh);
      }
    });

    loadUVTextures(assetLoader).then(loadedTextures => {
      this.textureByCubyState = loadedTextures;
      const texture = this.textureByCubyState![this.options.state]!;
      this.setTexture(texture, meshRoot);
      this.setMaterialReady();
    });

    meshRoot.name = OBJECT_NAME.MESH;
    meshRoot.add(obj);

    return meshRoot;
  }

  override setTexture(textureMaps: TextureMaps, group?: Object3D) {
    super.setTexture(textureMaps, group, (mesh: Mesh) => {
      (mesh.material as MeshStandardMaterial).onBeforeCompile = (
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
    const textureMaps = this.textureByCubyState![state]!;
    this.setTexture(textureMaps);
  }

  private setColor(color: string | number, _group?: Object3D) {
    this.root.traverse(child => {
      if (child instanceof Mesh) {
        (child.material as MeshStandardMaterial).color.set(color);
      }
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

      return new MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        transparent: true,
        side: 2,
        map: texture,
        color: 0xffffff
      });
    })
  );
}

function loadUVTextures(
  assetLoader: AssetLoader
): Promise<{ [key in CUBY_STATE]: TextureMaps }> {
  return Promise.all([
    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: textureDefault
      })
      .then(colorMap => [CUBY_STATE.DEFAULT, { colorMap }]),
    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: textureSpeak
      })
      .then(colorMap => [CUBY_STATE.SPEAK_1, { colorMap }]),
    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: textureSleep1
      })
      .then(colorMap => [CUBY_STATE.SLEEP_1, { colorMap }]),
    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: textureSleep2
      })
      .then(colorMap => [CUBY_STATE.SLEEP_2, { colorMap }])
  ]).then(Object.fromEntries);
}
