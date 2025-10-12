import type { CatalogItem } from '../catalog';
import type { StairSkinIdentifier, StairStyle } from './skins';

export interface StairSkinItem extends CatalogItem {
  skin: StairSkinIdentifier;
  type: string;
  options: StairStyle;
}
