import { Object3D, Vector2, Vector3 } from 'three';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/teleporter_default.glb?url';
import type { TeleporterUnitOptions } from '@cuby-world/app/lib/classes/unit/Teleporter';
import TeleporterUnit from '@cuby-world/app/lib/classes/unit/Teleporter';

export interface TeleporterOptions extends TeleporterUnitOptions {
  opened?: boolean;
  /**
   * Milliseconds
   */
  duration: number;
}
export default class Teleporter_Default extends TeleporterUnit<TeleporterOptions> {
  static override KEY = 'teleporter_default';
  static override NAME = 'Teleporter Default';
  constructor(
    options: Omit<
      UnitConstructorOptions<TeleporterOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Teleporter Default',
      accessible: true,
      selectable: true,
      placeable: true,
      size: new Vector3(1, 0.3, 1),
      options: {
        duration: 300,
        offset: new Vector3(0, -0.3, 0),
        entryPosition: new Vector2(0, 0)
      }
    });
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object, animations } = await loadGltf(glbBase);
    console.log(animations);
    this.modules.animation?.setAnimations(animations);

    meshRoot.position.set(0, 0, 0);

    this.setMaterialReady();

    meshRoot.add(object);

    return meshRoot;
  }
}
