<template>
  <i class="base-icon" :class="{ [`size-${size ?? IconSize.SMALL}`]: true }">
    <component :is="icon" />
  </i>
</template>

<script setup lang="ts">
import type { Icon } from '@cuby-world/app/lib/types/icon';
import icons from '../../utils/icons';
import { computed } from 'vue';

const $props = defineProps<{
  name: Icon;
  size?: `${IconSize}` | IconSize;
}>();

const icon = computed(() => {
  if (typeof $props.name === 'string') {
    return icons[$props.name];
  } else {
    return $props.name;
  }
});
</script>

<script lang="ts">
export enum IconSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  VERY_LARGE = 'very-large'
}
</script>

<style lang="postcss" scoped>
.base-icon {
  /* size-very-small */
  --size: 16;

  &.size-small {
    --size: 24;
  }

  &.size-medium {
    --size: 28;
  }

  &.size-large {
    --size: 32;
  }

  &.size-very-large {
    --size: 39;
  }

  & svg {
    display: block;
    width: calc(var(--size) * 1px);
    height: calc(var(--size) * 1px);
    fill: currentColor;
  }
}
</style>
