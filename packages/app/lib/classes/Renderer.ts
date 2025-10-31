import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import type { Observable } from 'rxjs';
import { fromEvent, ReplaySubject } from 'rxjs';
import {
  type AmbientLight,
  type DirectionalLight,
  type HemisphereLight,
  ACESFilmicToneMapping,
  Clock,
  SRGBColorSpace,
  Vector3,
  type Object3D
} from 'three';

import {
  Vector2,
  Color,
  OrthographicCamera,
  PCFSoftShadowMap,
  Scene,
  WebGLRenderer
} from 'three';
import IntersectionRendererModule from './rendererModule/Intersection';
import DebugRendererModule from './rendererModule/Debug';

export type RendererModuleList = (
  | typeof DebugRendererModule
  | typeof IntersectionRendererModule
)[];

interface RendererModules {
  debug: DebugRendererModule;
  intersection: IntersectionRendererModule;
}

interface Passes {
  renderPixelated: RenderPixelatedPass;
  defaultOutline: OutlinePass;
  errorOutline: OutlinePass;
  addOutline: OutlinePass;
  removeOutline: OutlinePass;
  output: OutputPass;
}

export type AnimationLoopValue = {
  time: number;
  delta: number;
};
export type AnimationLoopSubject = ReplaySubject<AnimationLoopValue>;

export default class Renderer<
  Modules extends RendererModules = RendererModules
> {
  observables: {
    animationLoop$: AnimationLoopSubject;
    pointerDown$: Observable<PointerEvent>;
    pointerMove$: Observable<PointerEvent>;
    pointerUp$: Observable<PointerEvent>;
  } = {
    animationLoop$: new ReplaySubject<{
      time: number;
      delta: number;
    }>(0),
    pointerDown$: undefined!,
    pointerMove$: undefined!,
    pointerUp$: undefined!
  };

  clock = new Clock();
  renderer: WebGLRenderer;
  scene!: Scene;
  camera!: OrthographicCamera;
  controls!: OrbitControls;
  composer!: EffectComposer;
  dimension: Vector2;

  pixelated: boolean;

  modules: Modules;
  private passes!: Passes;

  lights!: {
    ambient: AmbientLight;
    hemiLight: HemisphereLight;
    dirLight: DirectionalLight;
  };

  private _debug: boolean;
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
      pixelated?: boolean;
      controls?: boolean;
      debug?: boolean;
    } = {},
    modules: RendererModuleList = []
  ) {
    modules.push(IntersectionRendererModule);

    if (this.debug) {
      modules.push(DebugRendererModule);
    }

    this.observables.pointerDown$ = fromEvent<PointerEvent>(
      canvas,
      'pointerdown'
    );
    this.observables.pointerMove$ = fromEvent<PointerEvent>(
      canvas,
      'pointermove'
    );
    this.observables.pointerUp$ = fromEvent<PointerEvent>(canvas, 'pointerup');

    this.dimension = dimension;
    this._debug = options.debug ?? false;

    this.initScene();
    this.setOrthographicCamera();
    // this.setupLights();

    this.pixelated = options.pixelated ?? false;
    const renderer = new WebGLRenderer({
      canvas,
      antialias: options.pixelated ? false : true
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap; // oder PCFShadowMap
    renderer.shadowMap.autoUpdate = true;
    this.renderer = renderer;

    // renderer.toneMapping = ACESFilmicToneMapping;

    this.initComposer();
    if (options.controls) {
      this.initControls();
    }

    //#region Modules
    const preparedModules = modules.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    Object.values(this.modules).forEach(module => module.setup());
    //#endregion

    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(dimension.x, dimension.y);
    this.composer.setSize(dimension.x, dimension.y);

    let lastTime = 0;
    renderer.setAnimationLoop(time => {
      const delta = time - lastTime; // <-- Nur Differenz!
      lastTime = time;
      this.observables.animationLoop$.next({
        time,
        delta: this.clock.getDelta()
      });
      // this.renderer.render(this.scene, this.camera);
      this.composer.render(time);

      Object.values(this.modules)
        .filter(handler => 'update' in handler)
        .forEach(handler => {
          handler.update({
            time,
            delta
          });
        });
    });
  }

  destroy() {
    this.observables.animationLoop$.complete();
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

  enableControls() {
    this.controls.enabled = true;
  }
  disableControls() {
    this.controls.enabled = false;
  }

  get aspectRatio() {
    return this.dimension.x / this.dimension.y;
  }

  //#region inits

  initScene(color: Color = new Color(0x333333)) {
    const scene = new Scene();
    scene.background = color;
    this.scene = scene;
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // this.setCameraClamp(true);

    // this.controls.enableDamping = true;
    // this.controls.dampingFactor = 0.1;controls.enableDamping = true;
    this.controls.dampingFactor = 0.05; // kleiner Wert = smoother
    this.controls.zoomSpeed = 1.0;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 1.0;

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

    passes.defaultOutline = getOutlinePass(0xffffff, {
      dimension: this.dimension,
      scene: this.scene,
      camera: this.camera
    });
    composer.addPass(passes.defaultOutline);
    passes.errorOutline = getOutlinePass(0xff0000, {
      dimension: this.dimension,
      scene: this.scene,
      camera: this.camera
    });
    composer.addPass(passes.errorOutline);
    passes.addOutline = getOutlinePass(0x00ff00, {
      dimension: this.dimension,
      scene: this.scene,
      camera: this.camera
    });
    composer.addPass(passes.addOutline);
    passes.removeOutline = getOutlinePass(0xff0000, {
      dimension: this.dimension,
      scene: this.scene,
      camera: this.camera
    });
    composer.addPass(passes.removeOutline);

    passes.output = getOutputPass();
    composer.addPass(passes.output);

    // let renderPixelatedPass;
    // if (withRenderPixelatedPass) {
    //   //#region render pixelated pass
    //   passes.renderPixelated = renderPixelatedPass;
    //   //#endregion
    //   //#region output pass
    //   const outputPass = new OutputPass();
    //   passes.output = outputPass;
    //   composer.addPass(outputPass);
    //   //#endregion
    // }

    this.passes = passes as Passes;
  }

  get cameraZoom() {
    // return 1 * 48 * (512 / window.innerWidth);
    return 8 * (5 / 6);
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

    this.camera = camera;
    this.updateCamera();
  }

  resetCamera() {
    this.updateCamera();
  }

  static ISOMETRIC_OFFSET = new Vector3(20, 20, 20);
  static ISOMETRIC_DIRECTION = new Vector3(1, 1, 1).normalize();
  static ISOMETRIC_DISTANCE = 35; // Abstand Kamera vom Target

  updateCamera(position?: Vector3) {
    console.log('update camera', position);
    this.camera.zoom = 1;
    if (position) {
      // Kamera bleibt im gleichen Winkel, nur verschoben
      const newCameraPosition = new Vector3()
        .copy(Renderer.ISOMETRIC_DIRECTION)
        .multiplyScalar(Renderer.ISOMETRIC_DISTANCE)
        .add(position);

      this.camera.position.copy(newCameraPosition);
      this.camera.lookAt(position);
    } else {
      const defaultPosition = new Vector3()
        .copy(Renderer.ISOMETRIC_DIRECTION)
        .multiplyScalar(Renderer.ISOMETRIC_DISTANCE);

      this.camera.position.copy(defaultPosition);
      this.camera.lookAt(0, 0, 0);
    }
  }

  setCameraClamp(value: boolean) {
    if (value) {
      this.controls.enableRotate = false; // Kein Drehen
      this.controls.enablePan = true; // Nur bewegen
      this.controls.enableZoom = true; // Zoom mit Mausrad
    } else {
      this.controls.enableRotate = true; // Kein Drehen
      this.controls.enablePan = true; // Nur bewegen
      this.controls.enableZoom = true; // Zoom mit Mausrad
    }
  }

  // updateCamera(position: Vector3) {
  //   if (position) {
  //     this.controls.target.copy(position);

  //     const newCameraPosition = new Vector3()
  //       .copy(position)
  //       .add(Renderer.ISOMETRIC_OFFSET);

  //     this.camera.position.copy(newCameraPosition);
  //     this.controls.update();
  //   } else {
  //     this.camera.position.copy(Renderer.ISOMETRIC_OFFSET);
  //     this.camera.lookAt(0, 0, 0);
  //   }
  // }
  // updateLight(position: Vector3) {
  //   const { dirLight } = this.lights;
  //   // Position relativ zum Spieler
  //   dirLight.position.set(position.x + 30, position.y + 30, position.z + 30);

  //   // Licht zeigt Richtung Spieler
  //   dirLight.target.position.copy(position);
  //   dirLight.target.updateMatrixWorld();
  // }

  // setupLights() {
  //   const lights = [];

  //   const ambient = new AmbientLight(0xffffff, 0.5);
  //   lights.push(ambient);

  //   const hemiLight = new HemisphereLight(0x87ceeb, 0x444444, 0.6);
  //   lights.push(hemiLight);

  //   const dirLight = new DirectionalLight(0xffffff, 1.5);
  //   dirLight.position.set(80, 100, 80);
  //   dirLight.castShadow = true;

  //   dirLight.shadow.mapSize.set(2048, 2048);

  //   // Bias gegen Streifen
  //   dirLight.shadow.bias = -0.001;
  //   dirLight.shadow.normalBias = 0.05;

  //   // Schattencam begrenzen
  //   const size = 25;
  //   dirLight.shadow.camera.left = -size;
  //   dirLight.shadow.camera.right = size;
  //   dirLight.shadow.camera.top = size;
  //   dirLight.shadow.camera.bottom = -size;
  //   dirLight.shadow.camera.near = 0.5;
  //   dirLight.shadow.camera.far = 200;

  //   lights.push(dirLight);

  //   this.scene.add(...lights);
  //   this.lights = { ambient, hemiLight, dirLight };
  // }

  registerOutlineObject(
    object: Object3D,
    type: OUTLINE_TYPE = OUTLINE_TYPE.DEFAULT
  ) {
    const selectedObjects = this.getOutlineObjects(type);
    if (selectedObjects) {
      if (!selectedObjects.includes(object)) {
        this.unregisterAllOutlinesObject(object);
        console.log('register outline object', object);
        selectedObjects.push(object);
      }
    }
  }

  unregisterOutlineObject(
    object: Object3D,
    type: OUTLINE_TYPE = OUTLINE_TYPE.DEFAULT
  ) {
    const selectedObjects = this.getOutlineObjects(type);
    if (selectedObjects) {
      const index = selectedObjects.indexOf(object);
      if (index !== -1) {
        selectedObjects.splice(index, 1);
      }
    }
  }

  unregisterAllOutlinesObject(object: Object3D) {
    this.passes.defaultOutline.selectedObjects.splice(
      this.passes.defaultOutline.selectedObjects.indexOf(object),
      1
    );
    this.passes.errorOutline.selectedObjects.splice(
      this.passes.errorOutline.selectedObjects.indexOf(object),
      1
    );
  }

  getOutlineObjects(type: OUTLINE_TYPE = OUTLINE_TYPE.DEFAULT) {
    if (type === OUTLINE_TYPE.DEFAULT) {
      return this.passes.defaultOutline.selectedObjects;
    } else if (type === OUTLINE_TYPE.ERROR) {
      return this.passes.errorOutline.selectedObjects;
    } else if (type === OUTLINE_TYPE.ADD) {
      return this.passes.addOutline.selectedObjects;
    } else if (type === OUTLINE_TYPE.REMOVE) {
      return this.passes.removeOutline.selectedObjects;
    }
  }
}

export enum OUTLINE_TYPE {
  DEFAULT,
  ERROR,
  ADD,
  REMOVE
}

function getOutlinePass(
  color: string | number = 0xffffff,
  {
    dimension,
    scene,
    camera
  }: {
    dimension: Vector2;
    scene: Scene;
    camera: OrthographicCamera;
  }
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
  outlinePass.visibleEdgeColor.set(color); // Konturfarbe
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
