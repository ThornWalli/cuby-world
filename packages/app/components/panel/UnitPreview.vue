<template>
  <cw-panel class="cw-panel-unit-preview" :title="panelTitle">
    <div class="image">
      <canvas ref="canvasEl" />
    </div>

    <ul v-if="debugInfo?.length">
      <li v-for="[key, value] in debugInfo" :key="key">
        <span>{{ key }}:</span>
        <span>{{ value }}</span>
      </li>
    </ul>

    <div v-if="$slots.actions" class="actions">
      <slot name="actions"></slot>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import type { Mesh, OrthographicCamera, Scene } from 'three';
import { WebGLRenderer } from 'three';
import type Unit from '../../lib/classes/Unit';
import { computed, onMounted, ref, watch } from 'vue';
import { OBJECT_NAME } from '../../lib/classes/Unit';
import { Subscription } from 'rxjs';

import CwPanel from '../Panel.vue';
import {
  createPreviewCamera,
  createPreviewScene
} from '@cuby-world/app/utils/unitPreview';

const canvasEl = ref<HTMLCanvasElement | null>(null);

const $props = defineProps<{
  unit: Unit;
}>();

const debugInfo = ref();
const player = computed(() => $props.unit.modules.player.player);
const panelTitle = computed(
  () => player.value?.state.name || $props.unit.name || 'n/a'
);

function refresh(unit: Unit) {
  refreshDebugInfo(unit);
  updatePreview(unit.mesh);
  renderer.render(previewScene, previewCamera);
}

function refreshDebugInfo(unit: Unit) {
  const position = unit.getPosition();
  const rotation = unit.rotation;
  const size = unit.size;

  const info = {
    Pos: `${position.x}x${position.y}x${position.z}`,
    Rot: `${rotation}`,
    Size: `${size.x}x${size.y}`
  };
  debugInfo.value = Object.entries(info);
}

let previewScene: Scene;
let previewCamera: OrthographicCamera;
let previewMesh: Mesh;

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

  previewScene = createPreviewScene();
  previewCamera = createPreviewCamera();

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
      refresh(unit);
    })
  );
  unitSubscriptions.add(
    unit.rotate$.subscribe(() => {
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

  & .actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
  }
}
</style>
