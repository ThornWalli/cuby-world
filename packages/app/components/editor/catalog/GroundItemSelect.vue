<template>
  <div class="cw-panel-catalog-ground-item-select">
    <slot name="before"></slot>
    <div class="items">
      <base-button
        v-for="{ item, preview } in items"
        :key="item.id"
        :class="{ selected: modelValue === item.id }"
        @click="onClickItem(item.id)">
        <div>
          <cw-object-preview-ground
            class="image"
            :app="app"
            :ratio="1"
            :model-value="preview"
            hydrate-when-visible />
        </div>
        <span>{{ item.name }}</span>
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup generic="Item extends CatalogItem">
import BaseButton from '../../base/Button.vue';

import CwObjectPreviewGround, {
  type GroundPreview
} from '../../objectPreview/Ground.vue';

import type App from '../../../lib/classes/App';
import type { CatalogItem } from '../../../lib/types/catalog';

const $props = defineProps<{
  app: App;
  items: GroundItem<Item>[];
  modelValue: Item['id'] | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: Item['id'] | null): void;
}>();

function onClickItem(id: Item['id']) {
  $emit('update:model-value', id === $props.modelValue ? null : id);
}
</script>

<script lang="ts">
export interface GroundItem<Item extends CatalogItem> {
  item: Item;
  preview: GroundPreview;
}
</script>

<style lang="postcss" scoped>
.cw-panel-catalog-ground-item-select {
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
