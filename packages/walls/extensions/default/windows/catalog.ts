import { WALL_WINDOW_SIZE } from '@cuby-world/app/lib/types/wall';
import type { WindowWallExtensionItem } from '@cuby-world/app/lib/types/wall/extension/catalog';
import skins_standard from './standard/skins';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';

const items: WindowWallExtensionItem[] = [
  {
    id: 'window_standard_small',
    targetTypes: ['default'],
    extension: 'window_standard',
    name: 'Standard Fenster (Small)',
    description: 'Klassisches Design für jede Wand.',
    tags: ['small'],
    defaultSkinId: skins_standard[0]!.id,
    skins: skins_standard,
    instance: () =>
      import('./standard/Standard').then(
        m => m.default as typeof WallExtension
      ),
    options: {
      skin: 'default',
      size: WALL_WINDOW_SIZE.SMALL
    }
  },
  {
    id: 'window_standard_medium',
    targetTypes: ['default'],
    extension: 'window_standard',
    name: 'Standard Fenster (Medium)',
    description: 'Klassisches Design für jede Wand.',
    tags: ['medium'],
    defaultSkinId: skins_standard[0]!.id,
    skins: skins_standard,
    instance: () =>
      import('./standard/Standard').then(
        m => m.default as typeof WallExtension
      ),
    options: {
      skin: 'default',
      size: WALL_WINDOW_SIZE.MEDIUM
    }
  },
  {
    id: 'window_standard_large',
    targetTypes: ['default'],
    extension: 'window_standard',
    name: 'Standard Fenster (Large)',
    description: 'Klassisches Design für jede Wand.',
    tags: ['large'],
    defaultSkinId: skins_standard[0]!.id,
    skins: skins_standard,
    instance: () =>
      import('./standard/Standard').then(
        m => m.default as typeof WallExtension
      ),
    options: {
      skin: 'default',
      size: WALL_WINDOW_SIZE.LARGE
    }
  }
];
export const catalog = new Map(items.map(w => [w.id, w]));
