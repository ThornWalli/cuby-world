<template>
  <base-dialog ref="dialog" v-slot="{ close }" class="cw-dialog">
    <div class="wrapper">
      <div class="header">
        <header v-if="$slots.header">
          <slot name="header"></slot>
        </header>
        <base-button class="close-button" aria-label="Close" @click="close()">
          <svg-dialog-close />
        </base-button>
      </div>
      <div class="content">
        <slot></slot>
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
import SvgDialogClose from '../assets/icons/dialog_close_2.svg';
import { ref } from 'vue';

const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);

defineExpose({
  open: () => {
    return dialog.value!.open();
  },
  close: () => {
    return dialog.value!.close();
  },
  visible: () => dialog.value!.visible
});
</script>

<style lang="postcss" scoped>
.cw-dialog {
  & .content {
    padding: 5px;
  }

  & .wrapper {
    overflow: hidden;
    background: #fff;
    border-radius: 6px;
  }

  & .header {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    font-weight: bold;

    & header {
      display: flex;
      align-items: center;
    }
  }

  & .actions {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    background: #ccc;
    border-top: solid #000 1px;
  }

  .close-button {
    padding: 2px;
    cursor: pointer;
    background: none;
    background: #f00;
    border: solid 2px var(--color-black);
    border-radius: 3px;

    & svg {
      display: block;
      fill: #666;
      transition: fill 0.2s;

      &:hover {
        fill: #000;
      }
    }
  }
}
</style>
