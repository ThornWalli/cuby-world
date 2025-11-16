import type { SkinOptions } from '@cuby-world/app/lib/types/skin';
import { mapSkins } from '@cuby-world/app/lib/utils/skins';
import type {
  UnitSkinDescription,
  UnitSkinIdentifier
} from '@cuby-world/app/lib/utils/unit/skins';

import image_texture_white from './assets/textures/white.jpg';
import image_texture_your_ad_here from './assets/textures/your_ad_here.jpg';
import image_texture_cuby_1 from './assets/textures/cuby_1.jpg';
import image_texture_lenna from './assets/textures/lenna.jpg';
import image_texture_cuby_post_1 from './assets/textures/cuby_post_1.jpg';
import image_texture_you_gotta_do from './assets/textures/you_gotta_do.jpg';

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
    description: 'Standard skin (White).',
    options: {
      texture: image_texture_white
    }
  },
  {
    id: 'your_ad_here',
    name: 'Your Ad Here',
    options: {
      texture: image_texture_your_ad_here
    }
  },
  {
    id: 'cuby_1',
    name: 'Cuby 1',
    options: {
      texture: image_texture_cuby_1
    }
  },
  {
    id: 'cuby_post_1',
    name: 'Cuby Post 1',
    options: {
      texture: image_texture_cuby_post_1
    }
  },
  {
    id: 'you_gotta_do',
    name: 'You Gotta do…',
    options: {
      texture: image_texture_you_gotta_do
    }
  },
  {
    id: 'lenna',
    name: 'Lenna',
    options: {
      texture: image_texture_lenna
    }
  }
];

export default skins;

export const skinsMap = mapSkins<UnitSkinIdentifier, (typeof skins)[0]>(skins);
