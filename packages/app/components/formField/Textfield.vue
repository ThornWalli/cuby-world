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
        @input="onInput" />
    </div>
  </cw-form-field>
</template>

<script lang="ts" setup>
import CwFormField from '../base/FormField.vue';

defineProps<{
  modelValue: string;
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
.input {
  --color-border: var(--color-black);
  --color-background: var(--color-white);

  flex: 1;
  padding: 2px;
  overflow: hidden;
  background: var(--color-background);
  border: solid 3px var(--color-border);
  border-radius: 3px;

  & input {
    display: block;
    font-family: var(--font-base);
    appearance: none;
    outline: none;
    background: none;
    border: none;
  }
}
</style>
