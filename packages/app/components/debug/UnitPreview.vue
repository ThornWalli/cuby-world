<template>
  <div class="cw-debug-unit-preview">
    <cw-renderer
      ref="rendererEl"
      :debug="{
        axes: options.axes,
        gui: false
      }"
      :modules="[DebugRendererModule]" />
    <cw-panel-group position="top-left">
      <cw-panel-controls
        :model-value="options"
        :units="preparedUnits"
        @select-unit="onSelectUnit"
        @rotate-unit="onRotateUnit"
        @update:model-value="onUpdateModelValueControls" />
    </cw-panel-group>
    <cw-panel-group position="bottom-left">
      <cw-panel-unit-manager v-if="isUpload" @file="onFile" />
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
  watch
} from 'vue';
import CwRenderer from '../Renderer.vue';
import CwPanelControls from './panel/Controls.vue';
import CwPanelUnitManager from './panel/UnitManager.vue';
import CwPanelGroup from '../PanelGroup.vue';
import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Vector2,
  Vector3
} from 'three';
import { fromEvent, Subscription } from 'rxjs';
import { useRouter } from '#imports';
import type Renderer from '../../lib/classes/Renderer';

import GroundTile from '../../lib/classes/GroundTile';
import type Unit from '../../lib/classes/Unit';

import AssetLoader from '../../lib/classes/AssetLoader';
import units from './units';

import DebugRendererModule from '../../lib/classes/rendererModule/Debug';
import { getGltfObjectFromFile } from '../../utils/file';
import Custom from '@cuby-world/units/Custom';
import { UNIT_ROTATION } from '@cuby-world/app/lib/types/unit';

let unitWrapper: Object3D;
const subscription = new Subscription();
const dimension = ref<Vector2>();
const rendererEl = ref<InstanceType<typeof CwRenderer> | null>(null);

const assetLoader = new AssetLoader();
const currentUnit = ref<Unit>();
const currentRotation = ref<UNIT_ROTATION>(UNIT_ROTATION.SOUTH);
const $router = useRouter();

const options = ref<Options>({
  unit: String($router.currentRoute.value.query.unit || ''),
  rotation: String(
    $router.currentRoute.value.query.rotation || UNIT_ROTATION.SOUTH
  ) as UNIT_ROTATION,
  axes: $router.currentRoute.value.query.axes === 'true',
  ghost: $router.currentRoute.value.query.ghost === 'true'
});

watch(
  () => options.value,
  options => {
    $router.replace({
      query: {
        unit: options.unit || undefined,
        rotation: options.rotation || undefined,
        axes: String(options.axes || ''),
        ghost: String(options.ghost || '')
      }
    });
  },
  {
    deep: true
  }
);
watch(
  () => options.value.ghost,
  ghost => {
    if (ghostWrapper) {
      ghostWrapper.visible = ghost ?? false;
    }
  }
);
watch(
  () => options.value.rotation,
  rotation => {
    onRotateUnit(rotation);
  }
);
watch(
  () => options.value.unit,
  unit => {
    onSelectUnit(unit);
  }
);

function onUpdateModelValueControls(opts: Options) {
  options.value = opts;
  const renderer = getRenderer();
  if (renderer && renderer.modules.debug) {
    renderer.modules.debug.setOptions({
      axes: options.value.axes
    });
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
    if (options.value.unit) {
      onSelectUnit(options.value.unit);
    }
    // await setUnit(new Cuby());
  });
});
onUnmounted(() => {
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

  subscription.add(fromEvent(window, 'resize').subscribe(onResize));
  onResize();
}

let ghostWrapper: Object3D;
async function setupScene(renderer: Renderer) {
  const scene = renderer.scene;

  // #region ground
  const groundTile = new GroundTile(new Vector3(0, 0, 0)).box;
  const groundMesh = new Mesh(groundTile.geometry, groundTile.material);
  groundMesh.material.side = DoubleSide;
  groundMesh.receiveShadow = true;
  groundMesh.material.side = DoubleSide;
  scene.add(groundMesh);
  // #endregion

  unitWrapper = new Object3D();
  unitWrapper.position.set(0, 0, 0);
  scene.add(unitWrapper);

  // #region ghost

  ghostWrapper = new Object3D();
  ghostWrapper.visible = options.value.ghost ?? false;
  ghostWrapper.position.set(0, 0, 0);
  scene.add(ghostWrapper);

  const ratio = 19 / 20;
  const size = 0.6;
  const ghostGeometry = new BoxGeometry(size * 1, size * ratio, size * 1);
  const ghostMaterial = new MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
  });
  const ghostMesh = new Mesh(ghostGeometry, ghostMaterial);
  ghostMesh.position.set(0, (size * ratio) / 2 + 0.2, 0);

  ghostWrapper.add(ghostMesh);
  // #endregion

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

function onRotateUnit(rotation: UNIT_ROTATION) {
  currentRotation.value = rotation;
  if (currentUnit.value) {
    currentUnit.value.setRotation(rotation);
  }
}

async function setUnit(unit?: Unit) {
  const existingUnit = currentUnit.value;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).unit = unit;

  if (existingUnit) {
    unitWrapper.remove(existingUnit.root);
    existingUnit.destroy();
  }

  if (unit) {
    await unit.setup({
      unit,
      assetLoader
    });

    unit.setRotation(currentRotation.value);
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

<script lang="ts">
export interface Options {
  unit: string;
  rotation: UNIT_ROTATION;
  axes?: boolean;
  ghost?: boolean;
  ground?: boolean;
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
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>
