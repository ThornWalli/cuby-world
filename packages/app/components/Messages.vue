<template>
  <div class="cw-messages">
    <div class="groups">
      <cw-messages-group
        v-for="(group, index) in messageGroups.filter(({ visible }) => visible)"
        v-bind="group"
        :key="index"
        :spacer-timeout="spacerTimeout" />
    </div>

    <transition name="fade-short">
      <cw-messages-input v-if="!hideInput" ref="input" @send="onSend" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import type App from '../lib/classes/App';
import { Subscription } from 'rxjs';
import type { Vector3 } from 'three';
import { Vector2, Frustum, Matrix4 } from 'three';

import CwMessagesGroup, { type MessageGroup } from './messages/Group.vue';
import CwMessagesInput from './messages/Input.vue';
import type { Message } from '../lib/classes/appModule/Multiplayer';
import { FLOOR_HEIGHT } from '../lib/utils/ground';

const removeTimeout = 12000;
const spacerTimeout = 3000;
const $props = defineProps<{
  app: App;
  hideInput?: boolean;
}>();

const input = ref<InstanceType<typeof CwMessagesInput> | null>(null);

const messageGroups = ref<MessageGroup[]>([]);

function getGroupKey(position: Vector3) {
  return `group-${position.toArray()}`;
}
function getGroupById(id: string) {
  return messageGroups.value.find(group => group.id === id);
}

function onMessage(message: Message) {
  console.log('onMessage', message);
  const player = $props.app.modules.player.getPlayerById(message.playerId);
  if (!player || !player.unit) return;

  const unitPosition = player.unit?.getPosition();
  const position = unitPosition.clone();
  position.y *= FLOOR_HEIGHT;
  position.y += Math.max(player.unit.getSize().y, 1) + 0.2;

  const groupId = getGroupKey(position);
  let group: MessageGroup | undefined = getGroupById(groupId);
  if (!group) {
    group = {
      id: groupId,
      playerId: player.id,
      position,
      messages: [],
      visible: true
    };
    messageGroups.value.push(group);
  }
  const data = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    playerId: message.playerId,
    name: player.state.name,
    message: message.message
  };
  group?.messages.push(data);
  const messageIndex = group.messages.indexOf(data);

  window.setTimeout(() => {
    group.messages = group.messages.filter(
      (_, index) => index !== messageIndex
    );
  }, removeTimeout);
}

const subscription = new Subscription();
onMounted(() => {
  const app = $props.app;

  if (!app.modules.multiplayer) {
    throw new Error('Multiplayer module is not enabled');
  }

  subscription.add(
    app.modules.multiplayer.observables.message$.subscribe(({ data }) =>
      onMessage(data)
    )
  );

  subscription.add(
    app.renderer.observables.animationLoop$.subscribe(onUpdateMessagePositions)
  );
});

onUnmounted(() => {
  subscription.unsubscribe();
});

const frustum = new Frustum();
const matrix = new Matrix4();
function onUpdateMessagePositions() {
  const camera = $props.app.renderer.camera;

  frustum.setFromProjectionMatrix(
    matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
  );

  messageGroups.value.forEach(messageGroup => {
    const position = messageGroup.position.clone();
    if (frustum.containsPoint(position)) {
      position.project(camera);

      const screenX = ((position.x + 1) / 2) * window.innerWidth;
      const screenY = (-(position.y - 1) / 2) * window.innerHeight;

      messageGroup.translate = new Vector2(screenX, screenY);
      messageGroup.visible = true;
    } else {
      messageGroup.visible = false;
    }
  });
}

async function onSend(message: Message) {
  if (message && $props.app.modules.multiplayer?.actions.sendMessage) {
    await $props.app.modules.multiplayer.sendMessage(message);
    input.value?.reset();
  }
}
</script>

<style lang="postcss" scoped>
.cw-messages {
  pointer-events: none;

  .cw-messages-input {
    position: absolute;
    bottom: 40px;
    left: 50%;
    width: calc(100% / 3);
    transform: translateX(-50%);

    @media (width <= 767px) {
      bottom: 20px;
      width: calc(100% * 4 / 5);
    }
  }
}
</style>
