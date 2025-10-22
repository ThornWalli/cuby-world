import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';
import type { CatalogItem } from '../../catalog';
import type { WALL_WINDOW_SIZE } from '../../wall';
import type {
  WallExtensionIdentifier,
  WallExtensionSkinIdentifier
} from './skins';

export interface WallExtensionItemOptions {
  skin: WallExtensionSkinIdentifier;
}
export interface WallExtensionItem<
  Options extends WallExtensionItemOptions = WallExtensionItemOptions
> extends CatalogItem {
  targetTypes: string[];
  extension: WallExtensionIdentifier;
  instance: () => Promise<typeof WallExtension>;
  options: Options;
}
// hasDoor?: boolean;

export type DoorWallExtensionItem = WallExtensionItem<
  {
    hasDoor?: boolean;
  } & WallExtensionItemOptions
>;

export type WindowWallExtensionItem = WallExtensionItem<
  {
    size?:
      | WALL_WINDOW_SIZE.SMALL
      | WALL_WINDOW_SIZE.MEDIUM
      | WALL_WINDOW_SIZE.LARGE;
  } & WallExtensionItemOptions
>;
