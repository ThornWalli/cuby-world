import { DirectionalLight, OrthographicCamera, Scene, Vector3 } from 'three';

export function createPreviewCamera() {
  const cameraZoom = 1;
  const previewCamera = new OrthographicCamera(
    cameraZoom * -1,
    cameraZoom * 1,
    cameraZoom * 1,
    cameraZoom * -1,
    1,
    1000
  );

  previewCamera.position.set(20, 20, 20);
  previewCamera.lookAt(0, 0, 0);

  return previewCamera;
}

export function createPreviewScene() {
  const previewScene = new Scene();

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

  return previewScene;
}
