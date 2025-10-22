<template>
  <div
    ref="rootEl"
    class="cw-object-preview"
    :class="{ ready }"
    :style="{ '--width': currentWidth, '--ratio': ratio }">
    <div class="image">
      <img v-if="previewSrc" :src="previewSrc" />
      <canvas v-else ref="canvasEl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  type Mesh,
  type Object3D,
  type OrthographicCamera,
  type Scene,
  type WebGLRenderer,
  Vector2,
  Vector3
} from 'three';
import { onMounted, onUnmounted, ref } from 'vue';

import type App from '../lib/classes/App';
import {
  createCamera,
  createRenderer,
  createScene,
  setupGround,
  updateOrthoCameraForObject
} from '../utils/thumbs';
import type { ROTATION } from '../lib/types';
import { disposeObject3D } from '@cuby-world/app/lib/utils/object';
import { SKIN_DEFAULT_GROUND } from '@cuby-world/grounds';

const rootEl = ref<HTMLDivElement | null>(null);
const previewSrc = ref<string | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);

const dimension = ref<Vector2>(new Vector2(0, 0));
const currentWidth = ref<number>(0);

const $props = defineProps<{
  cacheKey?: string;
  mode?: 'static' | 'loop';
  app: App;
  width?: number | 'auto';
  ratio: number;
  direction?: ROTATION | `${ROTATION}`;
  root: Object3D;
  zoomRoot?: Object3D;
  hideGround?: boolean;
  groundScale?: number;
  hydrateWhenVisible?: boolean;
}>();

const ready = ref(false);
let renderer: WebGLRenderer;

if (imageCache.has($props.cacheKey + '_' + currentWidth.value)) {
  previewSrc.value =
    imageCache.get($props.cacheKey + '_' + currentWidth.value) ?? null;
  ready.value = true;
}

/**
 * Überprüfe Bild auf existierende Pixel
 */
async function hasImageData(value: string) {
  const { promise, resolve } = Promise.withResolvers();
  const img = new Image();
  img.onload = () => resolve(img);
  img.src = value;

  await promise;
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return false;
  }
  ctx.drawImage(img, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  for (let i = 3; i < imgData.length; i += 4) {
    if (imgData[i] !== 0) {
      return true;
    }
  }
  return false;
}

let tries = 0;
async function setup(retry = false) {
  if (ready.value) {
    return;
  }
  if (!retry) {
    const { promise, unregister: unreg } = register();
    unregister = unreg;
    await promise;
  }
  setupRenderer();
  window.setTimeout(async () => {
    await updatePreview($props.root, $props.groundScale ?? 1);

    const mode = $props.mode ?? 'static';
    if (mode === 'static') {
      window.setTimeout(async () => {
        await renderImage();
        ready.value = true;
        next();
      }, 50);
    }
  }, 0);
}

let unregister: CallableFunction;
onMounted(async () => {
  refreshDimension();
  if ($props.hydrateWhenVisible) {
    const intersectionObserver = new IntersectionObserver(
      async entries => {
        if (entries[0]?.isIntersecting) {
          await setup();
          intersectionObserver.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.1
      }
    );

    intersectionObserver.observe(rootEl.value!);
  } else {
    await setup();
  }
});

let aborted = false;
onUnmounted(() => {
  aborted = true;
  unregister?.();
});

function refreshDimension() {
  const width = $props.width ?? 'auto';
  if (typeof width === 'string' && width === 'auto') {
    currentWidth.value =
      canvasEl.value?.parentElement?.parentElement?.offsetWidth ?? 96;
  } else {
    currentWidth.value = width;
  }

  dimension.value.set(currentWidth.value, currentWidth.value * $props.ratio);
}

function setupRenderer() {
  if (!canvasEl.value) {
    console.error('Canvas-Element wurde nicht gefunden.');
    return;
  }

  renderer = createRenderer(canvasEl.value);

  renderer.setSize(currentWidth.value, currentWidth.value * $props.ratio, true);

  previewScene = createScene();
  previewCamera = createCamera();
  previewScene.add(previewCamera);

  renderer.setAnimationLoop(() => {
    renderer.render(previewScene, previewCamera);
  });
}

async function getDataUrl() {
  const src = renderer.domElement.toDataURL('image/png');
  if (await hasImageData(src)) {
    return src;
  } else {
    if (tries < 10 && !aborted) {
      tries++;
      console.log('Retry to render preview image', tries);
      return new Promise<string>(resolve => {
        window.setTimeout(async () => {
          getDataUrl().then(resolve);
        }, 1000);
      });
    } else {
      return '';
    }
  }
}

async function renderImage() {
  previewSrc.value = await getDataUrl();
  if ($props.cacheKey && previewSrc.value !== '') {
    imageCache.set(
      $props.cacheKey + '_' + currentWidth.value,
      previewSrc.value
    );
  }

  window.setTimeout(() => {
    renderer.dispose();
    previewScene.clear();

    const gl = renderer.getContext();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }, 0);
}

onUnmounted(() => {
  if (renderer) {
    renderer.dispose();
    previewScene.clear();
    previewScene.remove();

    if (previewMesh) {
      disposeObject3D(previewMesh);
      previewMesh.remove();
    }

    const gl = renderer.getContext();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
});

//#region preview mesh

let previewScene: Scene;
let previewCamera: OrthographicCamera;
let previewMesh: Object3D;
let ground: Mesh;

async function updatePreview(obj: Object3D, groundScale = 1) {
  if (previewMesh) {
    disposeObject3D(previewMesh);
    previewMesh.remove();
  } else if (!$props.hideGround) {
    ground = await setupGround(SKIN_DEFAULT_GROUND, $props.app.assetLoader, {
      scale: groundScale
    });
    ground.position.set(0, -1 / 2, 0);
    previewScene.add(ground);
  }

  if (obj) {
    previewMesh = obj.clone();
    previewScene.add(previewMesh);
    previewMesh.rotation.set(0, -Math.PI / 2, 0);
  }

  updateOrthoCameraForObject(
    previewCamera,
    dimension.value.x / dimension.value.y,
    previewScene,
    new Vector3(10, 10, 10)
  );
}

//#endregion
</script>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ObjectPreview {}

const imageCache = new Map<string, string>();
const test: CallableFunction[] = [];
let running = false;

const register = () => {
  const { promise, resolve } = Promise.withResolvers();

  let result = promise;
  if (running) {
    test.push(resolve);
  } else {
    result = Promise.resolve();
    running = true;
  }

  return {
    promise: result,
    unregister: () => test.splice(0, test.length)
  };
};

const next = () => {
  const resolve = test.shift();
  if (resolve) {
    resolve(true);
  } else {
    running = false;
  }
};
</script>

<style lang="postcss" scoped>
.cw-object-preview {
  --width: 96;
  --ratio: calc(6 / 4);

  opacity: 0;

  &:not(.ready) {
    & .image {
      width: calc(var(--width) * 1px);
    }
  }

  & canvas,
  & img {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }

  &.ready {
    opacity: 1;
    transition: opacity var(--cw-easing-duration-short) var(--cw-easing-in);
  }

  & .image {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;

    &::before {
      display: block;
      width: 100%;
      padding-top: calc(100% * var(--ratio));
      content: '';
    }
  }
}
</style>
