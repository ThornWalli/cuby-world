import type { WallSkinItem } from '@cuby-world/app/lib/types/wall/catalog';
import { CATALOG_TAG } from '@cuby-world/app/lib/utils/catalog';

const colors = {
  very_light: '#F5F5F5',
  off_white: '#F2F2EE',
  plaster_warm: '#ECE8E0',
  plaster_cool: '#EDEDED',
  raw_plaster: '#DADADA',
  concrete: '#9E9E9E'
};

const skins: WallSkinItem[] = [
  {
    id: 'default_base',
    skin: 'default_base',
    name: 'Default',
    type: 'default',
    options: {
      color: colors.very_light
    }
  },
  {
    id: 'default_texture_default',
    skin: 'default_texture_default',
    name: 'Default Texture',
    tags: [CATALOG_TAG.TEXTURE],
    type: 'default',
    options: {
      color: '#ffffff',
      texture: { id: 'default' }
    }
  },
  {
    id: 'default_texture_brick_1',
    skin: 'default_texture_brick_1',
    name: 'Brick 1',
    tags: [CATALOG_TAG.TEXTURE],
    type: 'default',
    options: {
      color: '#ffffff',
      texture: { id: 'brick_1' }
    }
  },
  {
    id: 'default_color_blue',
    skin: 'default_color_blue',
    name: 'Blue',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#0066ff'
    }
  },
  {
    id: 'default_color_red',
    skin: 'default_color_red',
    name: 'Red',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#d70000'
    }
  },
  {
    id: 'default_color_green',
    skin: 'default_color_green',
    name: 'Green',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#009925'
    }
  },
  {
    id: 'default_color_orange',
    skin: 'default_color_orange',
    name: 'Orange',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#f59e0b'
    }
  },
  {
    id: 'default_color_white',
    skin: 'default_color_white',
    name: 'White',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#ffffff'
    }
  },
  {
    id: 'default_color_light_red',
    skin: 'default_color_light_red',
    name: 'Light Red',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#f28b82'
    }
  },
  {
    id: 'default_color_light_orange',
    skin: 'default_color_light_orange',
    name: 'Light Orange',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#fbbc04'
    }
  },
  {
    id: 'default_color_light_yellow',
    skin: 'default_color_light_yellow',
    name: 'Light Yellow',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#fff475'
    }
  },
  {
    id: 'default_color_light_green',
    skin: 'default_color_light_green',
    name: 'Light Green',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#ccff90'
    }
  },
  {
    id: 'default_color_light_teal',
    skin: 'default_color_light_teal',
    name: 'Light Teal',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#a7ffeb'
    }
  },
  {
    id: 'default_color_light_blue',
    skin: 'default_color_light_blue',
    name: 'Light Blue',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#cbf0f8'
    }
  },
  {
    id: 'default_color_light_dark_blue',
    skin: 'default_color_light_dark_blue',
    name: 'Light Dark Blue',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#aecbfa'
    }
  },
  {
    id: 'default_color_light_purple',
    skin: 'default_color_light_purple',
    name: 'Light Purple',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#d7aefb'
    }
  },
  {
    id: 'default_color_light_pinkle',
    skin: 'default_color_light_pinkle',
    name: 'Light Pink',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#fdcfe8'
    }
  },
  {
    id: 'default_color_light_light_brown',
    skin: 'default_color_light_light_brown',
    name: 'Light Brown',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#e6c9a8'
    }
  },
  {
    id: 'default_color_light_light_gray',
    skin: 'default_color_light_light_gray',
    name: 'Light Gray',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    options: {
      color: '#e8eaed'
    }
  }
];

export default new Map(skins.map(s => [s.id, s]));
