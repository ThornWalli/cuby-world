<template>
  <cw-form-field hide-colon class="cw-form-field-toggle">
    <template #label="{ label }">
      <slot>{{ label }}</slot>
    </template>
    <template #default="ctx">
      <input
        :id="ctx.id"
        :checked="modelValue"
        type="checkbox"
        @change="onChange" />
      <div class="indicator">
        <svg-indicator-true class="checked" />
        <svg-indicator-false class="unchecked" />
      </div>
    </template>
  </cw-form-field>
</template>

<script lang="ts" setup>
import CwFormField from '../base/FormField.vue';
import SvgIndicatorTrue from '../../assets/icons/indicator/true.svg';
import SvgIndicatorFalse from '../../assets/icons/indicator/false.svg';

defineProps<{
  modelValue?: boolean;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void;
}>();

function onChange(e: Event) {
  $emit('update:model-value', (e.target as HTMLInputElement)?.checked || false);
}
</script>

<style lang="postcss" scoped>
.cw-form-field-toggle {
  --indicator-width: 30px;
  --indicator-background-unchecked: var(--color-red-7);
  --indicator-background-checked: var(--color-green-7);

  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 23px;
  overflow: hidden;
  cursor: pointer;
  background: rgb(var(--rgb-white) / 20%);
  border: solid 1px var(--color-white);
  border-radius: 3px;

  & :deep(label) {
    box-sizing: border-box;
    width: 100%;
    padding: 3px 6px;
    padding-right: calc(var(--indicator-width) + 6px);
    font-weight: bold;
  }

  & input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--indicator-width);
    height: 100%;
    margin: 0;
    appearance: none;
    opacity: 0;
  }

  & input:checked + .indicator {
    background-color: var(--indicator-background-checked);

    & .unchecked {
      opacity: 0;
    }

    & .checked {
      opacity: 1;
    }
  }

  & .indicator {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: var(--indicator-width);
    pointer-events: none;
    background-color: var(--indicator-background-unchecked);

    & svg {
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      transform: translate(-50%, -50%);

      &.unchecked {
        opacity: 1;
      }
    }
  }
}
</style>
