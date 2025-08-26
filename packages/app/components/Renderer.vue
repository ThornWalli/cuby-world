<template>
  <div ref="rootEl" class="cw-renderer">
    <canvas ref="canvasEl" />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, onUnmounted, onMounted, nextTick, markRaw } from 'vue';
import Renderer, { type RendererModuleList } from '../lib/classes/Renderer';
import { Vector2 } from 'three';
import { fromEvent, Subscription } from 'rxjs';
import type { RendererOptions } from '../types';
import {
  getDefaultOptions,
  type DebugState
} from '../lib/classes/rendererModule/Debug';

const renderer = ref<Renderer>();

defineOptions({
  inheritAttrs: false
});

const $props = defineProps<{
  debug?: DebugState | boolean;
  options?: RendererOptions;
  modules?: RendererModuleList;
}>();

const $emit = defineEmits(['ready', 'click']);

const rootEl = ref();
const canvasEl = ref();

const subscription = new Subscription();

const defaultRendererOptions: RendererOptions = {
  pixelSize: 1,
  controls: true
};

onMounted(async () => {
  const dimension = new Vector2(
    rootEl.value.offsetWidth,
    rootEl.value.offsetHeight
  );
  const { pixelSize, controls } = $props.options || defaultRendererOptions;

  renderer.value = markRaw(
    new Renderer(
      canvasEl.value,
      dimension,
      {
        debug: !!$props.debug,
        pixelSize: pixelSize,
        controls: controls
      },
      $props.modules
    )
  );

  renderer.value.modules.debug?.setOptions(
    typeof $props.debug === 'object' ? $props.debug : getDefaultOptions()
  );

  subscription.add(
    fromEvent<PointerEvent>(canvasEl.value, 'pointerdown').subscribe(event => {
      $emit('click', event);
    })
  );

  nextTick(() => {
    $emit('ready');
  });
});

onUnmounted(() => {
  renderer.value?.destroy();
});

provide('renderer', renderer);

defineExpose({
  renderer: renderer
});
</script>

<style lang="postcss" scoped>
canvas {
  touch-action: none;
  image-rendering: optimizeSpeed; /* Für ältere Browser */
  image-rendering: crisp-edges; /* Für moderne Browser */
  image-rendering: pixelated;
}
</style>
