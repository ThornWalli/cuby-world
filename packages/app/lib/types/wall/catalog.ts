import type { CatalogItem } from '../catalog';
import type { WallSkinDescription, WallSkinIdentifier } from './skins';

export type WallType = 'default' | string;

export interface WallItem extends CatalogItem {
  type: WallType;
  skins: WallSkinDescription[];
  options: {
    skin: WallSkinIdentifier;
  };
}
