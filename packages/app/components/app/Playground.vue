<template>
  <cw-app-layout
    class="cw-app-playground"
    :class="{ ['action-' + currentEditorAction]: !!currentEditorAction }">
    <template #[PANEL.TOP_LEFT]>
      <cw-panel-camera-control key="camera-control" :app="app" />
      <cw-panel-wall-control key="wall-control" :app="app" />
      <cw-panel-floor-control key="floor-control" :app="app" />
    </template>
    <template #[PANEL.TOP_RIGHT]>
      <cw-panel-general key="general" :app="app" />
      <cw-panel-export-import key="export-import" :app="app" />
    </template>
    <template #[PANEL.LEFT]>
      <cw-panel-editor-actions
        v-if="currentAction === ACTION.EDITOR"
        v-model="currentEditorAction"
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
    </template>
    <template #[PANEL.BOTTOM_LEFT]>
      <cw-panel-design-control
        key="design-control"
        v-model="currentAction"
        :app="app" />
    </template>
    <template #[PANEL.BOTTOM_RIGHT]>
      <cw-panel-unit-preview
        v-if="currentAction === ACTION.NONE"
        key="unit-preview"
        :app="app" />
    </template>
    <template #foreground>
      <cw-messages
        v-if="isMessagingActive"
        :app="app"
        :hide-input="currentAction !== ACTION.NONE" />
      <cw-selected-unit-controls :app="app" />

      <!-- editor -->
      <component :is="controlComponent" v-if="controlComponent" :app="app" />
      <teleport to="#teleports">
        <cw-room-editor-dialog-room-settings
          ref="dialogRoomSettings"
          :app="app" />
      </teleport>
    </template>
  </cw-app-layout>
</template>

<script lang="ts" setup>
import {
  computed,
  defineAsyncComponent,
  markRaw,
  onMounted,
  ref,
  nextTick,
  watch
} from 'vue';
import type App from '../../lib/classes/App';

import CwMessages from '../Messages.vue';

import CwAppLayout, { PANEL } from '../AppLayout.vue';
import CwPanelCameraControl from '../panel/CameraControl.vue';
import CwPanelWallControl from '../panel/WallControl.vue';
import CwPanelFloorControl from '../panel/FloorControl.vue';
import CwPanelGeneral from '../panel/General.vue';
import CwPanelExportImport from '../editor/panel/ExportImport.vue';
import CwPanelDesignControl from '../panel/DesignControl.vue';
import CwPanelUnitPreview from '../panel/UnitPreview.vue';
import CwSelectedUnitControls from '../SelectedUnitControls.vue';
import CwPanelEditorActions from '../editor/panel/Actions.vue';
import CwButtonIcon from '../button/IconButton.vue';
import CwRoomEditorDialogRoomSettings from '../editor/dialog/RoomSettings.vue';
import { EDITOR_ACTION } from '@cuby-world/app/lib/types/editor';

import icons from '@cuby-world/app/utils/icons';
import { APP_MODE } from '../../lib/classes/App';

const $props = defineProps<{
  app: App;
}>();

const isMessagingActive = computed(() => !!$props.app.modules.multiplayer);

onMounted(async () => {
  nextTick(() => {
    // currentAction.value = ACTION.EDITOR;
    // // onClickSettings();
  });
});

const currentAction = ref<ACTION>(ACTION.NONE);

//#region editor

const currentEditorAction = ref<EDITOR_ACTION>(EDITOR_ACTION.NONE);

watch(
  () => currentAction.value,
  action => {
    if (action !== ACTION.EDITOR) {
      $props.app.setMode(APP_MODE.PLAYGROUND);
      currentEditorAction.value = EDITOR_ACTION.NONE;
    } else {
      $props.app.setMode(APP_MODE.EDITOR);
    }
  }
);

const dialogRoomSettings = ref<InstanceType<
  typeof CwRoomEditorDialogRoomSettings
> | null>(null);

const controlComponent = computed(() => {
  switch (currentEditorAction.value) {
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
    case EDITOR_ACTION.STAIR: {
      return markRaw(
        defineAsyncComponent(() => import('../editor/StairControl.vue'))
      );
    }
    default:
      return null;
  }
});

function onClickSettings() {
  dialogRoomSettings.value?.open(
    $props.app.modules.room.getRoom()!.toDescription()
  );
}

const actions = ref([
  {
    icon: icons.mode_wall,
    label: 'Wall',
    value: EDITOR_ACTION.WALL
  },
  {
    icon: icons.mode_ground,
    label: 'Ground',
    value: EDITOR_ACTION.GROUND
  },
  {
    icon: icons.mode_stair,
    label: 'Stair',
    value: EDITOR_ACTION.STAIR
  }
]);

//#endregion
</script>

<script lang="ts">
export enum ACTION {
  NONE = 'none',
  SHOP = 'shop',
  EDITOR = 'editor'
}
</script>

<style lang="postcss" scoped>
.cw-app-playground {
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

  & .cw-messages {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
