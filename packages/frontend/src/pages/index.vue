<template>
  <div>
    <app />
  </div>
</template>

<script lang="ts" setup>
import App from '@cuby-world/app/components/App.vue';
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
