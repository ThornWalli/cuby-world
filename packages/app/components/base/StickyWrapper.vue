<template>
  <div
    class="base-sticky-wrapper"
    :style="{
      '--translate-x': translate?.x ?? 0,
      '--translate-y': translate?.y ?? 0
    }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type App from '../../lib/classes/App';
import { Subscription } from 'rxjs';
import {
  type Camera,
  Frustum,
  Matrix4,
  Vector2,
  Vector3,
  type Object3D
} from 'three';
import { onMounted, onUnmounted, ref } from 'vue';

const translate = ref<Vector2 | null>(null);
const $props = defineProps<{
  app: App;
  value: StickyWrapperValue;
}>();

const subscription = new Subscription();
onMounted(() => {
  subscription.add(
    $props.app.renderer.observables.animationLoop$.subscribe(() => {
      updateControls();
    })
  );
});

onUnmounted(() => {
  subscription.unsubscribe();
});

function updateControls() {
  const app = $props.app;
  let position;
  if ($props.value !== undefined) {
    if ($props.value instanceof Vector3) {
      position = $props.value as Vector3;
    } else {
      position = ($props.value as Object3D).position;
    }
  }
  if (position) {
    translate.value = getStickyTranslate(app.renderer.camera, position);
  } else {
    translate.value = null;
  }
}
</script>

<script lang="ts">
const frustum = new Frustum();
const matrix = new Matrix4();
export function getStickyTranslate(camera: Camera, position: Vector3) {
  frustum.setFromProjectionMatrix(
    matrix
      .clone()
      .multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
  );
  if (position && frustum.containsPoint(position)) {
    position = position.clone().project(camera);

    const screenX = ((position.x + 1) / 2) * window.innerWidth;
    const screenY = (-(position.y - 1) / 2) * window.innerHeight;

    return new Vector2(screenX, screenY);
  }

  return new Vector2();
}

export type StickyWrapperValue = Object3D | Vector3 | null | undefined;
</script>

<style lang="postcss" scoped>
.base-sticky-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transform: translate(100%, -125%)
    translate(
      calc(var(--translate-x, 0) * 1px),
      calc(var(--translate-y, 0) * 1px)
    );
}
</style>
