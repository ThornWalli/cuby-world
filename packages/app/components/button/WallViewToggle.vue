<template>
  <base-button class="cw-button-wall-view-toggle" aria-label="Wall View Toggle">
    <div>
      <transition name="fade-short">
        <svg-icon-wall-small v-if="viewMode === WALL_VIEW_MODE.SMALL" />
        <svg-icon-wall-dynamic
          v-else-if="viewMode === WALL_VIEW_MODE.DYNAMIC" />
        <svg-icon-wall-large v-else-if="viewMode === WALL_VIEW_MODE.LARGE" />
      </transition>
    </div>
  </base-button>
</template>

<script setup lang="ts">
import BaseButton from '../base/Button.vue';
import SvgIconWallSmall from '../../assets/icons/wall/stroke/small.svg?component';
import SvgIconWallLarge from '../../assets/icons/wall/stroke/large.svg?component';
import SvgIconWallDynamic from '../../assets/icons/wall/stroke/dynamic.svg?component';
import { WALL_VIEW_MODE } from '@cuby-world/app/lib/classes/roomModule/Wall';

defineProps<{
  viewMode: WALL_VIEW_MODE;
}>();
</script>

<style lang="postcss" scoped>
.cw-button-wall-view-toggle {
  padding: var(--cw-spacing-small);
  color: var(--color-white);
  cursor: pointer;
  border-radius: var(--cw-border-radius-medium);
  transition: background-color var(--cw-easing-duration-short)
    var(--cw-easing-base);

  &:hover {
    background-color: var(--color-blue-7);
  }

  @media (hover: none) {
    &:active {
      background-color: var(--color-blue-7);
    }
  }

  & > div {
    position: relative;
    width: 64px;

    &::before {
      padding-top: calc(166 / 132 * 100%);
    }
  }

  & svg {
    display: block;
    width: 100%;
    fill: currentColor;

    &:not(:first-child) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
