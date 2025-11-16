import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/cardboardBox.glb?url';
import image_cuby_post from './assets/uv/cuby_post.png?url';
import image_cuby_post_normal from './assets/uv/cuby_post_normal.png?url';
import image_cuby_post_displacement from './assets/uv/cuby_post_displacement.png?url';
import image_cuby_post_ambient from './assets/uv/cuby_post_ambient.png?url';
import image_cuby_post_specular from './assets/uv/cuby_post_specular.png?url';
import assetLoader from '@cuby-world/app/services/assetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import type { Texture } from 'three';
import { Object3D, Vector3 } from 'three';

export type CardboardBoxOptions = UnitOptions;
export default class CardboardBox_1 extends Unit<CardboardBoxOptions> {
  static override KEY = 'cardboard_box_1';
  static override NAME = 'CardboardBox 1';

  constructor(
    options: Omit<
      UnitConstructorOptions<CardboardBoxOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'CardboardBox 1',
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

    Promise.all([
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_cuby_post
      }),
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_cuby_post_normal
      }),
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_cuby_post_displacement
      }),
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_cuby_post_ambient
      }),
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_cuby_post_specular
      })
    ]).then(([colorMap, normalMap, displacementMap, ambientMap]) => {
      this.setTexture(
        {
          colorMap,
          normalMap,
          displacementMap,
          ambientMap
        },
        meshRoot
      );
      this.setMaterialReady();
    });

    meshRoot.traverse(child => {
      child.castShadow = true;
      // child.receiveShadow = true;
    });

    return meshRoot;
  }
}
