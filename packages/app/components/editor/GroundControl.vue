<template>
  <div class="cw-editor-ground-control">
    <teleport to="#teleports-panel-bottom">
      <cw-panel-editor-ground-actions v-model="currentAction" />
    </teleport>
    <teleport to="#teleports-panel-bottom-right">
      <cw-panel-editor-ground-style
        v-if="currentAction.primary === GROUND_ACTION.MODE_STYLE"
        v-model="style"
        :action="currentAction" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import CwPanelEditorGroundActions, {
  type GroundAction
} from './panel/GroundActions.vue';
import CwPanelEditorGroundStyle from './panel/GroundStyle.vue';

import { GROUND_ACTION } from '@cuby-world/app/lib/types/editor';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';
import { Subscription } from 'rxjs';
import { CURSOR_TYPE } from '@cuby-world/app/lib/classes/appModule/Cursor';
import type { GroundStyleTemplate } from '@cuby-world/app/lib/types/ground/style';

const style = ref<GroundStyleTemplate>({
  id: 'color_blue',
  style: {
    id: 'default',
    options: {
      color: '#0066ff'
    }
  },
  name: 'Blue'
});

const $props = defineProps<{
  app: EditorApp;
}>();

const currentAction = ref<GroundAction>({
  primary: GROUND_ACTION.NONE
});

const subscription = new Subscription();

onMounted(() => {
  currentAction.value = {
    primary: GROUND_ACTION.MODE_STYLE,
    secondary: GROUND_ACTION.GROUND_SINGLE_SET
  };
});

onUnmounted(() => {
  resetAction();
  subscription.unsubscribe();
});

watch(() => currentAction.value, onChangeAction);
watch(() => style.value, onChangeStyle);

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

function onChangeStyle({ style }: GroundStyleTemplate) {
  $props.app.modules.editorGround.setStyle(style);
}

// #region Actions

function resetAction() {
  $props.app.modules.editorGround.setAction({ primary: GROUND_ACTION.NONE });
}

// #endregion
</script>
