import type { SkinOptions } from '@cuby-world/app/lib/types/skin';
import type { UnitSkinDescription } from '@cuby-world/app/lib/utils/unit/skins';

interface CubySkinOptions extends SkinOptions {
  color: string | number;
}

export type CubySkinDescription = UnitSkinDescription<CubySkinOptions>;

const skins: CubySkinDescription[] = [
  {
    id: 'default',
    name: 'Blue',
    description: 'Standard skin with cuby blue.',
    options: {
      color: 0x0066ff
    }
  },
  {
    id: 'green',
    name: 'Green',
    description: 'Vibrant green skin.',
    options: {
      color: 0x447821
    }
  },
  {
    id: 'red',
    name: 'Red',
    description: 'Bold red skin.',
    options: {
      color: 0x800000
    }
  },
  {
    id: 'orange',
    name: 'Orange',
    description: 'Bright orange skin.',
    options: {
      color: 0xff7f2a
    }
  },
  {
    id: 'light_orange',
    name: 'Light Orange',
    description: 'Soft light orange skin.',
    options: {
      color: 0xffb380
    }
  },
  {
    id: 'brown',
    name: 'Brown',
    description: 'Earthy brown skin.',
    options: {
      color: 0x502d16
    }
  }
];

export default skins;

export const skinsMap: Map<string, CubySkinDescription> = new Map(
  skins.map(skin => [skin.id, skin])
);
