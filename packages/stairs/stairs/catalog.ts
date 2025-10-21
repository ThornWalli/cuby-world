import type { StairItem } from '@cuby-world/app/lib/types/stair/catalog';
import skins_default_1x1 from './default_1x1/skins';
import skins_default_3x1 from './default_3x1/skins';
import type Stair from '@cuby-world/app/lib/classes/Stair';

const items: StairItem[] = [
  {
    id: 'default_1x1',
    name: 'Default 1x1 Stair',
    description: 'Überzeugt mit zeitlosem Design und Funktionalität.',
    skins: skins_default_1x1,
    instance: () =>
      import('./default_1x1/Default1x1Stair').then(
        m => m.default as typeof Stair
      ),
    options: {
      skin: 'default'
    }
  },
  {
    id: 'default_3x1',
    name: 'Default 3x1 Stair',
    description: 'Überzeugt mit zeitlosem Design und Funktionalität.',
    tags: ['frame'],
    skins: skins_default_3x1,
    instance: () =>
      import('./default_3x1/Default3x1Stair').then(
        m => m.default as typeof Stair
      ),
    options: {
      skin: 'default'
    }
  }
];

export const catalog = new Map<string, StairItem>(items.map(w => [w.id, w]));
