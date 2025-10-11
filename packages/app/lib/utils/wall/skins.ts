import type { WallSkinIdentifier, WallStyle } from '../../types/wall/skins';
import { CATALOG_TAG, type CatalogItem } from '../catalog';

export function getDefaultSkin(): [WallSkinIdentifier, WallSkinIdentifier] {
  return ['default', 'default'];
}

const colors = {
  very_light: '#F5F5F5',
  off_white: '#F2F2EE',
  plaster_warm: '#ECE8E0',
  plaster_cool: '#EDEDED',
  raw_plaster: '#DADADA',
  concrete: '#9E9E9E'
};

export interface WallSkinItem extends CatalogItem {
  skin: WallSkinIdentifier;
  options: WallStyle;
}

const skins: WallSkinItem[] = [
  {
    id: 'default',
    skin: 'default',
    name: 'Default',
    options: {
      type: 'default',
      color: colors.very_light
    }
  },
  {
    id: 'texture_default',
    skin: 'texture_default',
    name: 'Default Texture',
    tags: [CATALOG_TAG.TEXTURE],
    options: {
      type: 'default',
      color: '#ffffff',
      texture: { id: 'default' }
    }
  },
  {
    id: 'texture_brick_1',
    skin: 'texture_brick_1',
    name: 'Brick 1',
    tags: [CATALOG_TAG.TEXTURE],
    options: {
      type: 'default',
      color: '#ffffff',
      texture: { id: 'brick_1' }
    }
  },
  {
    id: 'color_blue',
    skin: 'color_blue',
    name: 'Blue',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#0066ff'
    }
  },
  {
    id: 'color_red',
    skin: 'color_red',
    name: 'Red',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#d70000'
    }
  },
  {
    id: 'color_green',
    skin: 'color_green',
    name: 'Green',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#009925'
    }
  },
  {
    id: 'color_orange',
    skin: 'color_orange',
    name: 'Orange',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#f59e0b'
    }
  },
  {
    id: 'color_white',
    skin: 'color_white',
    name: 'White',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#ffffff'
    }
  },
  {
    id: 'color_light_red',
    skin: 'color_light_red',
    name: 'Light Red',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#f28b82'
    }
  },
  {
    id: 'color_light_orange',
    skin: 'color_light_orange',
    name: 'Light Orange',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#fbbc04'
    }
  },
  {
    id: 'color_light_yellow',
    skin: 'color_light_yellow',
    name: 'Light Yellow',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#fff475'
    }
  },
  {
    id: 'color_light_green',
    skin: 'color_light_green',
    name: 'Light Green',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#ccff90'
    }
  },
  {
    id: 'color_light_teal',
    skin: 'color_light_teal',
    name: 'Light Teal',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#a7ffeb'
    }
  },
  {
    id: 'color_light_blue',
    skin: 'color_light_blue',
    name: 'Light Blue',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#cbf0f8'
    }
  },
  {
    id: 'color_light_dark_blue',
    skin: 'color_light_dark_blue',
    name: 'Light Dark Blue',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#aecbfa'
    }
  },
  {
    id: 'color_light_purple',
    skin: 'color_light_purple',
    name: 'Light Purple',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#d7aefb'
    }
  },
  {
    id: 'color_light_pinkle',
    skin: 'color_light_pinkle',
    name: 'Light Pink',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#fdcfe8'
    }
  },
  {
    id: 'color_light_light_brown',
    skin: 'color_light_light_brown',
    name: 'Light Brown',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#e6c9a8'
    }
  },
  {
    id: 'color_light_light_gray',
    skin: 'color_light_light_gray',
    name: 'Light Gray',
    tags: [CATALOG_TAG.COLOR],
    options: {
      type: 'default',
      color: '#e8eaed'
    }
  }
];

export default new Map(skins.map(s => [s.id, s]));
