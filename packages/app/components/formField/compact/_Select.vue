<template>
  <cw-form-field
    :id="id"
    v-slot="ctx"
    mode="compact"
    :label="label"
    :hide-label="hideLabel"
    class="cw-select"
    :class="{
      [`mode-${mode ?? 'normal'}`]: true
    }">
    <div class="input">
      <select :id="ctx.id" :value="modelValue" @change="onChange">
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

<script lang="ts" setup>
import CwFormField from '../../base/FormField.vue';
import SvgIndicatorSelect from '../../../assets/icons/indicator/select.svg';
defineProps<{
  modelValue: string;
  id?: string;
  label: string;
  mode?: 'compact' | 'normal';
  hideLabel?: boolean;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: string): void;
}>();

function onChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  const value = select.value;
  $emit('update:model-value', value);
}
</script>

<style lang="postcss" scoped>
.cw-select {
  --indicator-width: 30px;
  --indicator-foreground: var(--color-white);
  --indicator-background: var(--color-blue-7);

  & .input {
    position: relative;
    display: flex;
    font-family: var(--font-base);
    cursor: pointer;
  }

  & select {
    box-sizing: border-box;
    width: 100%;
    padding-right: calc(var(--indicator-width) + 6px);
    font-family: var(--font-base);
    color: currentColor;
    appearance: none;
    outline: none;
    background: transparent;
    border: none;

    & :deep(option),
    & option {
      font-weight: normal;
    }
  }

  &.mode-compact {
    --color-background: rgb(var(--rgb-white) / 20%);

    & .input {
      height: 23px;
      font-size: 12px;
      font-weight: bold;
      color: var(--color-white);
      background-color: rgb(var(--rgb-white) / 20%);
      border: solid 1px var(--color-white);
      border-radius: 3px;

      & select {
        padding: 3px 6px;
        padding-right: calc(var(--indicator-width) + 6px);
        font-size: 12px;
        font-weight: bold;
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
      color: var(--indicator-foreground);
      pointer-events: none;
      background-color: var(--indicator-background);
    }
  }
}
</style>
