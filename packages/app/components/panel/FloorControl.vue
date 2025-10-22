<template>
  <cw-panel class="cw-panel-floor-control" hide-title title="Wall">
    <cw-floor-select
      v-if="currentRoom"
      :min-floor="minFloor"
      :floor="currentFloor"
      :max-floor="maxFloor"
      :app="app"
      @up="currentRoom.modules.floor.setFloorUp()"
      @down="currentRoom.modules.floor.setFloorDown()" />
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import type App from '../../lib/classes/App';
import { onMounted, onUnmounted, ref } from 'vue';
import { Subscription } from 'rxjs';
import CwFloorSelect from '../button/FloorSelect.vue';
import type Room from '@cuby-world/app/lib/classes/Room';

const subscription = new Subscription();

const currentFloor = ref(0);
const minFloor = ref(0);
const maxFloor = ref(0);
let roomSubscription: Subscription;

const $props = defineProps<{
  app: App;
}>();

const currentRoom = ref<Room>();

onMounted(() => {
  subscription.add($props.app.modules.room.observables.room$.subscribe(onRoom));
});

function onRoom(room?: Room) {
  currentRoom.value = room;
  roomSubscription?.unsubscribe();
  roomSubscription = new Subscription();
  if (room) {
    roomSubscription.add(
      room.modules.floor.observables.floor$.subscribe(floor => {
        currentFloor.value = floor;
        minFloor.value = room.modules.floor.getMinFloor();
        maxFloor.value = room.modules.floor.getMaxFloor();
      })
    );
  }
}

onUnmounted(() => {
  roomSubscription?.unsubscribe();
  subscription.unsubscribe();
});
</script>
