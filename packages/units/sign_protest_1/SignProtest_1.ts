import { MeshStandardMaterial, Object3D } from 'three';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/sign_protest_1.glb?url';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';

import assetLoader from '@cuby-world/app/services/assetLoader';
import type { Mesh, Texture } from 'three';
import { ROTATION_TYPE } from '@cuby-world/app/lib/utils/rotation';
import { prepareTexture } from '@cuby-world/app/lib/utils/texture';
import { skinsMap, type TexturePath } from './skins';

export interface SignProtestOptions extends UnitOptions {
  texture: TexturePath;
}
export default class SignProtest_1 extends Unit<SignProtestOptions> {
  static override KEY = 'sign_protest_1';
  static override NAME = 'Sign Protest 1';

  constructor(
    options: Omit<
      UnitConstructorOptions<SignProtestOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Sign Protest 1',
      accessible: false,
      selectable: true,
      placeable: true,
      rotationType: ROTATION_TYPE.EXTENDED
    });
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);

    meshRoot.position.set(0, 0, 0);

    const skin = skinsMap.get(this.getSkin())!;
    let texture;
    if (skin.options.texture) {
      texture = await assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: skin.options.texture
      });
      prepareTexture(texture, { pixelrated: true });
    }

    meshRoot.add(object);
    const obj = meshRoot.getObjectByName('plane')! as Mesh;

    const old = obj.material as MeshStandardMaterial;
    obj.material = new MeshStandardMaterial({
      map: texture,
      roughness: old.roughness ?? 1.0,
      metalness: old.metalness ?? 0.0,
      transparent: true
    });

    this.setMaterialReady();

    meshRoot.traverse(child => {
      child.castShadow = true;
    });

    return meshRoot;
  }

  override getSettingControls() {
    return [
      {
        title: 'Teleporter Settings',
        component: () => import('./components/Settings.vue')
      }
    ];
  }
}
