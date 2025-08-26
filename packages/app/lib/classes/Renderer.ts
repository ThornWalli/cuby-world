import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import { ReplaySubject } from 'rxjs';
import { Vector2, type Object3D, type Vector3 } from 'three';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  HemisphereLight,
  OrthographicCamera,
  PCFSoftShadowMap,
  Scene,
  WebGLRenderer
} from 'three';
import type IntersectionRendererModule from './rendererModule/Intersection';
import DebugRendererModule from './rendererModule/Debug';

export type RendererModuleList = (
  | typeof DebugRendererModule
  | typeof IntersectionRendererModule
)[];

interface RendererModules {
  debug?: DebugRendererModule;
  intersection?: IntersectionRendererModule;
}

interface Passes {
  renderPixelated: RenderPixelatedPass;
  outline: OutlinePass;
  output: OutputPass;
}

export default class Renderer<
  Modules extends RendererModules = RendererModules
> {
  renderer: WebGLRenderer;
  scene!: Scene;
  camera!: OrthographicCamera;
  controls!: OrbitControls;
  composer!: EffectComposer;
  animationLoop$ = new ReplaySubject<number>(0);
  dimension: Vector2;

  /**
   * @deprecated Wird die noch benötigt wenn pass eh weg soll?
   */
  pixelSize: number;

  modules: Modules;
  passes!: Passes;

  lights!: {
    ambient: AmbientLight;
    hemiLight: HemisphereLight;
    dirLight: DirectionalLight;
  };

  private _debug: boolean = false;
  get debug() {
    return this._debug;
  }

  get el() {
    return this.renderer.domElement;
  }

  constructor(
    canvas: HTMLCanvasElement,
    dimension: Vector2,
    options: {
      pixelSize?: number;
      controls?: boolean;
      debug?: boolean;
    } = {},
    modules: RendererModuleList = []
  ) {
    if (this.debug) {
      modules.push(DebugRendererModule);
    }

    this.dimension = dimension;
    this.pixelSize = options.pixelSize ?? 3;
    this._debug = options.debug ?? false;

    this.initScene();
    this.setOrthographicCamera();
    this.setupLights();

    const renderer = new WebGLRenderer({
      canvas,
      antialias: false
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer = renderer;

    // renderer.toneMapping = ACESFilmicToneMapping;

    this.initComposer();
    if (options.controls) {
      this.initControls();
    }

    // #region Modules
    const preparedModules = modules.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    Object.values(this.modules).forEach(module => module.setup());
    // #endregion

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(dimension.x, dimension.y);
    this.composer.setSize(dimension.x, dimension.y);

    renderer.setAnimationLoop(time => {
      this.animationLoop$.next(time);
      // this.renderer.render(this.scene, this.camera);
      this.composer.render(time);

      Object.values(this.modules)
        .filter(handler => 'update' in handler)
        .forEach(handler => {
          handler.update();
        });
    });
  }

  destroy() {
    this.animationLoop$.complete();
    Object.values(this.modules).forEach(handler => {
      handler.destroy();
    });
    this.renderer.dispose();
    this.composer.dispose();
    this.scene.clear();
  }

  resize(dimension: Vector2) {
    this.dimension = dimension;

    const camera = this.camera;
    if (camera instanceof OrthographicCamera) {
      camera.left = -this.cameraZoom * this.aspectRatio;
      camera.right = this.cameraZoom * this.aspectRatio;
      camera.top = this.cameraZoom;
      camera.bottom = -this.cameraZoom;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(dimension.x, dimension.y);

    this.controls?.update();
  }

  get aspectRatio() {
    return this.dimension.x / this.dimension.y;
  }

  // #region inits

  initScene(color: Color = new Color(0x333333)) {
    const scene = new Scene();
    scene.background = color;
    this.scene = scene;
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
  }

  initComposer() {
    const composer = new EffectComposer(this.renderer);
    this.composer = composer;

    const passes: Partial<Passes> = {};

    // const withRenderPixelatedPass = true;
    // if (withRenderPixelatedPass) {
    //   passes.renderPixelated = getRenderPixelPass(
    //     this.scene,
    //     this.camera,
    //     this.pixelSize
    //   );
    //   composer.addPass(passes.renderPixelated);
    // }

    const renderPass = new RenderPass(this.scene, this.camera);
    composer.addPass(renderPass);

    passes.outline = getOutlinePass(this.dimension, this.scene, this.camera);
    composer.addPass(passes.outline);

    passes.output = getOutputPass();
    composer.addPass(passes.output);

    // let renderPixelatedPass;
    // if (withRenderPixelatedPass) {
    //   // #region render pixelated pass
    //   passes.renderPixelated = renderPixelatedPass;
    //   // #endregion
    //   // #region output pass
    //   const outputPass = new OutputPass();
    //   passes.output = outputPass;
    //   composer.addPass(outputPass);
    //   // #endregion
    // }

    this.passes = passes as Passes;
  }

  get cameraZoom() {
    return 5 * (5 / 6);
  }

  setOrthographicCamera() {
    const camera = new OrthographicCamera(
      (this.cameraZoom * this.aspectRatio) / -2,
      (this.cameraZoom * this.aspectRatio) / 2,
      this.cameraZoom / 2,
      this.cameraZoom / -2,
      1,
      1000
    );

    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);
    this.camera = camera;
  }

  resetCamera() {
    this.camera.position.set(20, 20, 20);
    this.camera.lookAt(0, 0, 0);
    this.controls?.update();
  }

  updateCamera(position: Vector3) {
    if (position) {
      // Kamera bleibt relativ zu Cuby
      this.camera.position.set(
        position.x + 20, // Abstand rechts
        position.y + 20, // Höhe
        position.z + 20 // Abstand vorne
      );

      // Kamera schaut immer auf Cuby
      this.camera.lookAt(position);
    } else {
      this.camera.position.set(20, 20, 20);
      this.camera.lookAt(0, 0, 0);
    }
  }
  updateLight(position: Vector3) {
    const { dirLight } = this.lights;
    // Position relativ zum Spieler
    dirLight.position.set(position.x + 20, position.y + 30, position.z + 20);

    // Licht zeigt Richtung Spieler
    dirLight.target.position.copy(position);
    dirLight.target.updateMatrixWorld();
  }

  setupLights() {
    const lights = [];

    // Umgebungslicht (Grundhelligkeit, alle Flächen sichtbar)
    const ambient = new AmbientLight(0xffffff, 0.5);

    lights.push(ambient);

    // Himmelslicht (oben blau, unten leicht grau)
    const hemiLight = new HemisphereLight(0x87ceeb, 0x444444, 0.6);

    lights.push(hemiLight);

    // Hauptlicht (wirft Schatten)
    const dirLight = new DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;

    // Schattenqualität hochdrehen
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    lights.push(dirLight);

    this.scene.add(...lights);

    this.lights = { ambient, hemiLight, dirLight };
  }

  setSelectedObjects(objects: Array<Object3D>) {
    if (this.passes.outline) {
      this.passes.outline.selectedObjects = objects;
    }
  }
}

function getOutlinePass(
  dimension: Vector2,
  scene: Scene,
  camera: OrthographicCamera
) {
  // Erstelle den OutlinePass
  const outlinePass = new OutlinePass(
    new Vector2(dimension.x, dimension.y),
    scene,
    camera
  );
  outlinePass.edgeGlow = 0; // Leuchteffekt
  outlinePass.edgeThickness = 1; // Dicke der Kontur
  outlinePass.edgeStrength = 4; // Stärke des Effekts
  outlinePass.visibleEdgeColor.set(0xffffff); // Konturfarbe
  outlinePass.hiddenEdgeColor.set(0x000000); // Farbe für verdeckte Kanten

  return outlinePass;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRenderPixelPass(
  scene: Scene,
  camera: OrthographicCamera,
  pixelSize: number = 1
) {
  const renderPixelatedPass = new RenderPixelatedPass(pixelSize, scene, camera);
  renderPixelatedPass.normalEdgeStrength = 0;
  renderPixelatedPass.depthEdgeStrength = 2;
  return renderPixelatedPass;
}

function getOutputPass() {
  const outputPass = new OutputPass();
  return outputPass;
}
