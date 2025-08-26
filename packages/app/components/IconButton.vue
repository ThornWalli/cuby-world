<template>
  <base-button class="cw-icon-button" :class="{ [`style-${style}`]: style }">
    <svg-icon-isometric-view />
  </base-button>
</template>

<script lang="ts" setup>
import SvgIconIsometricView from '../assets/icons/isometric-view.svg?component';
import BaseButton from './base/Button.vue';

defineProps<{
  style?: 'light' | 'dark';
}>();
</script>

<style lang="postcss" scoped>
.cw-icon-button {
  padding: 8px;
  font-family: var(--font-base);
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  background: rgb(255 255 255 / 10%);
  border: none;
  border-radius: 6px;

  &:hover {
    background: rgb(255 255 255 / 10%);
  }
}
</style>
