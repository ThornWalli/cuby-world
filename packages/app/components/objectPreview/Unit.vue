<template>
  <cw-object-preview
    v-if="root"
    :hide-ground="showGround || !unitInstance?.previewOptions.ground"
    :cache-key="modelValue ? JSON.stringify(modelValue) : undefined"
    :root="root"
    :app="app"
    :mode="mode"
    :width="width ?? 'auto'"
    :ratio="ratio"
    :hydrate-when-visible="hydrateWhenVisible"
    class="cw-object-preview-unit"
    @animation-loop="animationLoop$.next($event)" />
</template>

<script lang="ts" setup>
import { Object3D } from 'three';
import { markRaw, onUnmounted, ref, type Raw } from 'vue';
import { Subscription, Subject } from 'rxjs';

import type App from '../../lib/classes/App';
import type { AnimationLoopValue } from '@cuby-world/app/lib/classes/Renderer';

import CwObjectPreview from '../ObjectPreview.vue';

import { catalog } from '@cuby-world/units';
import type Unit from '@cuby-world/app/lib/classes/Unit';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/classes/unitModule/Animation';

const $props = defineProps<{
  app: App;
  mode?: 'static' | 'loop';
  width?: number | 'auto';
  ratio: number;
  modelValue: UnitPreview;
  hydrateWhenVisible?: boolean;
  showGround?: boolean;
}>();

const root = ref<Object3D>(new Object3D());

const animationLoop$ = new Subject<AnimationLoopValue>();

onUnmounted(() => {
  animationLoop$.unsubscribe();
  unitSubscriptions?.unsubscribe();
});

let unitSubscriptions: Subscription;

const unitInstance = ref<Raw<Unit> | null>(null);

async function setup(data: UnitPreview) {
  const unitItem = catalog.get(data.type);
  const UnitClass = await unitItem!.instance();

  unitInstance.value = markRaw(
    new UnitClass({
      name: UnitClass.NAME,
      preview: true,
      options: {
        ...unitItem?.skinMap?.get(data.skin ?? '')?.options
      }
    })
  );

  const instance = unitInstance.value;
  await instance.setup({
    assetLoader: $props.app.assetLoader,
    unit: instance
  });
  unitSubscriptions?.unsubscribe();
  unitSubscriptions = new Subscription();
  return new Promise<Object3D>(resolve => {
    unitSubscriptions.add(
      instance.observables.materialReady$.subscribe(() => {
        unitSubscriptions.add(
          animationLoop$.subscribe(value => {
            unitInstance.value!.update(value);
          })
        );
        if (instance.modules.animation) {
          if (data.action) {
            instance.modules.animation.setAnimationAction(data.action);
          } else {
            instance.modules.animation.setAnimationAction(
              ANIMATION_ACTION.IDLE
            );
          }
        }
        resolve(instance.root);
      })
    );
  });
}

root.value = markRaw(await setup($props.modelValue));
</script>

<script lang="ts">
export interface UnitPreview {
  type: string;
  skin?: string;
  action?: ANIMATION_ACTION;
}
</script>

<style lang="postcss" scoped>
.cw-object-preview-unit {
  /* empty */
}
</style>
