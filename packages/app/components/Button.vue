<template>
  <base-button
    class="cw-button"
    :class="{
      selected,
      [`style-type-${styleType ?? 'primary'}`]: true,
      [`mode-${mode ?? 'normal'}`]: true
    }">
    <div v-if="!iconAlign || iconAlign === 'left'" class="icon">
      <slot name="icon">
        <svg-indicator-select v-if="mode === 'compact'" />
      </slot>
    </div>
    <slot>Button</slot>
    <div v-if="iconAlign === 'right'" class="icon">
      <slot name="icon">
        <svg-indicator-select v-if="mode === 'compact'" />
      </slot>
    </div>
  </base-button>
</template>

<script lang="ts" setup>
import BaseButton from './base/Button.vue';
import SvgIndicatorSelect from '../assets/icons/indicator/select.svg';

defineProps<{
  styleType?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  mode?: 'compact' | 'normal';
  selected?: boolean;
  iconAlign?: 'left' | 'right';
}>();
</script>

<style lang="postcss" scoped>
.cw-button {
  --color-border: var(--color-black);
  --color-background: var(--color-white);
  --color-background-hover: var(--color-gray-2);
  --color-foreground: var(--color-white);

  /* indicator */
  --indicator-width: 30px;
  --indicator-foreground: var(--color-white);
  --indicator-background: var(--color-blue-7);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.mode-compact {
    --color-border: var(--color-white);
    --color-background: rgb(var(--rgb-white) / 20%);

    &.selected,
    &:not([disabled]):hover {
      --indicator-background: var(--color-blue-8);
    }

    position: relative;
    display: flex;
    flex: 1;
    height: 23px;
    padding: 3px 6px;
    padding-right: calc(var(--indicator-width) + 6px);
    overflow: hidden;
    font-family: var(--font-base);
    font-size: 12px;
    font-weight: bold;
    color: var(--color-foreground);
    background-color: var(--color-background);
    border: solid 1px var(--color-border);
    border-radius: 3px;
    transition:
      background-color var(--cw-easing-duration-short) var(--cw-easing-base),
      border-color var(--cw-easing-duration-short) var(--cw-easing-base),
      color var(--cw-easing-duration-short) var(--cw-easing-base);

    & .icon {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: var(--indicator-width);
      color: var(--indicator-foreground);
      pointer-events: none;
      background-color: var(--indicator-background);
      transition: background-color var(--cw-easing-duration-short)
        var(--cw-easing-base);

      & svg,
      & :deep(svg) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &.mode-normal {
    padding: 0.25em 0.5em;
    font-family: var(--font-base);
    font-size: 12px;
    font-weight: bold;
    color: var(--color-foreground);
    background-color: var(--color-background);
    border: solid 2px var(--color-border);
    border-radius: 3px;
    transition:
      background-color var(--cw-easing-duration-short) var(--cw-easing-base),
      border-color var(--cw-easing-duration-short) var(--cw-easing-base),
      color var(--cw-easing-duration-short) var(--cw-easing-base);

    &.selected,
    &:not([disabled]):hover {
      background: rgb(255 255 255 / 10%);
    }

    &:not([disabled]):hover {
      background: var(--color-background-hover);
    }

    &.style-type-primary {
      --color-background: var(--color-blue-7);
      --color-background-hover: var(--color-blue-8);
      --color-foreground: var(--color-white);
      --color-border: var(--color-black);
    }

    &.style-type-secondary {
      --color-background: var(--color-green-7);
      --color-background-hover: var(--color-green-8);
      --color-foreground: var(--color-white);
      --color-border: var(--color-black);
    }

    &.style-type-tertiary {
      --color-background: var(--color-yellow-7);
      --color-background-hover: var(--color-yellow-8);
      --color-foreground: var(--color-white);
      --color-border: var(--color-black);
    }

    &.style-type-quaternary {
      --color-background: var(--color-red-7);
      --color-background-hover: var(--color-red-8);
      --color-foreground: var(--color-white);
      --color-border: var(--color-black);
    }
  }
}
</style>
