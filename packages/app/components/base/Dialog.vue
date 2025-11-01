<template>
  <div class="base-dialog" :class="{ visible, fullscreen }">
    <div>
      <div class="trigger" @click="onClickTrigger"></div>
      <transition name="fade-short" mode="out-in">
        <div v-if="visible" class="base-dialog-inner">
          <slot :close="close"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const $props = defineProps<{
  forceOpen?: boolean;
  backgroundClose?: boolean;
}>();
const $emit = defineEmits<{
  (e: 'close'): void;
}>();

const visible = ref($props.forceOpen ?? false);
const fullscreen = ref(false);

function close<Result = unknown>(value?: Result) {
  visible.value = false;
  $emit('close');
  _resolve(value);
}

let _resolve: CallableFunction;
function open<Result = unknown>() {
  return new Promise<Result>(resolve => {
    visible.value = true;
    _resolve = resolve;
  });
}

function onClickTrigger() {
  if ($props.backgroundClose) {
    close();
  }
}

function toggleFullscreen() {
  fullscreen.value = !fullscreen.value;
}

defineExpose({
  open,
  close,
  visible,
  fullscreen,
  toggleFullscreen
});
</script>

<style lang="postcss" scoped>
.base-dialog {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  pointer-events: none;
  background: rgb(0 0 0/50%);
  opacity: 0;

  .base-dialog-inner {
    position: relative;
  }

  &.visible {
    height: 100%;
    pointer-events: auto;
    opacity: 1;
  }

  &.fullscreen {
    & .base-dialog-inner {
      width: 100vw;
      width: 100svw;
      max-width: none;
      height: 100vh;
      height: 100svh;
      max-height: none;
      border-radius: 0;
    }
  }
}
</style>
