<template>
  <div class="cw-editor-wall-control">
    <teleport to="#teleports-panel-bottom">
      <cw-panel-editor-wall-actions v-model="currentAction" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import CwPanelEditorWallActions from '../panel/editor/WallActions.vue';
import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import { onMounted, ref, watch } from 'vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';

const $props = defineProps<{
  app: EditorApp;
}>();

const currentAction = ref<WALL_ACTION>(WALL_ACTION.NONE);

onMounted(() => {
  currentAction.value = WALL_ACTION.ADD_REMOVE;
});

watch(() => currentAction.value, onChangeAction);

function onChangeAction(action: WALL_ACTION) {
  resetAction();

  if (action === WALL_ACTION.ADD_REMOVE) {
    setAddRemoveAction();
  }
}

// #region Actions

function setAddRemoveAction() {
  const app = $props.app;
  app.modules.editorWall.setAction(WALL_ACTION.ADD_REMOVE);
}

function resetAction() {
  $props.app.modules.editorWall.setAction(WALL_ACTION.NONE);
}

// #endregion
</script>
