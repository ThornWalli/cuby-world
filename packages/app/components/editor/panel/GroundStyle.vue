<template>
  <cw-panel class="cw-panel-editor-ground-style" title="Ground Style">
    <div class="item-title">{{ title }}</div>
    <div class="colors">
      <base-button
        v-for="item in items"
        :key="item.id"
        :class="{ selected: modelValue === item.id }"
        :style="{ '--color': item.skin!.color }"
        @click="onClickStyle(item.id)">
        <span>{{ item.name }}</span>
      </base-button>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import BaseButton from '../../base/Button.vue';

import { computed, ref } from 'vue';
import { skins } from '@cuby-world/grounds';
import type { GrountStyleIdentifier } from '../../../lib/types/ground';

const $props = defineProps<{
  modelValue: GrountStyleIdentifier;
}>();

const items = ref(Array.from(skins.values()));
const title = computed(() => {
  if ($props.modelValue) {
    const style = skins.get($props.modelValue);
    return style ? style.name : '?';
  }
  return 'Select Style';
});

const $emit = defineEmits<{
  (e: 'update:model-value', value: GrountStyleIdentifier | null): void;
}>();

function onClickStyle(styleId: GrountStyleIdentifier) {
  if (styleId === $props.modelValue) {
    $emit('update:model-value', null);
  } else {
    $emit('update:model-value', styleId);
  }
}
</script>

<style lang="postcss" scoped>
.cw-panel-editor-ground-style {
  & .item-title {
    width: 120px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
}

.colors {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;

  & button {
    width: 16px;
    height: 16px;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    background: var(--color);
    border: none;
    border-radius: 0.25rem;

    & span {
      display: none;
    }

    &:hover {
      filter: brightness(0.9);
    }

    &:active {
      filter: brightness(0.8);
    }

    &::before {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
      content: '';
      border: 2px solid transparent;
      border-radius: 0.25rem;
    }
  }
}
</style>
