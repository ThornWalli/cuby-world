import type WallExtension from '../classes/WallExtension';
import type { WallExtensionItem } from '../types/wall/extension/catalog';

export enum CATALOG_TAG {
  LIGHT = 'light',
  FURNITURE = 'furniture',
  HIDE = 'hide'
}

export async function getWallExtensionMap<Item extends WallExtensionItem>(
  catalogItems: Item[]
) {
  const extensions: [string, typeof WallExtension][] = await Promise.all(
    catalogItems.map(async door => {
      const instance = await door.instance();
      return [instance.KEY, instance];
    })
  );
  return new Map(extensions);
}
