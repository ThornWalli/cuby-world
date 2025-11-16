import { DoubleSide, Mesh, MeshStandardMaterial, Object3D } from 'three';
import type AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import WindowWallExtension, {
  type WindowState
} from '@cuby-world/app/lib/classes/wallExtension/Window';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type Wall from '@cuby-world/app/lib/classes/Wall';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import glbBase from './assets/window.glb?url';
import assetLoader from '@cuby-world/app/services/assetLoader';
import {
  MATERIAL_NAME,
  replaceMaterialByName
} from '@cuby-world/app/lib/utils/material';
import skins from './skins';
import { OBJECT_NAME } from '@cuby-world/app/lib/utils/object';

type StandardState = WindowState;

export default class Standard extends WindowWallExtension<StandardState> {
  static override KEY = 'window_standard';

  override async setup(): Promise<void> {
    await super.setup();

    const skin = skins.find(skin => skin.id === this.state.skin);

    const { object } = await loadGltf(this.wall, this.state, assetLoader);

    replaceMaterialByName(
      object,
      MATERIAL_NAME.BASE,
      new MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        color: skin?.options.color || 0xffffff,
        side: DoubleSide
      })
    );

    this.addToRoot(object);
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
    value: glbBase
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
