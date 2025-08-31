<template>
  <form ref="rootEl" class="cw-messages-input" @submit="onSubmit">
    <input type="text" placeholder="Type a message..." />
    <base-button type="submit">Send</base-button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Message } from '../../lib/classes/appModule/Multiplayer';
import BaseButton from '../base/Button.vue';

const rootEl = ref<HTMLFormElement>();
const $emit = defineEmits<{
  (e: 'send', message: Message): void;
}>();

function onSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const input = form.querySelector('input') as HTMLInputElement;
  const text = input.value.trim();

  const message = {
    message: text
  } as Message;

  $emit('send', message);
}

defineExpose({
  reset: () => {
    rootEl.value?.reset();
  }
});
</script>

<style lang="postcss" scoped>
.cw-messages-input {
  position: absolute;
  bottom: 40px;
  left: 50%;
  display: flex;
  align-items: stretch;
  width: calc(100% / 3);
  min-width: 240px;
  overflow: hidden;
  pointer-events: auto;
  background: #fff;
  border: solid 2px #000;
  border-radius: 9px;
  transform: translateX(-50%);

  & input {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    appearance: none;
    outline: none;
    border: none;
  }

  & button {
    padding: 5px 10px;
    font-family: var(--font-base);
    font-size: 14px;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
    appearance: none;
    cursor: pointer;
    background-color: var(--color-red-6);
    border-left: solid 2px #000;

    &:active {
      background-color: var(--color-red-7);
    }
  }
}
</style>
