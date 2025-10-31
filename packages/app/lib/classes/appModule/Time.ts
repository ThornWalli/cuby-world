import type App from '../App';
import type { AppModuleObservables, AppModuleState } from '../AppModule';
import AppModule from '../AppModule';
import { concatMap, ReplaySubject } from 'rxjs';

interface Observables extends AppModuleObservables {
  dayTime$: ReplaySubject<number>;
  speed$: ReplaySubject<number>;
  paused$: ReplaySubject<boolean>;
}

interface State extends AppModuleState {
  paused: boolean;
  dayLengthSeconds: number;
  auto: boolean;
  dayTime: number;
  speed: number;
}

const DAY_LENGTH_SECONDS = 24 * 60 * 60; // 5 Minuten

export default class TimeAppModule extends AppModule<State, Observables> {
  static override TYPE = 'time';

  state: State = {
    paused: false,
    auto: true,
    dayLengthSeconds: DAY_LENGTH_SECONDS,
    dayTime: 0,
    speed: 1
  };

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.dayTime$ = new ReplaySubject<number>(1);
    this.observables.speed$ = new ReplaySubject<number>(1);
    this.observables.paused$ = new ReplaySubject<boolean>(1);
    //#endregion
  }

  override setup(): void {
    this.subscription.add(
      this.app.renderer.observables.animationLoop$
        .pipe(concatMap(this.onUpdate.bind(this)))
        .subscribe(void 0)
    );
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const dayTime = (hours * 60 + minutes) / (24 * 60);
    this.state.dayTime = dayTime;
  }

  setSpeed(speed: number) {
    this.state.speed = speed;
    this.observables.speed$?.next(this.state.speed);
  }

  getDayTime() {
    return this.state.dayTime;
  }

  play() {
    this.state.paused = false;
    this.observables.paused$.next(this.state.paused);
  }
  pause() {
    this.state.paused = true;
    this.observables.paused$.next(this.state.paused);
  }

  setDayTime(dayTime: number) {
    this.state.dayTime = dayTime;
    this.observables.dayTime$?.next(this.state.dayTime);
  }

  lastTime = 0;
  async onUpdate({ time }: { time: number; delta: number }) {
    if (this.state.auto && !this.state.paused) {
      this.lastTime = this.lastTime || time;
      const delta = time - this.lastTime;
      this.lastTime = time;
      this.setDayTime(
        (this.state.dayTime +
          delta /
            1000 /
            (this.state.dayLengthSeconds * (1 / this.state.speed))) %
          1
      );
    } else {
      this.lastTime = time;
    }
  }
}
