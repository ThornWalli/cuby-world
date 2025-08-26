<template>
  <cw-panel class="cw-panel-controls">
    <cw-select
      v-model="selectedUnit"
      label-top
      label="Select Unit"
      @change="$emit('select-unit', $event.target.value)">
      <option value="">Select Unit</option>
      <optgroup label="Debug">
        <option value="custom">Upload Unit</option>
      </optgroup>
      <optgroup label="Units">
        <option
          v-for="unit in unitSelectOptions"
          :key="unit.value"
          :value="unit.value">
          {{ unit.name }}
        </option>
      </optgroup>
    </cw-select>
    <cw-toggle
      :model-value="debugOptions.axes"
      @update:model-value="onUpdateDebugOptions({ axes: $event })"
      >Axis</cw-toggle
    >
    <cw-button @click="$emit('rotate-unit')">Rotate</cw-button>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwSelect from '../../formField/Select.vue';
import CwButton from '../../Button.vue';
import CwToggle from '../../formField/Toggle.vue';
import { computed, ref, watch } from 'vue';
import type { DebugState } from '../../../lib/classes/rendererModule/Debug';

const selectedUnit = ref('');

watch(
  () => selectedUnit.value,
  value => {
    $emit('select-unit', value);
  },
  { immediate: !!selectedUnit.value }
);

const $props = defineProps<{
  units: Array<{ name: string; value: string }>;
  debugOptions: DebugState;
}>();

const unitSelectOptions = computed(() =>
  $props.units
    .filter(unit => unit.value !== 'custom')
    .map(unit => ({
      name: unit.name,
      value: unit.value
    }))
);

const $emit = defineEmits<{
  (e: 'select-unit', value: string): void;
  (e: 'rotate-unit'): void;
  (e: 'update:debug-options', value: DebugState): void;
}>();

function onUpdateDebugOptions(newOptions: Partial<DebugState>) {
  $emit('update:debug-options', { ...$props.debugOptions, ...newOptions });
}
</script>

<style lang="postcss" scoped>
.cw-panel-controls {
  /* empty */
}
</style>
