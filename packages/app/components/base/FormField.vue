<template>
  <div
    class="cw-base-form-field"
    :class="{
      'label-top': labelTop,
      [`mode-${mode}`]: mode,
      [`style-${styleType ?? 'light'}`]: true
    }">
    <label :for="preparedId" :class="{ colon: !hideColon }">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <slot :id="preparedId"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, useId } from 'vue';

const defaultId = useId();

const $props = defineProps<{
  id?: string;
  label?: string;
  labelTop?: boolean;
  hideColon?: boolean;
  mode?: 'compact';
  styleType?: 'dark' | 'light';
}>();

const preparedId = computed(() => $props.id || defaultId);
</script>

<style lang="postcss" scoped>
.cw-base-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  font-family: var(--font-base);
  font-weight: bold;

  &:not(.label-top) {
    flex-direction: row;
    gap: 0.5em;
    align-items: center;
  }

  & label {
    user-select: none;

    &.colon {
      &::after {
        content: ':';
      }
    }
  }

  &:not(mode-compact) {
    font-size: 14px;
  }

  &.mode-compact {
    font-size: 12px;
    color: #fff;
  }
}
</style>
