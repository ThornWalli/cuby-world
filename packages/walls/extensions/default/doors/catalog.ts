import type { DoorWallExtensionItem } from '@cuby-world/app/lib/types/wall/extension/catalog';

import skins_standard from './standard/skins';
import type WallExtension from '@cuby-world/app/lib/classes/WallExtension';

const items: DoorWallExtensionItem[] = [
  {
    id: 'default_door_standard',
    targetTypes: ['default'],
    extension: 'door_standard',
    name: 'Standard Door',
    description: 'Überzeugt mit zeitlosem Design und Funktionalität.',
    defaultSkinId: skins_standard[0]!.id,
    skins: skins_standard,
    instance: () =>
      import('./standard/Standard').then(
        m => m.default as typeof WallExtension
      ),
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
    defaultSkinId: skins_standard[0]!.id,
    skins: skins_standard,
    instance: () =>
      import('./standard/Standard').then(
        m => m.default as typeof WallExtension
      ),
    options: {
      skin: 'default',
      hasDoor: false
    }
  }
];

export const catalog = new Map(items.map(w => [w.id, w]));
