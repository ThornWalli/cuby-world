<template>
  <div>
    <client-only>
      <app :config="config" />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from '#imports';
import type { AppConfig } from '@cuby-world/app/lib/classes/App';
import { defineAsyncComponent, ref } from 'vue';
const App = defineAsyncComponent(
  () => import('@cuby-world/app/components/App.vue')
);

const runtimeConfig = useRuntimeConfig();

const config = ref<AppConfig>({
  firebase: runtimeConfig.public.firebase,
  multiplayer: {
    enabled: runtimeConfig.public.cubyWorld.multiplayerEnabled
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
