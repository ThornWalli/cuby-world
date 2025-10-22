import type Ground from '../../classes/Ground';
import type { CatalogItem } from '../catalog';
import type { GrountStyleIdentifier } from '../ground';
import type {
  GroundSkin,
  GroundSkinDescription,
  GroundSkinIdentifier
} from './skins';

export interface GroundSkinItem extends CatalogItem {
  skinId: GrountStyleIdentifier;
  type: string;
  skin: GroundSkin;
}

export interface GroundItem extends CatalogItem<GroundSkinDescription> {
  instance: () => Promise<typeof Ground>;
  options: {
    skin: GroundSkinIdentifier;
  };
}
