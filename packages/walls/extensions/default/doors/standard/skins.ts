import {
  SKIN_TAG,
  type SkinDescription,
  type SkinOptions
} from '@cuby-world/app/lib/types/skin';
import type { WallExtensionSkinIdentifier } from '@cuby-world/app/lib/types/wall/extension/skins';

interface StandardSkinOptions extends SkinOptions {
  color: string;
}

export type StandardSkinDescription = SkinDescription<
  StandardSkinOptions,
  WallExtensionSkinIdentifier
>;

const skins: StandardSkinDescription[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard skin with neutral color.',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#ff00ff'
    }
  },
  {
    id: 'white',
    name: 'White',
    description: 'Bright and clean white skin.',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#ffffff'
    }
  },
  {
    id: 'black',
    name: 'Black',
    description: 'Sleek and modern black skin.',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#000000'
    }
  }
];

export default skins;
