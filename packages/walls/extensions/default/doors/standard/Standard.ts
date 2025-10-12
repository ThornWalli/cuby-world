import { AnimationMixer, LoopOnce, Mesh, Object3D } from 'three';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import DoorWallExtension, {
  type DoorState
} from '@cuby-world/app/lib/classes/wallExtension/Door';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJECT_NAME } from '@cuby-world/app/lib/classes/Unit';
import type Wall from '@cuby-world/app/lib/classes/Wall';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import glbBase from './assets/door.glb?url';
import type {
  AnimationLoopSubject,
  AnimationLoopValue
} from '@cuby-world/app/lib/classes/Renderer';
import assetLoader from '@cuby-world/app/services/assetLoader';

export default class Standard extends DoorWallExtension<DoorState> {
  static override KEY = 'door_standard';

  override async setup(context: {
    animationLoop$: AnimationLoopSubject;
  }): Promise<void> {
    await super.setup(context);

    const { object, animations } = await loadGltf(this.wall, assetLoader);
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
    this.root.add(object);
  }

  private mixer!: AnimationMixer;
  private setupAnimation(
    obj: Object3D,
    animations: GLTF['animations'],
    { animationLoop$ }: { animationLoop$: AnimationLoopSubject }
  ) {
    this.mixer = new AnimationMixer(obj);
    this.mixer.addEventListener('finished', () => {
      if (this.isOpening()) {
        this.setOpenedState();
      } else if (this.isClosing()) {
        this.setClosedState();
      }
    });

    const mixer = this.mixer;

    const action = mixer.clipAction(animations[0]!);
    action.setLoop(LoopOnce, 0);
    action.clampWhenFinished = true;
    // auf Frame 0 starten
    action.reset();
    action.paused = true;
    action.play();

    // oder auf "geschlossen" stellen (z. B. Ende der Animation)
    const clip = action.getClip();
    const duration = clip.duration;

    // halben Fortschritt setzen
    action.time = duration / 2;
    mixer.update(0);

    const speed = {
      open: 5,
      close: 5
    };

    this.subscription.add(
      animationLoop$.subscribe(({ delta }: AnimationLoopValue) => {
        if (this.isOpeningLeft()) {
          action.paused = false;
          action.timeScale = speed.open; // vorwärts abspielen
        } else if (this.isOpeningRight()) {
          action.paused = false;
          action.timeScale = -speed.open; // rückwärts abspielen
        } else if (this.isClosingLeft()) {
          action.paused = false;
          action.timeScale = -speed.close; // rückwärts abspielen
        } else if (this.isClosingRight()) {
          action.paused = false;
          action.timeScale = speed.close; // vorwärts abspielen
        } else {
          action.paused = true;
        }
        mixer.update(delta);
      })
    );
  }

  override destroy(): void {
    super.destroy();
    this.mixer?.stopAllAction();
  }
}

// function openDoor() {
//   doorAction = DOOR_ACTION.OPENING;

//   action.paused = false;
//   action.timeScale = 1;   // vorwärts abspielen
//   action.play();
// }

// function closeDoor() {
//   doorAction = DOOR_ACTION.CLOSING;

//   action.paused = false;
//   action.timeScale = -1;  // rückwärts abspielen
//   action.play();
// }

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
    url: glbBase
  });

  // Die geladene Szene ist im .scene-Property verfügbar
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

// class UnitAnimation extends AnimationUnitModule {
//   override async setup(context: UnitModuleSetupContext) {
//     const mesh = await super.setup(context);

//     const hoverClip = getHoverClip(0.03);
//     const action = this.mixer.clipAction(hoverClip);
//     action.setLoop(LoopPingPong, Infinity);

//     window.setTimeout(() => {
//       action.play();
//     }, Math.random() * 1000);

//     return mesh;
//   }
//   override update(_deltaTime: number) {
//     this.mixer?.update(this.clock.getDelta());
//   }
// }
