import skins_default from './default/skins';
import type { GroundItem } from '@cuby-world/app/lib/types/ground/catalog';
import type Ground from '@cuby-world/app/lib/classes/Ground';

const items: GroundItem[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Überzeugt mit zeitlosem Design und Funktionalität.',
    instance: () =>
      import('./default/Default').then(m => m.default as typeof Ground),
    skins: skins_default,
    options: {
      skin: 'default'
    }
  }
];

export const catalog = new Map<string, GroundItem>(items.map(w => [w.id, w]));
