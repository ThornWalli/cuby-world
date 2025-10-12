import type { CatalogItem } from '../catalog';
import type { WallSkinIdentifier, WallStyle } from './skins';

export interface WallSkinItem extends CatalogItem {
  skin: WallSkinIdentifier;
  type: string;
  options: WallStyle;
}
