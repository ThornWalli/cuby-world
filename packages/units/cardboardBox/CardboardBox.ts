import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/cardboardBox.glb?url';
import image_cuby_post from './assets/uv/cuby_post.png?url';
import assetLoader from '@cuby-world/app/services/assetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import type { Texture } from 'three';
import { Object3D, Vector3 } from 'three';

export type CardboardBoxOptions = UnitOptions;
export default class CardboardBox extends Unit<CardboardBoxOptions> {
  static override KEY = 'cardboardBox';
  static override NAME = 'CardboardBox';

  constructor(
    options: Omit<
      UnitConstructorOptions<CardboardBoxOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Doormate_1',
      size: new Vector3(1, 0.2, 1),
      accessible: false,
      selectable: true,
      placeable: true
    });
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);

    meshRoot.add(object);

    assetLoader
      .add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_cuby_post
      })
      .then(texture => {
        this.setTexture(texture, meshRoot);
        this.observables.materialReady$.next();
      });

    return meshRoot;
  }
}
