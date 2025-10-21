<template>
  <teleport to="#teleports-panel-bottom">
    <cw-panel-editor-wall-door-select v-model="extension" :app="app" />
  </teleport>
  <cw-sticky-controls
    v-if="currentExtension?.wall.root"
    :app="app"
    :value="currentExtension.wall.root"
    :items="items" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import CwPanelEditorWallDoorSelect from '../panel/DoorSelect.vue';
import CwStickyControls, {
  type StickyControlItem
} from '../StickyControls.vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';
import type { WallExtensionIdentifier } from '@cuby-world/app/lib/types/wall/extension/skins';
import type DoorController from '@cuby-world/app/lib/classes/appModule/editor/wall/DoorController';
import icons from '@cuby-world/app/utils/icons';
import { Subscription } from 'rxjs';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';
import { doorCatalog } from '@cuby-world/walls';

const extension = ref<WallExtensionIdentifier>('');
const currentExtension = ref<WallExtension | null>(null);

const subscription = new Subscription();

const $props = defineProps<{
  app: EditorApp;
}>();

watch(
  () => extension.value,
  extensionId => {
    const item = doorCatalog.get(extensionId);
    controller.value.setExtension(item);
  }
);

const controller = computed(() => {
  return $props.app.modules.editorWall.currentController as DoorController;
});

const items = computed(() => {
  const items: StickyControlItem[] = [
    {
      label: 'Remove',
      icon: icons.trash,
      action: async () => {
        await controller.value?.remove();
      }
    }
  ];
  return items;
});

onMounted(() => {
  subscription.add(
    controller.value.observables.current$.subscribe(extension => {
      currentExtension.value = extension;
    })
  );
});

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
