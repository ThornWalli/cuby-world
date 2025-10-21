<template>
  <cw-editor-catalog-item-select
    :model-value="modelValue"
    :items="items"
    class="cw-panel-catalog-wall-item-select"
    @update:model-value="onUpdateModelValue">
    <template #before><slot name="before"></slot></template>
    <template #preview="{ preview }">
      <cw-object-preview-wall
        :app="app"
        :ratio="8 / 4"
        :model-value="preview"
        hydrate-when-visible />
    </template>
  </cw-editor-catalog-item-select>
</template>

<script lang="ts" setup generic="Item extends CatalogItem">
import CwEditorCatalogItemSelect, {
  type BaseSelectItem
} from './ItemSelect.vue';
import CwObjectPreviewWall, {
  type WallPreview
} from '../../objectPreview/Wall.vue';

import type App from '../../../lib/classes/App';
import type { CatalogItem } from '../../../lib/types/catalog';

const $props = defineProps<{
  app: App;
  items: WallSelectItem<Item>[];
  modelValue: Item['id'] | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: Item['id'] | null): void;
}>();

function onUpdateModelValue(id: Item['id'] | null) {
  $emit('update:model-value', id === $props.modelValue ? null : id);
}
</script>

<script lang="ts">
export interface WallSelectItem<Item extends CatalogItem>
  extends BaseSelectItem {
  item: Item;
  preview: WallPreview;
}
</script>

<style lang="postcss" scoped>
.cw-panel-catalog-wall-item-select {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--cw-spacing-small);
  padding: var(--cw-spacing-medium);
  background: rgb(var(--rgb-blue-7) / 80%);
  border-radius: var(--cw-border-radius-medium);
}
</style>
