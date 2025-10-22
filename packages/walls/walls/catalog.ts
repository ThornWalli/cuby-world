import type { WallSkinIdentifier } from '@cuby-world/app/lib/types/wall/skins';
import skins from './default/skins';
import type { WallItem } from '@cuby-world/app/lib/types/wall/catalog';

const wallItems: WallItem[] = [
  {
    id: 'default',
    type: 'default',
    name: 'Default Wall',
    description: 'A standard wall for building your space.',
    skins,
    options: {
      skin: 'default'
    }
  }
];

export const catalog = new Map<WallSkinIdentifier, WallItem>(
  wallItems.map(w => [w.id, w])
);
