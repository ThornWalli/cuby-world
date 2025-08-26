<template>
  <base-button
    class="cw-button"
    :class="{ [`style-type-${styleType}`]: styleType }">
    <slot>Button</slot>
  </base-button>
</template>

<script lang="ts" setup>
import BaseButton from './base/Button.vue';

defineProps<{
  styleType?: 'light' | 'dark';
}>();
</script>

<style lang="postcss" scoped>
.cw-button {
  padding: 0.25em 0.5em;
  font-family: var(--font-base);
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  border: solid 2px #fff;
  border-radius: 3px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not([disabled]):hover {
    background: rgb(255 255 255 / 10%);
  }

  &.style-type-light {
    color: var(--color-white);
    background-color: var(--color-blue-7);
    border-color: var(--color-black);

    &:not([disabled]):hover {
      background: var(--color-blue-8);
    }
  }
}
</style>
