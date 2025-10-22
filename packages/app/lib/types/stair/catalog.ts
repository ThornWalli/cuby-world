import type Stair from '../../classes/Stair';
import type { CatalogItem } from '../catalog';
import type { StairSkinIdentifier } from './skins';

export interface StairItem extends CatalogItem {
  instance: () => Promise<typeof Stair>;
  options: {
    skin: StairSkinIdentifier;
  };
}
