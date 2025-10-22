import type Unit from '../../classes/Unit';
import type { CatalogItem } from '../catalog';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UnitItemOptions {}

export interface UnitItem extends CatalogItem {
  instance: () => Promise<typeof Unit>;
  options: UnitItemOptions;
}
