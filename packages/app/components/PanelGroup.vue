<template>
  <div
    class="cw-panel-group"
    :class="{
      [`position-${position}`]: position
    }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  position?: PANEL_GROUP_POSITION | `${PANEL_GROUP_POSITION}`;
  direction?: PANEL_GROUP_DIRECTION | `${PANEL_GROUP_DIRECTION}`;
}>();
</script>

<script lang="ts">
export enum PANEL_GROUP_POSITION {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right'
}

export enum PANEL_GROUP_DIRECTION {
  ROW = 'row',
  COLUMN = 'column'
}
</script>

<style lang="postcss" scoped>
.cw-panel-group {
  --panel-offset: 1em;
  --panel-gap: 8px;

  display: flex;
  gap: var(--panel-gap);
  align-items: flex-start;
  max-width: 100%;

  .direction-column {
    flex-direction: column;
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
    justify-content: center;
    width: 100%;
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

    @media (width <= 767px) {
      bottom: calc(var(--panel-offset) + 60px);
    }
  }

  &.position-bottom-right {
    right: var(--panel-offset);
    bottom: var(--panel-offset);

    @media (width <= 767px) {
      bottom: calc(var(--panel-offset) + 60px);
    }
  }
}
</style>
