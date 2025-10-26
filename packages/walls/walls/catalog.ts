import type { WallSkinIdentifier } from '@cuby-world/app/lib/types/wall/skins';
import skins from './default/skins';
import type { WallItem } from '@cuby-world/app/lib/types/wall/catalog';
import { mapSkins } from '@cuby-world/app/lib/utils/skins';

const wallItems: WallItem[] = [
  {
    id: 'default',
    type: 'default',
    name: 'Default Wall',
    description: 'A standard wall for building your space.',
    defaultSkinId: skins[0]!.id,
    skins,
    skinMap: mapSkins<WallSkinIdentifier, (typeof skins)[0]>(skins),
    options: {
      skin: 'default'
    }
  }
];

export const catalog = new Map<WallSkinIdentifier, WallItem>(
  wallItems.map(w => [w.id, w])
);
