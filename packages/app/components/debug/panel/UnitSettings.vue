<template>
  <cw-panel class="cw-debug-panel-unit-settings" title="Unit Settings">
    <ul v-if="debugInfo?.length">
      <li v-for="[key, value] in debugInfo" :key="key">
        <span>{{ key }}:</span>
        <span>{{ value }}</span>
      </li>
    </ul>
    <cw-toggle
      :model-value="
        typeof unit.accessible === 'boolean'
          ? unit.accessible
          : unit.accessible.length > 0
      "
      @update:model-value="onToggleAccessible">
      Accessible
    </cw-toggle>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwToggle from '../../formField/compact/Toggle.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Subscription } from 'rxjs';
import type Unit from '../../../lib/classes/Unit';

const $props = defineProps<{
  unit: Unit;
}>();

const subscription = new Subscription();

onMounted(() => {
  registerUnit($props.unit);
});

watch(
  () => $props.unit,
  () => {
    registerUnit($props.unit);
  }
);

function refresh(unit: Unit) {
  refreshDebugInfo(unit);
}

let unitSubscriptions: Subscription;
function registerUnit(unit: Unit) {
  unitSubscriptions?.unsubscribe();
  unitSubscriptions = new Subscription();
  unitSubscriptions.add(
    unit.materialReady$.subscribe(() => {
      refresh(unit);
    })
  );
  unitSubscriptions.add(
    unit.rotate$.subscribe(() => {
      refreshDebugInfo(unit);
    })
  );
}

function onToggleAccessible(value: boolean) {
  const unit = $props.unit;
  unit.accessible = value;
}

onUnmounted(() => {
  subscription.unsubscribe();
});

const debugInfo = ref();
function refreshDebugInfo(unit: Unit) {
  const position = unit.getPosition();
  const rotation = unit.rotation;
  const size = unit.getSize();

  const info = {
    Pos: `${position.x}x${position.y}x${position.z}`,
    Rot: `${rotation}`,
    Size: `${size.x}x${size.y}`
  };
  debugInfo.value = Object.entries(info);
}
</script>

<style lang="postcss" scoped>
.cw-debug-panel-unit-settings {
  & li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
  }
}
</style>
