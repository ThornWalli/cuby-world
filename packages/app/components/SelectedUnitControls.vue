<template>
  <cw-sticky-controls
    v-if="selectedUnit?.hasControls() && target"
    :app="app"
    :value="target"
    :items="items" />
  <teleport to="body">
    <component
      :is="dialogComponent"
      :unit="selectedUnit"
      force-open
      @close="dialogComponent = null" />
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, type Component } from 'vue';
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
const dialogComponent = shallowRef<Component | null>(null);

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
const canPlaced = computed(() => selectedUnit.value?.canPlace());
const canRotate = computed(() => selectedUnit.value?.canRotate());

const items = computed<StickyControlItem[]>(() => {
  const unitControls =
    selectedUnit.value?.getSettingControls().map(control => ({
      label: control.title || 'Settings',
      icon: 'settings',
      action: async () => {
        const component = await control.component();
        dialogComponent.value = component.default;
      }
    })) || [];

  return [
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
    ...unitControls,
    {
      color: 'green',
      label: 'Apply',
      icon: 'apply',
      action: async () => {
        await $props.app.modules.selection.apply();
      }
    }
  ].filter(Boolean) as StickyControlItem[];
});
</script>
