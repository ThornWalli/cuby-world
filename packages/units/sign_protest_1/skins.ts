import type { SkinOptions } from '@cuby-world/app/lib/types/skin';
import { mapSkins } from '@cuby-world/app/lib/utils/skins';
import type {
  UnitSkinDescription,
  UnitSkinIdentifier
} from '@cuby-world/app/lib/utils/unit/skins';

import image_texture_cuby_1 from './assets/textures/cuby_1.jpg';
import image_texture_lenna from './assets/textures/lenna.jpg';

import image_texture_question_mark from './assets/textures/question_mark.png';
import image_texture_cuby_first from './assets/textures/cuby_first.png';

export type TexturePath = string;

interface SignProtestSkinOptions extends SkinOptions {
  texture?: TexturePath;
}

export type SignProtestSkinDescription =
  UnitSkinDescription<SignProtestSkinOptions>;

const skins: SignProtestSkinDescription[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard skin (Transarent).',
    options: {}
  },
  {
    id: 'cuby',
    name: 'Cuby',
    description: 'Standard skin with cuby face.',
    options: {
      texture: image_texture_cuby_1
    }
  },
  {
    id: 'lenna',
    name: 'Lenna',
    options: {
      texture: image_texture_lenna
    }
  },
  {
    id: 'question_mark',
    name: 'Question Mark',
    options: {
      texture: image_texture_question_mark
    }
  },
  {
    id: 'cuby_first',
    name: 'Cuby First',
    options: {
      texture: image_texture_cuby_first
    }
  }
];

export default skins;

export const skinsMap = mapSkins<UnitSkinIdentifier, (typeof skins)[0]>(skins);
