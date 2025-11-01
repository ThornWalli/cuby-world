import type { SkinOptions } from '@cuby-world/app/lib/types/skin';
import { mapSkins } from '@cuby-world/app/lib/utils/skins';
import type {
  UnitSkinDescription,
  UnitSkinIdentifier
} from '@cuby-world/app/lib/utils/unit/skins';

interface WallLamp1SkinOptions extends SkinOptions {
  color: string | number;
}

export type WallLamp1SkinDescription =
  UnitSkinDescription<WallLamp1SkinOptions>;

const skins: WallLamp1SkinDescription[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard skin with neutral color.',
    options: {
      color: 0xffeeaa
    }
  },
  {
    id: 'red',
    name: 'Red',
    description: 'Sleek and modern red skin.',
    options: {
      color: '#ff0000'
    }
  },
  {
    id: 'green',
    name: 'Green',
    description: 'Sleek and modern green skin.',
    options: {
      color: '#00ff00'
    }
  },
  {
    id: 'blue',
    name: 'Blue',
    description: 'Sleek and modern blue skin.',
    options: {
      color: '#0000ff'
    }
  }
];

export default skins;

export const skinsMap = mapSkins<UnitSkinIdentifier, (typeof skins)[0]>(skins);
