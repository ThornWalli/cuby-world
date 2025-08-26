<template>
  <cw-panel class="cw-panel-unit-preview" :title="unit.name">
    <div class="image">
      <canvas ref="canvasEl" />
    </div>

    <ul v-if="debugInfo?.length">
      <li v-for="[key, value] in debugInfo" :key="key">
        <span>{{ key }}:</span>
        <span>{{ value }}</span>
      </li>
    </ul>

    <div v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import type { Mesh } from 'three';
import {
  DirectionalLight,
  OrthographicCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three';
import type Unit from '../../lib/classes/Unit';
import { onMounted, ref, watch } from 'vue';
import { OBJECT_NAME } from '../../lib/classes/Unit';
import { Subscription } from 'rxjs';

import CwPanel from '../Panel.vue';

const canvasEl = ref<HTMLCanvasElement | null>(null);

const $props = defineProps<{
  unit: Unit;
}>();

const debugInfo = ref();

function refresh(unit: Unit) {
  refreshDebugInfo(unit);
  updatePreview(unit.mesh);
  renderer.render(previewScene, previewCamera);
}

function refreshDebugInfo(unit: Unit) {
  const position = unit.getRootPosition();
  const rotation = unit.getRootRotation();

  const info = {
    Pos: `${position.x.toFixed(2)}x${position.y.toFixed(2)}x${position.z.toFixed(2)}`,
    Rot: `${rotation.x.toFixed(2)}x${rotation.y.toFixed(2)}`,
    URot: `${$props.unit.rotation}`
  };
  debugInfo.value = Object.entries(info);
}

let previewScene: Scene;
let previewCamera: OrthographicCamera;
let previewMesh: Mesh;
function createPreviewScene() {
  previewScene = new Scene();

  const cameraZoom = 1;
  previewCamera = new OrthographicCamera(
    cameraZoom * -1,
    cameraZoom * 1,
    cameraZoom * 1,
    cameraZoom * -1,
    1,
    1000
  );

  previewCamera.position.set(20, 20, 20);
  previewCamera.lookAt(0, 0, 0);

  const lightPosition = new Vector3(10, 5, 15);
  const zoom = 1;

  // #region light

  let light;
  light = new DirectionalLight(0xffffff, 3);
  light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
  light.shadow.mapSize.width = 128;
  light.shadow.mapSize.height = 128;
  light.shadow.camera.left = -zoom;
  light.shadow.camera.right = zoom;
  light.shadow.camera.top = zoom;
  light.shadow.camera.bottom = -zoom;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 50;
  light.shadow.camera.updateProjectionMatrix();

  previewScene.add(light);

  light = new DirectionalLight(0xffffff, 0.6);
  light.position.set(0, 3, 0);
  light.castShadow = true;
  light.shadow.mapSize.width = 128;
  light.shadow.mapSize.height = 128;

  light.shadow.camera.left = -zoom;
  light.shadow.camera.right = zoom;
  light.shadow.camera.top = zoom;
  light.shadow.camera.bottom = -zoom;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 50;
  light.shadow.camera.updateProjectionMatrix();
  previewScene.add(light);

  // #endregion
}

function updatePreview(mesh: Mesh) {
  if (previewMesh) {
    previewScene.remove(previewMesh);
    console.log(previewMesh, previewMesh.geometry, previewMesh.material);
    previewMesh.geometry.dispose();
    const materials = [];
    if (Array.isArray(previewMesh.material)) {
      materials.push(...previewMesh.material);
    } else {
      materials.push(previewMesh.material);
    }
    materials.forEach(material => material.dispose());
  }

  if (mesh) {
    previewMesh = mesh.clone();

    const meshOutline = previewMesh.getObjectByName(OBJECT_NAME.MESH_OUTLINE);
    if (meshOutline) {
      meshOutline.visible = false;
    }

    previewScene.add(previewMesh);

    previewMesh.position.set(0, 0, 0);
    previewMesh.rotation.set(0, -Math.PI / 2, 0);
  }
}

const ready = ref(false);
let renderer: WebGLRenderer;
function setup() {
  if (!canvasEl.value) {
    console.error('Canvas-Element wurde nicht gefunden.');
    return;
  }
  createPreviewScene();

  renderer = new WebGLRenderer({ canvas: canvasEl.value, alpha: true });
  const canvas = canvasEl.value;
  if (canvas) {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  }
  ready.value = true;
}

onMounted(() => {
  setup();
  registerUnit($props.unit);
});
function registerUnit(unit: Unit) {
  unitSubscriptions?.unsubscribe();
  unitSubscriptions = new Subscription();
  unitSubscriptions.add(
    unit.materialReady$.subscribe(() => {
      console.log('Unit ready', unit);
      refresh(unit);
    })
  );
  unitSubscriptions.add(
    unit.rotate$.subscribe(rotation => {
      console.log('Unit rotation', rotation);
      refreshDebugInfo(unit);
    })
  );
}

let unitSubscriptions: Subscription;
watch(
  () => $props.unit,
  () => {
    registerUnit($props.unit);
  }
);
</script>

<style lang="postcss" scoped>
.cw-panel-unit-preview {
  & li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  & canvas {
    width: 128px;
    height: 128px;
  }

  & .image {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
