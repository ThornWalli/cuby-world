import type Unit from '@cuby-world/app/lib/classes/Unit';
import type { UnitItem } from '@cuby-world/app/lib/types/unit/catalog';

export const items: UnitItem[] = [
  {
    id: 'doormate_1',
    name: 'Doormate 1',
    description: 'A friendly doormate to welcome you home.',
    tags: ['companion'],
    instance: () =>
      import('./doormate_1/Doormate_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'lamp_1',
    name: 'Lamp 1',
    description: 'A stylish lamp to light up your space.',
    tags: ['furniture'],
    instance: () => import('./lamp/Lamp').then(m => m.default as typeof Unit),
    options: {}
  }
];

export const catalog = new Map(items.map(w => [w.id, w]));
