import type { SkinOptions } from '@cuby-world/app/lib/types/skin';
import { mapSkins } from '@cuby-world/app/lib/utils/skins';
import type {
  UnitSkinDescription,
  UnitSkinIdentifier
} from '@cuby-world/app/lib/utils/unit/skins';

import image_texture_no_unauthorized_access from './assets/textures/no_unauthorized_access.jpg';
import image_texture_no_smoking from './assets/textures/no_smoking.jpg';

export type TexturePath = string;

interface ProtestSignSkinOptions extends SkinOptions {
  texture?: TexturePath;
}

export type ProtestSignSkinDescription =
  UnitSkinDescription<ProtestSignSkinOptions>;

const skins: ProtestSignSkinDescription[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard skin (Transarent).',
    options: {}
  },
  {
    id: 'no_unauthorized_access',
    name: 'No unauthorized access',
    options: {
      texture: image_texture_no_unauthorized_access
    }
  },
  {
    id: 'no_smoking',
    name: 'No Smoking',
    options: {
      texture: image_texture_no_smoking
    }
  }
];

export default skins;

export const skinsMap = mapSkins<UnitSkinIdentifier, (typeof skins)[0]>(skins);
