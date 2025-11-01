import type Unit from '@cuby-world/app/lib/classes/Unit';
import type { UnitItem } from '@cuby-world/app/lib/types/unit/catalog';

import { CATALOG_TAG } from '@cuby-world/app/lib/utils/catalog';
import { skinsMap as cubySkinMap } from './cuby/skins';
import { skinsMap as polyCharacterSkinMap } from './poly_character/skins';
import { skinsMap as shelf1SkinMap } from './shelf_1/skins';
import { skinsMap as wallLamp1SkinMap } from './wall_lamp_1/skins';
import { skinsMap as doormate1SkinMap } from './doormate_1/skins';
import { skinsMap as lamp1SkinMap } from './lamp_1/skins';
import { skinsMap as cardboardBoxSkinMap } from './cardboardBox/skins';

export const items: UnitItem[] = [
  {
    id: 'doormate_1',
    name: 'Doormate 1',
    description: 'A friendly doormate to welcome you home.',
    tags: [CATALOG_TAG.FURNITURE],
    skins: Array.from(doormate1SkinMap.values()),
    defaultSkinId: doormate1SkinMap.get('default')!.id,
    skinMap: doormate1SkinMap,
    instance: () =>
      import('./doormate_1/Doormate_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'lamp_1',
    name: 'Lamp 1',
    description: 'A stylish lamp to light up your space.',
    tags: [CATALOG_TAG.LIGHT],
    skins: Array.from(lamp1SkinMap.values()),
    defaultSkinId: lamp1SkinMap.get('default')!.id,
    skinMap: lamp1SkinMap,
    instance: () =>
      import('./lamp_1/Lamp_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'wallLamp_1',
    name: 'Wall Lamp 1',
    description: 'A stylish lamp to light up your space.',
    tags: [CATALOG_TAG.LIGHT],
    skins: Array.from(wallLamp1SkinMap.values()),
    defaultSkinId: wallLamp1SkinMap.get('default')!.id,
    skinMap: wallLamp1SkinMap,

    instance: () =>
      import('./wall_lamp_1/WallLamp_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'cardboardBox',
    name: 'Cardboard Box',
    description: 'A simple cardboard box for storage or play.',
    tags: [CATALOG_TAG.FURNITURE],
    skins: Array.from(cardboardBoxSkinMap.values()),
    defaultSkinId: cardboardBoxSkinMap.get('default')!.id,
    skinMap: cardboardBoxSkinMap,
    instance: () =>
      import('./cardboardBox/CardboardBox').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'shelf_1',
    name: 'Shelf Basic',
    description: 'A basic wall shelf for storage or display.',
    tags: [CATALOG_TAG.FURNITURE],
    skins: Array.from(shelf1SkinMap.values()),
    defaultSkinId: shelf1SkinMap.get('default')!.id,
    skinMap: shelf1SkinMap,
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
    defaultSkinId: polyCharacterSkinMap.get('default')!.id,
    skinMap: polyCharacterSkinMap,
    tags: ['player'],
    instance: () =>
      import('./poly_character/PolyCharacter').then(
        m => m.default as typeof Unit
      ),
    options: {}
  }
];

export const catalog = new Map(items.map(w => [w.id, w]));
