<template>
  <cw-form-field
    :id="id"
    v-slot="ctx"
    :label="label"
    :hide-label="hideLabel"
    :style-type="styleType"
    class="cw-form-field-textfield"
    :class="{
      [`style-${styleType ?? 'light'}`]: true
    }">
    <div class="input">
      <input
        :id="ctx.id"
        :name="name"
        :value="modelValue"
        :type="type || 'text'"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete || 'off'"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        @input="onInput" />
    </div>
  </cw-form-field>
</template>

<script lang="ts" setup>
import CwFormField from '../base/FormField.vue';

defineProps<{
  modelValue: string | number;
  id?: string;
  label?: string;
  hideLabel?: boolean;
  labelTop?: boolean;
  hideColon?: boolean;
  placeholder?: string;
  name?: string;
  readonly?: boolean;
  required?: boolean;
  type?: string;
  styleType?: 'dark' | 'light';
  autocomplete?: AutoFill;
  min?: number;
  max?: number;
  step?: number;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: string): void;
}>();

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement)?.value || '';
  $emit('update:model-value', value);
}
</script>

<style lang="postcss" scoped>
.cw-form-field-textfield {
  --color-border: var(--color-black);
  --color-background: var(--color-white);
  --color-foreground: var(--color-black);

  &.style-dark {
    --color-border: var(--color-white);
    --color-background: var(--color-black);
    --color-foreground: var(--color-white);
  }

  & .input {
    flex: 1;
    padding: 2px;
    overflow: hidden;
    background: var(--color-background);
    border: solid 3px var(--color-border);
    border-radius: 3px;

    & input {
      display: block;
      width: 100%;
      font-family: var(--font-base);
      color: var(--color-foreground);
      appearance: none;
      outline: none;
      background: none;
      border: none;
    }
  }
}
</style>
