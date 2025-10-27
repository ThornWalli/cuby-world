<template>
  <div class="cw-catalog">
    <div class="title">Catalog</div>
    <div>
      <div class="unit-list">
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
      <div class="unit-preview">
        <div v-if="currentItem" :key="currentItem.id">
          <div class="preview">
            <div>
              <cw-object-preview-unit
                v-if="'unit' in currentItem && currentItem.unit"
                :app="app"
                :ratio="1"
                hide-ground
                :model-value="{
                  type: currentItem.id
                }" />
            </div>
          </div>
          <div>
            <div class="name">{{ currentItem.name }}</div>
            <div class="description">
              <p>{{ currentItem.description }}</p>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="buttons">
            <cw-button @click="onClickBuy">Buy</cw-button>
          </div>
        </div>
        <div v-else class="no-select">Select Unit!</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { catalog } from '@cuby-world/units';
import { computed, onMounted, ref } from 'vue';
import type { UnitItem } from '../../lib/types/unit/catalog';
import CwObjectPreviewUnit from '../objectPreview/Unit.vue';
import type Unit from '../../lib/classes/Unit';
import type App from '../../lib/classes/App';

import BaseButton from '../base/Button.vue';
import CwButton from '../Button.vue';

const items = computed(() => Array.from(catalog.values()));
const currentItem = ref<UnitItem | null>(null);

defineProps<{
  app: App;
}>();

defineEmits<{
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
  if (currentItem.value?.id === item.id) {
    currentItem.value = null;
    return;
  }
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
  // if (!currentItem.value?.id) {
  //   throw new Error('No item selected');
  // }
  // const result = await $props.app.modules.catalog.buyItem(
  //   currentItem.value?.id
  // );
  // if (result) {
  //   $emit('close');
  // } else {
  //   alert('The purchase is not possible.');
  // }
}
</script>

<style lang="postcss" scoped>
.cw-catalog {
  /* display: grid;
  grid-template-columns: auto auto; */
  display: flex;
  flex-direction: column;
  gap: var(--cw-spacing-medium);
  width: 100%;
  max-width: 480px;
  height: 320px;
  padding: var(--cw-spacing-medium);
  color: var(--color-white);
  pointer-events: auto;
  background: var(--cw-overlay-background);
  border-radius: var(--cw-overlay-border-radius);
  box-shadow: var(--cw-overlay-box-shadow);

  & .no-select {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }

  & > div:not(.title) {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  & .unit-list,
  & .unit-preview > div {
    display: flex;
    flex-direction: column;
    gap: var(--cw-spacing-medium);
    height: 100%;

    &:first-child {
      flex: 1;
    }
  }

  & .unit-preview > div {
    align-items: center;
  }

  & .title {
    width: 100%;
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
    width: 180px;

    & .preview {
      width: 128px;
      padding: var(--cw-spacing-medium);
      background-color: rgb(255 255 255 / 40%);
      border-radius: var(--cw-border-radius-medium);

      & > div {
        position: relative;

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
      width: 100%;
    }

    & .spacer {
      flex: 1;
    }
  }

  @container (max-width: 420px) {
    flex-direction: column;

    & .unit-preview {
      width: 100%;

      & > div {
        height: auto;
      }
    }
  }

  & :deep(.cw-object-preview-unit) {
    /* width: 48px; */
  }
}
</style>
