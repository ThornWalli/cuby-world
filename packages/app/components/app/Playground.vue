<template>
  <div ref="rootEl" class="cw-app-playground">
    <cw-messages v-if="isMessagingActive" :app="app" />
    <cw-panel-group position="top-left">
      <cw-panel-camera-control :app="app" />
      <cw-panel-wall-control :app="app" />
      <cw-panel-floor-control :app="app" />
    </cw-panel-group>
    <cw-panel-group position="top-right">
      <cw-panel-general :app="app" />
      <cw-panel-export-import :app="app" />
    </cw-panel-group>
    <cw-panel-group position="bottom-left">
      <!-- <cw-debug-panel-unit-settings v-if="selectedUnit" :unit="selectedUnit" /> -->
      <cw-panel-catalog :app="app" />
    </cw-panel-group>
    <cw-panel-group position="bottom-right">
      <cw-panel-unit-preview v-if="selectedUnit" :unit="selectedUnit">
        <template #actions>
          <cw-button @click="onClickRotate">Rotate</cw-button>
          <cw-button
            v-if="canPlaced"
            :selected="!!placedUnit"
            @click="onClickPlacement">
            Move
          </cw-button>
        </template>
      </cw-panel-unit-preview>
    </cw-panel-group>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  markRaw,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  type Raw
} from 'vue';
import { Subscription } from 'rxjs';
import type App from '../../lib/classes/App';
import type Unit from '../../lib/classes/Unit';

import CwMessages from '../Messages.vue';

import CwPanelCameraControl from '../panel/CameraControl.vue';
import CwPanelWallControl from '../panel/WallControl.vue';
import CwPanelFloorControl from '../panel/FloorControl.vue';

import CwPanelUnitPreview from '../panel/UnitPreview.vue';
import CwPanelGeneral from '../panel/General.vue';
import CwPanelGroup from '../PanelGroup.vue';
import CwPanelCatalog from '../panel/Catalog.vue';
import CwPanelExportImport from '../editor/panel/ExportImport.vue';
// import CwDebugPanelUnitSettings from '../debug/panel/UnitSettings.vue';
import CwButton from '../Button.vue';

const subscription = new Subscription();

const $props = defineProps<{
  app: App;
}>();

const rootEl = ref<HTMLElement>();
const selectedUnit = ref<Raw<Unit> | null>(null);
const placedUnit = ref<Raw<Unit> | null>(null);
const canPlaced = computed(() => selectedUnit.value?.options.canPlaced);
const isMessagingActive = computed(() => !!$props.app.modules.multiplayer);

// let sceneUnsubscribe;
onMounted(async () => {
  nextTick(() => {
    setup();
  });
});

async function setup() {
  const app = $props.app;

  subscription.add(
    app.modules.selection.observables.selectUnit$.subscribe(unit => {
      selectedUnit.value = unit ? markRaw(unit) : null;
    })
  );
  subscription.add(
    app.modules.placement.observables.startPlace$.subscribe(unit => {
      placedUnit.value = markRaw(unit);
    })
  );
  subscription.add(
    app.modules.placement.observables.stopPlace$.subscribe(() => {
      placedUnit.value = null;
    })
  );
}

onUnmounted(() => {
  subscription.unsubscribe();
});

function onClickRotate() {
  if (selectedUnit.value) {
    selectedUnit.value.rotateRight();
  }
}

function onClickPlacement() {
  if (selectedUnit.value) {
    $props.app.modules.placement?.startPlace(selectedUnit.value);
  }
}
</script>

<style lang="postcss" scoped>
.cw-app-playground {
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

  & .cw-messages {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
