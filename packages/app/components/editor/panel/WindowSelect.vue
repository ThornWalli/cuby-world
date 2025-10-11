<template>
  <cw-panel
    hide-title
    style-type="none"
    class="cw-panel-editor-wall-window-select"
    title="Wall Window">
    <cw-catalog-wall-item-select
      :app="app"
      :items="items"
      :model-value="modelValue"
      @update:model-value="value => $emit('update:model-value', value)" />
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogWallItemSelect, {
  type WallItem
} from '../catalog/WallItemSelect.vue';
import { ref } from 'vue';
import type App from '../../../lib/classes/App';
import {
  windowsCatalog,
  windows,
  type WallExtensionIdentifier,
  type WallExtensionItem
} from '@cuby-world/wall-extensions';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';

const extensionTypes = new Map(
  Object.values(windows).map(item => [item.KEY, item])
);

function prepareItem(item: WallExtensionItem): WallItem<WallExtensionItem> {
  return {
    item,
    wall: {
      extensions: [
        {
          extension: extensionTypes.get(item.extension) as typeof WallExtension,
          state: { type: 'default', ...item.options }
        }
      ]
    }
  };
}

const items = ref<WallItem<WallExtensionItem>[]>(
  Array.from(windowsCatalog.values()).map(prepareItem)
);

defineProps<{
  app: App;
  modelValue: WallExtensionIdentifier | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: WallExtensionIdentifier | null): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-editor-wall-window-select {
  align-items: center;

  & :deep(> div) {
    width: 90%;
  }
}
</style>
