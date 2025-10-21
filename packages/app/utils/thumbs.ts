import type { Object3D } from 'three';
import {
  ACESFilmicToneMapping,
  Box3,
  DirectionalLight,
  DoubleSide,
  Mesh,
  OrthographicCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer
} from 'three';
import type AssetLoader from '../lib/classes/AssetLoader';
import { loadGroundGeometries } from '../lib/utils/ground';
import Ground from '../lib/classes/Ground';
import {
  default_mesh as groundGlb,
  groundTextureMap,
  skins
} from '@cuby-world/grounds';
import type { GroundSkinIdentifier } from '../lib/types/ground/skins';

export async function setupGround(
  skinId: GroundSkinIdentifier,
  assetLoader: AssetLoader,
  { scale }: { scale?: number }
) {
  const geometryMap = await loadGroundGeometries(assetLoader, groundGlb);

  const { color, opacity, texture } = skins.get(skinId)?.skin || {};
  const groundTile = new Ground({
    position: new Vector3(0, 0, 0),
    color,
    opacity,
    texture
  });
  const geometry = groundTile.createGeometry(geometryMap);
  geometry.scale(scale ?? 1, 1, scale ?? 1);
  const material = await groundTile.createMaterial({
    assetLoader,
    textureMap: groundTextureMap
  });
  const groundMesh = new Mesh(geometry, material);
  groundMesh.material.side = DoubleSide;
  groundMesh.receiveShadow = true;
  groundMesh.material.side = DoubleSide;

  return groundMesh;
}

export function createRenderer(canvas: HTMLCanvasElement | OffscreenCanvas) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    preserveDrawingBuffer: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  // const dimension = new Vector2(canvas.width, canvas.height);
  // if (canvas) {
  //   renderer.setSize(dimension.x, dimension.y);
  // }

  return renderer;
}

export function createPreviewCamera(canvas: HTMLCanvasElement, unitPx = 100) {
  const widthPx = canvas.clientWidth;
  const heightPx = canvas.clientHeight;
  const aspect = widthPx / heightPx;

  // gewünschte Höhe in Units (z. B. 1 Unit = 100px)
  const worldHeight = heightPx / unitPx;
  const worldWidth = worldHeight * aspect; // <-- aspect korrekt anwenden

  const camera = new OrthographicCamera(
    -worldWidth / 2,
    worldWidth / 2,
    worldHeight / 2,
    -worldHeight / 2,
    1,
    1000
  );

  camera.position.set(4, 4, 4);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  return camera;
}

interface CameraSetupOptions {
  fill: 'width' | 'height'; // Welche Dimension füllen
}

export function createFitCamera(
  canvas: HTMLCanvasElement,
  options: CameraSetupOptions = { fill: 'width' }
) {
  const widthPx = canvas.clientWidth;
  const heightPx = canvas.clientHeight;
  const aspect = widthPx / heightPx;

  let worldWidth: number;
  let worldHeight: number;

  if (options.fill === 'width') {
    worldWidth = 1; // 1 Unit = gesamte Breite
    worldHeight = worldWidth / aspect;
  } else {
    worldHeight = 1; // 1 Unit = gesamte Höhe
    worldWidth = worldHeight * aspect;
  }

  const camera = new OrthographicCamera(
    -worldWidth / 2,
    worldWidth / 2,
    worldHeight / 2,
    -worldHeight / 2,
    0.1,
    1000
  );

  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  return { camera, worldWidth, worldHeight };
}

export function createCamera() {
  return new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
}

// export function updateOrthoCameraForObject(
//   camera: OrthographicCamera,
//   canvas: HTMLCanvasElement,
//   object: Object3D,
//   cameraPosition: Vector3
// ) {
//   const aspect = canvas.clientWidth / canvas.clientHeight;

//   camera.position.copy(cameraPosition);
//   camera.lookAt(0, 0, 0);
//   camera.updateMatrixWorld();
//   camera.updateProjectionMatrix();

//   // Bounding Box des Objekts
//   const box = new Box3().setFromObject(object);
//   const points = [
//     new Vector3(box.min.x, box.min.y, box.min.z),
//     new Vector3(box.min.x, box.min.y, box.max.z),
//     new Vector3(box.min.x, box.max.y, box.min.z),
//     new Vector3(box.min.x, box.max.y, box.max.z),
//     new Vector3(box.max.x, box.min.y, box.min.z),
//     new Vector3(box.max.x, box.min.y, box.max.z),
//     new Vector3(box.max.x, box.max.y, box.min.z),
//     new Vector3(box.max.x, box.max.y, box.max.z)
//   ];
//   // Punkte in Kameraraum transformieren
//   const camMatrix = camera.matrixWorld.clone().invert();
//   const pointsCamSpace = points.map(p => p.clone().applyMatrix4(camMatrix));

//   // Min/Max in Kameraraum finden
//   let minX = Infinity,
//     maxX = -Infinity;
//   let minY = Infinity,
//     maxY = -Infinity;

//   pointsCamSpace.forEach(p => {
//     minX = Math.min(minX, p.x);
//     maxX = Math.max(maxX, p.x);
//     minY = Math.min(minY, p.y);
//     maxY = Math.max(maxY, p.y);
//   });

//   let worldWidth = maxX - minX;
//   let worldHeight = maxY - minY;

//   // Anpassung an das Canvas-Seitenverhältnis
//   if (worldWidth / worldHeight > aspect) {
//     worldHeight = worldWidth / aspect;
//   } else {
//     worldWidth = worldHeight * aspect;
//   }

//   // Orthographic Camera korrekt setzen
//   camera.left = -worldWidth / 2;
//   camera.right = worldWidth / 2;
//   camera.top = worldHeight / 2;
//   camera.bottom = -worldHeight / 2;

//   camera.updateProjectionMatrix();
// }
export function updateOrthoCameraForObject_(
  camera: OrthographicCamera,
  canvas: HTMLCanvasElement,
  object: Object3D,
  cameraPosition: Vector3
) {
  const aspect = canvas.clientWidth / canvas.clientHeight;

  camera.position.copy(cameraPosition);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  camera.updateProjectionMatrix();

  // Bounding Box des Objekts
  const box = new Box3().setFromObject(object);
  const points = [
    new Vector3(box.min.x, box.min.y, box.min.z),
    new Vector3(box.min.x, box.min.y, box.max.z),
    new Vector3(box.min.x, box.max.y, box.min.z),
    new Vector3(box.min.x, box.max.y, box.max.z),
    new Vector3(box.max.x, box.min.y, box.min.z),
    new Vector3(box.max.x, box.min.y, box.max.z),
    new Vector3(box.max.x, box.max.y, box.min.z),
    new Vector3(box.max.x, box.max.y, box.max.z)
  ];

  // Punkte in Kameraraum transformieren
  const camMatrix = camera.matrixWorld.clone().invert();
  const pointsCamSpace = points.map(p => p.clone().applyMatrix4(camMatrix));

  // Min/Max in Kameraraum finden
  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  pointsCamSpace.forEach(p => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  });

  const objWidth = maxX - minX;
  const objHeight = maxY - minY;

  // Frustum anhand des Canvas-Seitenverhältnisses berechnen
  let worldWidth = objWidth;
  let worldHeight = objHeight;

  if (worldWidth / worldHeight > aspect) {
    worldHeight = worldWidth / aspect;
  } else {
    worldWidth = worldHeight * aspect;
  }

  // Objekt am unteren Rand ausrichten
  camera.left = -worldWidth / 2;
  camera.right = worldWidth / 2;
  camera.bottom = minY; // Objekt-Unterkante genau unten
  camera.top = minY + worldHeight; // Höhe basierend auf Frustum

  camera.updateProjectionMatrix();
}
export function updateOrthoCameraForObject(
  camera: OrthographicCamera,
  aspect: number,
  object: Object3D,
  cameraPosition: Vector3
) {
  camera.position.copy(cameraPosition);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  camera.updateProjectionMatrix();

  // Bounding Box des Objekts
  const box = new Box3().setFromObject(object);
  const points = [
    new Vector3(box.min.x, box.min.y, box.min.z),
    new Vector3(box.min.x, box.min.y, box.max.z),
    new Vector3(box.min.x, box.max.y, box.min.z),
    new Vector3(box.min.x, box.max.y, box.max.z),
    new Vector3(box.max.x, box.min.y, box.min.z),
    new Vector3(box.max.x, box.min.y, box.max.z),
    new Vector3(box.max.x, box.max.y, box.min.z),
    new Vector3(box.max.x, box.max.y, box.max.z)
  ];

  // Punkte in Kameraraum transformieren
  const camMatrix = camera.matrixWorld.clone().invert();
  const pointsCamSpace = points.map(p => p.clone().applyMatrix4(camMatrix));

  // Min/Max in Kameraraum finden
  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  pointsCamSpace.forEach(p => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  });

  const objWidth = maxX - minX;
  const objHeight = maxY - minY;

  // Frustum anhand des Canvas-Seitenverhältnisses berechnen
  let worldWidth = objWidth;
  let worldHeight = objHeight;

  if (worldWidth / worldHeight > aspect) {
    worldHeight = worldWidth / aspect;
  } else {
    worldWidth = worldHeight * aspect;
  }

  // Objekt am unteren Rand ausrichten
  camera.left = -worldWidth / 2;
  camera.right = worldWidth / 2;
  camera.bottom = minY; // Objekt-Unterkante genau unten
  camera.top = minY + worldHeight; // Höhe basierend auf Frustum

  camera.updateProjectionMatrix();
}

export function createScene() {
  const scene = new Scene();

  const lightPosition = new Vector3(10, 5, 15);
  const zoom = 1;

  //#region light

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

  scene.add(light);

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
  scene.add(light);

  //#endregion

  return scene;
}
