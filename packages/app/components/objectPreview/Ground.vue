<template>
  <cw-object-preview
    v-if="root"
    :cache-key="modelValue ? JSON.stringify(modelValue) : undefined"
    hide-ground
    :root="root"
    :app="app"
    :width="width ?? 'auto'"
    :ratio="ratio"
    :hydrate-when-visible="hydrateWhenVisible"
    class="cw-object-preview-ground" />
</template>

<script lang="ts" setup>
import { DoubleSide, Mesh, Object3D, Vector3 } from 'three';
import { markRaw, ref, watch } from 'vue';
import { ReplaySubject } from 'rxjs';

import type App from '../../lib/classes/App';

import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';
import CwObjectPreview from '../ObjectPreview.vue';
import Ground from '@cuby-world/app/lib/classes/Ground';
import { loadGroundGeometries } from '@cuby-world/app/lib/utils/ground';
import assetLoader from '@cuby-world/app/services/assetLoader';

import groundGlb from '../../assets/ground/ground.glb?url';
import { groundTextureMap } from '@cuby-world/app/lib/utils/ground/textures';
import skins from '@cuby-world/app/lib/utils/ground/skins';

const $props = defineProps<{
  app: App;
  width?: number | 'auto';
  ratio: number;
  modelValue: GroundPreview;
  hydrateWhenVisible?: boolean;
}>();

const root = ref<Object3D>(new Object3D());

const animationLoop$ = new ReplaySubject<AnimationLoopValue>(1);
animationLoop$.next({ time: 0, delta: 0 });

async function setupGround(data: GroundPreview) {
  const groundGeometryMap = await loadGroundGeometries(assetLoader, groundGlb);
  const { skin } = skins.get(data.skin)!;
  const ground = new Ground({
    position: new Vector3(0, 0, 0),
    color: skin.color,
    texture:
      skin.texture &&
      groundTextureMap.get(
        'id' in skin.texture ? skin.texture.id : skin.texture.url
      )
  });

  const geometry = ground.createGeometry({ groundGeometryMap });
  const material = await ground.createMaterial({
    assetLoader,
    groundTextureMap
  });
  const groundMesh = new Mesh(geometry, material);
  groundMesh.material.side = DoubleSide;
  groundMesh.receiveShadow = true;
  groundMesh.material.side = DoubleSide;
  const root = new Object3D();
  // root.position.set(0, 0.5, 0);
  root.add(groundMesh);
  return root;
}

root.value = markRaw(await setupGround($props.modelValue));

watch(
  () => $props.modelValue,
  async data => {
    root.value = markRaw(await setupGround(data));
  }
);
</script>

<script lang="ts">
export interface GroundPreview {
  skin: string;
}
</script>

<style lang="postcss" scoped>
.cw-object-preview-ground {
  /* empty */
}
</style>
