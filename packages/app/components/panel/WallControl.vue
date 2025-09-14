<template>
  <cw-panel class="cw-panel-wall-control" hide-title title="Wall">
    <cw-wall-view-toggle
      v-if="room"
      :view-mode="viewMode"
      :app="app"
      @click="room!.modules.wall.toggleViewMode()" />
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import type App from '../../lib/classes/App';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Subscription } from 'rxjs';
import CwWallViewToggle from '../button/WallViewToggle.vue';
import { WALL_VIEW_MODE } from '@cuby-world/app/lib/classes/roomModule/Wall';

const subscription = new Subscription();

const $props = defineProps<{
  app: App;
}>();

const room = computed(() => {
  return $props.app.modules.room.getRoom();
});

const viewMode = ref<WALL_VIEW_MODE>(WALL_VIEW_MODE.DYNAMIC);

onMounted(() => {
  subscription.add(
    room.value!.modules.wall.viewMode$.subscribe(mode => {
      viewMode.value = mode;
    })
  );
});

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
