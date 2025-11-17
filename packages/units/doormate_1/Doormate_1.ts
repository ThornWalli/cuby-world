import type { Texture } from 'three';
import { Object3D, Vector3 } from 'three';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import assetLoader from '@cuby-world/app/services/assetLoader';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';

import glbBase from './assets/doormate_1.glb?url';
import image_doormate_1 from './assets/uv/doormate_1.png?url';
import image_doormate_1_normal from './assets/uv/doormate_1_normal.png?url';
import image_doormate_1_ambient from './assets/uv/doormate_1_ambient.png?url';
import image_doormate_1_specular from './assets/uv/doormate_1_specular.png?url';

export type DoormateOptions = UnitOptions;
export default class Doormate_1 extends Unit<DoormateOptions> {
  static override KEY = 'doormate_1';
  static override NAME = 'Doormate_1';

  constructor(
    options: Omit<
      UnitConstructorOptions<DoormateOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Doormate_1',
      accessible: true,
      selectable: true,
      placeable: true,
      size: new Vector3(1, 0.02, 1)
    });
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object } = await loadGltf(glbBase);

    if (!this.isPreview()) {
      meshRoot.position.set(-0.2, 0, 0);
    }
    meshRoot.add(object);

    Promise.all([
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_doormate_1
      }),
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_doormate_1_normal
      }),
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_doormate_1_ambient
      }),
      assetLoader.add<Texture>({
        loader: LOADER.TEXTURE,
        value: image_doormate_1_specular
      })
    ]).then(([colorMap, normalMap, ambientMap]) => {
      this.setTexture(
        {
          colorMap,
          normalMap,
          ambientMap
        },
        meshRoot
      );
      this.setMaterialReady();
    });

    return meshRoot;
  }
}
