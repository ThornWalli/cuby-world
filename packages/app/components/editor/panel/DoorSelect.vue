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
  type WallItem
} from '../catalog/WallItemSelect.vue';
import { ref } from 'vue';
import type App from '../../../lib/classes/App';
import type WallExtension from '../../../lib/classes/WallExtension';
import { defaultDoors, doorsCatalog } from '@cuby-world/walls';
import type { WallExtensionItem } from '../../../lib/types/wall/extension/catalog';
import type { WallExtensionIdentifier } from '../../../lib/types/wall/extension/skins';

const extensionTypes = new Map(
  // TODO: Hier kommen dann weiteren door typen rein
  [...Object.values(defaultDoors)].map(door => [door.KEY, door])
);

function prepareItem(item: WallExtensionItem) {
  return {
    extensions: [
      {
        extension: extensionTypes.get(item.extension) as typeof WallExtension,
        state: { type: 'default', ...item.options }
      }
    ]
  };
}

const items = ref<WallItem<WallExtensionItem>[]>(
  // TODO: Hier kommen dann weiteren door typen rein
  [...Array.from(doorsCatalog.values())].map(item => {
    return {
      item,
      wall: prepareItem(item)
    };
  })
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
.cw-panel-editor-wall-door-select {
  align-items: center;

  & :deep(> div) {
    width: 90%;
  }
}
</style>
