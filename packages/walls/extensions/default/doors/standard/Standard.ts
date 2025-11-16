import { DoubleSide, MeshStandardMaterial } from 'three';

import DoorWallExtension, {
  type DoorState
} from '@cuby-world/app/lib/classes/wallExtension/Door';
import type Wall from '@cuby-world/app/lib/classes/Wall';
import glbBase from './assets/door.glb?url';
import { replaceMaterialByName } from '@cuby-world/app/lib/utils/material';
import skins from './skins';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';

const MATERIAL_NAME = {
  FRAME: 'frame',
  BLADE: 'blade',
  HANDLE: 'handle'
};

type StandardState = DoorState;
export default class Standard extends DoorWallExtension<StandardState> {
  static override KEY = 'door_standard';

  constructor({ wall, state }: { wall: Wall; state?: StandardState }) {
    super({
      wall,
      state: { ...(state ?? ({} as StandardState)) }
    });
    this.duration = 300;
  }

  override async createMesh() {
    const skin = skins.find(skin => skin.id === this.state.skin);

    const { object, animations } = await loadGltf(glbBase);
    this.modules.animation.setAnimations(animations);

    if (this.wall) {
      object.rotation.y = Math.PI / 2;
    }

    replaceMaterialByName(
      object,
      MATERIAL_NAME.FRAME,
      new MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        color: skin?.options.color || 0xffffff,
        side: DoubleSide,
        shadowSide: DoubleSide
      })
    );
    replaceMaterialByName(
      object,
      MATERIAL_NAME.BLADE,
      new MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        color: skin?.options.color || 0xffffff,
        side: DoubleSide,
        shadowSide: DoubleSide
      })
    );
    replaceMaterialByName(
      object,
      MATERIAL_NAME.HANDLE,
      new MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        color: 0x000000,
        side: DoubleSide,
        shadowSide: DoubleSide
      })
    );

    object.traverse(child => {
      child.castShadow = true;
    });
    return object;
  }

  override async setup() {
    await super.setup();
  }
}
