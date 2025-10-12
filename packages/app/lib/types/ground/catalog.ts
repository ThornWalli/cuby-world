import type { CatalogItem } from '../catalog';
import type { GrountStyleIdentifier } from '../ground';
import type { GroundSkin } from './skins';

export interface GroundSkinItem extends CatalogItem {
  skinId: GrountStyleIdentifier;
  type: string;
  skin: GroundSkin;
}
