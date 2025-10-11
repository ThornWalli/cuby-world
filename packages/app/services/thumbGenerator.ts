import type {
  Mesh,
  Object3D,
  OrthographicCamera,
  Scene,
  WebGLRenderer
} from 'three';
import { Vector3 } from 'three';
import {
  createCamera,
  createRenderer,
  createScene,
  setupGround,
  updateOrthoCameraForObject
} from '../utils/thumbs';
import assetLoader from './assetLoader';

const thumbQueue: {
  ratio: number;
  width: number;
  object: Object3D;
  resolve: (value: string) => void;
}[] = [];

async function processQueue() {
  if (thumbQueue.length === 0) return;
  const { ratio, width, object, resolve } = thumbQueue.shift()!;

  resolve(await renderToDataURL(object, width, width * ratio));
  processQueue();
}

async function getThumb(object: Object3D, ratio = 1, width = 96) {
  const { promise, resolve } = Promise.withResolvers<string>();

  thumbQueue.push({ ratio, width, object, resolve });
  processQueue();
  return promise;
}

//#endregion
export { getThumb };

let canvas: OffscreenCanvas,
  renderer: WebGLRenderer,
  previewScene: Scene,
  previewCamera: OrthographicCamera;

function setup() {
  canvas = new OffscreenCanvas(128, 128);
  renderer = createRenderer(canvas);
  previewScene = createScene();
  previewCamera = createCamera();
  previewScene.add(previewCamera);
}

//#region preview mesh

let previewMesh: Object3D;
let ground: Mesh;

async function updatePreview(obj: Object3D) {
  if (previewMesh) {
    previewScene.remove(previewMesh);
  } else {
    ground = await setupGround({
      assetLoader: assetLoader
    });
    ground.position.set(0, -1 / 2, 0);
    previewScene.add(ground);
  }

  if (obj) {
    previewMesh = obj.clone();
    previewScene.add(previewMesh);
    previewMesh.rotation.set(0, -Math.PI / 2, 0);
  }
}

async function renderToDataURL(
  object: Object3D,
  width: number,
  height: number
) {
  if (!renderer) {
    setup();
  } else {
    renderer.setSize(width, height);
  }

  if (previewMesh) {
    previewScene.remove(previewMesh);
  }

  await updatePreview(object);
  previewScene.add(previewMesh);

  updateOrthoCameraForObject(
    previewCamera,
    width / height,
    previewScene,
    new Vector3(10, 10, 10)
  );

  renderer.render(previewScene, previewCamera);
  await new Promise(resolve => requestAnimationFrame(resolve));
  return canvas.convertToBlob({ type: 'image/png' }).then(blob => {
    return URL.createObjectURL(blob);
  });
}
