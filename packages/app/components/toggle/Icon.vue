<template>
  <base-button
    class="cw-toggle-icon"
    :class="{
      selected: modelValue,
      [`color-${color ?? 'default'}`]: true,
      [`label-${labelDirection ?? 'bottom'}`]: !!label && !hideLabel
    }"
    :aria-label="label"
    @click="$emit('update:model-value', !modelValue)">
    <span v-if="label && !hideLabel">{{ label }}</span>
    <div>
      <base-icon
        :name="currentIcon"
        :size="iconSize ?? 'very-large'"
        class="icon" />
    </div>
  </base-button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from '../base/Button.vue';
import BaseIcon from '../base/Icon.vue';
import icons from '../../utils/icons';
import type { Icon, IconSize } from '@cuby-world/app/lib/types/icon';

defineEmits<{
  (e: 'update:model-value', value: boolean): void;
}>();

const $props = defineProps<{
  hideLabel?: boolean;
  label?: string;
  labelDirection?: 'right' | 'left' | 'top' | 'bottom';
  icon: Icon;
  iconSize?: IconSize | `${IconSize}`;
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
  position: relative;
  display: flex;
  flex-direction: row;
  gap: var(--cw-spacing-medium);
  align-items: center;
  justify-content: center;
  font-family: var(--font-base);
  font-size: 12px;
  color: white;

  --hover-color-background: var(--color-blue-7);

  &.color-red {
    --hover-color-background: var(--color-red-7);
  }

  & svg {
    fill: currentColor;
  }

  & .icon {
    display: block;

    /* width: 32px; */
  }

  & > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    cursor: pointer;
    background: var(--cw-overlay-background);
    border: none;
    border-radius: var(--cw-border-radius-large);
    box-shadow: var(--cw-overlay-box-shadow);
    backdrop-filter: blur(var(--cw-blur-default));
    transition: background-color var(--cw-easing-duration-short)
      var(--cw-easing-base);
  }

  & span {
    position: absolute;
    font-weight: bold;
    white-space: nowrap;
    opacity: 0;
    transition:
      opacity var(--cw-easing-duration-short) var(--cw-easing-base),
      transform var(--cw-easing-duration-short) var(--cw-easing-base);
  }

  &.label-top span {
    bottom: 100%;
    padding-bottom: var(--cw-spacing-medium);
    transform: translateY(calc(100% / 3));
  }

  &.label-left span {
    right: 100%;
    padding-right: var(--cw-spacing-medium);
    transform: translateX(calc(100% / 3));
  }

  &.label-right span {
    left: 100%;
    padding-left: var(--cw-spacing-medium);
    transform: translateX(calc(100% / -3));
  }

  &.label-bottom span {
    top: 100%;
    left: 50%;
    transform: translate(-50%, var(--cw-spacing-medium));
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
