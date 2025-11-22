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
import { skinsMap as sign_protest_1_skinMap } from './sign_protest_1/skins';
import { skinsMap as sign_street_1_skinMap } from './sign_street_1/skins';
import { skinsMap as billboard_large_1_skinMap } from './billboard_large_1/skins';
import { skinsMap as teleporter_1_skinMap } from './teleporter_1/skins';

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
    id: 'sign_protest_1',
    name: 'Sign Protest 1',
    tags: [CATALOG_TAG.DECORATION],
    skins: Array.from(sign_protest_1_skinMap.values()),
    defaultSkinId: sign_protest_1_skinMap.get('default')!.id,
    skinMap: sign_protest_1_skinMap,
    instance: () =>
      import('./sign_protest_1/SignProtest_1').then(
        m => m.default as typeof Unit
      ),
    options: {}
  },
  {
    id: 'sign_street_1',
    name: 'Sign Street 1',
    tags: [CATALOG_TAG.DECORATION],
    skins: Array.from(sign_street_1_skinMap.values()),
    defaultSkinId: sign_street_1_skinMap.get('default')!.id,
    skinMap: sign_street_1_skinMap,
    instance: () =>
      import('./sign_street_1/SignStreet_1').then(
        m => m.default as typeof Unit
      ),
    options: {}
  },
  {
    id: 'billboard_large_1',
    name: 'Billboard Large 1',
    tags: [CATALOG_TAG.DECORATION],
    skins: Array.from(billboard_large_1_skinMap.values()),
    defaultSkinId: billboard_large_1_skinMap.get('default')!.id,
    skinMap: billboard_large_1_skinMap,
    instance: () =>
      import('./billboard_large_1/BillboardLarge_1').then(
        m => m.default as typeof Unit
      ),
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
    id: 'bed_1',
    name: 'Bed Basic',
    description: 'A basic bed for seating.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: new Map(),
    skins: [],
    instance: () => import('./bed_1/Bed_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'bathroom_sink_1',
    name: 'Bathroom Sink Basic',
    description: 'A basic sink.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: new Map(),
    skins: [],
    instance: () =>
      import('./bathroom_sink_1/BathroomSink_1').then(
        m => m.default as typeof Unit
      ),
    options: {}
  },
  {
    id: 'bathroom_toilet_1',
    name: 'Bathroom Toilet Basic',
    description: 'A basic toilet.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: new Map(),
    skins: [],
    instance: () =>
      import('./bathroom_toilet_1/BathroomToilet_1').then(
        m => m.default as typeof Unit
      ),
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
    id: 'bench_1x2_1',
    name: 'Bench 1x2 Basic',
    description: 'A basic bench for seating.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: new Map(),
    skins: [],
    instance: () =>
      import('./bench_1x2_1/Bench_1x2_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'bench_1x3_1',
    name: 'Bench 1x3 Basic',
    description: 'A basic bench for seating.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: new Map(),
    skins: [],
    instance: () =>
      import('./bench_1x3_1/Bench_1x3_1').then(m => m.default as typeof Unit),
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
  },
  {
    id: 'teleporter_1',
    name: 'Teleporter',
    description: 'A teleporter for teleporting.',
    tags: [CATALOG_TAG.FURNITURE],
    skins: Array.from(teleporter_1_skinMap.values()),
    defaultSkinId: teleporter_1_skinMap.get('default')!.id,
    skinMap: teleporter_1_skinMap,
    instance: () =>
      import('./teleporter_1/Teleporter_1').then(m => m.default as typeof Unit),
    options: {}
  },
  {
    id: 'teleporter_default',
    name: 'Teleporter Default',
    description: 'A default teleporter for teleporting.',
    tags: [CATALOG_TAG.FURNITURE],
    defaultSkinId: 'default',
    skinMap: new Map(),
    skins: [],
    instance: () =>
      import('./teleporter_default/Teleporter_Default').then(
        m => m.default as typeof Unit
      ),
    options: {}
  }
];

export const catalog = new Map(items.map(w => [w.id, w]));
