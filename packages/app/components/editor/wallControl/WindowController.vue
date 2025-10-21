<template>
  <teleport to="#teleports-panel-bottom">
    <cw-panel-editor-wall-window-select v-model="extension" :app="app" />
  </teleport>
  <cw-sticky-controls
    v-if="currentExtension?.wall.root"
    :app="app"
    :value="currentExtension.wall.root"
    :items="items" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import CwPanelEditorWallWindowSelect from '../panel/WindowSelect.vue';
import CwStickyControls, {
  type StickyControlItem
} from '../StickyControls.vue';

import type { EditorApp } from '@cuby-world/app/lib/classes/App';

import type { WallExtensionIdentifier } from '@cuby-world/app/lib/types/wall/extension/skins';
import type WindowController from '@cuby-world/app/lib/classes/appModule/editor/wall/DoorController';
import { Subscription } from 'rxjs';
import icons from '@cuby-world/app/utils/icons';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';
import type { WallExtensionItem } from '@cuby-world/app/lib/types/wall/extension/catalog';
import { windowCatalog } from '@cuby-world/walls';

const extension = ref<WallExtensionIdentifier>('');
const currentExtension = ref<WallExtension | null>(null);

const $props = defineProps<{
  app: EditorApp;
}>();

watch(
  () => extension.value,
  extensionId => {
    const item = windowCatalog.get(extensionId) as WallExtensionItem;
    if (item) {
      controller.value.setExtension(item);
    }
  }
);

const controller = computed(() => {
  return $props.app.modules.editorWall.currentController as WindowController;
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

const subscription = new Subscription();
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
