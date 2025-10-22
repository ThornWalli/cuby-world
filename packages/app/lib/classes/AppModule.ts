import type App from './App';
import { Subscription, type SubscriptionLike } from 'rxjs';
import type Player from './Player';
import type { PreparedPosition } from '../utils/matrix';

export type AppModuleObservables = {
  [key: string]: SubscriptionLike | unknown;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AppModuleState {}

export default abstract class AppModule<
  State extends AppModuleState = AppModuleState,
  Observables extends AppModuleObservables = AppModuleObservables
> {
  static TYPE: string;

  abstract state: State;

  subscription = new Subscription();

  observables: Observables = {} as Observables;

  constructor(public app: App) {}
  setup() {
    // This method can be overridden by subclasses to set up specific handlers
  }

  destroy() {
    this.subscription.unsubscribe();
    Object.values(this.observables).forEach(o =>
      (o as SubscriptionLike).unsubscribe()
    );
  }

  update() {
    // This method can be overridden by subclasses to handle updates
  }

  /**
   * Wird aufgerufen, wenn über die Szene gehovert wird.
   * @returns boolean ob der Hover verarbeitet wurde (true) oder nicht (false), lässt alles andere ignorieren.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-function
  onSceneHover(context: SceneSelectContext): void {}

  /**
   * Wird wenn in der Szene geklickt wird.
   * @returns boolean ob der Klick verarbeitet wurde (true) oder nicht (false), lässt alles andere ignorieren.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSceneSelect(context: SceneSelectContext): boolean {
    return false;
  }
}

export interface SceneSelectContext {
  preparedPositions: PreparedPosition[];
  player: Player;
}
