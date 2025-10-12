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
import type WallExtension from '../../../lib/classes/WallExtension';
import { defaultWindows, windowsCatalog } from '@cuby-world/walls';
import type { WallExtensionItem } from '../../../lib/types/wall/extension/catalog';
import type { WallExtensionIdentifier } from '../../../lib/types/wall/extension/skins';

const extensionTypes = new Map(
  // TODO: Hier kommen dann weiteren window typen rein
  [...Object.values(defaultWindows)].map(item => [item.KEY, item])
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
