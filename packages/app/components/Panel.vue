<template>
  <div
    class="cw-panel"
    :class="{
      [`position-${position}`]: position,
      'has-title': !hideTitle && hasTitle
    }">
    <div v-if="!hideTitle && hasTitle" class="title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue';

const $slots = useSlots();

const $props = defineProps<{
  title?: string;
  hideTitle?: boolean;
  position?: PANEL_POSITION | `${PANEL_POSITION}`;
}>();

const hasTitle = computed(() => $props.title || $slots.title);
</script>

<script lang="ts">
export enum PANEL_POSITION {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right'
}
</script>

<style lang="postcss" scoped>
.cw-panel {
  --panel-offset: 1em;

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  color: white;
  background: rgb(0 0 0 / 80%);
  border: solid 2px rgb(255 255 255 / 80%);
  border-radius: 6px;
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 80%);
  backdrop-filter: blur(5px);

  &.has-title {
    padding-top: 8px;
  }

  & .title {
    display: block;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  & .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &[class*='position-'] {
    position: absolute;
  }

  &.position-left {
    position: absolute;
    top: 50%;
    left: var(--panel-offset);
    transform: translateY(-50%);
  }

  &.position-right {
    top: 50%;
    right: var(--panel-offset);
    transform: translateY(-50%);
  }

  &.position-top {
    top: var(--panel-offset);
    left: 50%;
    transform: translateX(-50%);
  }

  &.position-bottom {
    bottom: var(--panel-offset);
    left: 50%;
    transform: translateX(-50%);
  }

  &.position-top-left {
    top: var(--panel-offset);
    left: var(--panel-offset);
  }

  &.position-top-right {
    top: var(--panel-offset);
    right: var(--panel-offset);
  }

  &.position-bottom-left {
    bottom: var(--panel-offset);
    left: var(--panel-offset);
  }

  &.position-bottom-right {
    right: var(--panel-offset);
    bottom: var(--panel-offset);
  }
}
</style>
