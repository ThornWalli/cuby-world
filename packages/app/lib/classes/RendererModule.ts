import type Renderer from './Renderer';
import { Subscription, type SubscriptionLike } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RendererModuleObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RendererModuleState {}

export default abstract class RendererModule<
  State extends RendererModuleState = RendererModuleState,
  Observables extends RendererModuleObservables = RendererModuleObservables
> {
  static TYPE: string;

  abstract state: State;

  observables: Observables = {} as Observables;

  subscription = new Subscription();
  constructor(public renderer: Renderer) {}

  setup() {
    // This method can be overridden by subclasses to set up specific handlers
  }

  destroy() {
    Object.values(this.observables).forEach(o =>
      (o as SubscriptionLike).unsubscribe()
    );
    this.subscription.unsubscribe();
  }

  update(_ctx: { time: number; delta: number }) {
    // This method can be overridden by subclasses to handle updates
  }
}
