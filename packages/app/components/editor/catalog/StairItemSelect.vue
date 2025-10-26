<template>
  <cw-editor-catalog-item-select
    :model-value="modelValue"
    :items="items"
    class="cw-panel-catalog-stair-item-select"
    @update:model-value="onUpdateModelValue">
    <template #before>
      <div class="controls">
        <slot name="controls"></slot>
      </div>
    </template>
    <template #preview="{ preview }">
      <cw-object-preview-stair
        :app="app"
        :ratio="1"
        :model-value="preparedPreview(preview)"
        hydrate-when-visible />
    </template>
  </cw-editor-catalog-item-select>
</template>

<script lang="ts" setup generic="Item extends CatalogItem">
import CwEditorCatalogItemSelect, {
  type BaseSelectItem
} from '../../ItemSelect.vue';
import CwObjectPreviewStair from '../../objectPreview/Stair.vue';

import type App from '../../../lib/classes/App';
import type { CatalogItem } from '../../../lib/types/catalog';
import type { StairPreview } from '../../objectPreview/Stair.vue';
import type { ObjectPreview } from '../../ObjectPreview.vue';

const $props = defineProps<{
  app: App;
  items: StairSelectItem<Item>[];
  modelValue: Item['id'] | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: Item['id'] | null): void;
}>();

function onUpdateModelValue(id: Item['id'] | null) {
  $emit('update:model-value', id === $props.modelValue ? null : id);
}

function preparedPreview(preview: ObjectPreview) {
  return preview as StairPreview;
}
</script>

<script lang="ts">
export interface StairSelectItem<Item extends CatalogItem>
  extends BaseSelectItem {
  item: Item;
  preview: StairPreview;
}
</script>

<style lang="postcss" scoped>
.cw-panel-catalog-stair-item-select {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  background: rgb(var(--rgb-blue-7) / 80%);
  border-radius: 12px;

  & .value {
    font-size: 11px;
    font-weight: bold;
    text-align: center;
  }

  &.cw-editor-catalog-item-select {
    --preview-width: 128px;
  }

  & .controls {
    display: flex;
    align-items: center;
  }
}

/* .items {
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-auto-flow: column;
  gap: 5px;
  justify-items: start;
  max-width: 100%;
  overflow: auto;

  & button {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
    padding: 8px 16px;
    font-family: var(--font-base);
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    background: var(--color);
    background-color: rgb(255 255 255 / 40%);
    border: none;
    border-radius: 12px;
    transition: background-color var(--cw-easing-duration-short)
      var(--cw-easing-base);

    &:hover {
      background-color: white;
    }

    & > div {
      display: flex;
      flex: 1;
      justify-content: center;
      width: 100%;
    }

    &.selected {
      background-color: white;
    }

    & .image {
      width: 128px;
    }

    & span {
      display: none;
      min-width: 96px;
    }
  }
} */
</style>
