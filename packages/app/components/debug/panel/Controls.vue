<template>
  <cw-panel class="cw-debug-panel-controls">
    <cw-select
      :model-value="modelValue.unit"
      mode="compact"
      label-top
      label="Select Unit"
      style-type="dark"
      @update:model-value="onUpdateModelValue({ unit: $event })">
      <option value="">Select Unit</option>
      <optgroup label="Debug">
        <option value="custom" :selected="'custom' === modelValue.unit">
          Upload Unit
        </option>
      </optgroup>
      <optgroup label="Units">
        <option
          v-for="unit in unitSelectOptions"
          :key="unit.value"
          :value="unit.value"
          :selected="unit.value === modelValue.unit">
          {{ unit.name }}
        </option>
      </optgroup>
    </cw-select>
    <cw-toggle
      style-type="light"
      :model-value="modelValue.ghost"
      @update:model-value="onUpdateModelValue({ ghost: $event })"
      >Show Ghost</cw-toggle
    >
    <cw-toggle
      style-type="light"
      :model-value="modelValue.axes"
      @update:model-value="onUpdateModelValue({ axes: $event })"
      >Show Axis</cw-toggle
    >
    <cw-button mode="compact" @click="modelValue.rotation = getNextRotation()">
      Rotate ({{ modelValue.rotation }})
    </cw-button>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwSelect from '../../formField/Select.vue';
import CwButton from '../../Button.vue';
import CwToggle from '../../formField/compact/Toggle.vue';
import { computed } from 'vue';
import { UNIT_ROTATION } from '../../../lib/classes/Unit';
import type { Options } from '../UnitPreview.vue';

const $emit = defineEmits<{
  (e: 'select-unit', value: string): void;
  (e: 'rotate-unit', value: UNIT_ROTATION): void;
  (e: 'update:model-value', value: Options): void;
}>();

const rotations = Object.values(UNIT_ROTATION);

function getNextRotation() {
  return rotations[
    (rotations.indexOf($props.modelValue.rotation) + 1) % rotations.length
  ]!;
}

const $props = defineProps<{
  units: Array<{ name: string; value: string }>;
  modelValue: Options;
}>();

const unitSelectOptions = computed(() =>
  $props.units
    .filter(unit => unit.value !== 'custom')
    .map(unit => ({
      name: unit.name,
      value: unit.value
    }))
);

function onUpdateModelValue(modelValue: Partial<Options>) {
  $emit('update:model-value', { ...$props.modelValue, ...modelValue });
}
</script>

<style lang="postcss" scoped>
.cw-debug-panel-controls {
  /* empty */
}
</style>
