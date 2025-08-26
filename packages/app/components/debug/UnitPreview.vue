<template>
  <div class="cw-debug-unit-preview">
    <cw-renderer
      ref="rendererEl"
      :debug="debugState"
      :modules="[DebugRendererModule]" />
    <cw-panel-controls
      :debug-options="debugState"
      :units="preparedUnits"
      @select-unit="onSelectUnit"
      @rotate-unit="onRotateUnit"
      @update:debug-options="onUpdateDebugOptions" />
    <cw-panel-unit-manager v-if="isUpload" @file="onFile" />
  </div>
</template>

<script lang="ts" setup>
import { computed, markRaw, nextTick, onMounted, onUnmounted, ref } from 'vue';
import CwRenderer from '../Renderer.vue';
import CwPanelControls from './panel/Controls.vue';
import CwPanelUnitManager from './panel/UnitManager.vue';
import { DoubleSide, Mesh, Object3D, Vector2, Vector3 } from 'three';
import { Subscription } from 'rxjs';
import type Renderer from '@cuby-world/app/lib/classes/Renderer';

import GroundTile from '@cuby-world/app/lib/classes/GroundTile';
import type Unit from '@cuby-world/app/lib/classes/Unit';

import AssetLoader from '@cuby-world/app/lib/classes/AssetLoader';
import units from './units';
import type { DebugState } from '@cuby-world/app/lib/classes/rendererModule/Debug';
import DebugRendererModule from '@cuby-world/app/lib/classes/rendererModule/Debug';
import { getGltfObjectFromFile } from '@cuby-world/app/utils/file';
import Custom from '@cuby-world/units/Custom';

let unitWrapper: Object3D;
let resizeObserver: ResizeObserver;
const subscription = new Subscription();
const dimension = ref<Vector2>();
const rendererEl = ref<InstanceType<typeof CwRenderer> | null>(null);

const assetLoader = new AssetLoader();
const currentUnit = ref<Unit>();
const debugState = ref<DebugState>({
  axes: false,
  gui: false
});

function onUpdateDebugOptions(options: DebugState) {
  debugState.value = options;
  const renderer = getRenderer();
  if (renderer && renderer.modules.debug) {
    console.log('update debug options', options);
    renderer.modules.debug.setOptions(options);
  }
}

const preparedUnits = ref(
  units.map(UnitClass => ({
    name: UnitClass.NAME,
    value: UnitClass.KEY,
    class: UnitClass
  }))
);

onMounted(() => {
  nextTick(async () => {
    setup();
    // await setUnit(new Cuby());
  });
});
onUnmounted(() => {
  resizeObserver.disconnect();
  subscription.unsubscribe();
});

// #region setup

function setup() {
  const { $el, renderer } = rendererEl.value!;

  if (!renderer) {
    throw new Error('Renderer not ready');
  }

  setupScene(renderer);
  const onResize = () => {
    dimension.value = new Vector2($el.offsetWidth, $el.offsetHeight);
    renderer!.resize(dimension.value);
  };
  resizeObserver = new ResizeObserver(onResize);

  resizeObserver.observe($el);
}

function setupScene(renderer: Renderer) {
  const scene = renderer.scene;

  // #region ground
  const groundTile = new GroundTile(new Vector3(0, 0, 0)).box;
  const groundMesh = new Mesh(groundTile.geometry, groundTile.material);
  groundMesh.material.side = DoubleSide;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);
  // #endregion

  unitWrapper = new Object3D();
  unitWrapper.position.set(0, 0, 0);
  scene.add(unitWrapper);

  subscription.add(
    renderer.animationLoop$.subscribe(time => {
      if (currentUnit.value) {
        currentUnit.value.update(time);
      }
    })
  );
}
// #endregion

const currentSelectedUnit = ref<string>('');
const isUpload = computed(() => currentSelectedUnit.value === 'custom');
function onSelectUnit(key: string) {
  currentSelectedUnit.value = key;
  if (key !== 'upload') {
    console.log('select unit', key);
    const UnitClass = preparedUnits.value.find(u => u.value === key)?.class;
    setUnit(UnitClass ? new UnitClass() : undefined);
  }
}

function onRotateUnit() {
  if (currentUnit.value) {
    currentUnit.value.rotateRight();
  }
}

async function setUnit(unit?: Unit) {
  const existingUnit = currentUnit.value;
  if (existingUnit) {
    unitWrapper.remove(existingUnit.root);
    existingUnit.destroy();
  }

  if (unit) {
    await unit.setup({
      unit,
      assetLoader
    });
    currentUnit.value = markRaw(unit);
    unitWrapper.add(unit.root);
  }
}

function getRenderer() {
  return rendererEl.value?.renderer;
}

let customObject: Object3D;
async function onFile(file: File | undefined) {
  if (file) {
    if (currentUnit.value instanceof Custom) {
      if (customObject) {
        customObject.removeFromParent();
      }
      customObject = await getGltfObjectFromFile(assetLoader, file);
      currentUnit.value.root.add(customObject);
    }
  }
}
</script>

<style lang="postcss" scoped>
.cw-debug-unit-preview {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > * {
    flex: 1;
  }

  & .cw-renderer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }

  & .cw-panel-controls {
    position: absolute;
    top: 1em;
    left: 1em;
  }

  & .cw-panel-unit-manager {
    position: absolute;
    bottom: 1em;
    left: 1em;
  }
}
</style>
