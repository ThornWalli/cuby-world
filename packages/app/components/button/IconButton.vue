<template>
  <base-button
    class="cw-button-icon-button"
    :class="{
      selected,
      [`label-${labelDirection ?? 'bottom'}`]: !!label && !hideLabel
    }"
    :aria-label="label">
    <span v-if="label && !hideLabel">{{ label }}</span>
    <div>
      <component :is="currentIcon" class="icon" />
    </div>
  </base-button>
</template>

<script setup lang="ts">
import { computed, type FunctionalComponent } from 'vue';
import BaseButton from '../base/Button.vue';
import icons from '../../utils/icons';

const $props = defineProps<{
  hideLabel?: boolean;
  label?: string;
  labelDirection?: 'right' | 'left' | 'top' | 'bottom';
  icon: keyof typeof icons | FunctionalComponent;
  selected?: boolean;
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
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-family: var(--font-base);
  font-size: 12px;
  color: white;

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
</style>
