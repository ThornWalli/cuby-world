<template>
  <cw-object-preview
    v-if="root"
    :hide-ground="hideGround"
    :cache-key="modelValue ? JSON.stringify(modelValue) : undefined"
    :root="root"
    :app="app"
    :width="width ?? 'auto'"
    :ratio="ratio"
    :hydrate-when-visible="hydrateWhenVisible"
    class="cw-object-preview-unit" />
</template>

<script lang="ts" setup>
import { Object3D } from 'three';
import { markRaw, onUnmounted, ref, watch } from 'vue';
import { Subscription, ReplaySubject } from 'rxjs';

import type App from '../../lib/classes/App';
import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';

import CwObjectPreview from '../ObjectPreview.vue';

import { catalog } from '@cuby-world/units';

const $props = defineProps<{
  app: App;
  width?: number | 'auto';
  ratio: number;
  modelValue: UnitPreview;
  hideGround?: boolean;
  hydrateWhenVisible?: boolean;
}>();

const root = ref<Object3D>(new Object3D());

const animationLoop$ = new ReplaySubject<AnimationLoopValue>(1);
animationLoop$.next({ time: 0, delta: 0 });

onUnmounted(() => {
  animationLoop$.complete();
  animationLoop$.unsubscribe();
  unitSubscriptions?.unsubscribe();
});

let unitSubscriptions: Subscription;

async function setup(data: UnitPreview) {
  const unitItem = catalog.get(data.type);
  const UnitClass = await unitItem!.instance();
  const instance = new UnitClass({
    name: UnitClass.NAME,
    preview: true
  });
  await instance.setup({
    assetLoader: $props.app.assetLoader,
    unit: instance
  });

  unitSubscriptions?.unsubscribe();
  unitSubscriptions = new Subscription();
  return new Promise<Object3D>(resolve => {
    unitSubscriptions.add(
      instance.materialReady$.subscribe(() => {
        unitSubscriptions?.unsubscribe();
        resolve(instance.root);
      })
    );
  });
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
export interface UnitPreview {
  type: string;
}
</script>

<style lang="postcss" scoped>
.cw-object-preview-unit {
  /* empty */
}
</style>
