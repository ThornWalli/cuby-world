import { SKIN_TAG, type SkinOptions } from '@cuby-world/app/lib/types/skin';
import type {
  WallSkinDescription,
  WallStyleTexture
} from '@cuby-world/app/lib/types/wall/skins';

import texture_stripes_horizontal_bw from './assets/texture/stripes_horizontal_bw.jpg?url';
import texture_stripes_vertical_bw from './assets/texture/stripes_vertical_bw.jpg?url';

import texture_brick_1 from './assets/texture/brick_1.png?url';

import texture_bubble_green_purple from './assets/texture/bubble_green_purple.jpg?url';
import texture_stars from './assets/texture/stars.jpg?url';

import texture_bathroom_tile_small_1 from './assets/texture/bathroom_tile_small_1.jpg?url';
import texture_bathroom_tile_medium_1 from './assets/texture/bathroom_tile_medium_1.jpg?url';

const colors = {
  very_light: '#F5F5F5',
  off_white: '#F2F2EE',
  plaster_warm: '#ECE8E0',
  plaster_cool: '#EDEDED',
  raw_plaster: '#DADADA',
  concrete: '#9E9E9E'
};
interface DefaultSkinOptions extends SkinOptions {
  texture?: WallStyleTexture;
  color: string | number;
}
export type DefaultWallSkinDescription =
  WallSkinDescription<DefaultSkinOptions>;

const skins: DefaultWallSkinDescription[] = [
  {
    id: 'default_base',
    name: 'Default',
    options: {
      color: colors.very_light
    }
  },
  {
    id: 'default_texture_stripes_horizontal_bw',
    name: 'Stripes Horizontal B/W',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      color: '#ffffff',
      texture: { path: texture_stripes_horizontal_bw }
    }
  },
  {
    id: 'default_texture_stripes_vertical_bw',
    name: 'Stripes Vertical B/W',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      color: '#ffffff',
      texture: { path: texture_stripes_vertical_bw }
    }
  },
  {
    id: 'default_texture_brick_1',
    name: 'Brick 1',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      color: '#ffffff',
      texture: {
        path: texture_brick_1
      }
    }
  },
  {
    id: 'default_texture_bubble_green_purple',
    name: 'Bubble Green/Purple',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      color: '#ffffff',
      texture: { path: texture_bubble_green_purple }
    }
  },
  {
    id: 'default_texture_stars',
    name: 'Stars',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      color: '#ffffff',
      texture: { path: texture_stars }
    }
  },
  {
    id: 'texture_bathroom_tile_small_1',
    name: 'Bathroom Tile Small 1',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      color: '#ffffff',
      texture: { path: texture_bathroom_tile_small_1 }
    }
  },
  {
    id: 'texture_bathroom_tile_medium_1',
    name: 'Bathroom Tile Medium 1',
    tags: [SKIN_TAG.TEXTURE],
    options: {
      color: '#ffffff',
      texture: {
        path: texture_bathroom_tile_medium_1
      }
    }
  },

  {
    id: 'default_color_blue',
    name: 'Blue',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#0066ff'
    }
  },
  {
    id: 'default_color_red',
    name: 'Red',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#d70000'
    }
  },
  {
    id: 'default_color_green',
    name: 'Green',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#009925'
    }
  },
  {
    id: 'default_color_orange',
    name: 'Orange',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#f59e0b'
    }
  },
  {
    id: 'default_color_white',
    name: 'White',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#ffffff'
    }
  },
  {
    id: 'default_color_light_red',
    name: 'Light Red',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#f28b82'
    }
  },
  {
    id: 'default_color_light_orange',
    name: 'Light Orange',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#fbbc04'
    }
  },
  {
    id: 'default_color_light_yellow',
    name: 'Light Yellow',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#fff475'
    }
  },
  {
    id: 'default_color_light_green',
    name: 'Light Green',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#ccff90'
    }
  },
  {
    id: 'default_color_light_teal',
    name: 'Light Teal',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#a7ffeb'
    }
  },
  {
    id: 'default_color_light_blue',
    name: 'Light Blue',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#cbf0f8'
    }
  },
  {
    id: 'default_color_light_dark_blue',
    name: 'Light Dark Blue',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#aecbfa'
    }
  },
  {
    id: 'default_color_light_purple',
    name: 'Light Purple',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#d7aefb'
    }
  },
  {
    id: 'default_color_light_pinkle',
    name: 'Light Pink',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#fdcfe8'
    }
  },
  {
    id: 'default_color_light_light_brown',
    name: 'Light Brown',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#e6c9a8'
    }
  },
  {
    id: 'default_color_light_light_gray',
    name: 'Light Gray',
    tags: [SKIN_TAG.COLOR],
    options: {
      color: '#e8eaed'
    }
  }
];

export default skins;

export const skinMap = new Map(skins.map(s => [s.id, s]));

// const skins: WallSkinItem[] = [
//   {
//     id: 'default_base',
//     skin: 'default_base',
//     name: 'Default',
//     type: 'default',
//     options: {
//       color: colors.very_light
//     }
//   },
//   {
//     id: 'default_texture_default',
//     skin: 'default_texture_default',
//     name: 'Default Texture',
//     tags: [SKIN_TAG.TEXTURE],
//     type: 'default',
//     options: {
//       color: '#ffffff',
//       texture: { id: 'default' }
//     }
//   },
//   {
//     id: 'default_texture_brick_1',
//     skin: 'default_texture_brick_1',
//     name: 'Brick 1',
//     tags: [SKIN_TAG.TEXTURE],
//     type: 'default',
//     options: {
//       color: '#ffffff',
//       texture: { id: 'brick_1' }
//     }
//   },
//   {
//     id: 'default_color_blue',
//     skin: 'default_color_blue',
//     name: 'Blue',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#0066ff'
//     }
//   },
//   {
//     id: 'default_color_red',
//     skin: 'default_color_red',
//     name: 'Red',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#d70000'
//     }
//   },
//   {
//     id: 'default_color_green',
//     skin: 'default_color_green',
//     name: 'Green',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#009925'
//     }
//   },
//   {
//     id: 'default_color_orange',
//     skin: 'default_color_orange',
//     name: 'Orange',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#f59e0b'
//     }
//   },
//   {
//     id: 'default_color_white',
//     skin: 'default_color_white',
//     name: 'White',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#ffffff'
//     }
//   },
//   {
//     id: 'default_color_light_red',
//     skin: 'default_color_light_red',
//     name: 'Light Red',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#f28b82'
//     }
//   },
//   {
//     id: 'default_color_light_orange',
//     skin: 'default_color_light_orange',
//     name: 'Light Orange',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#fbbc04'
//     }
//   },
//   {
//     id: 'default_color_light_yellow',
//     skin: 'default_color_light_yellow',
//     name: 'Light Yellow',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#fff475'
//     }
//   },
//   {
//     id: 'default_color_light_green',
//     skin: 'default_color_light_green',
//     name: 'Light Green',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#ccff90'
//     }
//   },
//   {
//     id: 'default_color_light_teal',
//     skin: 'default_color_light_teal',
//     name: 'Light Teal',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#a7ffeb'
//     }
//   },
//   {
//     id: 'default_color_light_blue',
//     skin: 'default_color_light_blue',
//     name: 'Light Blue',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#cbf0f8'
//     }
//   },
//   {
//     id: 'default_color_light_dark_blue',
//     skin: 'default_color_light_dark_blue',
//     name: 'Light Dark Blue',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#aecbfa'
//     }
//   },
//   {
//     id: 'default_color_light_purple',
//     skin: 'default_color_light_purple',
//     name: 'Light Purple',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#d7aefb'
//     }
//   },
//   {
//     id: 'default_color_light_pinkle',
//     skin: 'default_color_light_pinkle',
//     name: 'Light Pink',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#fdcfe8'
//     }
//   },
//   {
//     id: 'default_color_light_light_brown',
//     skin: 'default_color_light_light_brown',
//     name: 'Light Brown',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#e6c9a8'
//     }
//   },
//   {
//     id: 'default_color_light_light_gray',
//     skin: 'default_color_light_light_gray',
//     name: 'Light Gray',
//     tags: [SKIN_TAG.COLOR],
//     type: 'default',
//     options: {
//       color: '#e8eaed'
//     }
//   }
// ];
