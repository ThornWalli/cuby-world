<template>
  <base-button
    class="cw-room-editor-grid-wall"
    :class="{
      set: actionType === ACTION_TYPE.SET_WALL,
      edit: actionType === ACTION_TYPE.EDIT_WALL,
      [`direction-${direction}`]: true,
      [`type-${type}`]: true,
      visible,
      selected
    }"
    :style="{
      '--start-x': startPosition?.y ?? 0,
      '--start-y': startPosition?.x ?? 0,
      '--end-x': endPosition?.y ?? 0,
      '--end-y': endPosition?.x ?? 0
    }"
    @click="$emit('click', { type, startPosition, endPosition })"></base-button>
</template>

<script lang="ts" setup>
import type { Vector2 } from 'three';
import { computed } from 'vue';
import BaseButton from '@cuby-world/app/components/base/Button.vue';
import { ACTION_TYPE } from '@cuby-world/room-editor/types';
import type { WALL_TYPE } from '@cuby-world/app/lib/types/wall';

const direction = computed(() => {
  if ($props.startPosition.x === $props.endPosition?.x) {
    return 'vertical';
  } else if ($props.startPosition.y === $props.endPosition?.y) {
    return 'horizontal';
  }
  return 'default';
});

defineEmits<{
  (e: 'click', value: WallData): void;
}>();

const $props = defineProps<{
  type: WALL_TYPE;
  actionType?: ACTION_TYPE;
  startPosition: Vector2;
  endPosition: Vector2;
  selected?: boolean;
  visible?: boolean;
}>();
console.log('XXXXX', $props.startPosition.y, $props.endPosition?.y);
</script>

<script lang="ts">
export interface WallData {
  type: WALL_TYPE;
  startPosition: Vector2;
  endPosition: Vector2;
}
</script>

<style lang="postcss" scoped>
.cw-room-editor-grid-wall {
  --cell-size: 48px;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* pointer-events: none; */
  background-color: blue;

  &.type-door {
    background-color: green;
  }

  --size: 16px;

  opacity: 0;

  /* stylelint-disable-next-line selector-class-pattern */
  &.edit {
    pointer-events: none;

    &.visible {
      pointer-events: auto;
      opacity: 0.6;
    }

    &.selected {
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  &.set {
    &:hover {
      opacity: 1;
    }

    &.visible {
      opacity: 1;
    }
  }

  &.direction-vertical {
    top: calc(var(--start-x) * var(--cell-size) + var(--start-x) * 1px);
    left: calc(var(--start-y) * var(--cell-size) + var(--start-y) * 1px);
    width: var(--size);
    height: var(--cell-size);
    transform: translateX(calc(var(--size) / -2));
  }

  &.direction-horizontal {
    top: calc(var(--start-x) * var(--cell-size) + var(--start-x) * 1px);
    left: calc(var(--start-y) * var(--cell-size) + var(--start-y) * 1px);
    width: var(--cell-size);
    height: var(--size);
    transform: translateY(calc(var(--size) / -2));
  }

  &.direction-default {
    top: calc(var(--start-y) * var(--cell-size));
    left: calc(var(--start-x) * var(--cell-size));
    width: 2px;
    height: 2px;
    background: red;
  }
}
</style>
