import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import { Observable, ReplaySubject, fromEvent } from 'rxjs';
import {
  Clock,
  SRGBColorSpace,
  Vector3,
  type Object3D,
  BasicShadowMap,
  PCFShadowMap,
  NeutralToneMapping,
  Quaternion
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
import type { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

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

export enum ShadowQuality {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  OFF = 'off'
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
    shadowQuality$: ReplaySubject<ShadowQuality>;
    animationLoop$: AnimationLoopSubject;
    pointerDown$: Observable<PointerEvent>;
    pointerMove$: Observable<PointerEvent>;
    pointerUp$: Observable<PointerEvent>;
    controls$: ReplaySubject<{
      pen: boolean;
      zoom: boolean;
      rotate: boolean;
    }>;
    rotation$: ReplaySubject<number>;
    controlsChange$: Observable<Event>;
  };
  shadowQuality: ShadowQuality = ShadowQuality.OFF;

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

    this.observables = {
      shadowQuality$: new ReplaySubject<ShadowQuality>(1),
      animationLoop$: new ReplaySubject<{
        time: number;
        delta: number;
      }>(0),
      pointerDown$: fromEvent<PointerEvent>(canvas, 'pointerdown'),
      pointerMove$: fromEvent<PointerEvent>(canvas, 'pointermove'),
      pointerUp$: fromEvent<PointerEvent>(canvas, 'pointerup'),
      controls$: new ReplaySubject<{
        pen: boolean;
        zoom: boolean;
        rotate: boolean;
      }>(1),
      rotation$: new ReplaySubject<number>(1),
      controlsChange$: new Observable<Event>()
    };

    this.dimension = dimension;
    this._debug = options.debug ?? false;

    this.initScene();
    this.setOrthographicCamera();

    this.pixelated = options.pixelated ?? false;
    const renderer = new WebGLRenderer({
      canvas,
      antialias: options.pixelated ? false : true
    });

    renderer.shadowMap.autoUpdate = true;
    this.renderer = renderer;
    this.setShadowQuality(ShadowQuality.LOW);

    // renderer.toneMapping = ACESFilmicToneMapping;

    this.initComposer();
    if (options.controls) {
      this.initControls();
      this.observables.controlsChange$ = fromEvent<Event>(
        this.controls as HasEventTargetAddRemove<Event>,
        'change'
      );
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
    renderer.toneMapping = NeutralToneMapping;
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

  setShadowQuality(quality: ShadowQuality) {
    this.renderer.shadowMap.enabled = true;
    switch (quality) {
      case ShadowQuality.HIGH:
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        break;
      case ShadowQuality.MEDIUM:
        this.renderer.shadowMap.type = PCFShadowMap;
        break;
      case ShadowQuality.LOW:
        this.renderer.shadowMap.type = BasicShadowMap;
        break;
      case ShadowQuality.OFF:
        this.renderer.shadowMap.enabled = false;
        break;
    }

    this.renderer.shadowMap.needsUpdate = true;
    this.shadowQuality = quality;
    this.observables.shadowQuality$.next(quality);
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

  getControlsOptions() {
    return {
      pan: this.controls.enablePan,
      zoom: this.controls.enableZoom,
      rotate: this.controls.enableRotate
    };
  }

  setControlsOptions({
    pan = true,
    zoom = true,
    rotate = true
  }: {
    pan?: boolean;
    zoom?: boolean;
    rotate?: boolean;
  }) {
    this.controls.enablePan = pan;
    this.controls.enableZoom = zoom;
    this.controls.enableRotate = rotate;
    this.observables.controls$.next({
      pen: this.controls.enablePan,
      zoom: this.controls.enableZoom,
      rotate: this.controls.enableRotate
    });
  }

  enableControls() {
    this.setControlsOptions({
      pan: true,
      zoom: true,
      rotate: false
    });
  }
  disableControls() {
    this.setControlsOptions({
      pan: true,
      zoom: true,
      rotate: false
    });
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

    this.controls.dampingFactor = 0.05; // kleiner Wert = smoother
    this.controls.zoomSpeed = 1.0;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 1.0;

    this.enableControls();
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

  resetCamera(position?: Vector3) {
    this.updateCamera(position);
  }

  static ISOMETRIC_OFFSET = new Vector3(20, 20, 20);
  static ISOMETRIC_DIRECTION = new Vector3(1, 1, 1).normalize();
  static ISOMETRIC_DISTANCE = 35; // Abstand Kamera vom Target

  updateCamera(position?: Vector3) {
    this.camera.zoom = (this.controls?.object as OrthographicCamera)?.zoom || 1;
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

  registerOutlineObject(
    object: Object3D,
    type: OUTLINE_TYPE = OUTLINE_TYPE.DEFAULT
  ) {
    const selectedObjects = this.getOutlineObjects(type);
    if (selectedObjects) {
      if (!selectedObjects.includes(object)) {
        this.unregisterAllOutlinesObject(object);
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

  rotateCameraLeft() {
    this.rotateCamera(-Math.PI / 2); // -90°
  }

  rotateCameraRight() {
    this.rotateCamera(Math.PI / 2); // +90°
  }

  private rotation = 0;
  rotateCamera(angle: number) {
    const q = new Quaternion();
    q.setFromAxisAngle(new Vector3(0, 1, 0), angle);
    Renderer.ISOMETRIC_DIRECTION.applyQuaternion(q);
    this.updateCamera(this.controls.target.clone());
    this.controls.update();
    this.rotation = (this.rotation + angle) % (Math.PI * 2);
    this.observables.rotation$.next(this.rotation);
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
