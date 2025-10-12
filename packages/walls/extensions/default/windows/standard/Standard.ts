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
import assetLoader from '@cuby-world/app/services/assetLoader';

export default class Standard extends WindowWallExtension {
  static override KEY = 'window_standard';

  override async setup(context: {
    animationLoop$: AnimationLoopSubject;
  }): Promise<void> {
    super.setup(context);

    const { object } = await loadGltf(this.wall, this.state, assetLoader);

    this.root.add(object);
  }
}

async function loadGltf(
  wall: Wall,
  state: WindowState,
  assetLoader: AssetLoader
): Promise<{
  object: Object3D;
}> {
  const object = new Object3D();

  const gltf: GLTF = await assetLoader.add<GLTF>({
    loader: LOADER.GLTF,
    url: glbBase
  });

  const model = gltf.scene
    .getObjectByName(`${state.size ?? 'small'}_base`)!
    .clone();

  model.position.y = 0;

  if (wall) {
    model.rotation.y = Math.PI / 2;
  }

  model.name = OBJECT_NAME.MESH;
  model.traverse(object => {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  object.add(model);

  return { object };
}
