<template>
  <div class="cw-catalog">
    <div>
      <div class="title">Catalog</div>
      <div role="list" class="list grid">
        <base-button
          v-for="item in preparedItems"
          :key="item.id"
          :class="{ selected: currentItem?.id === item.id }"
          role="listitem"
          @click="onClick(item)">
          <cw-object-preview-unit
            v-if="'unit' in item && item.unit"
            :app="app"
            :ratio="1"
            hide-ground
            :model-value="{
              type: item.id
            }" />
          <!-- {{ item.name }} -->
        </base-button>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="currentItem" :key="currentItem.id" class="unit-preview">
        <div class="title">Preview</div>
        <div class="preview">
          <cw-object-preview-unit
            v-if="'unit' in currentItem && currentItem.unit"
            :app="app"
            :ratio="1"
            hide-ground
            :model-value="{
              type: currentItem.id
            }" />
        </div>
        <div class="name">{{ currentItem.name }}</div>
        <div class="description">
          <p>{{ currentItem.description }}</p>
        </div>
        <div class="spacer"></div>
        <div class="buttons">
          <cw-button @click="onClickBuy">Buy</cw-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { catalog } from '@cuby-world/units';
import { computed, onMounted, ref } from 'vue';
import type { UnitItem } from '../lib/types/unit/catalog';
import CwObjectPreviewUnit from './objectPreview/Unit.vue';
import type Unit from '../lib/classes/Unit';
import type App from '../lib/classes/App';

import BaseButton from './base/Button.vue';
import CwButton from './Button.vue';

const items = computed(() => Array.from(catalog.values()));
const currentItem = ref<UnitItem | null>(null);

const $props = defineProps<{
  app: App;
}>();

const $emit = defineEmits<{
  (e: 'close'): void;
}>();

function resolveCatalogItems(items: UnitItem[]) {
  return Promise.all(
    items.map(async item => {
      const unitClass = await item.instance();
      return {
        ...item,
        unit: unitClass
      };
    })
  );
}

function onClick(item: UnitItem) {
  currentItem.value = item;
}

const preparedItems = ref<
  (UnitItem & {
    unit?: typeof Unit;
  })[]
>(items.value);

onMounted(async () => {
  resolveCatalogItems(items.value).then(resolvedItems => {
    preparedItems.value = resolvedItems;
  });
});

async function onClickBuy() {
  if (!currentItem.value?.id) {
    throw new Error('No item selected');
  }
  const result = await $props.app.modules.catalog.buyItem(
    currentItem.value?.id
  );
  if (result) {
    $emit('close');
  } else {
    alert('The purchase is not possible.');
  }
}
</script>

<style lang="postcss" scoped>
.cw-catalog {
  display: grid;
  grid-template-columns: auto auto;
  gap: var(--cw-spacing-medium);

  & > div {
    display: flex;
    flex-direction: column;
    gap: var(--cw-spacing-medium);
    padding: var(--cw-spacing-medium);
    color: var(--color-white);
    background: var(--cw-overlay-background);
    border-radius: var(--cw-overlay-border-radius);
    box-shadow: var(--cw-overlay-box-shadow);

    &:first-child {
      width: 300px;
      height: 480px;
    }
  }

  & .title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  & .list.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--cw-spacing-medium);

    & > * {
      aspect-ratio: 1;
      padding: var(--cw-spacing-small);
      cursor: pointer;
      background-color: rgb(255 255 255 / 40%);
      border-radius: var(--cw-border-radius-medium);
      transition: background-color var(--cw-easing-duration-short)
        var(--cw-easing-in);

      &:hover {
        background-color: rgb(255 255 255 / 60%);
      }

      &.selected {
        background-color: rgb(255 255 255 / 60%);
      }
    }
  }

  & .unit-preview {
    & .preview {
      position: relative;
      width: 128px;
      aspect-ratio: 4 / 3;
      background-color: rgb(255 255 255 / 40%);
      border-radius: var(--cw-border-radius-medium);

      &::before {
        display: block;
        width: 100%;
        padding-top: calc(100% * 1);
        content: '';
      }

      & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }

    & .name {
      font-size: 14px;
      font-weight: bold;
    }

    & .description {
      font-size: 12px;
      line-height: 1.4;

      & p {
        margin: 0;
      }
    }

    & .buttons {
      display: flex;
      gap: var(--cw-spacing-small);
    }

    & .spacer {
      flex: 1;
    }
  }

  & :deep(.cw-object-preview-unit) {
    /* width: 48px; */
  }
}
</style>
