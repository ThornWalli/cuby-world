<template>
  <cw-panel class="cw-panel-camera-control" title="Camera">
    <cw-toggle :model-value="focusedUnit" @update:model-value="onToggleFocused">
      Focused Cuby
    </cw-toggle>
    <cw-button :disabled="focusedUnit" @click="app.resetCamera()">
      Reset Camera
    </cw-button>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import CwToggle from '../formField/Toggle.vue';
import CwButton from '../Button.vue';
import type App from '@cuby-world/app/lib/classes/App';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Subscription } from 'rxjs';

const $props = defineProps<{
  app: App;
}>();

const subscription = new Subscription();

const unitFocus = computed(() => {
  return $props.app.modules.unitFocus!;
});

function onToggleFocused(value: boolean) {
  if (value) {
    unitFocus.value.setPlayerAsFocusedUnit();
  } else {
    unitFocus.value.unfocusUnit();
  }
}

const focusedUnit = ref(false);
onMounted(() => {
  subscription.add(
    unitFocus.value.focusedUnit$.subscribe(unit => {
      if (unit) {
        focusedUnit.value = true;
      } else {
        focusedUnit.value = false;
      }
    })
  );
});

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
