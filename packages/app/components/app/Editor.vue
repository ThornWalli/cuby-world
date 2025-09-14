<template>
  <div
    ref="rootEl"
    class="cw-app-editor"
    :class="{ ['action-' + currentAction]: !!currentAction }">
    <cw-panel-group position="top-left">
      <cw-panel-camera-control :app="app" />
      <cw-panel-wall-control :app="app" />
    </cw-panel-group>
    <cw-panel-group position="top-right">
      <cw-panel-general :app="app" />
    </cw-panel-group>
    <cw-panel-group position="left">
      <cw-panel-editor-actions
        v-model="currentAction"
        :actions="actions"
        :app="app" />
    </cw-panel-group>
    <cw-panel-group id="teleports-panel-bottom" position="bottom">
    </cw-panel-group>
    <cw-panel-group position="bottom-left"> </cw-panel-group>
    <cw-panel-group position="bottom-right"> </cw-panel-group>
    <component :is="controlComponent" v-if="controlComponent" :app="app" />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineAsyncComponent,
  markRaw,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  type Raw
} from 'vue';
import { Subscription } from 'rxjs';
import type Unit from '../../lib/classes/Unit';

import CwPanelCameraControl from '../panel/CameraControl.vue';
import CwPanelWallControl from '../panel/WallControl.vue';
import CwPanelGeneral from '../panel/editor/General.vue';
import CwPanelGroup from '../PanelGroup.vue';
import CwPanelEditorActions from '../panel/editor/Actions.vue';

import { EDITOR_ACTION } from '@cuby-world/app/lib/types/editor';
import icons from '@cuby-world/app/utils/icons';
import type { EditorApp } from '../../lib/classes/App';

const controlComponent = computed(() => {
  if (currentAction.value === EDITOR_ACTION.WALL) {
    return markRaw(
      defineAsyncComponent(() => import('../editor/WallControl.vue'))
    );
  }
  return null;
});

const subscription = new Subscription();

const actions = ref([
  {
    icon: icons.wall,
    label: 'Wall',
    value: EDITOR_ACTION.WALL
  }
]);
const currentAction = ref<EDITOR_ACTION>(EDITOR_ACTION.NONE);

const $props = defineProps<{
  app: EditorApp;
}>();

const rootEl = ref<HTMLElement>();
const selectedUnit = ref<Raw<Unit> | null>(null);
const placedUnit = ref<Raw<Unit> | null>(null);

// let sceneUnsubscribe;
onMounted(async () => {
  nextTick(() => {
    setup();

    currentAction.value = EDITOR_ACTION.WALL;
  });
});

async function setup() {
  const app = $props.app;

  subscription.add(
    app.modules.selection.selectUnit$.subscribe(unit => {
      selectedUnit.value = unit ? markRaw(unit) : null;
    })
  );
  subscription.add(
    app.modules.placement.startPlace$.subscribe(unit => {
      placedUnit.value = unit;
    })
  );
  subscription.add(
    app.modules.placement.stopPlace$.subscribe(() => {
      placedUnit.value = null;
    })
  );
}

// const user = ref();

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>

<style lang="postcss" scoped>
.cw-app-editor {
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
}
</style>
