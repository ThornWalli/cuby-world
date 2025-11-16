import {
  MeshStandardMaterial,
  Object3D,
  SpotLight,
  SpotLightHelper,
  Vector3
} from 'three';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/billboard_large_1.glb?url';
import { LOADER } from '@cuby-world/app/lib/classes/AssetLoader';

import assetLoader from '@cuby-world/app/services/assetLoader';
import type { Mesh, Texture } from 'three';
import { ROTATION_TYPE } from '@cuby-world/app/lib/utils/rotation';
import { prepareTexture } from '@cuby-world/app/lib/utils/texture';
import { skinsMap } from './skins';
import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';

export interface BillboardLargeOptions extends UnitOptions {
  defectLights: number;
}
export default class BillboardLarge_1 extends Unit<BillboardLargeOptions> {
  static override KEY = 'billboard_large_1';
  static override NAME = 'Billboard Large 1';

  constructor(
    options: Omit<
      UnitConstructorOptions<BillboardLargeOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Billboard Large 1',
      accessible: false,
      selectable: true,
      placeable: true,
      rotationType: ROTATION_TYPE.EXTENDED,
      options: {
        defectLights: 1,
        ...options.options
      }
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
      texture.flipY = false;
    }

    meshRoot.add(object);
    const lamp_1 = meshRoot.getObjectByName('lamp_1_empty')! as Mesh;
    const lamp_2 = meshRoot.getObjectByName('lamp_2_empty')! as Mesh;
    const lampInner_1 = meshRoot.getObjectByName('lamp_1_inner')! as Mesh;
    const lampInner_2 = meshRoot.getObjectByName('lamp_2_inner')! as Mesh;
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
    const defectLightsCount = this.isPreview() ? 0 : this.options.defectLights;
    const inner = [lampInner_1, lampInner_2];
    const spots = [lamp_1, lamp_2].filter(Boolean);
    const defectLights = Array(spots.length).fill(false);
    for (let i = 0; i < defectLightsCount; i++) {
      const index = Math.floor(Math.random() * spots.length);
      defectLights[index] = true;
    }

    spots.forEach((lamp, i) => {
      const spot = new SpotLight(0xffffff, 8);
      spot.angle = Math.PI / 3;
      spot.penumbra = 0.3;
      spot.castShadow = true;

      this.lights.push({ inner: inner[i]!, spot, defect: defectLights[i] });

      const worldPos = new Vector3();
      lamp.getWorldPosition(worldPos);
      spot.position.copy(worldPos.clone().add(new Vector3(0, 0, 0)));
      spot.target.position.set(-2, 4, worldPos.z);
      meshRoot.add(spot.target);

      lamp.lookAt(spot.target.position);

      meshRoot.add(spot);
      if (this.debug) {
        const helper = new SpotLightHelper(spot);
        meshRoot.add(helper);
      }
    });

    return meshRoot;
  }
  lights: { inner: Mesh; spot: SpotLight; defect: boolean }[] = [];
  flickerTimer = 0;
  override update({ delta }: AnimationLoopValue): void {
    const seconds = 0.05;
    const flackerMax = 0.3;
    this.flickerTimer += delta;
    if (this.flickerTimer > seconds) {
      this.flickerTimer = 0;
      this.lights
        .filter(({ defect }) => defect)
        .forEach(({ inner, spot }) => {
          if (Math.random() < flackerMax) {
            const material = inner.material as MeshStandardMaterial;
            spot.intensity = Math.random() < 0.5 ? 0 : 8;
            material.emissiveIntensity = spot.intensity;
          }
        });
    }
  }
}
