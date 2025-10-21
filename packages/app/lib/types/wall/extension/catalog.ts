import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';
import type { CatalogItem } from '../../catalog';
import type { WALL_WINDOW_SIZE } from '../../wall';
import type {
  WallExtensionIdentifier,
  WallExtensionSkinIdentifier
} from './skins';

export interface WallExtensionItem extends CatalogItem {
  targetTypes: string[];
  extension: WallExtensionIdentifier;
  instance: () => Promise<typeof WallExtension>;
  options: {
    skin: WallExtensionSkinIdentifier;
    size?:
      | WALL_WINDOW_SIZE.SMALL
      | WALL_WINDOW_SIZE.MEDIUM
      | WALL_WINDOW_SIZE.LARGE;
    hasDoor?: boolean;
  };
}
