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
}

interface Options extends UnitModuleOptions {
  onTime?: number; // 0 → Mitternacht, 0.25 → 6 Uhr, 0.5 → Mittag, 0.75 → 18 Uhr, 1 → Mitternacht wieder
  offTime?: number; // 0 → Mitternacht, 0.25 → 6 Uhr, 0.5 → Mittag, 0.75 → 18 Uhr, 1 → Mitternacht wieder
}

interface State extends UnitModuleState {
  active?: boolean;
}
export default class LightUnitModule extends UnitModule<
  Options,
  State,
  Obervables
> {
  static override TYPE = 'light';

  private active: boolean = false;

  constructor(unit: Unit, options: Options, state: State, debug: boolean) {
    super(unit, options, state, debug);
    //#region observables
    this.observables.active$ = new ReplaySubject<boolean>();
    this.observables.active$.next(this.active);
    //#endregion
  }

  override async setup(context: UnitModuleSetupContext) {
    this.subscription.add(
      context.room?.app.modules.time.observables.dayTime$.subscribe(
        (dayTime: number) => {
          const isOn =
            dayTime >= (this.options.onTime ?? 0.7) ||
            dayTime <= (this.options.offTime ?? 0.25);
          if (isOn !== this.isOn()) {
            this.active = isOn;
            if (isOn) {
              this.on();
            } else {
              this.off();
            }
          }
        }
      )
    );

    return context.mesh;
  }

  isOn() {
    return this.state.active ?? this.active;
  }

  on() {
    this.observables.active$.next(true);
  }

  off() {
    this.observables.active$.next(false);
  }
}
