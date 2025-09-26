<template>
  <div class="cw-editor-wall-control">
    <teleport to="#teleports-panel-bottom">
      <cw-panel-editor-wall-actions v-model="currentAction" />
    </teleport>
    <teleport to="#teleports-panel-bottom-right">
      <cw-panel-editor-wall-style
        v-if="currentAction === WALL_ACTION.STYLE"
        v-model="color"
        :action="currentAction" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import CwPanelEditorWallActions from './panel/WallActions.vue';
import CwPanelEditorWallStyle from './panel/WallStyle.vue';

import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';

const color = ref<string>('#ffffff');

const $props = defineProps<{
  app: EditorApp;
}>();

const currentAction = ref<WALL_ACTION>(WALL_ACTION.NONE);

onMounted(() => {
  currentAction.value = WALL_ACTION.ADD;
});

onUnmounted(() => {
  resetAction();
});

watch(() => currentAction.value, onChangeAction);
watch(() => color.value, onChangeColor);

function onChangeAction(action: WALL_ACTION) {
  const app = $props.app;
  resetAction();
  app.modules.editorWall.setAction(action);
}

function onChangeColor(color: string) {
  $props.app.modules.editorWall.setColor(color);
}

// #region Actions

function resetAction() {
  $props.app.modules.editorWall.setAction(WALL_ACTION.NONE);
}

// #endregion
</script>
