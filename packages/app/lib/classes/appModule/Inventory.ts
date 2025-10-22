import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends AppModuleObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State extends AppModuleState {}
export default class InventoryAppModule extends AppModule<State, Observables> {
  static override TYPE = 'inventory';
  state: State = {};
}
