<template>
  <cw-panel class="cw-panel-editor-ground-style" title="Ground Style">
    <div class="value">{{ modelValue?.name || '?' }}</div>
    <div class="colors">
      <base-button
        v-for="item in items"
        :key="item.id"
        :class="{ selected: modelValue.id === item.id }"
        :style="{ '--color': item.style.options!.color }"
        @click="onClickStyle(item)">
        <span>{{ item.name }}</span>
      </base-button>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import BaseButton from '../../base/Button.vue';
import type { GroundStyleTemplate } from '@cuby-world/app/lib/types/ground/style';

const $props = defineProps<{
  modelValue: GroundStyleTemplate;
}>();

const items: GroundStyleTemplate[] = [
  {
    id: 'color_blue',
    name: 'Blue',
    style: {
      id: 'default',
      options: { color: '#0066ff' }
    }
  },
  {
    id: 'color_red',
    name: 'Red',
    style: {
      id: 'default',
      options: { color: '#d70000' }
    }
  },
  {
    id: 'color_green',
    name: 'Green',
    style: {
      id: 'default',
      options: { color: '#009925' }
    }
  },
  {
    id: 'color_orange',
    name: 'Orange',
    style: {
      id: 'default',
      options: { color: '#f59e0b' }
    }
  },
  {
    id: 'color_white',
    name: 'White',
    style: {
      id: 'default',
      options: { color: '#ffffff' }
    }
  },
  {
    id: 'color_light_red',
    name: 'Light Red',
    style: {
      id: 'default',
      options: { color: '#f28b82' }
    }
  },
  {
    id: 'color_light_orange',
    name: 'Light Orange',
    style: {
      id: 'default',
      options: { color: '#fbbc04' }
    }
  },
  {
    id: 'color_light_yellow',
    name: 'Light Yellow',
    style: {
      id: 'default',
      options: { color: '#fff475' }
    }
  },
  {
    id: 'color_light_green',
    name: 'Light Green',
    style: {
      id: 'default',
      options: { color: '#ccff90' }
    }
  },
  {
    id: 'color_light_teal',
    name: 'Light Teal',
    style: {
      id: 'default',
      options: { color: '#a7ffeb' }
    }
  },
  {
    id: 'color_light_blue',
    name: 'Light Blue',
    style: {
      id: 'default',
      options: { color: '#cbf0f8' }
    }
  },
  {
    id: 'color_light_dark_blue',
    name: 'Light Dark Blue',
    style: {
      id: 'default',
      options: { color: '#aecbfa' }
    }
  },
  {
    id: 'color_light_purple',
    name: 'Light Purple',
    style: {
      id: 'default',
      options: { color: '#d7aefb' }
    }
  },
  {
    id: 'color_light_pinkle',
    name: 'Light Pink',
    style: {
      id: 'default',
      options: { color: '#fdcfe8' }
    }
  },
  {
    id: 'color_light_light_brown',
    name: 'Light Brown',
    style: {
      id: 'default',
      options: { color: '#e6c9a8' }
    }
  },
  {
    id: 'color_light_light_gray',
    name: 'Light Gray',
    style: {
      id: 'default',
      options: { color: '#e8eaed' }
    }
  }
];

const $emit = defineEmits<{
  (e: 'update:model-value', value: GroundStyleTemplate | null): void;
}>();

function onClickStyle(style: GroundStyleTemplate) {
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
