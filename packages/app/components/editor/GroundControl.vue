<template>
  <div class="cw-editor-ground-control">
    <teleport to="#teleports-panel-right">
      <cw-panel-editor-ground-actions v-model="currentAction" />
    </teleport>
    <teleport to="#teleports-panel-bottom">
      <cw-panel-editor-ground-skin
        v-if="currentAction.primary === GROUND_ACTION.STYLE"
        v-model="skinId"
        :app="app"
        :action="currentAction" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import CwPanelEditorGroundActions, {
  type GroundAction
} from './panel/GroundActions.vue';
import CwPanelEditorGroundSkin from './panel/GroundSkin.vue';

import { GROUND_ACTION } from '@cuby-world/app/lib/types/editor';
import { onMounted, onUnmounted, ref, watch } from 'vue';

import { Subscription } from 'rxjs';
import { CURSOR_TYPE } from '@cuby-world/app/lib/classes/appModule/Cursor';
import type { GroundSkinIdentifier } from '@cuby-world/app/lib/types/ground/skins';
import type App from '@cuby-world/app/lib/classes/App';

const $props = defineProps<{
  app: App;
}>();

const currentAction = ref<GroundAction>({
  primary: GROUND_ACTION.NONE
});

const subscription = new Subscription();

const skinId = ref<GroundSkinIdentifier>('');

onMounted(() => {
  // currentAction.value = {
  //   primary: GROUND_ACTION.STYLE,
  //   secondary: GROUND_ACTION.STYLE_SINGLE_SET
  // };
});

onUnmounted(() => {
  resetAction();
  subscription.unsubscribe();
});

watch(() => currentAction.value, onChangeAction);
watch(() => skinId.value, onChangeSkin);

function onChangeAction(action: GroundAction) {
  const app = $props.app;
  // resetAction();
  if (action.primary !== GROUND_ACTION.NONE) {
    app.modules.cursor.setCursor(CURSOR_TYPE.POINTER);
  } else {
    app.modules.cursor.setCursor(undefined);
  }
  app.modules.editorGround.setAction(action);
}

function onChangeSkin(skinId: GroundSkinIdentifier) {
  $props.app.modules.editorGround.setSkin(skinId);
}

//#region Actions

function resetAction() {
  $props.app.modules.editorGround.setAction({ primary: GROUND_ACTION.NONE });
}

//#endregion
</script>
