<template>
  <div class="cw-button-floor-select" aria-label="Wall View Toggle">
    <base-button :disabled="!hasNextFloor" @click="onClickFloorUp">
      <svg-icon-arrow-navigation-filled-up />
    </base-button>
    <span>{{ floor }}</span>
    <base-button :disabled="!hasPreviousFloor" @click="onClickFloorDown">
      <svg-icon-arrow-navigation-filled-down />
    </base-button>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../base/Button.vue';
import SvgIconArrowNavigationFilledUp from '../../assets/icons/arrow-navigation-filled/up.svg?component';
import SvgIconArrowNavigationFilledDown from '../../assets/icons/arrow-navigation-filled/down.svg?component';
import { computed } from 'vue';
import type { FloorIndex } from '@cuby-world/app/lib/types/floor';

const $props = defineProps<{
  minFloor: FloorIndex;
  maxFloor: FloorIndex;
  floor: FloorIndex;
}>();

const $emit = defineEmits<{
  (e: 'up' | 'down'): void;
}>();

const hasNextFloor = computed(() => {
  return $props.floor < $props.maxFloor;
});

const hasPreviousFloor = computed(() => {
  return $props.floor > $props.minFloor;
});

function onClickFloorUp() {
  if (hasNextFloor.value) {
    $emit('up');
  }
}

function onClickFloorDown() {
  if (hasPreviousFloor.value) {
    $emit('down');
  }
}
</script>

<style lang="postcss" scoped>
.cw-button-floor-select {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  & button {
    color: white;
    cursor: pointer;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  & span {
    font-weight: bold;
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
    width: 32px;
    fill: currentColor;

    & :deep(path) {
      fill: white;
    }

    & :deep(path + path) {
      fill: transparent;
    }

    &:not(:first-child) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
