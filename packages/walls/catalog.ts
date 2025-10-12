import { WALL_WINDOW_SIZE } from '@cuby-world/app/lib/types/wall';
import type { WallExtensionItem } from '@cuby-world/app/lib/types/wall/extension/catalog';
import type { WallExtensionIdentifier } from '@cuby-world/app/lib/types/wall/extension/skins';

const doorsExtensions: WallExtensionItem[] = [
  {
    id: 'default_door_standard',
    targetTypes: ['default'],
    extension: 'door_standard',
    name: 'Standard Door',
    description: 'Überzeugt mit zeitlosem Design und Funktionalität.',
    options: {
      skin: 'default'
    }
  },
  {
    id: 'default_door_standard_frame',
    targetTypes: ['default'],
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
    targetTypes: ['default'],
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
    targetTypes: ['default'],
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
    targetTypes: ['default'],
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
