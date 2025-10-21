import type {
  SkinDescription,
  SkinOptions
} from '@cuby-world/app/lib/types/skin';
import type { WallExtensionSkinIdentifier } from '@cuby-world/app/lib/types/wall/extension/skins';

interface StandardSkinOptions extends SkinOptions {
  color: string;
}

export type StandardSkinDescription = SkinDescription<
  WallExtensionSkinIdentifier,
  StandardSkinOptions
>;

const skins: StandardSkinDescription[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard skin with neutral color.',
    options: {
      color: '#ff00ff'
    }
  },
  {
    id: 'white',
    name: 'White',
    description: 'Bright and clean white skin.',
    options: {
      color: '#ffffff'
    }
  },
  {
    id: 'black',
    name: 'Black',
    description: 'Sleek and modern black skin.',
    options: {
      color: '#000000'
    }
  }
];

export default skins;
