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
import type { AppConfig } from '@cuby-world/app/lib/classes/App';

import { defineAsyncComponent, onMounted, ref } from 'vue';

import type { RoomDescription } from '@cuby-world/app/lib/types/room';
import { loadRoomById } from '@cuby-world/app/lib/utils/rooms';

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
  roomDescription.value = await loadRoomById(
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
  firebase: runtimeConfig.public.firebase,
  multiplayer: {
    enabled: runtimeConfig.public.cubyWorld.multiplayerEnabled
  },
  debug: {
    dayytime: runtimeConfig.public.cubyWorld.debug?.daytime || null
  }
});
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
