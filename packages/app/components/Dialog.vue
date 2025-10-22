<template>
  <base-dialog
    ref="dialog"
    v-slot="{ close }"
    class="cw-dialog"
    :class="{
      'embed-content': embedContent
    }">
    <div class="wrapper">
      <div class="header">
        <header v-if="$slots.header">
          <slot :close="close" name="header"></slot>
        </header>
        <div class="buttons">
          <base-button
            v-if="showFullscreen"
            class="show-fullscreen"
            aria-label="Fullscreen"
            @click="onClickFullscreen">
            <svg-dialog-maximize v-if="!dialog?.fullscreen" />
            <svg-dialog-minimize v-else />
          </base-button>
          <base-button
            v-if="!hideClose"
            class="close-button"
            aria-label="Close"
            @click="close">
            <svg-dialog-close />
          </base-button>
        </div>
      </div>
      <div class="content">
        <slot :close="close"></slot>
      </div>
      <div v-if="$slots.actions" class="actions">
        <slot name="actions" :close="close"></slot>
      </div>
    </div>
  </base-dialog>
</template>

<script lang="ts" setup>
import BaseDialog from './base/Dialog.vue';
import BaseButton from './base/Button.vue';
import SvgDialogClose from '../assets/icons/dialog/close.svg';
import SvgDialogMinimize from '../assets/icons/dialog/minimize.svg';
import SvgDialogMaximize from '../assets/icons/dialog/maximize.svg';
import { computed, onMounted, ref } from 'vue';

const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);

const $props = defineProps<{
  forceOpen?: boolean;
  hideClose?: boolean;
  showFullscreen?: boolean;
  embedContent?: boolean;
}>();

onMounted(() => {
  if ($props.forceOpen) {
    dialog.value!.open();
  }
});

defineExpose({
  dialog: computed<InstanceType<typeof BaseDialog> | null>(() => dialog.value),
  visible: () => dialog.value!.visible
});

function onClickFullscreen() {
  dialog.value!.toggleFullscreen();
}
</script>

<style lang="postcss" scoped>
.cw-dialog {
  &:not(.embed-content) {
    & .content {
      padding: 5px;
    }
  }

  & .wrapper {
    overflow: hidden;
    background: #fff;
    border-radius: 6px;
  }

  & .header {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    font-weight: bold;
    color: var(--color-white);
    background: var(--color-blue-7);

    & header {
      display: flex;
      align-items: center;
      padding-right: 5px;
      font-size: 14px;
      line-height: 24px;
    }
  }

  & .buttons {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  & .actions {
    display: flex;
    gap: 5px;
    justify-content: flex-end;
    padding: 5px;
    background: #ccc;
    border-top: solid #000 1px;
  }

  &.fullscreen {
    & .wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      & > .content {
        flex: 1;
      }
    }
  }

  & .show-fullscreen {
    padding: 4px;
    cursor: pointer;
    background: none;
    background: var(--color-yellow-6);
    border: solid 2px var(--color-black);
    border-radius: 3px;

    & svg {
      display: block;
      width: 10px;
      fill: #666;
      transition: fill 0.2s;

      &:hover {
        fill: #000;
      }
    }
  }

  & .close-button {
    padding: 4px;
    cursor: pointer;
    background: var(--color-red-7);
    border: solid 2px var(--color-black);
    border-radius: 3px;
    transition: background var(--cw-easing-duration-short) var(--cw-easing-in);

    &:hover {
      background: var(--color-red-8);
    }

    & svg {
      display: block;
      width: 10px;
      fill: #fff;
    }
  }
}
</style>
