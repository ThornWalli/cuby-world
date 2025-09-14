<template>
  <div class="page-room-editor">
    <client-only>
      <cw-room-editor-editor :room="roomDescription" />
    </client-only>
  </div>
</template>
<script lang="ts" setup>
import defaultRoom from '@cuby-world/app/lib/rooms/default.json';

import { defineAsyncComponent, ref } from 'vue';

const CwRoomEditorEditor = defineAsyncComponent(
  () => import('@cuby-world/room-editor/components/Editor.vue')
);

const roomDescription = ref(defaultRoom);
</script>
<style lang="postcss" scoped>
.cw-room-editor-editor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
