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

  inset: var(--panel-offset) var(--panel-offset) var(--panel-offset)
    var(--panel-offset);
  display: flex;
  flex-direction: column;
  gap: var(--panel-gap);
  align-items: flex-start;
  container-type: size;
  pointer-events: none;

  & > :deep(.panel-row) {
    display: flex;
    flex-direction: row;
    gap: var(--panel-gap);
    align-items: flex-start;
  }

  & > :deep(.panel-column) {
    display: flex;
    flex-direction: column;
    gap: var(--panel-gap);
    align-items: flex-start;
  }

  /* .direction-column {
    flex-direction: column;
  } */

  &[class*='position-'] {
    position: absolute;
  }

  &.position-left,
  &.position-right {
    justify-content: center;
  }

  &.position-top {
    justify-content: flex-start;
  }

  &.position-right {
    align-items: flex-end;
  }

  &.position-bottom {
    justify-content: flex-end;

    @media (width <= 767px) {
      bottom: calc(var(--panel-offset) + 60px);
    }
  }

  &.position-top-left {
    align-items: flex-start;
    justify-content: flex-start;
  }

  &.position-top-right {
    align-items: flex-end;
    justify-content: flex-start;
  }

  &.position-bottom-left {
    align-items: flex-start;
    justify-content: flex-end;
  }

  &.position-bottom-right {
    align-items: flex-end;
    justify-content: flex-end;
  }
}
</style>
