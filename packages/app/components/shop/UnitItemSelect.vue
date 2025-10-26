<template>
  <cw-item-select
    :model-value="modelValue"
    :items="items"
    class="cw-panel-shop-unit-item-select"
    @update:model-value="onUpdateModelValue">
    <template #before>
      <div class="controls">
        <slot name="controls"></slot>
      </div>
    </template>
    <template #preview="{ preview }">
      <cw-object-preview-unit
        :app="app"
        :ratio="1"
        :model-value="preparedPreview(preview)"
        hydrate-when-visible />
    </template>
  </cw-item-select>
</template>

<script lang="ts" setup generic="Item extends CatalogItem">
import CwItemSelect, { type BaseSelectItem } from '../ItemSelect.vue';
import CwObjectPreviewUnit from '../objectPreview/Unit.vue';

import type App from '../../lib/classes/App';
import type { CatalogItem } from '../../lib/types/catalog';
import type { UnitPreview } from '../objectPreview/Unit.vue';
import type { ObjectPreview } from '../ObjectPreview.vue';

const $props = defineProps<{
  app: App;
  items: UnitSelectItem<Item>[];
  modelValue: Item['id'] | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: Item['id'] | null): void;
}>();

function onUpdateModelValue(id: Item['id'] | null) {
  $emit('update:model-value', id === $props.modelValue ? null : id);
}

function preparedPreview(preview: ObjectPreview) {
  return preview as UnitPreview;
}
</script>

<script lang="ts">
export interface UnitSelectItem<Item extends CatalogItem>
  extends BaseSelectItem {
  item: Item;
  preview: UnitPreview;
}
</script>

<style lang="postcss" scoped>
.cw-panel-shop-unit-item-select {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  background: rgb(var(--rgb-blue-7) / 80%);
  border-radius: 12px;

  & :deep(.items) {
    height: calc(96px + var(--cw-spacing-medium) * 2);
  }

  & .value {
    font-size: 11px;
    font-weight: bold;
    text-align: center;
  }

  &.cw-editor-catalog-item-select {
    --preview-width: 96px;
  }

  & .controls {
    display: flex;
    align-items: center;
  }
}
</style>
