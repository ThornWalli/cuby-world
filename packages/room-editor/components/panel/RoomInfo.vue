<template>
  <cw-panel :title="modelValue.info.name">
    <div class="tiles">
      ({{ modelValue.grid[0]!.length * modelValue.grid.length }} tiles)
    </div>
    <!-- <div class="description">
      {{ modelValue.info.description || 'no description' }}
    </div> -->
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '@cuby-world/app/components/Panel.vue';
import type { EditorRoomDescription } from '@cuby-world/room-editor/types';

defineProps<{
  modelValue: EditorRoomDescription;
}>();
</script>

<style lang="postcss" scoped>
.tiles,
.description {
  font-size: 10px;
  font-style: italic;
  text-align: center;
}
</style>
