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
    class="cw-object-preview-stair" />
</template>

<script lang="ts" setup>
import { Object3D, Vector3 } from 'three';
import { markRaw, ref, watch } from 'vue';
import { ReplaySubject } from 'rxjs';

import type App from '../../lib/classes/App';

import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';
import CwObjectPreview from '../ObjectPreview.vue';
import { skins } from '@cuby-world/stairs';

import { ROTATION } from '@cuby-world/app/lib/types';
import { resolveStair } from '@cuby-world/app/lib/utils/stair';

const $props = defineProps<{
  app: App;
  width?: number | 'auto';
  ratio: number;
  modelValue: StairPreview;
  hydrateWhenVisible?: boolean;
}>();

const root = ref<Object3D>(new Object3D());

const animationLoop$ = new ReplaySubject<AnimationLoopValue>(1);
animationLoop$.next({ time: 0, delta: 0 });

async function setup(data: StairPreview) {
  const root = new Object3D();

  const [Stair, description] = await resolveStair({
    position: new Vector3(0, 0, 0),
    skin: skins.get(data.skin)!.skin,
    rotation: ROTATION.EAST
  });

  const stair = new Stair(description);

  await stair.setup({
    animationLoop$
  });
  root.position.set(0 - Math.round(stair.size.y / 3), -0.5, 0);

  root.add(stair.root);
  return root;
}

root.value = markRaw(await setup($props.modelValue));

watch(
  () => $props.modelValue,
  async data => {
    root.value = markRaw(await setup(data));
  }
);
</script>

<script lang="ts">
export interface StairPreview {
  skin: string;
}
</script>

<style lang="postcss" scoped>
.cw-object-preview-stair {
  /* empty */
}
</style>
