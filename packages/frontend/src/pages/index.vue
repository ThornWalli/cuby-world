<template>
  <div>
    <app :config="config" />
  </div>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from '#imports';
import App from '@cuby-world/app/components/App.vue';
import type { AppConfig } from '@cuby-world/app/lib/classes/App';
import { ref } from 'vue';

const runtimeConfig = useRuntimeConfig();

const config = ref<AppConfig>({
  firebase: runtimeConfig.public.firebase,
  multiplayer: {}
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
