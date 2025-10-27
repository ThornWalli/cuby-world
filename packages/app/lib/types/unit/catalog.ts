import type Unit from '../../classes/Unit';
import type { CatalogItem } from '../catalog';
import type {
  UnitSkinDescription,
  UnitSkinIdentifier
} from '../../utils/unit/skins';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UnitItemOptions {}

export interface UnitItem extends CatalogItem {
  skinMap?: Map<UnitSkinIdentifier, UnitSkinDescription>;
  instance: () => Promise<typeof Unit>;
  options: UnitItemOptions;
}
