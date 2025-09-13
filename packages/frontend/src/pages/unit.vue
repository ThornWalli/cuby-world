<template>
  <div>
    <debug-unit-preview />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';

const DebugUnitPreview = defineAsyncComponent(
  () => import('@cuby-world/app/components/debug/UnitPreview.vue')
);
</script>

<style lang="postcss" scoped>
.cw-debug-unit-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
