import type {
  SkinDescription,
  SkinOptions
} from '@cuby-world/app/lib/types/skin';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';

interface DefaultSkinOptions extends SkinOptions {
  color: string;
}

export type Default3x1SkinDescription = SkinDescription<
  StairSkinIdentifier,
  DefaultSkinOptions
>;

const skins: Default3x1SkinDescription[] = [
  {
    id: 'default',
    name: 'Default Skin',
    options: {
      color: '#bfbfbf'
    }
  },
  {
    id: 'red',
    name: 'Red Skin',
    options: {
      color: '#ff0000'
    }
  }
];

export default skins;
