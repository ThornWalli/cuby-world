import type Stair from '../../classes/Stair';
import type { CatalogItem } from '../catalog';
import type { StairSkinIdentifier, StairStyle } from './skins';

/**
 * @deprecated Wozu?
 */
export interface StairSkinItem extends CatalogItem {
  skin: StairSkinIdentifier;
  type: string;
  options: StairStyle;
}

export interface StairItem extends CatalogItem {
  instance: () => Promise<typeof Stair>;
  options: {
    skin: StairSkinIdentifier;
  };
}
