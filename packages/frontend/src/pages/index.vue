<template>
  <div>
    <client-only>
      <app :config="config" :room-description="roomDescription" />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRuntimeConfig } from '#imports';
import { APP_MODE, type AppConfig } from '@cuby-world/app/lib/classes/App';

import { defineAsyncComponent, ref } from 'vue';
import roomTest2001 from '@cuby-world/app/lib/rooms/wall-test.json';
// import roomTest2001 from '@cuby-world/app/lib/rooms/test-2004.json';
import {
  jsonParse,
  parseRoomDescription
} from '@cuby-world/room-editor/utils/parse';

const App = defineAsyncComponent(
  () => import('@cuby-world/app/components/App.vue')
);

const $route = useRoute();

const runtimeConfig = useRuntimeConfig();

const roomDescription = parseRoomDescription(
  jsonParse(JSON.stringify(roomTest2001))
);

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
