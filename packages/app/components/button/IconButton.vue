<template>
  <base-button
    class="cw-button-icon-button"
    :class="{
      selected,
      [`style-type-${styleType ?? 'default'}`]: true,
      [`color-${color ?? 'default'}`]: true,
      [`label-${labelDirection ?? 'bottom'}`]: !!label && !hideLabel
    }"
    :aria-label="label">
    <span v-if="label && !hideLabel">{{ label }}</span>
    <div>
      <base-icon :size="iconSize ?? 'large'" :name="currentIcon" class="icon" />
    </div>
  </base-button>
</template>

<script setup lang="ts">
import { computed, type FunctionalComponent } from 'vue';
import BaseButton from '../base/Button.vue';
import BaseIcon from '../base/Icon.vue';
import icons from '../../utils/icons';
import type { IconSize } from '@cuby-world/app/lib/types/icon';

const $props = defineProps<{
  hideLabel?: boolean;
  label?: string;
  labelDirection?: 'right' | 'left' | 'top' | 'bottom';
  icon: keyof typeof icons | FunctionalComponent;
  iconSize?: IconSize | `${IconSize}`;
  selected?: boolean;
  styleType?: 'default' | 'round';
  color?: 'default' | 'red' | 'green';
}>();

const currentIcon = computed(() => {
  if (typeof $props.icon === 'string') {
    return icons[$props.icon];
  }
  return $props.icon;
});
</script>

<style lang="postcss" scoped>
.cw-button-icon-button {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-family: var(--font-base);
  font-size: 12px;
  color: white;

  /* &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  } */

  & > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease;
  }

  &.style-type-default {
    & > div {
      width: 48px;
      height: 48px;
      background: var(--cw-overlay-background);
      border-radius: var(--cw-border-radius-large);
      box-shadow: var(--cw-overlay-box-shadow);
      backdrop-filter: blur(var(--cw-overlay-backdrop-blur));
    }

    &.selected,
    &:hover {
      & > div {
        background-color: var(--color-blue-7);
      }
    }

    &:hover {
      & span {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  &.style-type-round {
    & > div {
      padding: 6px;
      background-color: var(--color-blue-7);
      border-radius: 50%;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 60%);
      transition: background var(--cw-easing-duration-short) var(--cw-easing-in);
    }

    &.selected,
    &:hover {
      & > div {
        background-color: var(--color-blue-8);
      }
    }

    &.color-red {
      & > div {
        background-color: var(--color-red-7);
      }

      &.selected,
      &:hover {
        & > div {
          background-color: var(--color-red-8);
        }
      }
    }

    &.color-green {
      & > div {
        background-color: var(--color-green-7);
      }

      &.selected,
      &:hover {
        & > div {
          background-color: var(--color-green-8);
        }
      }
    }

    &:hover {
      & span {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &[disabled] {
      & > div {
        background-color: var(--color-mono-4);
        box-shadow: none;
      }

      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  & span {
    position: absolute;
    font-weight: bold;
    white-space: nowrap;
    opacity: 0;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  &.label-top span {
    bottom: 100%;
    padding-bottom: 8px;
    transform: translateY(calc(100% / 3));
  }

  &.label-left span {
    right: 100%;
    padding-right: 8px;
    transform: translateX(calc(100% / 3));
  }

  &.label-right span {
    left: 100%;
    padding-left: 8px;
    transform: translateX(calc(100% / -3));
  }

  &.label-bottom span {
    top: 100%;
    left: 50%;
    transform: translate(-50%, 8px);
  }
}
</style>
