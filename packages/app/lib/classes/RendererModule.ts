import type Renderer from './Renderer';
import { Subscription } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RendererModuleState {}

export default abstract class RendererModule<
  State extends RendererModuleState = RendererModuleState
> {
  static TYPE: string;

  abstract state: State;

  subscription = new Subscription();
  constructor(public renderer: Renderer) {}

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
