import {
  AmbientLight,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  PointLight,
  PointLightHelper
} from 'three';
import type { AppModuleControllerObservables } from '../AppModuleController';
import type { AppModuleState } from '../AppModule';
import AppModule from '../AppModule';
import { ReplaySubject } from 'rxjs';
import type App from '../App';

// 0 → Mitternacht
// 0.25 → 6 Uhr
// 0.5 → 12 Uhr(Mittag)
// 0.75 → 18 Uhr
// 1 → Mitternacht wieder

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends AppModuleControllerObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State extends AppModuleState {}

export default class LightAppModule extends AppModule<State, Observables> {
  static override TYPE = 'light';

  debug = false;

  state: State = {};

  lights: {
    ambient: AmbientLight;
    hemiLight: HemisphereLight;
    dirLight: DirectionalLight;
  };

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.dayTime$ = new ReplaySubject<number>(1);
    //#endregion

    this.lights = createLights();

    const scene = app.renderer.scene;

    if (this.debug) {
      Object.values(this.lights).forEach(light => {
        if (light instanceof PointLight) {
          scene.add(new PointLightHelper(light, 0.1));
        } else if (light instanceof DirectionalLight) {
          scene.add(new DirectionalLightHelper(light, 1));
        }
      });
    }

    scene.add(this.lights.ambient, this.lights.hemiLight, this.lights.dirLight);
  }

  override setup(): void {
    this.subscription.add(
      this.app.modules.time.observables.dayTime$.subscribe(
        (dayTime: number) => {
          this.updateDayNightCycle(dayTime);
        }
      )
    );
  }

  updateDayNightCycle(dayTime: number) {
    const { ambient, hemiLight, dirLight } = this.lights;

    const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep
    const angle = dayTime * Math.PI * 2 - Math.PI / 2;
    const daylight = Math.max(0, Math.sin(angle));

    const radius = 80;
    const height = 100;

    dirLight.position.set(
      radius * Math.cos(angle),
      height * Math.sin(angle),
      radius * Math.sin(angle) // leichtes Z-Gefälle
    );

    const intensity = smooth(daylight);

    dirLight.intensity = 0.3 + intensity * 1.2;
    ambient.intensity = 0.2 + intensity * 0.4;
    hemiLight.intensity = 0.3 + intensity * 0.5;

    (this.app.renderer.scene.background! as Color)!.lerpColors(
      new Color(0x0a0a2a),
      new Color(0x87ceeb),
      intensity
    );

    const hue = 30 + 60 * daylight;
    const saturation = 0.8;
    const lightness = 0.5 + 0.5 * daylight;
    const sunColor = new Color().setHSL(hue / 360, saturation, lightness);
    dirLight.color.copy(sunColor);
    hemiLight.color.copy(sunColor);
  }
}

function createLights() {
  const ambient = new AmbientLight(0xffffff, 0.5);
  const hemiLight = new HemisphereLight(0x87ceeb, 0x444444, 0.6);
  const dirLight = new DirectionalLight(0xffffff, 1.5);

  dirLight.position.set(80, 100, 80);
  dirLight.castShadow = true;

  dirLight.shadow.mapSize.set(512, 512);

  // Bias gegen Streifen
  dirLight.shadow.bias = -0.001;
  dirLight.shadow.normalBias = 0.05;

  // Schattencam begrenzen
  const size = 25;
  dirLight.shadow.camera.left = -size;
  dirLight.shadow.camera.right = size;
  dirLight.shadow.camera.top = size;
  dirLight.shadow.camera.bottom = -size;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 200;

  return { ambient, hemiLight, dirLight };
}
