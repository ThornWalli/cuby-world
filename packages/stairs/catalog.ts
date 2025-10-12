import type { CatalogItem } from '@cuby-world/app/lib/types/catalog';
import type { StairIdentifier } from '@cuby-world/app/lib/types/stair';
import type { StairSkinIdentifier } from '@cuby-world/app/lib/types/stair/skins';

export interface StairItem extends CatalogItem {
  options: {
    type: StairIdentifier;
    skin: StairSkinIdentifier;
  };
}

const stairs: StairItem[] = [
  {
    id: 'default_stair_standard',
    name: 'Standard Stair',
    description: 'Überzeugt mit zeitlosem Design und Funktionalität.',
    options: {
      type: 'default',
      skin: 'default'
    }
  }
];
export const stairsCatalog = new Map(stairs.map(d => [d.id, d]));
export const catalog = new Map([...stairs].map(w => [w.id, w]));
