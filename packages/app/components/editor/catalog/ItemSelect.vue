<template>
  <div class="cw-editor-catalog-item-select">
    <slot name="before"></slot>
    <div class="items">
      <base-button
        v-for="{ item, preview } in items"
        :key="item.id"
        :class="{ selected: modelValue === item.id }"
        @click="onClickItem(item.id)">
        <div>
          <div class="preview-wrapper">
            <slot name="preview" :preview="preview"></slot>
          </div>
        </div>
        <span class="name">{{ item.name }}</span>
        <span v-if="item.skins" class="skins"> {{ item.skins?.length }}</span>
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="I extends BaseSelectItem">
import BaseButton from '../../base/Button.vue';
import type { CatalogItem } from '@cuby-world/app/lib/types/catalog';
import type { ObjectPreview } from '../../ObjectPreview.vue';

const $props = defineProps<{
  items: I[];
  modelValue: I['item']['id'] | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: I['item']['id'] | null): void;
}>();

function onClickItem(id: I['item']['id']) {
  $emit('update:model-value', id === $props.modelValue ? null : id);
}
</script>

<script lang="ts">
export interface BaseSelectItem<Preview extends ObjectPreview = ObjectPreview> {
  item: CatalogItem;
  preview: Preview;
}
</script>

<style lang="postcss" scoped>
.cw-editor-catalog-item-select {
  --preview-width: 48px;

  & .items {
    display: grid;
    grid-template-rows: repeat(1, 1fr);
    grid-auto-flow: column;
    gap: var(--cw-spacing-small);
    justify-items: start;
    max-width: 100%;
    overflow: auto;

    & button {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--cw-spacing-medium);
      align-items: flex-end;
      padding: var(--cw-spacing-small) var(--cw-spacing-medium);
      padding-bottom: var(--cw-spacing-medium);
      font-family: var(--font-base);
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      background: var(--color);
      background-color: rgb(var(--rgb-white) / 40%);
      border: none;
      border-radius: var(--cw-border-radius-medium);
      transition:
        background-color var(--cw-easing-duration-short) var(--cw-easing-base),
        border-color var(--cw-easing-duration-short) var(--cw-easing-base),
        color var(--cw-easing-duration-short) var(--cw-easing-base);

      &:hover {
        background-color: rgb(var(--rgb-white) / 80%);
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

      & .preview-wrapper {
        width: var(--preview-width);
      }

      & span.name {
        display: none;
        min-width: 96px;
        font-size: 11px;
        font-weight: bold;
        text-align: center;
      }

      & span.skins {
        position: absolute;
        top: var(--cw-spacing-medium);
        right: var(--cw-spacing-medium);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        font-size: 12px;
        font-weight: bold;
        color: var(--color-gray-7);
        background-color: var(--color-white);
        border-radius: 50%;
      }
    }
  }
}
</style>
