<template>
  <div class="cw-editor-stair-control">
    <!-- planner-controller -->
    <cw-editor-stair-control-planner-controller
      v-if="isPlannerController"
      :key="currentController ? currentController.id : 'no-controller'"
      :app="app" />
  </div>
</template>

<script lang="ts" setup>
import type { StairAction } from './panel/StairActions.vue';
import CwEditorStairControlPlannerController from './stairControl/PlannerController.vue';

import { STAIR_ACTION } from '@cuby-world/app/lib/types/editor';
import { computed, markRaw, onMounted, onUnmounted, ref, watch } from 'vue';
import type { EditorApp } from '@cuby-world/app/lib/classes/App';
import { Subscription } from 'rxjs';
import PlannerController from '@cuby-world/app/lib/classes/appModule/editor/stair/PlannerController';
import type AppModuleController from '@cuby-world/app/lib/classes/AppModuleController';

const $props = defineProps<{
  app: EditorApp;
}>();

const currentAction = ref<StairAction>({
  primary: STAIR_ACTION.NONE
});

const subscription = new Subscription();
const currentController = ref<AppModuleController | null>(null);

onMounted(() => {
  currentAction.value = {
    primary: STAIR_ACTION.DEFAULT
  };

  subscription.add(
    $props.app.modules.editorStair.observables.currentController$.subscribe(
      controller => {
        currentController.value = controller ? markRaw(controller) : controller;
      }
    )
  );
});

onUnmounted(() => {
  resetAction();
  subscription.unsubscribe();
});

watch(() => currentAction.value, onChangeAction);

function onChangeAction(action: StairAction) {
  const app = $props.app;
  resetAction();
  // if (action.primary !== STAIR_ACTION.NONE) {
  //   app.modules.cursor.setCursor(CURSOR_TYPE.POINTER);
  // } else {
  //   app.modules.cursor.setCursor(undefined);
  // }
  app.modules.editorStair.setAction(action);
}

//#region Actions

function resetAction() {
  $props.app.modules.editorStair.setAction({ primary: STAIR_ACTION.NONE });
}

//#endregion

const isPlannerController = computed(
  () => currentController.value instanceof PlannerController
);
</script>

<style lang="postcss" scoped>
.stair-controls {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  gap: var(--cw-spacing-medium);
  align-items: flex-end;
  pointer-events: none;
  transform: translate(100%, -125%)
    translate(
      calc(var(--translate-x, 0) * 1px),
      calc(var(--translate-y, 0) * 1px)
    );

  & > div {
    display: flex;
    flex-direction: column;
    gap: var(--cw-spacing-medium);
  }

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--cw-spacing-medium);
    overflow: hidden;
    pointer-events: auto;
    cursor: pointer;
    background: rgb(0 0 0 / 60%);
    border-radius: 50%;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 80%);
    backdrop-filter: blur(var(--cw-blur-default));
    transition: background-color var(--cw-easing-duration-short)
      var(--cw-easing-base);

    &:hover {
      background: var(--color-blue-7);
    }

    & span {
      display: none;
    }

    & svg {
      display: block;
      width: 24px;
    }
  }
}
</style>
