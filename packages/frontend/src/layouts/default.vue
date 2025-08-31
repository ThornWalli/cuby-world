<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, useHead } from '#imports';
import useStats from '~/composables/useStats';

const { start: startStats, stop: stopStats } = useStats();

useHead({
  link: [
    {
      rel: 'shortcut icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
});

onMounted(async () => {
  await startStats();
});

onUnmounted(() => {
  stopStats();
});
</script>
