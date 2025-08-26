<template>
  <div class="cw-base-form-field" :class="{ 'label-top': labelTop }">
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
}>();

const preparedId = computed(() => $props.id || defaultId);
</script>

<style lang="postcss" scoped>
.cw-base-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  font-family: var(--font-base);
  font-size: 12px;
  font-weight: bold;
  color: #fff;

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
}
</style>
