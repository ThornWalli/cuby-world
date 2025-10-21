<template>
  <cw-editor-catalog-item-select
    :model-value="modelValue"
    :items="items"
    class="cw-panel-catalog-ground-item-select"
    @update:model-value="onUpdateModelValue">
    <template #before><slot name="before"></slot></template>
    <template #preview="{ preview }">
      <cw-object-preview-ground
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
} from './ItemSelect.vue';
import CwObjectPreviewGround, {
  type GroundPreview
} from '../../objectPreview/Ground.vue';

import type App from '../../../lib/classes/App';
import type { CatalogItem } from '../../../lib/types/catalog';
import type { ObjectPreview } from '../../ObjectPreview.vue';

const $props = defineProps<{
  app: App;
  items: GroundItem<Item>[];
  modelValue: Item['id'] | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: Item['id'] | null): void;
}>();

function onUpdateModelValue(id: Item['id'] | null) {
  $emit('update:model-value', id === $props.modelValue ? null : id);
}

function preparedPreview(preview: ObjectPreview) {
  return preview as GroundPreview;
}
</script>

<script lang="ts">
export interface GroundItem<Item extends CatalogItem> extends BaseSelectItem {
  item: Item;
  preview: GroundPreview;
}
</script>

<style lang="postcss" scoped>
.cw-panel-catalog-ground-item-select {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--cw-spacing-small);
  padding: var(--cw-spacing-small);
  background: rgb(var(--rgb-blue-7) / 80%);
  border-radius: var(--cw-border-radius-medium);

  & .value {
    font-size: 11px;
    font-weight: bold;
    text-align: center;
  }
}

.items {
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
      width: 48px;
    }

    & span {
      display: none;
      min-width: 96px;
    }
  }
}
</style>
