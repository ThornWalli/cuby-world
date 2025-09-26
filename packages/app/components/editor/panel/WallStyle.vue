<template>
  <cw-panel class="cw-panel-editor-wall-style" title="Wall Style">
    <div class="colors">
      <base-button
        v-for="color in colors"
        :key="color"
        :class="{ selected: modelValue === color }"
        :style="{ '--color': color }"
        @click="onClickColor(color)"></base-button>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import BaseButton from '../../base/Button.vue';

const $props = defineProps<{
  modelValue: string;
}>();

const colors = [
  '#0066ff',
  '#d70000',
  '#009925',
  '#f59e0b',
  '#ffffff',
  '#f28b82',
  '#fbbc04',
  '#fff475',
  '#ccff90',
  '#a7ffeb',
  '#cbf0f8',
  '#aecbfa',
  '#d7aefb',
  '#fdcfe8',
  '#e6c9a8',
  '#e8eaed'
];

const $emit = defineEmits<{
  (e: 'update:model-value', value: string): void;
}>();

function onClickColor(color: string) {
  if (color === $props.modelValue) {
    color = '';
  }
  $emit('update:model-value', color);
}
</script>

<style lang="postcss" scoped>
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

    &:hover {
      filter: brightness(0.9);
    }

    &:active {
      filter: brightness(0.8);
    }
  }
}
</style>
