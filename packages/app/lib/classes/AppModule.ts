import type App from './App';
import { Subscription } from 'rxjs';
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
}
