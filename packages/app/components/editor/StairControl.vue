<template>
  <div class="cw-editor-stair-control">
    <teleport to="#teleports-panel-right">
      <cw-panel-editor-stair-actions v-model="currentAction" />
    </teleport>
    <teleport to="#teleports-panel-bottom">
      <cw-panel-editor-stair-select
        v-if="currentAction.primary === STAIR_ACTION.ADD"
        v-model="skinId"
        :app="app"
        :action="currentAction" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import CwPanelEditorStairActions, {
  type StairAction
} from './panel/StairActions.vue';
import CwPanelEditorStairSelect from './panel/StairSelect.vue';

import { GROUND_ACTION, STAIR_ACTION } from '@cuby-world/app/lib/types/editor';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';
import { Subscription } from 'rxjs';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';
// import { CURSOR_TYPE } from '@cuby-world/app/lib/classes/appModule/Cursor';

const $props = defineProps<{
  app: EditorApp;
}>();

const currentAction = ref<StairAction>({
  primary: STAIR_ACTION.NONE
});

const subscription = new Subscription();

const skinId = ref<StairSkinIdentifier>('');

onMounted(() => {
  currentAction.value = {
    primary: STAIR_ACTION.ADD
  };
});

onUnmounted(() => {
  resetAction();
  subscription.unsubscribe();
});

watch(() => currentAction.value, onChangeAction);
watch(() => skinId.value, onChangeSkin);

function onChangeAction(_action: StairAction) {
  // const app = $props.app;
  // resetAction();
  // if (action.primary !== GROUND_ACTION.NONE) {
  //   app.modules.cursor.setCursor(CURSOR_TYPE.POINTER);
  // } else {
  //   app.modules.cursor.setCursor(undefined);
  // }
  // app.modules.editorGround.setAction(action);
}

function onChangeSkin(skinId: StairSkinIdentifier) {
  $props.app.modules.editorStair.setSkin(skinId);
}

//#region Actions

function resetAction() {
  $props.app.modules.editorGround.setAction({ primary: GROUND_ACTION.NONE });
}

//#endregion
</script>
