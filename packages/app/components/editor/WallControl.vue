<template>
  <div class="cw-editor-wall-control">
    <teleport to="#teleports-panel-bottom">
      <cw-panel-editor-wall-actions v-model="currentAction" />
    </teleport>
    <teleport to="#teleports-panel-bottom-right">
      <cw-panel-editor-wall-style
        v-if="currentAction.primary === WALL_ACTION.MODE_STYLE"
        v-model="style"
        :action="currentAction" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import CwPanelEditorWallActions, {
  type WallAction
} from './panel/WallActions.vue';
import CwPanelEditorWallStyle from './panel/WallStyle.vue';

import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';
import type { WallStyleTemplate } from '@cuby-world/app/lib/types/wall/style';
import { Subscription } from 'rxjs';
import type Wall from '@cuby-world/app/lib/classes/Wall';
import type { FACE_INDEX } from '@cuby-world/app/lib/types/wall';
import { CURSOR_TYPE } from '@cuby-world/app/lib/classes/appModule/Cursor';

const style = ref<WallStyleTemplate>({
  id: 'color_blue',
  color: '#0066ff',
  name: 'Blue'
});

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
watch(() => style.value, onChangeStyle);

function onChangeAction(action: WallAction) {
  const app = $props.app;
  resetAction();
  app.modules.editorWall.setAction(action);
}

function onChangeStyle(style: WallStyleTemplate) {
  $props.app.modules.editorWall.setStyle(style);
}

// #region Actions

function resetAction() {
  $props.app.modules.editorWall.setAction({ primary: WALL_ACTION.NONE });
}

// #endregion
</script>
