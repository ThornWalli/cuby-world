<template>
  <cw-sticky-controls
    v-if="selectedUnit?.options.hasControls && target"
    :app="app"
    :value="target"
    :items="items" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type App from '../lib/classes/App';
import { concatMap, EMPTY, Subscription, switchMap } from 'rxjs';
import type { Object3D, Vector3 } from 'three';

import CwStickyControls from './StickyControls.vue';
import type { StickyControlItem } from './StickyControls.vue';
import type Unit from '../lib/classes/Unit';

const $props = defineProps<{
  app: App;
}>();

const target = ref<Vector3 | Object3D | null>(null);
const selectedUnit = ref<Unit | null>(null);

const subscription = new Subscription();

onMounted(() => {
  subscription.add(
    $props.app.modules.selection.observables.selectUnit$
      .pipe(
        concatMap(async unit => {
          selectedUnit.value = unit;
          target.value = unit?.root || null;
        })
      )
      .subscribe(void 0)
  );
  subscription.add(
    $props.app.modules.placement.observables.unit$
      .pipe(
        switchMap(unit => {
          if (unit) {
            return $props.app.modules.placement.observables.move$;
          }
          return EMPTY;
        }),
        concatMap(async ({ position }) => {
          target.value = position;
        })
      )
      .subscribe(void 0)
  );
});

const canDelete = computed(() => selectedUnit.value?.canDelete());
const canPlaced = computed(() => selectedUnit.value?.options.canPlaced);
const canRotate = computed(() => selectedUnit.value?.options.canRotate);

const items = computed<StickyControlItem[]>(
  () =>
    [
      canDelete.value && {
        color: 'red',
        label: 'Remove',
        icon: 'trash',
        action: async () => {
          await $props.app.modules.selection.remove();
        }
      },
      canPlaced.value && {
        label: 'Move',
        icon: 'move',
        action: async () => {
          await $props.app.modules.selection.move();
        }
      },
      canRotate.value && {
        label: 'Rotate',
        icon: 'rotate',
        action: async () => {
          await $props.app.modules.selection.rotate();
        }
      },
      {
        color: 'green',
        label: 'Apply',
        icon: 'apply',
        action: async () => {
          await $props.app.modules.selection.apply();
        }
      }
    ].filter(Boolean) as StickyControlItem[]
);
</script>
