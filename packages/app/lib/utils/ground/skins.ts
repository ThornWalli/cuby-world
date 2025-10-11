import type { GroundSkin } from '../../types/ground/skins';
import {
  type CatalogItemIdentifier,
  type CatalogItem,
  CATALOG_TAG
} from '../catalog';

export type GrountStyleIdentifier = string;

export function getDefaultSkin(): GrountStyleIdentifier {
  return 'default';
}

export interface GroundSkinItem extends CatalogItem {
  skinId: GrountStyleIdentifier;
  skin: GroundSkin;
}

const styles: GroundSkinItem[] = [
  {
    id: 'hidden',
    skinId: 'hidden',
    name: 'HIDDEN',
    tags: [CATALOG_TAG.HIDE],
    skin: {
      accessible: false,
      opacity: 0.4,
      texture: { id: 'hidden' }
    }
  },
  {
    id: 'default',
    skinId: 'default',
    name: 'Default',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#DADADA'
    }
  },
  {
    id: 'wood_laminate_1',
    skinId: 'default',
    name: 'Wood Laminate',
    tags: [CATALOG_TAG.TEXTURE],
    skin: {
      color: '#F0CDAC',
      texture: { id: 'wood_laminate_1' }
    }
  },
  {
    id: 'color_blue',
    skinId: 'color_blue',
    name: 'Blue',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#0066ff'
    }
  },
  {
    id: 'color_red',
    skinId: 'color_red',
    name: 'Red',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#d70000'
    }
  },
  {
    id: 'color_green',
    skinId: 'color_green',
    name: 'Green',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#009925'
    }
  },
  {
    id: 'color_orange',
    skinId: 'color_orange',
    name: 'Orange',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#f59e0b'
    }
  },
  {
    id: 'color_white',
    skinId: 'color_white',
    name: 'White',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#ffffff'
    }
  },
  {
    id: 'color_light_red',
    skinId: 'color_light_red',
    name: 'Light Red',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#f28b82'
    }
  },
  {
    id: 'color_light_orange',
    skinId: 'color_light_orange',
    name: 'Light Orange',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#fbbc04'
    }
  },
  {
    id: 'color_light_yellow',
    skinId: 'color_light_yellow',
    name: 'Light Yellow',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#fff475'
    }
  },
  {
    id: 'color_light_green',
    skinId: 'color_light_green',
    name: 'Light Green',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#ccff90'
    }
  },
  {
    id: 'color_light_teal',
    skinId: 'color_light_teal',
    name: 'Light Teal',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#a7ffeb'
    }
  },
  {
    id: 'color_light_blue',
    skinId: 'color_light_blue',
    name: 'Light Blue',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#cbf0f8'
    }
  },
  {
    id: 'color_light_dark_blue',
    skinId: 'color_light_dark_blue',
    name: 'Light Dark Blue',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#aecbfa'
    }
  },
  {
    id: 'color_light_purple',
    skinId: 'color_light_purple',
    name: 'Light Purple',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#d7aefb'
    }
  },
  {
    id: 'color_light_pinkle',
    skinId: 'color_light_pinkle',
    name: 'Light Pink',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#fdcfe8'
    }
  },
  {
    id: 'color_light_light_brown',
    skinId: 'color_light_light_brown',
    name: 'Light Brown',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#e6c9a8'
    }
  },
  {
    id: 'color_light_light_gray',
    skinId: 'color_light_light_gray',
    name: 'Light Gray',
    tags: [CATALOG_TAG.COLOR],
    skin: {
      color: '#e8eaed'
    }
  }
];

export default new Map<CatalogItemIdentifier, GroundSkinItem>(
  styles.map(s => [s.id, s])
);
