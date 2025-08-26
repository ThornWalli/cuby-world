<template>
  <div ref="rootEl" class="cw-app">
    <renderer
      ref="rendererEl"
      debug
      :options="rendererOptions"
      :modules="[IntersectionRendererModule]" />
    <cw-panel-unit-preview v-if="selectedUnit" :unit="selectedUnit">
      <template #actions>
        <cw-button @click="onClickRotate">Rotate</cw-button>
      </template>
    </cw-panel-unit-preview>
    <cw-panel-camera-control v-if="app" :app="app" />
  </div>
</template>

<script lang="ts" setup>
import Renderer from './Renderer.vue';
import { markRaw, nextTick, onMounted, onUnmounted, ref, type Raw } from 'vue';
import { Subscription } from 'rxjs';
import { Vector2 } from 'three';
import Player from '../lib/classes/Player';
import App from '../lib/classes/App';
import DefaultRoom from '../lib/rooms/Default';
import type { RendererOptions } from '../types';
import type Unit from '../lib/classes/Unit';

import CwPanelCameraControl from './panel/CameraControl.vue';
import CwPanelUnitPreview from './panel/UnitPreview.vue';
import CwButton from './Button.vue';
import IntersectionRendererModule from '../lib/classes/rendererModule/Intersection';
import UnitFocusAppModule from '../lib/classes/appModule/UnitFocus';
import setupFonts from '../utils/fonts';

const rendererEl = ref<InstanceType<typeof Renderer> | null>(null);

const subscription = new Subscription();

const dimension = ref<Vector2>();
let resizeObserver: ResizeObserver;

setupFonts();
defineProps<{
  rendererOptions?: RendererOptions;
}>();

const app = ref<App>();
const selectedUnit = ref<Raw<Unit> | null>(null);
// let sceneUnsubscribe;
onMounted(async () => {
  nextTick(() => {
    setup();
  });
});

function setup() {
  const { $el, renderer } = rendererEl.value!;

  if (!renderer) {
    throw new Error('Renderer not ready');
  }
  app.value = markRaw(new App(renderer, [UnitFocusAppModule]));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).cubyWorld = app.value;

  app.value.modules.player.setPlayer(
    new Player({
      name: 'Player 1'
    })
  );

  app.value.modules.room.fromDescription(new DefaultRoom());

  subscription.add(
    app.value.modules.selection.selectUnit$.subscribe(unit => {
      selectedUnit.value = unit ? markRaw(unit) : null;
    })
  );

  const onResize = () => {
    dimension.value = new Vector2($el.offsetWidth, $el.offsetHeight);
    renderer.resize(dimension.value);
  };
  resizeObserver = new ResizeObserver(onResize);

  resizeObserver.observe($el);
}

onUnmounted(() => {
  resizeObserver.disconnect();
  subscription.unsubscribe();
  app.value?.destroy();
});

function onClickRotate() {
  if (selectedUnit.value) {
    selectedUnit.value.rotateRight();
  }
}
</script>

<style lang="postcss" scoped>
.cw-app {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  --panel-offset: 1em;

  & .cw-panel-camera-control {
    position: absolute;
    top: var(--panel-offset);
    left: var(--panel-offset);
  }

  & .cw-panel-unit-preview {
    position: absolute;
    right: var(--panel-offset);
    bottom: var(--panel-offset);
  }

  & .cw-renderer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>
