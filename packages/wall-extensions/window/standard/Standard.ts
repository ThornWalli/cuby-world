import { Mesh, Object3D } from 'three';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import WindowWallExtension, {
  type WindowState
} from '@cuby-world/app/lib/classes/wallExtension/Window';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJECT_NAME } from '@cuby-world/app/lib/classes/Unit';
import type Wall from '@cuby-world/app/lib/classes/Wall';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import glbBase from './assets/window.glb?url';
import type { AnimationLoopSubject } from '@cuby-world/app/lib/classes/Renderer';

export default class Standard extends WindowWallExtension {
  static override KEY = 'window_standard';

  override async setup(context: {
    animationLoop$: AnimationLoopSubject;
    assetLoader: AssetLoader;
  }): Promise<void> {
    super.setup(context);

    const { object } = await loadGltf(this.wall, this.state, context);

    this.root.add(object);
  }
}

async function loadGltf(
  wall: Wall,
  state: WindowState,
  { assetLoader }: { assetLoader: AssetLoader }
): Promise<{
  object: Object3D;
}> {
  const object = new Object3D();

  const gltf: GLTF = await assetLoader.add<GLTF>({
    loader: LOADER.GLTF,
    url: glbBase
  });

  // Die geladene Szene ist im .scene-Property verfügbar
  const model = gltf.scene
    .getObjectByName(`${state.size ?? 'small'}_base`)!
    .clone();

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

  return { object };
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
