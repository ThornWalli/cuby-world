<template>
  <cw-panel class="cw-panel-rotate-control" hide-title title="Wall">
    <cw-rotation-select
      :app="app"
      :rotation="rotation"
      @left="app.renderer.rotateCameraLeft()"
      @right="app.renderer.rotateCameraRight()" />
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import type App from '../../lib/classes/App';
import { onMounted, onUnmounted, ref } from 'vue';
import { Subscription } from 'rxjs';
import CwRotationSelect from '../button/RotationSelect.vue';

const subscription = new Subscription();

const rotation = ref(0);

const $props = defineProps<{
  app: App;
}>();

onMounted(() => {
  subscription.add(
    $props.app.renderer.observables.rotation$.subscribe(onRotation)
  );
});

function onRotation(value: number) {
  rotation.value = value;
}

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
