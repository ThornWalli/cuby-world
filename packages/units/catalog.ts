import type Unit from '@cuby-world/app/lib/classes/Unit';
import type { UnitItem } from '@cuby-world/app/lib/types/unit/catalog';

import doormate1Skins from './doormate_1/skins';
import lampe1Skins from './lamp/skins';
import cardboardBoxSkins from './cardboardBox/skins';
import shelf1Skins from './shelf_1/skins';

import wallLamp1Skins from './wall_lamp_1/skins';
import { mapSkins } from '@cuby-world/app/lib/utils/skins';
import type { UnitSkinIdentifier } from '@cuby-world/app/lib/utils/unit/skins';
import { CATALOG_TAG } from '@cuby-world/app/lib/utils/catalog';

export const items: UnitItem[] = [
  {
    id: 'doormate_1',
    name: 'Doormate 1',
    description: 'A friendly doormate to welcome you home.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: mapSkins<UnitSkinIdentifier, (typeof doormate1Skins)[0]>(
      doormate1Skins
    ),
    skins: doormate1Skins,
    instance: () =>
      import('./doormate_1/Doormate_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'lamp_1',
    name: 'Lamp 1',
    description: 'A stylish lamp to light up your space.',
    tags: [CATALOG_TAG.LIGHT],
    defaultSkinId: lampe1Skins[0]!.id,
    skinMap: mapSkins<UnitSkinIdentifier, (typeof lampe1Skins)[0]>(lampe1Skins),
    skins: lampe1Skins,
    instance: () => import('./lamp/Lamp').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'wallLamp_1',
    name: 'Wall Lamp 1',
    description: 'A stylish lamp to light up your space.',
    tags: [CATALOG_TAG.LIGHT],
    defaultSkinId: wallLamp1Skins[0]!.id,
    skinMap: mapSkins<UnitSkinIdentifier, (typeof wallLamp1Skins)[0]>(
      wallLamp1Skins
    ),
    skins: wallLamp1Skins,

    instance: () =>
      import('./wall_lamp_1/WallLamp_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'cardboardBox',
    name: 'Cardboard Box',
    description: 'A simple cardboard box for storage or play.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: cardboardBoxSkins[0]!.id,
    skinMap: mapSkins<UnitSkinIdentifier, (typeof cardboardBoxSkins)[0]>(
      cardboardBoxSkins
    ),
    skins: cardboardBoxSkins,
    instance: () =>
      import('./cardboardBox/CardboardBox').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'shelf_1',
    name: 'Shelf Basic',
    description: 'A basic wall shelf for storage or display.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: shelf1Skins[0]!.id,
    skinMap: mapSkins<UnitSkinIdentifier, (typeof shelf1Skins)[0]>(shelf1Skins),
    skins: shelf1Skins,
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
    skins: [],
    defaultSkinId: '',
    skinMap: new Map(),
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
  }
];

export const catalog = new Map(items.map(w => [w.id, w]));
