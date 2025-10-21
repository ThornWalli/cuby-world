<template>
  <div>
    <client-only>
      <app
        v-if="roomDescription"
        :config="config"
        :room-description="roomDescription" />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRuntimeConfig } from '#imports';
import { APP_MODE, type AppConfig } from '@cuby-world/app/lib/classes/App';

import { defineAsyncComponent, onMounted, ref } from 'vue';
import {
  jsonParse,
  parseRoomDescription
} from '@cuby-world/app/lib/utils/parse';
import type { RoomDescription } from '@cuby-world/app/lib/types/room';
import { roomMap } from '@cuby-world/app/lib/room';

async function loadRoom(key: string) {
  if (!roomMap[key as string]) {
    console.warn(`Room with key "${key}" not found, loading default room.`);
    key = 'default';
  }
  const url = await roomMap[key as string]!();
  const room = await fetch(url)
    .then(async res => res.text())
    .then(async raw => parseRoomDescription(jsonParse(raw)));
  return room;
}

// const roomKey = $route.query.room || 'default';
// roomMap[roomKey]!.then(module => {
//   const roomJson = module.default;
//   roomDescription.value = parseRoomDescription(
//     jsonParse(JSON.stringify(roomJson))
//   );
// });

const App = defineAsyncComponent(
  () => import('@cuby-world/app/components/App.vue')
);

const $route = useRoute();

const runtimeConfig = useRuntimeConfig();

onMounted(async () => {
  roomDescription.value = await loadRoom(
    ($route.query.room as string) || 'default'
  );

  // roomDescription.value = parseRoomDescription(
  //   jsonParse(await loadRoom('default'))
  // );
  // roomDescription.value = parseRoomDescription(
  //   jsonParse(JSON.stringify(roomTest2001))
  // );
});

const roomDescription = ref<RoomDescription>();

const config = ref<AppConfig>({
  mode: getMode(),
  firebase: runtimeConfig.public.firebase,
  multiplayer: {
    enabled: runtimeConfig.public.cubyWorld.multiplayerEnabled
  }
});

function getMode() {
  if ($route.query.mode === APP_MODE.EDITOR) {
    return APP_MODE.EDITOR;
  }
  return APP_MODE.PLAYGROUND;
}
</script>

<style lang="postcss" scoped>
div {
  position: relative;
  height: 100vh;
  height: 100svh;
}

.cw-app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
