<template>
  <div class="base-dialog" :class="{ visible }">
    <div>
      <div class="trigger"></div>
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
  forceVisible?: boolean;
}>();
const $emit = defineEmits<{
  (e: 'close'): void;
}>();

const visible = ref($props.forceVisible ?? false);

function close() {
  visible.value = false;
  $emit('close');
}

function open() {
  visible.value = true;
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
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
