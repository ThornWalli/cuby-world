<template>
  <cw-object-preview
    v-if="root"
    :cache-key="modelValue ? JSON.stringify(modelValue) : undefined"
    :root="root"
    :app="app"
    :width="width ?? 'auto'"
    :ratio="ratio"
    :size="new Vector3(3, 3, 3)"
    :ground-scale="3"
    :hydrate-when-visible="hydrateWhenVisible"
    class="cw-object-preview-stair" />
</template>

<script lang="ts" setup>
import { Object3D, Vector3 } from 'three';
import { markRaw, ref, watch } from 'vue';
import { ReplaySubject } from 'rxjs';

import type App from '../../lib/classes/App';

import type { AnimationLoopValue } from '../../lib/classes/Renderer';
import CwObjectPreview from '../ObjectPreview.vue';

import { ROTATION } from '../../lib/utils/rotation';
import { resolveStair } from '../../lib/utils/stair';

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
    type: data.type,
    skin: data.skin,
    position: new Vector3(0, 0, 0),
    rotation: ROTATION.EAST
  });

  const stair = new Stair(description);

  await stair.setup({
    animationLoop$
  });
  root.position.set(0 - Math.round(stair.size.y / 3), 0, 0);

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
  type: string;
  skin: string;
}
</script>

<style lang="postcss" scoped>
.cw-object-preview-stair {
  /* empty */
}
</style>
