import { WALL_WINDOW_SIZE } from './../app/lib/types/wall';
import type { CatalogItem } from '@cuby-world/app/lib/utils/catalog';

export type WallExtensionIdentifier = string;
export type WallExtensionSkinIdentifier = string;

export interface WallExtensionItem extends CatalogItem {
  extension: WallExtensionIdentifier;
  options: {
    skin: WallExtensionSkinIdentifier;
    size?:
      | WALL_WINDOW_SIZE.SMALL
      | WALL_WINDOW_SIZE.MEDIUM
      | WALL_WINDOW_SIZE.LARGE;
    hasDoor?: boolean;
  };
}

const doorsExtensions: WallExtensionItem[] = [
  {
    id: 'door_standard',
    extension: 'door_standard',
    name: 'Standard Door',
    description: 'Überzeugt mit zeitlosem Design und Funktionalität.',
    options: {
      skin: 'default'
    }
  },
  {
    id: 'door_standard_frame',
    extension: 'door_standard',
    name: 'Standard Door (Only Frame)',
    description: 'Überzeugt mit zeitlosem Design und Funktionalität.',
    tags: ['frame'],
    options: {
      skin: 'default',
      hasDoor: false
    }
  }
];
export const doorsCatalog = new Map<WallExtensionIdentifier, WallExtensionItem>(
  doorsExtensions.map(d => [d.id, d])
);

const windowExtensions: WallExtensionItem[] = [
  {
    id: 'window_standard_small',
    extension: 'window_standard',
    name: 'Standard Fenster (Small)',
    description: 'Klassisches Design für jede Wand.',
    tags: ['small'],
    options: {
      skin: 'default',
      size: WALL_WINDOW_SIZE.SMALL
    }
  },
  {
    id: 'window_standard_medium',
    extension: 'window_standard',
    name: 'Standard Fenster (Medium)',
    description: 'Klassisches Design für jede Wand.',
    tags: ['medium'],
    options: {
      skin: 'default',
      size: WALL_WINDOW_SIZE.MEDIUM
    }
  },
  {
    id: 'window_standard_large',
    extension: 'window_standard',
    name: 'Standard Fenster (Large)',
    description: 'Klassisches Design für jede Wand.',
    tags: ['large'],
    options: {
      skin: 'default',
      size: WALL_WINDOW_SIZE.LARGE
    }
  }
];
export const windowsCatalog = new Map(windowExtensions.map(w => [w.id, w]));

export const catalog = new Map(
  [...doorsExtensions, ...windowExtensions].map(w => [w.id, w])
);
