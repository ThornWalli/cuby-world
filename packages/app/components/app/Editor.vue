<template>
  <div
    ref="rootEl"
    class="cw-app-editor"
    :class="{ ['action-' + currentAction]: !!currentAction }">
    <cw-panel-group position="top-left">
      <cw-panel-camera-control :app="app" />
      <cw-panel-wall-control :app="app" />
      <cw-panel-floor-control :app="app" />
    </cw-panel-group>
    <cw-panel-group position="top-right">
      <cw-panel-general :app="app" />
    </cw-panel-group>
    <cw-panel-group position="left">
      <cw-panel-editor-actions
        v-model="currentAction"
        :actions="actions"
        :app="app">
        <template #before>
          <cw-button-icon
            label="Settings"
            label-direction="right"
            icon="settings"
            @click="onClickSettings" />
        </template>
      </cw-panel-editor-actions>
    </cw-panel-group>
    <cw-panel-group id="teleports-panel-right" position="right">
    </cw-panel-group>
    <cw-panel-group id="teleports-panel-bottom" position="bottom">
    </cw-panel-group>
    <cw-panel-group id="teleports-panel-bottom-left" position="bottom-left">
    </cw-panel-group>
    <cw-panel-group id="teleports-panel-bottom-right" position="bottom-right">
    </cw-panel-group>
    <component :is="controlComponent" v-if="controlComponent" :app="app" />
    <teleport to="#teleports">
      <cw-room-editor-dialog-room-settings
        ref="dialogRoomSettings"
        :app="app" />
    </teleport>
    <!-- <cw-room-editor-dialog-debug ref="dialogDebug" :app="app" /> -->
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineAsyncComponent,
  markRaw,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  type Raw
} from 'vue';
import { Subscription } from 'rxjs';
import type Unit from '../../lib/classes/Unit';

import CwPanelCameraControl from '../panel/CameraControl.vue';
import CwPanelWallControl from '../panel/WallControl.vue';
import CwPanelFloorControl from '../panel/FloorControl.vue';

import CwPanelGeneral from '../editor/panel/General.vue';
import CwPanelGroup from '../PanelGroup.vue';
import CwPanelEditorActions from '../editor/panel/Actions.vue';
import CwRoomEditorDialogRoomSettings from '../editor/dialog/RoomSettings.vue';
import type CwRoomEditorDialogDebug from '../editor/dialog/Debug.vue';

import { EDITOR_ACTION } from '../../lib/types/editor';
import icons from '../../utils/icons';
import type { EditorApp } from '../../lib/classes/App';

import CwButtonIcon from '../button/IconButton.vue';

const dialogRoomSettings = ref<InstanceType<
  typeof CwRoomEditorDialogRoomSettings
> | null>(null);
const dialogDebug = ref<InstanceType<typeof CwRoomEditorDialogDebug> | null>(
  null
);

const controlComponent = computed(() => {
  switch (currentAction.value) {
    case EDITOR_ACTION.GROUND: {
      return markRaw(
        defineAsyncComponent(() => import('../editor/GroundControl.vue'))
      );
    }
    case EDITOR_ACTION.WALL: {
      return markRaw(
        defineAsyncComponent(() => import('../editor/WallControl.vue'))
      );
    }
    default:
      return null;
  }
});

function onClickSettings() {
  dialogRoomSettings.value?.open(
    $props.app.modules.room.getRoom()!.description
  );
}

const subscription = new Subscription();

const actions = ref([
  {
    icon: icons.wall_mode,
    label: 'Wall',
    value: EDITOR_ACTION.WALL
  },
  {
    icon: icons.ground_mode,
    label: 'Ground',
    value: EDITOR_ACTION.GROUND
  }
]);
const currentAction = ref<EDITOR_ACTION>(EDITOR_ACTION.NONE);

const $props = defineProps<{
  app: EditorApp;
}>();

const rootEl = ref<HTMLElement>();
const selectedUnit = ref<Raw<Unit> | null>(null);
const placedUnit = ref<Raw<Unit> | null>(null);

// let sceneUnsubscribe;
onMounted(async () => {
  nextTick(() => {
    setup();

    // currentAction.value = EDITOR_ACTION.GROUND;
    // onClickSettings();

    dialogDebug.value?.open();
  });
});

async function setup() {
  const app = $props.app;

  subscription.add(
    app.modules.selection.observables.selectUnit$.subscribe(unit => {
      selectedUnit.value = unit ? markRaw(unit) : null;
    })
  );
  subscription.add(
    app.modules.placement.observables.startPlace$.subscribe(unit => {
      placedUnit.value = unit;
    })
  );
  subscription.add(
    app.modules.placement.observables.stopPlace$.subscribe(() => {
      placedUnit.value = null;
    })
  );
}

// const user = ref();

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>

<style lang="postcss" scoped>
.cw-app-editor {
  --panel-offset: 1em;

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  pointer-events: none;

  & :deep(.cw-panel) {
    pointer-events: auto;
  }

  & .cw-renderer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>
