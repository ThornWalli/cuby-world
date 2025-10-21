import type { WallSkinDescription } from '@cuby-world/walls/skins';
import type { CatalogItem } from '../catalog';
import type { WallSkinIdentifier } from './skins';

export type WallType = 'default' | string;

export interface WallItem extends CatalogItem {
  type: WallType;
  skins: WallSkinDescription[];
  options: {
    skin: WallSkinIdentifier;
  };
}
