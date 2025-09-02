<template>
  <cw-panel class="cw-debug-panel-controls">
    <cw-select
      v-model="model.unit"
      mode="compact"
      label-top
      label="Select Unit">
      <option value="">Select Unit</option>
      <optgroup label="Debug">
        <option value="custom" :selected="'custom' === model.unit">
          Upload Unit
        </option>
      </optgroup>
      <optgroup label="Units">
        <option
          v-for="unit in unitSelectOptions"
          :key="unit.value"
          :value="unit.value"
          :selected="unit.value === model.unit">
          {{ unit.name }}
        </option>
      </optgroup>
    </cw-select>
    <cw-toggle
      :model-value="debugOptions.axes"
      @update:model-value="onUpdateDebugOptions({ axes: $event })"
      >Axis</cw-toggle
    >
    <cw-button @click="model.rotation = getNextRotation()">
      Rotate ({{ model.rotation }})
    </cw-button>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwSelect from '../../formField/Select.vue';
import CwButton from '../../Button.vue';
import CwToggle from '../../formField/small/Toggle.vue';
import { computed, watch } from 'vue';
import { reactive, useRouter } from '#imports';
import type { DebugState } from '../../../lib/classes/rendererModule/Debug';
import { UNIT_ROTATION } from '@cuby-world/app/lib/classes/Unit';

const $router = useRouter();

const model = reactive<{
  unit: string;
  rotation: UNIT_ROTATION;
}>({
  unit: String($router.currentRoute.value.query.unit || ''),
  rotation: String(
    $router.currentRoute.value.query.rotation || UNIT_ROTATION.DOWN
  ) as UNIT_ROTATION
});

const $emit = defineEmits<{
  (e: 'select-unit', value: string): void;
  (e: 'rotate-unit', value: UNIT_ROTATION): void;
  (e: 'update:debug-options', value: DebugState): void;
}>();

const rotations = Object.values(UNIT_ROTATION);

function getNextRotation() {
  return rotations[(rotations.indexOf(model.rotation) + 1) % rotations.length]!;
}

watch(
  () => model,
  () => {
    console.log('model changed', model);
    $router.replace({
      query: {
        unit: model.unit || undefined,
        rotation: model.rotation || undefined
      }
    });
  },
  { deep: true }
);

watch(
  () => model.unit,
  unit => {
    $emit('select-unit', unit);
  },
  { immediate: !!model.unit }
);
watch(
  () => model.rotation,
  rotation => {
    $emit('rotate-unit', rotation);
  },
  { immediate: !!model.rotation }
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

function onUpdateDebugOptions(newOptions: Partial<DebugState>) {
  $emit('update:debug-options', { ...$props.debugOptions, ...newOptions });
}
</script>

<style lang="postcss" scoped>
.cw-debug-panel-controls {
  /* empty */
}
</style>
