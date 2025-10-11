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
import {
  doors,
  doorsCatalog,
  type WallExtensionIdentifier,
  type WallExtensionItem
} from '@cuby-world/wall-extensions';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';

const extensionTypes = new Map(
  Object.values(doors).map(door => [door.KEY, door])
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
  Array.from(doorsCatalog.values()).map(item => {
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
