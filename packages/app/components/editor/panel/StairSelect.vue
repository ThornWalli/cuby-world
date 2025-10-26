<template>
  <cw-panel
    hide-title
    style-type="none"
    class="cw-panel-editor-stair-select"
    title="Stair Select">
    <cw-catalog-stair-item-select
      :app="app"
      :items="items.map(prepareItem)"
      :model-value="modelValue"
      @update:model-value="value => $emit('update:model-value', value)">
    </cw-catalog-stair-item-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwCatalogStairItemSelect from '../catalog/StairItemSelect.vue';
import type App from '../../../lib/classes/App';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';
import type { StairSelectItem } from '../catalog/StairItemSelect.vue';
import type { StairItem } from '@cuby-world/app/lib/types/stair/catalog';
import type { StairIdentifier } from '@cuby-world/app/lib/types/stair';

function prepareItem(item: StairItem): StairSelectItem<StairItem> {
  return {
    item,
    preview: {
      type: item.id,
      skin: item.options.skin
    }
  };
}

defineProps<{
  app: App;
  items: StairItem[];
  modelValue: StairIdentifier | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: StairSkinIdentifier | null): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-editor-stair-select {
  align-items: center;
  align-self: center;
  width: calc(100% - 96px * 2);
  pointer-events: auto;

  & :deep(.cw-panel-catalog-select-item-select) {
    width: 100%;
  }
}
</style>
