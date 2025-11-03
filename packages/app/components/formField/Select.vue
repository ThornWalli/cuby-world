<template>
  <cw-form-field
    :id="id"
    v-slot="ctx"
    :label="label"
    :hide-label="hideLabel"
    class="cw-select"
    :class="{
      disabled,
      [`style-${styleType ?? 'light'}`]: true,
      [`mode-${mode}`]: mode
    }">
    <div class="input">
      <select
        :id="ctx.id"
        ref="inputEl"
        :name="name"
        :disabled="disabled"
        :value="modelValue"
        @change="onChange">
        <slot>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </slot>
      </select>
      <div class="indicator"><svg-indicator-select /></div>
    </div>
  </cw-form-field>
</template>

<script lang="ts" generic="T extends string" setup>
import { provide, ref } from 'vue';
import CwFormField from '../base/FormField.vue';
import SvgIndicatorSelect from '../../assets/icons/indicator/select.svg';

const inputEl = ref<HTMLSelectElement | null>(null);
const $props = defineProps<{
  modelValue: T;
  resetValue?: T | undefined;
  id?: string;
  name?: string;
  label?: string;
  mode?: 'compact';
  styleType?: 'dark' | 'light';
  hideLabel?: boolean;
  disabled?: boolean;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: T): void;
}>();

function onChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  const value = select.value as T;
  $emit('update:model-value', value);
}

provide('parentSelectValue', $props.modelValue);
provide('setValue', (value: T) => (inputEl.value!.value = value));

defineExpose<{ reset: () => void }>({
  reset: () => {
    const resetValue = ($props.resetValue ?? '') as T;
    inputEl.value!.value = resetValue;
    $emit('update:model-value', resetValue);
  }
});
</script>

<style lang="postcss" scoped>
.cw-select {
  --color-border: var(--color-black);
  --color-background: var(--color-white);
  --color-foreground: var(--color-black);

  /* indicator */
  --indicator-width: 30px;
  --indicator-foreground: var(--color-white);
  --indicator-background: var(--color-blue-7);

  /* &.style-dark {
    --color-border: var(--color-white);
    --color-background: var(--color-black);
    --color-foreground: var(--color-white);
  } */

  &.style-dark {
    --color-border: var(--color-white);
    --color-background: rgb(var(--rgb-white) / 20%);
    --color-foreground: var(--color-white);
  }

  & .input {
    position: relative;
    display: flex;
    flex: 1;
    height: 23px;
    overflow: hidden;
    font-family: var(--font-base);
    font-size: 12px;
    font-weight: bold;
    color: var(--color-white);
    cursor: pointer;
    background-color: var(--color-background);
    border: solid 1px var(--color-border);
    border-radius: 3px;
  }

  & select {
    box-sizing: border-box;
    width: 100%;
    padding: 3px 6px;
    padding-right: calc(var(--indicator-width) + 6px);
    font-family: var(--font-base);
    font-size: 12px;
    font-weight: bold;
    color: currentColor;
    color: var(--color-foreground);
    appearance: none;
    outline: none;
    background: transparent;
    border: none;

    & :deep(option),
    & option {
      font-weight: normal;
    }
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(.mode-compact) {
    & .input {
      padding: 2px;
      border: solid 3px var(--color-border);
    }
  }

  &:not([disabled]):hover {
    --indicator-background: var(--color-blue-8);
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
    color: var(--indicator-foreground);
    pointer-events: none;
    background-color: var(--indicator-background);
    transition: background-color var(--cw-easing-duration-short)
      var(--cw-easing-base);

    & svg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 14px;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
