<template>
  <teleport to="#teleports-panel-bottom">
    <transition name="fade" mode="out-in">
      <cw-panel-editor-door-skin
        v-if="currentItem && skins && skin"
        v-model="skin"
        type="default"
        :skins="skins"
        :item="currentItem"
        :app="app"
        @back="extension = null" />
      <cw-panel-editor-door-select
        v-else
        v-model="extension"
        type="default"
        :items="items"
        :app="app" />
    </transition>
  </teleport>
  <cw-sticky-controls
    v-if="currentExtension?.wall.root"
    :app="app"
    :value="currentExtension.wall.root"
    :items="controlItems" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import CwPanelEditorDoorSelect from '../panel/DoorSelect.vue';
import CwPanelEditorDoorSkin from '../panel/DoorSkin.vue';
import CwStickyControls, {
  type StickyControlItem
} from '../StickyControls.vue';
import icons from '@cuby-world/app/utils/icons';
import { Subscription } from 'rxjs';
import { doorCatalog } from '@cuby-world/walls';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';
import type {
  WallExtensionIdentifier,
  WallExtensionSkinIdentifier
} from '@cuby-world/app/lib/types/wall/extension/skins';
import type DoorController from '@cuby-world/app/lib/classes/appModule/editor/wall/DoorController';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';
import type { DoorWallExtensionItem } from '@cuby-world/app/lib/types/wall/extension/catalog';

const extension = ref<WallExtensionIdentifier | null>(null);
const skin = ref<WallExtensionSkinIdentifier | null>(null);
const currentExtension = ref<WallExtension | null>(null);

const subscription = new Subscription();

const $props = defineProps<{
  app: EditorApp;
}>();

const skins = computed(() => {
  if (extension.value) {
    const item = doorCatalog.get(extension.value);
    return item ? item.skins : null;
  }
  return null;
});

const items = ref<DoorWallExtensionItem[]>(Array.from(doorCatalog.values()));
const currentItem = ref<DoorWallExtensionItem | null>(null);

watch(
  () => extension.value,
  extensionId => {
    const item = doorCatalog.get(extensionId || '');
    currentItem.value = item || null;
    skin.value = item?.options.skin || null;
    controller.value.setExtension(item);
  }
);

watch(
  () => skin.value,
  async (skin, lastSkin) => {
    if (skin && lastSkin) {
      controller.value.setExtension({
        ...currentItem.value,
        options: { ...currentItem.value!.options, skin }
      } as DoorWallExtensionItem);
    }
  }
);

const controller = computed(() => {
  return $props.app.modules.editorWall.currentController as DoorController;
});

const controlItems = computed(() => {
  const items: StickyControlItem[] = [
    {
      color: 'red',
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
