<template>
  <div class="cw-editor-wall-control">
    <teleport to="#teleports-panel-right">
      <cw-panel-editor-wall-actions v-model="currentAction" />
    </teleport>
    <teleport to="#teleports-panel-bottom">
      <cw-panel-editor-door-skin
        v-if="currentAction.primary === WALL_ACTION.MODE_DOOR"
        v-model="extension"
        :app="app"
        :action="currentAction" />
      <cw-panel-editor-window-skin
        v-if="currentAction.primary === WALL_ACTION.MODE_WINDOW"
        v-model="extension"
        :app="app"
        :action="currentAction" />
      <cw-panel-editor-wall-skin
        v-if="currentAction.primary === WALL_ACTION.MODE_STYLE"
        v-model="skin"
        :app="app"
        :action="currentAction" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Subscription } from 'rxjs';
import CwPanelEditorWallActions, {
  type WallAction
} from './panel/WallActions.vue';
import CwPanelEditorWallSkin from './panel/WallSkin.vue';
import CwPanelEditorDoorSkin from './panel/DoorSelect.vue';
import CwPanelEditorWindowSkin from './panel/WindowSelect.vue';

import { WALL_ACTION } from '../../lib/types/editor';
import type { EditorApp } from '../../lib/classes/App';
import type Wall from '../../lib/classes/Wall';
import type { FACE_INDEX } from '../../lib/types/wall';
import {
  catalog,
  type WallExtensionIdentifier
} from '@cuby-world/wall-extensions';
import { CURSOR_TYPE } from '../../lib/classes/appModule/Cursor';
import type { CatalogItemIdentifier } from '@cuby-world/app/lib/utils/catalog';

import skins from '@cuby-world/app/lib/utils/wall/skins';
import type { WallSkinIdentifier } from '@cuby-world/app/lib/types/wall/skins';

const extension = ref<WallExtensionIdentifier>('');
const skin = ref<WallSkinIdentifier>('');

const $props = defineProps<{
  app: EditorApp;
}>();

const currentAction = ref<WallAction>({
  primary: WALL_ACTION.NONE
});

const subscription = new Subscription();

const current = ref<{
  wall: Wall | null;
  faceIndex: FACE_INDEX;
} | null>();
onMounted(() => {
  currentAction.value = {
    primary: WALL_ACTION.ADD
  };

  subscription.add(
    $props.app.modules.editorWall.observables.current$.subscribe(value => {
      $props.app.modules.cursor.setCursor(
        value ? CURSOR_TYPE.POINTER : undefined
      );
      current.value = value;
    })
  );
});

onUnmounted(() => {
  resetAction();
  subscription.unsubscribe();
});

watch(() => currentAction.value, onChangeAction);
watch(() => extension.value, onChangeExtension);
watch(() => skin.value, onChangeStyle);

function onChangeAction(action: WallAction) {
  const app = $props.app;
  resetAction();
  app.modules.editorWall.setAction(action);
}

function onChangeExtension(extensionId: CatalogItemIdentifier) {
  const item = catalog.get(extensionId);
  if (item) {
    $props.app.modules.editorWall.setExtension(item);
  }
}

function onChangeStyle(styleId: WallSkinIdentifier) {
  const item = skins.get(styleId);
  if (item) {
    $props.app.modules.editorWall.setStyle(item);
  }
}

//#region Actions

function resetAction() {
  $props.app.modules.editorWall.setAction({ primary: WALL_ACTION.NONE });
}

//#endregion
</script>
