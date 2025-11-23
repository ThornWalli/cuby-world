<template>
  <cw-sticky-controls
    v-if="position && currentStatus === MASON_STATUS.PLACED"
    :app="app"
    :value="position"
    :items="items" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { StickyControlItem } from '../../StickyControls.vue';
import CwStickyControls from '../../StickyControls.vue';
import { ICON } from '@cuby-world/app/utils/icons';
import type { Vector3 } from 'three';
import type MasonController from '@cuby-world/app/lib/classes/appModule/editor/wall/MasonController';
import { Subscription } from 'rxjs';
import { MASON_STATUS } from '@cuby-world/app/lib/classes/appModule/editor/wall/MasonController';
import type App from '@cuby-world/app/lib/classes/App';

const currentStatus = ref<MASON_STATUS>(MASON_STATUS.NONE);
const position = ref<Vector3 | null>(null);
const subscription = new Subscription();

const $props = defineProps<{
  app: App;
}>();

const controller = computed(() => {
  return $props.app.modules.editorWall.currentController as MasonController;
});

const items = computed(() => {
  const items: StickyControlItem[] = [
    {
      label: 'Abort',
      icon: ICON.ABORT,
      action: async () => {
        await controller.value?.abort();
      }
    },
    {
      label: 'Apply',
      icon: ICON.APPLY,
      action: async () => {
        await controller.value?.apply();
      }
    }
  ];

  items.push({
    disabled: currentStatus.value !== MASON_STATUS.PLACED,
    label: 'Edit',
    icon: ICON.EDIT,
    action: () => {
      controller.value?.edit();
    }
  });

  return items;
});

onMounted(() => {
  subscription.add(
    controller.value.observables.status$.subscribe(status => {
      currentStatus.value = status;
    })
  );
  subscription.add(
    controller.value.observables.endIndicatorPosition$.subscribe(
      endPosition => {
        position.value = endPosition;
      }
    )
  );
});

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
