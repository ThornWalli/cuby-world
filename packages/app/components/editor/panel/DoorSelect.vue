<template>
  <cw-panel
    hide-title
    style-type="none"
    class="cw-panel-editor-wall-door-select"
    title="Wall Door">
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
  type WallSelectItem
} from '../catalog/WallItemSelect.vue';
import { ref } from 'vue';
import type App from '../../../lib/classes/App';
import type WallExtension from '../../../lib/classes/WallExtension';
import { doorCatalog } from '@cuby-world/walls';
import type { DoorWallExtensionItem } from '../../../lib/types/wall/extension/catalog';
import type { WallExtensionIdentifier } from '../../../lib/types/wall/extension/skins';
import { getWallExtensionMap } from '@cuby-world/app/lib/utils/catalog';
import type { WallType } from '@cuby-world/app/lib/types/wall/catalog';

const extensionTypes = await getWallExtensionMap<DoorWallExtensionItem>(
  Array.from(doorCatalog.values())
);

const $props = defineProps<{
  app: App;
  type: WallType;
  modelValue: WallExtensionIdentifier | null;
}>();

function prepareItem(
  item: DoorWallExtensionItem
): WallSelectItem<DoorWallExtensionItem> {
  return {
    item,
    preview: {
      type: $props.type,
      extensions: [
        {
          extension: extensionTypes.get(item.extension) as typeof WallExtension,
          skin: item.options.skin,
          state: { type: 'default', ...item.options }
        }
      ]
    }
  };
}

const items = ref<WallSelectItem<DoorWallExtensionItem>[]>(
  Array.from(doorCatalog.values()).map(prepareItem)
);

const $emit = defineEmits<{
  (e: 'update:model-value', value: WallExtensionIdentifier | null): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-editor-wall-door-select {
  align-items: center;
  align-self: center;
  width: 90%;

  & :deep(.cw-panel-catalog-select-item-select) {
    width: 100%;
  }
}
</style>
