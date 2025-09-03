<template>
  <div class="base-dialog" :class="{ visible }">
    <div>
      <div class="trigger" @click="onClickTrigger"></div>
      <transition name="fade" mode="out-in">
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

defineExpose({
  open,
  close,
  visible
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
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
