import { ReplaySubject } from 'rxjs';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import type Unit from '../Unit';

interface Obervables extends UnitModuleObservables {
  active$: ReplaySubject<boolean>;
  intensity$: ReplaySubject<number>;
}

interface Options extends UnitModuleOptions {
  onTime?: number; // 0 → Mitternacht, 0.25 → 6 Uhr, 0.5 → Mittag, 0.75 → 18 Uhr, 1 → Mitternacht wieder
  offTime?: number; // 0 → Mitternacht, 0.25 → 6 Uhr, 0.5 → Mittag, 0.75 → 18 Uhr, 1 → Mitternacht wieder
}

interface State extends UnitModuleState {
  active: boolean;
  intensity: number;
}
export default class LightUnitModule extends UnitModule<
  Options,
  State,
  Obervables
> {
  static override TYPE = 'light';
  private _active: boolean = true;

  constructor(unit: Unit, options: Options, state: State, debug: boolean) {
    super(
      unit,
      options,
      {
        ...state,
        active: state.active ?? true,
        intensity: state.intensity ?? 1
      },
      debug
    );
    //#region observables
    this.observables.active$ = new ReplaySubject<boolean>();
    this.observables.active$.next(this.isActive());
    this.observables.intensity$ = new ReplaySubject<number>();
    this.observables.intensity$.next(this.getIntensity());
    //#endregion
  }

  override async setup(context: UnitModuleSetupContext) {
    this.subscription.add(
      context.room?.app.modules.time.observables.dayTime$.subscribe(
        (dayTime: number) => {
          if (this.state.active) {
            const isOn =
              dayTime >= (this.options.onTime ?? 0.7) ||
              dayTime <= (this.options.offTime ?? 0.25);
            if (isOn !== this.isActive()) {
              this.setInternalActive(isOn);
            }
          }
        }
      )
    );

    return context.mesh;
  }

  getIntensity() {
    return this.isActive() ? (this.state.intensity ?? 1) : 0;
  }
  setIntensity(intensity: number) {
    this.state.intensity = intensity;
    this.observables.intensity$.next(this.getIntensity());
  }

  isActive() {
    return this.state.active && this._active;
  }

  private setInternalActive(active: boolean) {
    this._active = active;
    this.observables.active$.next(this.state.active && this._active);
    this.observables.intensity$.next(this.getIntensity());
  }

  setActive(active: boolean) {
    this.state.active = active;
    this.observables.active$.next(this.state.active && this._active);
    this.observables.intensity$.next(this.getIntensity());
  }
}
