<template>
  <div class="cw-button-rotation-select" aria-label="Wall View Toggle">
    <base-button @click="onClickRotationLeft">
      <svg-icon-action-rotate-left />
    </base-button>
    <span>{{ MathUtils.radToDeg(rotation) }}°</span>
    <base-button @click="onClickRotationRight">
      <svg-icon-action-rotate-rigth />
    </base-button>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../base/Button.vue';
import SvgIconActionRotateLeft from '../../assets/icons/actions/rotate_left.svg?component';
import SvgIconActionRotateRigth from '../../assets/icons/actions/rotate_right.svg?component';
import { MathUtils } from 'three';

defineProps<{
  rotation: number;
}>();

const $emit = defineEmits<{
  (e: 'left' | 'right'): void;
}>();

function onClickRotationLeft() {
  $emit('left');
}

function onClickRotationRight() {
  $emit('right');
}
</script>

<style lang="postcss" scoped>
.cw-button-rotation-select {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: space-between;

  & button {
    padding: var(--cw-spacing-small);
    color: white;
    cursor: pointer;
    border-radius: var(--cw-border-radius-small);
    transition: background-color var(--cw-easing-duration-short)
      var(--cw-easing-base);

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:hover {
      background-color: var(--color-blue-7);
    }

    @media (hover: none) {
      &:active {
        background-color: var(--color-blue-7);
      }
    }
  }

  & span {
    width: 40px;
    font-weight: bold;
    text-align: center;
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
