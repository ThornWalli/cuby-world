import { catalog } from '@cuby-world/units';
import type { CatalogItemIdentifier } from '../../types/catalog';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends AppModuleObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State extends AppModuleState {}
export default class CatalogAppModule extends AppModule<State, Observables> {
  static override TYPE = 'catalog';
  state: State = {};

  async buyItem(itemId: CatalogItemIdentifier) {
    console.log(`Buying item with id: ${itemId}`);

    const item = catalog.get(itemId);
    if (!item) {
      throw new Error(`Item with id ${itemId} not found in catalog`);
    }

    const ItemClass = await item.instance();
    const itemInstance = new ItemClass();

    this.app.modules.room.addUnit(itemInstance);

    return true;
  }
}
