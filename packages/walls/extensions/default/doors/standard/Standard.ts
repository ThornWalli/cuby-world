import { concatMap } from 'rxjs';
import type { AnimationAction } from 'three';
import {
  AnimationClip,
  AnimationMixer,
  DoubleSide,
  LoopOnce,
  Mesh,
  MeshPhongMaterial,
  Object3D
} from 'three';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import DoorWallExtension, {
  type DoorState
} from '@cuby-world/app/lib/classes/wallExtension/Door';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';
import type Wall from '@cuby-world/app/lib/classes/Wall';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import glbBase from './assets/door.glb?url';
import type {
  AnimationLoopSubject,
  AnimationLoopValue
} from '@cuby-world/app/lib/classes/Renderer';
import assetLoader from '@cuby-world/app/services/assetLoader';
import { replaceMaterialByName } from '@cuby-world/app/lib/utils/material';
import skins from './skins';

const MATERIAL_NAME = {
  FRAME: 'frame',
  BLADE: 'blade',
  HANDLE: 'handle'
};

type Actions = { [key: string]: AnimationAction };

type StandardState = DoorState;
export default class Standard extends DoorWallExtension<StandardState> {
  static override KEY = 'door_standard';
  private mixer?: AnimationMixer;

  override async setup(context: {
    animationLoop$: AnimationLoopSubject;
  }): Promise<void> {
    await super.setup(context);

    const skin = skins.find(skin => skin.id === this.state.skin);

    const { object, animations } = await loadGltf(this.wall, assetLoader);

    replaceMaterialByName(
      object,
      MATERIAL_NAME.FRAME,
      new MeshPhongMaterial({
        color: skin?.options.color || 0xffffff,
        side: DoubleSide,
        shadowSide: DoubleSide
      })
    );
    replaceMaterialByName(
      object,
      MATERIAL_NAME.BLADE,
      new MeshPhongMaterial({
        color: skin?.options.color || 0xffffff,
        side: DoubleSide,
        shadowSide: DoubleSide
      })
    );
    replaceMaterialByName(
      object,
      MATERIAL_NAME.HANDLE,
      new MeshPhongMaterial({
        color: 0x000000,
        side: DoubleSide,
        shadowSide: DoubleSide
      })
    );

    if (!this.state.hasDoor) {
      const inner = object.getObjectByName('inner');
      if (inner) {
        inner.rotateY(Math.PI / 2);
        inner.visible = false;
      }
    } else {
      this.setupAnimation(object, animations, {
        animationLoop$: context.animationLoop$
      });
    }
    this.addToRoot(object);

    this.subscription.add(
      this.observables.action$
        .pipe(
          concatMap(async action => {
            this.fadeToAction(this.actions, action);
          })
        )
        .subscribe(void 0)
    );
  }

  private setupAnimation(
    obj: Object3D,
    animations: GLTF['animations'],
    { animationLoop$ }: { animationLoop$: AnimationLoopSubject }
  ) {
    this.mixer = new AnimationMixer(obj);
    const mixer = this.mixer;
    mixer.addEventListener('finished', () => {
      console.log('Animation finished');
      if (this.isOpening()) {
        this.setOpened(true);
      } else if (this.isClosing()) {
        this.setOpened(false);
      }
    });

    animations.forEach(clip => {
      const action = mixer.clipAction(
        new AnimationClip(clip.name, clip.duration, clip.tracks)
      );

      action.setDuration(0.3);
      action.clampWhenFinished = true;
      action.setLoop(LoopOnce, 0);
      // action.timeScale = 2;
      // action.setEffectiveTimeScale(8);

      this.addAction(clip.name, action);
    });

    this.subscription.add(
      animationLoop$.subscribe(({ delta }: AnimationLoopValue) => {
        mixer.update(delta);
      })
    );
  }

  override destroy(): void {
    super.destroy();
    this.mixer?.stopAllAction();
  }

  actions: Actions = {};
  activeAction: AnimationAction | null = null;

  private addAction(name: string, action: AnimationAction) {
    this.actions[name] = action;
  }
  getAction(name: string) {
    return this.actions[name];
  }

  fadeToAction(actions: Actions, name: string, duration = 0.5) {
    console.log(`Fading to action: ${name}`);
    const next = actions[name];
    if (!next || next === this.activeAction) return;

    if (this.activeAction) {
      this.activeAction.fadeOut(duration);
    }

    next.reset().fadeIn(duration).play();
    this.activeAction = next;
  }
}

async function loadGltf(
  wall: Wall,
  assetLoader: AssetLoader
): Promise<{
  object: Object3D;
  animations: GLTF['animations'];
}> {
  const object = new Object3D();

  const gltf: GLTF = await assetLoader.add<GLTF>({
    loader: LOADER.GLTF,
    value: glbBase
  });

  const model = gltf.scene.clone();

  model.position.y = 0;

  if (wall) {
    model.rotation.y = Math.PI / 2;
  }

  model.name = OBJECT_NAME.MESH;
  model.traverse(object => {
    // Prüfe, ob das Objekt ein Mesh ist
    if (object instanceof Mesh) {
      // Setze castShadow und receiveShadow für jedes Mesh
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  object.add(model);

  return { object, animations: gltf.animations };
}
