import type App from './App';
import { Subscription } from 'rxjs';
import type Player from './Player';
import type { PreparedPosition } from '../utils/matrix';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AppModuleState {}

export default abstract class AppModule<
  State extends AppModuleState = AppModuleState
> {
  static TYPE: string;

  abstract state: State;

  subscription = new Subscription();
  constructor(public app: App) {}
  setup() {
    // This method can be overridden by subclasses to set up specific handlers
  }

  destroy() {
    this.subscription.unsubscribe();
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
