<template>
  <div class="cw-editor-wall-control">
    <teleport to="#teleports-panel-right">
      <cw-panel-editor-wall-actions v-model="currentAction" />
    </teleport>
    <!-- window -->
    <cw-editor-wall-control-window-controller
      v-if="isWindowController"
      :key="currentController ? currentController.id : 'no-controller'"
      :app="app" />
    <!-- door -->
    <cw-editor-wall-control-door-controller
      v-if="isDoorController"
      :key="currentController ? currentController.id : 'no-controller'"
      :app="app" />
    <!-- painter -->
    <cw-editor-wall-control-painter-controller
      v-if="isPainterController"
      :key="currentController ? currentController.id : 'no-controller'"
      :app="app" />
    <!-- mason -->
    <cw-editor-wall-control-mason-controller
      v-if="isMasonController"
      :key="currentController ? currentController.id : 'no-controller'"
      :app="app" />
  </div>
</template>

<script lang="ts" setup>
import { computed, markRaw, onMounted, onUnmounted, ref, watch } from 'vue';
import { Subscription } from 'rxjs';
import CwPanelEditorWallActions, {
  type WallAction
} from './panel/WallActions.vue';

import CwEditorWallControlWindowController from './wallControl/WindowController.vue';
import CwEditorWallControlDoorController from './wallControl/DoorController.vue';
import CwEditorWallControlMasonController from './wallControl/MasonController.vue';
import CwEditorWallControlPainterController from './wallControl/PainterController.vue';

import { WALL_ACTION } from '../../lib/types/editor';
import type AppModuleController from '@cuby-world/app/lib/classes/AppModuleController';
import MasonController from '@cuby-world/app/lib/classes/appModule/editor/wall/MasonController';
import PainterController from '@cuby-world/app/lib/classes/appModule/editor/wall/PainterController';
import DoorController from '@cuby-world/app/lib/classes/appModule/editor/wall/DoorController';
import WindowController from '@cuby-world/app/lib/classes/appModule/editor/wall/WindowController';
import type App from '../../lib/classes/App';

const $props = defineProps<{
  app: App;
}>();

const currentAction = ref<WallAction>({
  primary: WALL_ACTION.NONE
});

const subscription = new Subscription();
const currentController = ref<AppModuleController | null>(null);

onMounted(() => {
  currentAction.value = {
    primary: WALL_ACTION.NONE
    // secondary: MASON_MODE.ADD
  };

  subscription.add(
    $props.app.modules.editorWall.observables.currentController$.subscribe(
      controller => {
        currentController.value = controller ? markRaw(controller) : controller;
      }
    )
  );

  // subscription.add(
  //   $props.app.modules.editorWall.observables.current$.subscribe(value => {
  //     $props.app.modules.cursor.setCursor(
  //       value ? CURSOR_TYPE.POINTER : undefined
  //     );
  //     current.value = value;
  //   })
  // );
});

onUnmounted(() => {
  resetAction();
  subscription.unsubscribe();
});

watch(() => currentAction.value, onChangeAction);

function onChangeAction(action: WallAction) {
  const app = $props.app;
  resetAction();
  app.modules.editorWall.setAction(action);
}

const isWindowController = computed(
  () => currentController.value instanceof WindowController
);

const isDoorController = computed(
  () => currentController.value instanceof DoorController
);

const isMasonController = computed(
  () => currentController.value instanceof MasonController
);

const isPainterController = computed(
  () => currentController.value instanceof PainterController
);

//#region Actions

function resetAction() {
  $props.app.modules.editorWall.setAction({ primary: WALL_ACTION.NONE });
}

//#endregion
</script>
