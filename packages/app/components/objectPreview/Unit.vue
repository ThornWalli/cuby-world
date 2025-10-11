<template>
  <cw-object-preview
    v-if="root"
    :root="root"
    :app="app"
    :width="width"
    :ratio="ratio"
    class="cw-wall-extension-preview" />
</template>

<script lang="ts" setup>
import { Object3D } from 'three';
import { markRaw, onUnmounted, ref, watch } from 'vue';
import { ReplaySubject, Subscription } from 'rxjs';

import type App from '../../lib/classes/App';
import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';

import CwObjectPreview from '../ObjectPreview.vue';
import type Unit from '@cuby-world/app/lib/classes/Unit';

const $props = defineProps<{
  app: App;
  width?: number | 'auto';
  ratio: number;
  modelValue: {
    unit: typeof Unit;
  };
}>();

const root = ref<Object3D>();

const animationLoop$ = new ReplaySubject<AnimationLoopValue>(1);
animationLoop$.next({ time: 0, delta: 0 });

onUnmounted(() => {
  animationLoop$.complete();
  unitSubscriptions?.unsubscribe();
});

let unitSubscriptions: Subscription;

async function setupUnit(unit: typeof Unit) {
  unitSubscriptions?.unsubscribe();
  unitSubscriptions = new Subscription();
  const instance = new unit();
  await instance.setup({
    assetLoader: $props.app.assetLoader,
    unit: instance
  });
  const mesh = instance.mesh;

  const root = new Object3D();
  root.add(mesh);
  root.position.set(0, -0.5, 0);

  return new Promise<Object3D>(resolve => {
    unitSubscriptions.add(
      instance.materialReady$.subscribe(() => {
        unitSubscriptions?.unsubscribe();
        resolve(root);
      })
    );
  });
}

watch(
  () => $props.modelValue,
  async ({ unit }) => {
    root.value = markRaw(await setupUnit(unit));
  },
  {
    immediate: true
  }
);
</script>

<style lang="postcss" scoped>
.cw-wall-extension-preview {
  /* empty */
}
</style>
