<template>
  <cw-panel class="cw-panel-wall-control" hide-title title="Wall">
    <cw-wall-view-toggle
      v-if="currentRoom"
      :view-mode="viewMode"
      :app="app"
      @click="currentRoom.modules.wall.toggleViewMode()" />
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import type App from '../../lib/classes/App';
import { onMounted, onUnmounted, ref } from 'vue';
import { filter, Subscription, switchMap } from 'rxjs';
import CwWallViewToggle from '../button/WallViewToggle.vue';
import { WALL_VIEW_MODE } from '@cuby-world/app/lib/classes/roomModule/Wall';

const subscription = new Subscription();

const $props = defineProps<{
  app: App;
}>();

const currentRoom = ref($props.app.modules.room.getRoom());
const viewMode = ref<WALL_VIEW_MODE>(WALL_VIEW_MODE.DYNAMIC);

onMounted(() => {
  subscription.add(
    $props.app.modules.room.observables.room$.subscribe(room => {
      currentRoom.value = room;
    })
  );
  subscription.add(
    $props.app.modules.room.observables.room$
      .pipe(
        filter(Boolean),
        switchMap(room => room.modules.wall.observables.viewMode$)
      )
      .subscribe(mode => {
        viewMode.value = mode;
      })
  );
});

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
