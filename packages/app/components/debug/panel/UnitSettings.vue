<template>
  <cw-panel class="cw-debug-panel-unit-settings" title="Unit Settings">
    <cw-toggle
      :model-value="unit.accessible"
      @update:model-value="onToggleAccessible">
      Accessible
    </cw-toggle>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwToggle from '../../formField/small/Toggle.vue';
import { onUnmounted } from 'vue';
import { Subscription } from 'rxjs';
import type Unit from '@cuby-world/app/lib/classes/Unit';

const $props = defineProps<{
  unit: Unit;
}>();

const subscription = new Subscription();

function onToggleAccessible(value: boolean) {
  const unit = $props.unit;
  unit.accessible = value;
}

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
