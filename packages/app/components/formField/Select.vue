<template>
  <cw-form-field
    :id="id"
    v-slot="ctx"
    :label="label"
    :hide-label="hideLabel"
    class="cw-select">
    <div class="input">
      <select :id="ctx.id">
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
import CwFormField from '../base/FormField.vue';
import SvgIndicatorSelect from '../../assets/icons/indicator/select.svg';
defineProps<{
  id?: string;
  label: string;
  hideLabel?: boolean;
}>();
</script>

<style lang="postcss" scoped>
.cw-select {
  --indicator-width: 30px;
  --indicator-background: var(--color-blue-7);

  & .input {
    position: relative;
    display: flex;
    height: 23px;
    font-family: var(--font-base);
    font-size: 12px;
    font-weight: bold;
    color: var(--color-white);
    cursor: pointer;
    background-color: rgb(var(--rgb-white) / 20%);
    border: solid 1px var(--color-white);
    border-radius: 3px;

    & select {
      box-sizing: border-box;
      padding: 3px 6px;
      padding-right: calc(var(--indicator-width) + 6px);
      font-family: var(--font-base);
      font-size: 12px;
      font-weight: bold;
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
      background-color: var(--indicator-background);
    }
  }
}
</style>
