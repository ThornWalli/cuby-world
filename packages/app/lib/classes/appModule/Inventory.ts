import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends AppModuleObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State extends AppModuleState {}
export default class InventoryAppModule extends AppModule<State, Observables> {
  override state: State = {} as State;
  static override TYPE = 'shop';
}
