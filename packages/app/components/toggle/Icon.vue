<template>
  <base-button
    class="cw-toggle-icon"
    :class="{ selected: modelValue, [`color-${color ?? 'default'}`]: true }"
    :aria-label="label"
    @click="$emit('update:model-value', !modelValue)">
    <span v-if="!hideLabel">{{ label }}</span>
    <div>
      <component :is="currentIcon" class="icon" />
    </div>
  </base-button>
</template>

<script setup lang="ts">
import { computed, type FunctionalComponent } from 'vue';
import BaseButton from '../base/Button.vue';
import icons from '../../utils/icons';

defineEmits<{
  (e: 'update:model-value', value: boolean): void;
}>();

const $props = defineProps<{
  hideLabel?: boolean;
  label?: string;
  icon: keyof typeof icons | FunctionalComponent;
  modelValue: boolean;
  color?: 'default' | 'red';
}>();

const currentIcon = computed(() => {
  if (typeof $props.icon === 'string') {
    return icons[$props.icon];
  }
  return $props.icon;
});
</script>

<style lang="postcss" scoped>
.cw-toggle-icon {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-family: var(--font-base);
  font-size: 12px;
  color: white;

  --hover-color-background: var(--color-blue-7);

  &.color-red {
    --hover-color-background: var(--color-red-7);
  }

  & .icon {
    display: block;
    width: 32px;
  }

  & > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    cursor: pointer;
    background: rgb(0 0 0 / 40%);
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 80%);
    backdrop-filter: blur(5px);
    transition: background-color 0.2s ease;
  }

  & span {
    position: absolute;
    left: 100%;
    white-space: nowrap;
    opacity: 0;
    transform: translateX(calc(100% / -3));
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  &.selected,
  &:hover {
    & > div {
      background-color: var(--hover-color-background);
    }
  }

  &:hover {
    & span {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
</style>
