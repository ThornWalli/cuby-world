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
import { Mesh, Object3D, Vector3 } from 'three';
import { markRaw, onUnmounted, ref, watch } from 'vue';
import { ReplaySubject } from 'rxjs';

import type App from '../../lib/classes/App';

import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';
import CwObjectPreview, { type ObjectPreview } from '../ObjectPreview.vue';
import Ground, { createMaterial } from '@cuby-world/app/lib/classes/Ground';
import { loadGroundGeometries } from '@cuby-world/app/lib/utils/ground';
import assetLoader from '@cuby-world/app/services/assetLoader';
import {
  default_mesh as groundGlb,
  groundTextureMap
} from '@cuby-world/grounds';
import { catalog as groundCatalog } from '@cuby-world/grounds/grounds/catalog';

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

const ground = ref<Ground>();
async function setup(data: GroundPreview) {
  const geometryMap = await loadGroundGeometries(assetLoader, groundGlb);
  const skin = groundCatalog
    .get('default')
    ?.skins?.find(skin => skin.id === data.skin)?.options;

  if (!skin) {
    throw new Error(`Ground skin ${data.skin} not found in catalog`);
  }

  ground.value = new Ground({
    position: new Vector3(0, 0, 0),
    color: skin.color,
    texture:
      skin.texture &&
      groundTextureMap.get(
        'id' in skin.texture ? skin.texture.id : skin.texture.url
      )
  });

  const geometry = ground.value.createGeometry(geometryMap);
  const material = await createMaterial(
    ground.value.texture,
    ground.value.type,
    ground.value.color,
    ground.value.opacity,
    {
      assetLoader,
      textureMap: groundTextureMap
    }
  );
  const groundMesh = new Mesh(geometry, material);
  groundMesh.receiveShadow = true;
  const root = new Object3D();
  root.add(groundMesh);
  return root;
}

root.value = markRaw(await setup($props.modelValue));

watch(
  () => $props.modelValue,
  async data => {
    root.value = markRaw(await setup(data));
  }
);

onUnmounted(() => {
  ground.value?.destroy();
  root.value.remove();
  animationLoop$.unsubscribe();
});
</script>

<script lang="ts">
export interface GroundPreview extends ObjectPreview {
  skin: string;
}
</script>

<style lang="postcss" scoped>
.cw-object-preview-ground {
  /* empty */
}
</style>
