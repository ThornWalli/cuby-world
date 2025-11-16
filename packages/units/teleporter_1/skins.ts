import type { SkinOptions } from '@cuby-world/app/lib/types/skin';
import { mapSkins } from '@cuby-world/app/lib/utils/skins';
import type {
  UnitSkinDescription,
  UnitSkinIdentifier
} from '@cuby-world/app/lib/utils/unit/skins';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Teleporter1SkinOptions extends SkinOptions {}

export type Teleporter1SkinDescription =
  UnitSkinDescription<Teleporter1SkinOptions>;

const skins: Teleporter1SkinDescription[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard skin with neutral color.',
    options: {}
  }
];

export default skins;

export const skinsMap = mapSkins<UnitSkinIdentifier, (typeof skins)[0]>(skins);
