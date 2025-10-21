<template>
  <teleport to="#teleports-panel-bottom">
    <cw-panel-editor-stair-skin
      v-if="skins"
      v-model="skin"
      :skins="skins"
      :app="app" />
    <cw-panel-editor-stair-select
      v-else
      v-model="stair"
      :items="items"
      :app="app" />
  </teleport>
  <cw-sticky-controls
    v-if="!isMoving && selected"
    :app="app"
    :value="position"
    :items="controlItems" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import CwPanelEditorStairSelect from '../panel/StairSelect.vue';
import CwPanelEditorStairSkin from '../panel/StairSkin.vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';
import type PlannerController from '@cuby-world/app/lib/classes/appModule/editor/stair/PlannerController';

import { Subscription } from 'rxjs';
import CwStickyControls, {
  type StickyControlItem
} from '../StickyControls.vue';
import type { Vector3 } from 'three';
import { CURSOR_TYPE } from '@cuby-world/app/lib/classes/appModule/Cursor';
import type { StairIdentifier } from '@cuby-world/app/lib/types/stair';
import { stairCatalog } from '@cuby-world/stairs';
import type { StairItem } from '@cuby-world/app/lib/types/stair/catalog';

const stair = ref<StairIdentifier | null>(null);
const skin = ref<StairSkinIdentifier | null>(null);
const subscription = new Subscription();

const skins = computed(() => {
  if (stair.value) {
    const stairItem = stairCatalog.get(stair.value);
    return stairItem ? stairItem.skins : null;
  }
  return null;
});

const items = ref<StairItem[]>(Array.from(stairCatalog.values()));

watch(
  () => stair.value,
  skin => {
    controller.value.setSkin(skin ? stairCatalog.get(skin) : null);
  }
);

const controller = computed(() => {
  return $props.app.modules.editorStair.currentController as PlannerController;
});

const controlItems = ref<StickyControlItem[]>([
  {
    label: 'Remove',
    icon: 'trash',
    action: async () => {
      await controller.value.remove();
    }
  },
  {
    label: 'Move',
    icon: 'move',
    action: async () => {
      await controller.value.move();
    }
  },
  {
    label: 'Rotate',
    icon: 'rotate',
    action: async () => {
      await controller.value.rotate();
    }
  },
  {
    label: 'Abort',
    icon: 'abort',
    action: async () => {
      await controller.value.abort();
    }
  },
  {
    label: 'Apply',
    icon: 'apply',
    action: async () => {
      await controller.value.apply();
    }
  }
]);

const $props = defineProps<{
  app: EditorApp;
}>();

const selected = ref(false);
const isMoving = ref(false);
watch(
  () => isMoving.value,
  value => {
    $props.app.modules.cursor.setCursor(
      value ? CURSOR_TYPE.MOVE : CURSOR_TYPE.DEFAULT
    );
  }
);

const position = ref<Vector3 | null>(null);
onMounted(() => {
  const app = $props.app;
  //#region Subscriptions
  subscription.add(
    controller.value.observables.move$.subscribe(({ position: p }) => {
      position.value = p;
    })
  );
  subscription.add(
    controller.value.observables.currentStair$.subscribe(stair => {
      position.value = stair?.position ?? null;
      selected.value = !!stair;
    })
  );
  subscription.add(
    controller.value.observables.moveStart$.subscribe(() => {
      isMoving.value = true;
    })
  );
  subscription.add(
    controller.value.observables.moveEnd$.subscribe(() => {
      isMoving.value = false;
    })
  );
  subscription.add(
    controller.value.observables.remove$.subscribe(() => {
      stair.value = null;
    })
  );
  subscription.add(
    controller.value.observables.apply$.subscribe(() => {
      stair.value = null;
      selected.value = false;
    })
  );
  subscription.add(
    controller.value.observables.abort$.subscribe(() => {
      stair.value = null;
      app.modules.cursor.setCursor(undefined);
      selected.value = false;
    })
  );
  //#endregion
});

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
