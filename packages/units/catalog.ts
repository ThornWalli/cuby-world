import type Unit from '@cuby-world/app/lib/classes/Unit';
import type { UnitItem } from '@cuby-world/app/lib/types/unit/catalog';

import { CATALOG_TAG } from '@cuby-world/app/lib/utils/catalog';
import { skinsMap as cubySkinMap } from './cuby/skins';
import { skinsMap as polyManSkinMap } from './poly_man/skins';
import { skinsMap as shelf_1_skinMap } from './shelf_1/skins';
import { skinsMap as wallLamp_1_skinMap } from './wall_lamp_1/skins';
import { skinsMap as doormate_1_skinMap } from './doormate_1/skins';
import { skinsMap as lamp_1_skinMap } from './lamp_1/skins';
import { skinsMap as cardboardBox_1_skinMap } from './cardboard_box_1/skins';

export const items: UnitItem[] = [
  {
    id: 'doormate_1',
    name: 'Doormate 1',
    description: 'A friendly doormate to welcome you home.',
    tags: [CATALOG_TAG.FURNITURE],
    skins: Array.from(doormate_1_skinMap.values()),
    defaultSkinId: doormate_1_skinMap.get('default')!.id,
    skinMap: doormate_1_skinMap,
    instance: () =>
      import('./doormate_1/Doormate_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'lamp_1',
    name: 'Lamp 1',
    description: 'A stylish lamp to light up your space.',
    tags: [CATALOG_TAG.LIGHT],
    skins: Array.from(lamp_1_skinMap.values()),
    defaultSkinId: lamp_1_skinMap.get('default')!.id,
    skinMap: lamp_1_skinMap,
    instance: () =>
      import('./lamp_1/Lamp_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'wallLamp_1',
    name: 'Wall Lamp 1',
    description: 'A stylish lamp to light up your space.',
    tags: [CATALOG_TAG.LIGHT],
    skins: Array.from(wallLamp_1_skinMap.values()),
    defaultSkinId: wallLamp_1_skinMap.get('default')!.id,
    skinMap: wallLamp_1_skinMap,

    instance: () =>
      import('./wall_lamp_1/WallLamp_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'cardboard_box_1',
    name: 'Cardboard Box 1',
    description: 'A simple cardboard box for storage or play.',
    tags: [CATALOG_TAG.FURNITURE],
    skins: Array.from(cardboardBox_1_skinMap.values()),
    defaultSkinId: cardboardBox_1_skinMap.get('default')!.id,
    skinMap: cardboardBox_1_skinMap,
    instance: () =>
      import('./cardboard_box_1/CardboardBox_1').then(
        m => m.default as typeof Unit
      ),
    options: {}
  },
  {
    id: 'shelf_1',
    name: 'Shelf Basic',
    description: 'A basic wall shelf for storage or display.',
    tags: [CATALOG_TAG.FURNITURE],
    skins: Array.from(shelf_1_skinMap.values()),
    defaultSkinId: shelf_1_skinMap.get('default')!.id,
    skinMap: shelf_1_skinMap,
    instance: () =>
      import('./shelf_1/Shelf_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'chair_1',
    name: 'Chair Basic',
    description: 'A basic chair for seating.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: new Map(),
    skins: [],
    instance: () =>
      import('./chair_1/Chair_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'table_1',
    name: 'Table Basic',
    description: 'A basic table for various uses.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: new Map(),
    skins: [],
    instance: () =>
      import('./table_1/Table_1').then(m => m.default as typeof Unit),
    options: {}
  },
  // characters

  {
    hide: true,
    id: 'cuby',
    name: 'Cuby',
    description: 'The iconic Cuby unit.',
    skins: Array.from(cubySkinMap.values()),
    defaultSkinId: cubySkinMap.get('default')!.id,
    skinMap: cubySkinMap,
    tags: ['player'],
    instance: () => import('./cuby/Cuby').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    hide: true,
    id: 'character',
    name: 'Character',
    description: 'Base character unit for players.',
    skins: [],
    defaultSkinId: '',
    skinMap: new Map(),
    tags: ['player'],
    instance: () =>
      import('./character/Character').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    hide: true,
    id: 'poly_character',
    name: 'Poly Character',
    description: 'Base character unit for players.',
    skins: Array.from(cubySkinMap.values()),
    defaultSkinId: polyManSkinMap.get('default')!.id,
    skinMap: polyManSkinMap,
    tags: ['player'],
    instance: () =>
      import('./poly_man/PolyMan').then(m => m.default as typeof Unit),
    options: {}
  }
];

export const catalog = new Map(items.map(w => [w.id, w]));
