<template>
  <div
    class="cw-editor-catalog-item-select"
    :style="{
      '--size': size ?? defaultSize
    }">
    <slot name="before"></slot>
    <div>
      <base-button
        :disabled="currentIndex < 1"
        class="navigation"
        @click="onClickPrev">
        <base-icon size="small" name="arrow_navigation_filled_left" />
      </base-button>
      <div ref="itemsEl" class="items">
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
          <span v-if="(item.skins?.length ?? 0) > 1" class="skins">
            {{ item.skins?.length }}</span
          >
        </base-button>
      </div>
      <base-button
        :disabled="currentIndex >= maxIndex"
        class="navigation"
        @click="onClickNext">
        <base-icon size="small" name="arrow_navigation_filled_right" />
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="I extends BaseSelectItem">
import BaseButton from './base/Button.vue';
import type { CatalogItem } from '@cuby-world/app/lib/types/catalog';
import type { ObjectPreview } from './ObjectPreview.vue';

import BaseIcon from './base/Icon.vue';
import { computed, ref } from 'vue';

const itemsEl = ref<HTMLDivElement | null>(null);

const defaultSize = 5;
const $props = defineProps<{
  size?: number;
  items: I[];
  modelValue: I['item']['id'] | null;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: I['item']['id'] | null): void;
}>();

function onClickItem(id: I['item']['id']) {
  $emit('update:model-value', id === $props.modelValue ? null : id);
}

const currentSize = computed(() => {
  return $props.size ?? defaultSize;
});

const maxIndex = computed(() => {
  return Math.ceil($props.items.length / currentSize.value) - 1;
});

const currentIndex = ref(0);

function onClickPrev() {
  currentIndex.value = Math.max(0, currentIndex.value - 1);
  scrollTo();
}

function onClickNext() {
  currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1);
  scrollTo();
}

function scrollTo() {
  itemsEl.value?.children[
    currentIndex.value * currentSize.value
  ]?.scrollIntoView({
    // behavior: 'smooth',
    inline: 'start'
  });
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
  --total-width: 100%;
  --item-width: calc(var(--total-width) * 1);

  & > div {
    display: flex;
  }

  & .navigation {
    padding: var(--cw-spacing-small);
    color: var(--color-white);
    cursor: pointer;
    opacity: 0.8;
    transition: opacity var(--cw-easing-duration-short) var(--cw-easing-base);

    &:hover {
      opacity: 1;
    }

    &[disabled] {
      cursor: default;
      opacity: 0.4;
    }
  }

  & .items {
    --gap: var(--cw-spacing-small);

    display: grid;
    grid-auto-columns: calc(
      (100% - (var(--gap) * (var(--size) - 1))) / var(--size)
    );
    grid-auto-flow: column;
    gap: var(--cw-spacing-small);
    justify-items: start;
    width: 100%;
    max-width: 100%;
    overflow: auto;

    & button {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--cw-spacing-medium);
      align-items: flex-end;
      width: var(--item-width);
      padding: var(--cw-spacing-small) var(--cw-spacing-medium);
      padding-bottom: var(--cw-spacing-medium);
      font-family: var(--font-base);
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      background: var(--color);
      background-color: rgb(var(--rgb-white) / 40%);
      border: none;
      border-radius: var(--cw-border-radius-medium);
      box-shadow: inset 0 0 0 black;
      transition:
        box-shadow var(--cw-easing-duration-short) var(--cw-easing-base),
        background-color var(--cw-easing-duration-short) var(--cw-easing-base),
        border-color var(--cw-easing-duration-short) var(--cw-easing-base),
        color var(--cw-easing-duration-short) var(--cw-easing-base);

      & > div {
        display: flex;
        flex: 1;
        justify-content: center;
        width: 100%;
      }

      &:hover,
      &.selected {
        background-color: white;
        box-shadow: inset 0 0 4px black;
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
