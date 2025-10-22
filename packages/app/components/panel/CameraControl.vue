<template>
  <cw-panel class="cw-panel-camera-control" title="Camera">
    <cw-toggle
      style-type="dark"
      :model-value="focusedUnit"
      @update:model-value="onToggleFocused">
      Focused Cuby
    </cw-toggle>
    <cw-button :disabled="focusedUnit" @click="app.resetCamera()">
      Reset Camera
    </cw-button>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import CwToggle from '../formField/compact/Toggle.vue';
import CwButton from '../Button.vue';
import type App from '../../lib/classes/App';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { filter, Subscription, switchMap } from 'rxjs';
import { WALL_VIEW_MODE } from '@cuby-world/app/lib/classes/roomModule/Wall';

const subscription = new Subscription();

const $props = defineProps<{
  app: App;
}>();

const viewMode = ref<WALL_VIEW_MODE>(WALL_VIEW_MODE.DYNAMIC);

const unitFocus = computed(() => {
  return $props.app.modules.unitFocus!;
});

const focusedUnit = ref(false);
onMounted(() => {
  subscription.add(
    unitFocus.value.observables.focusedUnit$.subscribe(unit => {
      if (unit) {
        focusedUnit.value = true;
      } else {
        focusedUnit.value = false;
      }
    })
  );
  subscription.add(
    $props.app.modules.room.observables.room$
      .pipe(
        filter(Boolean),
        switchMap(room => room.modules.wall.observables.viewMode$)
      )
      .subscribe(mode => {
        viewMode.value = mode;
      })
  );
});

onUnmounted(() => {
  subscription.unsubscribe();
});

function onToggleFocused(value: boolean) {
  if (value) {
    unitFocus.value.setPlayerAsFocusedUnit();
  } else {
    unitFocus.value.unfocusUnit();
  }
}
</script>
