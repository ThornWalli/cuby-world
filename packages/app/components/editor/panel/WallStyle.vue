<template>
  <cw-panel class="cw-panel-editor-wall-style" title="Wall Style">
    <div class="value">{{ modelValue?.name || '?' }}</div>
    <div class="colors">
      <base-button
        v-for="style in styles"
        :key="style.color"
        :class="{ selected: modelValue.id === style.id }"
        :style="{ '--color': style.color }"
        @click="onClickStyle(style)">
        <span>{{ style.name }}</span>
      </base-button>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import type { WallStyleTemplate } from '@cuby-world/app/lib/types/wall/style';
import CwPanel from '../../Panel.vue';
import BaseButton from '../../base/Button.vue';

const $props = defineProps<{
  modelValue: WallStyleTemplate;
}>();

const styles: WallStyleTemplate[] = [
  { id: 'color_blue', color: '#0066ff', name: 'Blue' },
  { id: 'color_red', color: '#d70000', name: 'Red' },
  { id: 'color_green', color: '#009925', name: 'Green' },
  { id: 'color_orange', color: '#f59e0b', name: 'Orange' },
  { id: 'color_white', color: '#ffffff', name: 'White' },
  { id: 'color_light_red', color: '#f28b82', name: 'Light Red' },
  { id: 'color_light_orange', color: '#fbbc04', name: 'Light Orange' },
  { id: 'color_light_yellow', color: '#fff475', name: 'Light Yellow' },
  { id: 'color_light_green', color: '#ccff90', name: 'Light Green' },
  { id: 'color_light_teal', color: '#a7ffeb', name: 'Light Teal' },
  { id: 'color_light_blue', color: '#cbf0f8', name: 'Light Blue' },
  { id: 'color_light_dark_blue', color: '#aecbfa', name: 'Light Dark Blue' },
  { id: 'color_light_purple', color: '#d7aefb', name: 'Light Purple' },
  { id: 'color_light_pinkle', color: '#fdcfe8', name: 'Light Pink' },
  { id: 'color_light_light_brown', color: '#e6c9a8', name: 'Light Brown' },
  { id: 'color_light_light_gray', color: '#e8eaed', name: 'Light Gray' }
];

const $emit = defineEmits<{
  (e: 'update:model-value', value: WallStyleTemplate | null): void;
}>();

function onClickStyle(style: WallStyleTemplate) {
  if (style.id === $props.modelValue.id) {
    $emit('update:model-value', null);
  } else {
    $emit('update:model-value', style);
  }
}
</script>

<style lang="postcss" scoped>
.cw-panel-editor-wall-style {
  & .value {
    font-size: 11px;
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
