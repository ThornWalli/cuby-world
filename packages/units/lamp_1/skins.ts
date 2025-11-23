import type { SkinOptions } from '@cuby-world/app/lib/types/skin';
import { mapSkins } from '@cuby-world/app/lib/utils/skins';
import type {
  UnitSkinDescription,
  UnitSkinIdentifier
} from '@cuby-world/app/lib/utils/unit/skins';
import image_texture_default from './assets/textures/default/light_default_bulb.jpg';

interface Lamp1SkinOptions extends SkinOptions {
  color: string;
  texture?: string;
}

export type Lamp1SkinDescription = UnitSkinDescription<Lamp1SkinOptions>;

const skins: Lamp1SkinDescription[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard skin with neutral color.',
    options: {
      color: '#ffffff',
      texture: image_texture_default
    }
  },
  {
    id: 'cold_white',
    name: 'Cold White',
    description: 'Standard skin with neutral color.',
    options: {
      color: '#ffffff',
      texture: image_texture_default
    }
  },
  {
    id: 'warm_white',
    name: 'Warm White',
    description: 'Standard skin with warm color.',
    options: {
      color: '#ffdca3',
      texture: image_texture_default
    }
  },
  {
    id: 'yellow',
    name: 'Yellow',
    description: 'Standard skin with yellow color.',
    options: {
      color: '#ffff00',
      texture: image_texture_default
    }
  },
  {
    id: 'red',
    name: 'Red',
    description: 'Standard skin with red color.',
    options: {
      color: '#ff0000',
      texture: image_texture_default
    }
  },
  {
    id: 'blue',
    name: 'Blue',
    description: 'Standard skin with blue color.',
    options: {
      color: '#0000ff',
      texture: image_texture_default
    }
  },
  {
    id: 'green',
    name: 'Green',
    description: 'Standard skin with green color.',
    options: {
      color: '#00ff00',
      texture: image_texture_default
    }
  },
  {
    id: 'purple',
    name: 'Purple',
    description: 'Standard skin with purple color.',
    options: {
      color: '#800080',
      texture: image_texture_default
    }
  },
  {
    id: 'pink',
    name: 'Pink',
    description: 'Standard skin with pink color.',
    options: {
      color: '#ff69b4',
      texture: image_texture_default
    }
  },
  {
    id: 'orange',
    name: 'Orange',
    description: 'Standard skin with orange color.',
    options: {
      color: '#ffa500',
      texture: image_texture_default
    }
  },
  {
    id: 'cyan',
    name: 'Cyan',
    description: 'Standard skin with cyan color.',
    options: {
      color: '#00ffff',
      texture: image_texture_default
    }
  },
  {
    id: 'lime',
    name: 'Lime',
    description: 'Standard skin with lime color.',
    options: {
      color: '#00ff7f',
      texture: image_texture_default
    }
  },
  {
    id: 'magenta',
    name: 'Magenta',
    description: 'Standard skin with magenta color.',
    options: {
      color: '#ff00ff',
      texture: image_texture_default
    }
  }
];

export default skins;

export const skinsMap = mapSkins<UnitSkinIdentifier, (typeof skins)[0]>(skins);
