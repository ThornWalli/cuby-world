import type {
  GroundSkinDescription,
  GroundSkinOptions
} from '@cuby-world/app/lib/types/ground/skins';
import { SKIN_TAG } from '@cuby-world/app/lib/types/skin';
import { GROUND_COST } from '@cuby-world/app/lib/utils/ground/cost';

type DefaultSkinOptions = GroundSkinOptions;

export type DefaultSkinDescription = GroundSkinDescription<DefaultSkinOptions>;

const skins: DefaultSkinDescription[] = [
  {
    id: 'default_editor_empty',
    name: 'Edit Empty',
    tags: [SKIN_TAG.HIDE],
    options: {
      cost: GROUND_COST.VERY_SLOW,
      color: '#000000',
      accessible: false,
      opacity: 0.4,
      texture: { id: 'edit_empty' }
    }
  },
  {
    id: 'default_empty',
    name: 'EMPTY',
    tags: [SKIN_TAG.HIDE],
    options: {
      cost: GROUND_COST.VERY_SLOW,
      accessible: false,
      opacity: 0
    }
  },
  {
    id: 'default_base',
    name: 'Base',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#DADADA'
    }
  },
  {
    id: 'default_wood_laminate_1',
    name: 'Wood Laminate',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      cost: GROUND_COST.FAST,
      color: '#F0CDAC',
      texture: { id: 'wood_laminate_1' }
    }
  },
  {
    id: 'default_grass_1',
    name: 'Grass 1',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      cost: GROUND_COST.SLOW,
      color: '#ffffff',
      texture: { id: 'grass_1' }
    }
  },
  {
    id: 'default_stone_1',
    name: 'Stone 1',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      cost: GROUND_COST.SLOW,
      color: '#ffffff',
      texture: { id: 'stone_1' }
    }
  },
  {
    id: 'default_tile_small_1',
    name: 'Tile Small 1',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#ffffff',
      texture: { id: 'tile_small_1' }
    }
  },
  {
    id: 'default_tile_large_terracota_1',
    name: 'Tile Large Terracota 1',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#ffffff',
      texture: { id: 'tile_large_terracota_1' }
    }
  },
  {
    id: 'default_color_blue',
    name: 'Blue',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#0066ff'
    }
  },
  {
    id: 'default_color_red',
    name: 'Red',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#d70000'
    }
  },
  {
    id: 'default_color_green',
    name: 'Green',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#009925'
    }
  },
  {
    id: 'default_color_orange',
    name: 'Orange',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#f59e0b'
    }
  },
  {
    id: 'default_color_white',
    name: 'White',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#ffffff'
    }
  },
  {
    id: 'default_color_light_red',
    name: 'Light Red',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#f28b82'
    }
  },
  {
    id: 'default_color_light_orange',
    name: 'Light Orange',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#fbbc04'
    }
  },
  {
    id: 'default_color_light_yellow',
    name: 'Light Yellow',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#fff475'
    }
  },
  {
    id: 'default_color_light_green',
    name: 'Light Green',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#ccff90'
    }
  },
  {
    id: 'default_color_light_teal',
    name: 'Light Teal',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#a7ffeb'
    }
  },
  {
    id: 'default_color_light_blue',
    name: 'Light Blue',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#cbf0f8'
    }
  },
  {
    id: 'default_color_light_dark_blue',
    name: 'Light Dark Blue',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#aecbfa'
    }
  },
  {
    id: 'default_color_light_purple',
    name: 'Light Purple',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#d7aefb'
    }
  },
  {
    id: 'default_color_light_pinkle',
    name: 'Light Pink',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#fdcfe8'
    }
  },
  {
    id: 'default_color_light_light_brown',
    name: 'Light Brown',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#e6c9a8'
    }
  },
  {
    id: 'default_color_light_light_gray',
    name: 'Light Gray',
    tags: [SKIN_TAG.COLOR],
    options: {
      cost: GROUND_COST.NORMAL,
      color: '#e8eaed'
    }
  }
];

export default skins;
