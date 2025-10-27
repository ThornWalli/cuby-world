<template>
  <div
    ref="rootEl"
    class="cw-renderer"
    :class="{ pixelated: renderer?.pixelated }">
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

const $emit = defineEmits<{
  (e: 'ready'): void;
  (
    e:
      | 'pointerdown'
      | 'pointerup'
      | 'pointermove'
      | 'pointerup'
      | 'pointerenter'
      | 'pointerout',
    event: PointerEvent
  ): void;
}>();

const rootEl = ref();
const canvasEl = ref();

const subscription = new Subscription();

const defaultRendererOptions: RendererOptions = {
  pixelated: true,
  controls: true
};

onMounted(async () => {
  const dimension = new Vector2(
    rootEl.value.offsetWidth,
    rootEl.value.offsetHeight
  );

  const { pixelated, controls } = $props.options || defaultRendererOptions;

  renderer.value = markRaw(
    new Renderer(
      canvasEl.value,
      dimension,
      {
        debug: !!$props.debug,
        pixelated: pixelated,
        controls: controls
      },
      $props.modules
    )
  );

  renderer.value.modules.debug?.setOptions(
    typeof $props.debug === 'object' ? $props.debug : getDefaultOptions()
  );

  subscription.add(
    fromEvent<PointerEvent>(canvasEl.value, 'pointerdown').subscribe(e => {
      const sub = fromEvent<PointerEvent>(document, 'pointerup').subscribe(
        e => {
          sub.unsubscribe();
          $emit('pointerup', e);
        }
      );
      $emit('pointerdown', e);
    })
  );

  subscription.add(
    fromEvent<PointerEvent>(canvasEl.value, 'pointermove').subscribe(e => {
      $emit('pointermove', e);
      // renderer.value?.modules.intersection?.onMove();
    })
  );

  subscription.add(
    fromEvent<PointerEvent>(canvasEl.value, 'pointerenter').subscribe(e => {
      $emit('pointerenter', e);
      // renderer.value?.modules.intersection?.onEnter();
    })
  );

  subscription.add(
    fromEvent<PointerEvent>(canvasEl.value, 'pointerout').subscribe(e => {
      $emit('pointerout', e);
      // renderer.value?.modules.intersection?.onOut();
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
.cw-renderer {
  &.pixelated {
    image-rendering: optimizeSpeed;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }

  & canvas {
    display: block;
    touch-action: none;
  }
}
</style>
