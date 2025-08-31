<template>
  <div
    class="cw-messages-group"
    :style="{
      '--position-x': `${translate?.x ?? 0}`,
      '--position-y': `${translate?.y ?? 0}`
    }">
    <div class="messages">
      <template
        v-for="({ playerId, message, separator }, index) in preparedMessages"
        :key="index">
        <div v-if="!separator" class="message">
          <span v-if="playerId">{{ playerId }}:</span>
          {{ message }}
        </div>
        <div v-else class="separator"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from '@cuby-world/app/lib/classes/appModule/Multiplayer';
import type { Vector2, Vector3 } from 'three';
import { onMounted, onUnmounted, ref, watch } from 'vue';

let interval: number;
const preparedMessages = ref<MessageSeparator[]>([]);

const $props = defineProps<{
  messages: Message[];
  position: Vector3;
  translate?: Vector2;
  spacerTimeout: number;
}>();

onMounted(() => {
  updateMessages();
  interval = window.setInterval(() => {
    updateMessages();
  }, $props.spacerTimeout);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

watch(
  () => $props.messages,
  () => {
    console.log('Messages changed', $props.messages);
    updateMessages();
  },
  { deep: true }
);

function updateMessages() {
  const lastMessage = $props.messages[$props.messages.length - 1];
  preparedMessages.value = $props.messages.reduce(
    (result, message) => {
      if (result.lastMessage) {
        const diff = message.timestamp - result.lastMessage.timestamp;
        if (diff > $props.spacerTimeout) {
          for (let i = 0; i < Math.round(diff / $props.spacerTimeout); i++) {
            result.messages.push({ separator: true });
          }
        }
      }
      result.messages.push(message);
      if (message === lastMessage) {
        const diff = Date.now() - message.timestamp;
        if (diff > $props.spacerTimeout) {
          for (let i = 0; i < Math.round(diff / $props.spacerTimeout); i++) {
            result.messages.push({ separator: true });
          }
        }
      }
      result.lastMessage = message;
      return result;
    },
    {
      lastMessage: undefined as Message | undefined,
      messages: [] as MessageSeparator[]
    }
  ).messages;
}
</script>

<script lang="ts">
interface MessageSeparator extends Partial<Message> {
  separator?: true;
}

export interface MessageGroup {
  id: string;
  messages: Message[];
  position: Vector3;
  translate?: Vector2;
  playerId: string;
  visible: boolean;
}
</script>

<style lang="postcss" scoped>
.cw-messages-group {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%)
    translate(
      calc(var(--position-x, 0px) * 1px),
      calc(var(--position-y, 0px) * 1px)
    );

  & .messages {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  & .message {
    max-width: 320px;
    padding: 5px 10px;
    overflow: hidden;
    font-size: 12px;
    pointer-events: auto;
    background: #fff;
    border: solid 2px #000;
    border-radius: 9px;

    & span {
      display: inline-block;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
      vertical-align: text-bottom;
      white-space: nowrap;
    }
  }

  & .separator {
    width: 100%;
    height: 16px;
  }
}
</style>
