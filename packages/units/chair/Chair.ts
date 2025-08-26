import { Object3D, Mesh } from 'three';

import glbBase from './assets/base.glb?url';

import Unit, {
  OBJECT_NAME,
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '../../app/lib/classes/Unit';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type ChairOptions = UnitOptions;
export default class Chair extends Unit<ChairOptions> {
  static override KEY = 'chair';
  static override NAME = 'Chair';

  override options = {
    size: 0.5
  };

  constructor(
    options: Omit<
      UnitConstructorOptions<ChairOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Chair',
      selectable: true
    });
  }

  override createMesh({ assetLoader }: SetupContext) {
    const object = new Object3D();
    assetLoader.add<GLTF>({ loader: LOADER.GLTF, url: glbBase }).then(
      // Callback bei erfolgreichem Laden
      gltf => {
        // Die geladene Szene ist im .scene-Property verfügbar
        const model = gltf.scene;

        // Du kannst das Modell hier skalieren, positionieren, etc.
        model.scale.set(0.4, 0.4, 0.4);
        model.position.y = 0;
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
      }
    );

    // const material = new MeshPhongMaterial({ color: 0xff0000 });

    // const size = this.options.size;
    // const ratio = 14 / 20;
    // const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

    // const mesh: Object3D = new Mesh(geometry, material);
    // mesh.position.set(0, (size * ratio) / 2, 0);

    this.materialReady$.next();
    return object;
  }
}
