import type App from '../App';
import type { AppModuleObservables, AppModuleState } from '../AppModule';
import AppModule from '../AppModule';
import { concatMap, ReplaySubject } from 'rxjs';

interface Observables extends AppModuleObservables {
  dayTime$: ReplaySubject<number>;
  timezone$: ReplaySubject<Timezone>;
  speed$: ReplaySubject<number>;
  paused$: ReplaySubject<boolean>;
}

export type Timezone = Intl.DateTimeFormat | string | null;

interface State extends AppModuleState {
  paused: boolean;
  dayLengthSeconds: number;
  auto: boolean;
  dayTime: number;
  speed: number;
  timezone: Timezone;
  dayTimeOverride?: Date;
}

const DAY_LENGTH_SECONDS = 24 * 60 * 60; // 5 Minuten

export default class TimeAppModule extends AppModule<State, Observables> {
  static override TYPE = 'time';

  state: State = {
    paused: false,
    auto: true,
    dayLengthSeconds: DAY_LENGTH_SECONDS,
    dayTime: 0,
    speed: 1,
    timezone: null
  };

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.dayTime$ = new ReplaySubject<number>(1);
    this.observables.timezone$ = new ReplaySubject<Timezone>(1);
    this.observables.speed$ = new ReplaySubject<number>(1);
    this.observables.paused$ = new ReplaySubject<boolean>(1);
    //#endregion

    if (app.config.debug?.dayytime) {
      this.state.dayTimeOverride = new Date(app.config.debug.dayytime);
    }
  }

  override setup(): void {
    this.subscription.add(
      this.app.renderer.observables.animationLoop$
        .pipe(concatMap(this.onUpdate.bind(this)))
        .subscribe(void 0)
    );
    this.setDayTime(this.getTimeInTimezone(this.state.timezone));
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

  setTimezone(tz: Timezone) {
    this.state.timezone = tz;
    this.observables.timezone$.next(this.state.timezone);
    this.setDayTime(this.getTimeInTimezone(tz));
  }

  private getTimeInTimezone(tz: Timezone): number {
    let hours: number;
    let minutes: number;
    if (this.state.dayTimeOverride) {
      hours = this.state.dayTimeOverride.getHours();
      minutes = this.state.dayTimeOverride.getMinutes();
    } else {
      const date = new Date();

      if (tz) {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: String(tz || 'UTC'),
          hour: 'numeric',
          minute: 'numeric',
          hour12: false
        });

        const parts = formatter.formatToParts(date);
        hours = Number(parts.find(p => p.type === 'hour')?.value);
        minutes = Number(parts.find(p => p.type === 'minute')?.value);
      } else {
        // local fallback
        hours = date.getHours();
        minutes = date.getMinutes();
      }
    }
    return (hours * 60 + minutes) / (24 * 60);
  }
}
