import type { GroundSkinItem } from '@cuby-world/app/lib/types/ground/catalog';
import { CATALOG_TAG } from '@cuby-world/app/lib/utils/catalog';

export const SKIN_DEFAULT_GROUND = 'default_base';

const styles: GroundSkinItem[] = [
  {
    id: 'default_editor_empty',
    skinId: 'edit_empty',
    name: 'Edit Empty',
    tags: [CATALOG_TAG.HIDE],
    type: 'default',
    skin: {
      color: '#000000',
      accessible: false,
      opacity: 0.4,
      texture: { id: 'edit_empty' }
    }
  },
  {
    id: 'default_empty',
    skinId: 'empty',
    name: 'EMPTY',
    tags: [CATALOG_TAG.HIDE],
    type: 'default',
    skin: {
      accessible: false,
      opacity: 0
    }
  },
  {
    id: 'default_base',
    skinId: 'base',
    name: 'Base',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#DADADA'
    }
  },
  {
    id: 'default_wood_laminate_1',
    skinId: 'wood_laminate_1',
    name: 'Wood Laminate',
    tags: [CATALOG_TAG.TEXTURE],
    type: 'default',
    skin: {
      color: '#F0CDAC',
      texture: { id: 'wood_laminate_1' }
    }
  },
  {
    id: 'default_grass_1',
    skinId: 'grass_1',
    name: 'Grass 1',
    tags: [CATALOG_TAG.TEXTURE],
    type: 'default',
    skin: {
      color: '#ffffff',
      texture: { id: 'grass_1' }
    }
  },
  {
    id: 'default_grass_2',
    skinId: 'grass_2',
    name: 'Grass 2',
    tags: [CATALOG_TAG.TEXTURE],
    type: 'default',
    skin: {
      color: '#ffffff',
      texture: { id: 'grass_2' }
    }
  },
  {
    id: 'default_grass_3',
    skinId: 'grass_3',
    name: 'Grass 3',
    tags: [CATALOG_TAG.TEXTURE],
    type: 'default',
    skin: {
      color: '#ffffff',
      texture: { id: 'grass_3' }
    }
  },
  {
    id: 'default_grass_4',
    skinId: 'grass_4',
    name: 'Grass 4',
    tags: [CATALOG_TAG.TEXTURE],
    type: 'default',
    skin: {
      color: '#ffffff',
      texture: { id: 'grass_4' }
    }
  },
  {
    id: 'default_color_blue',
    skinId: 'color_blue',
    name: 'Blue',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#0066ff'
    }
  },
  {
    id: 'default_color_red',
    skinId: 'color_red',
    name: 'Red',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#d70000'
    }
  },
  {
    id: 'default_color_green',
    skinId: 'color_green',
    name: 'Green',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#009925'
    }
  },
  {
    id: 'default_color_orange',
    skinId: 'color_orange',
    name: 'Orange',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#f59e0b'
    }
  },
  {
    id: 'default_color_white',
    skinId: 'color_white',
    name: 'White',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#ffffff'
    }
  },
  {
    id: 'default_color_light_red',
    skinId: 'color_light_red',
    name: 'Light Red',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#f28b82'
    }
  },
  {
    id: 'default_color_light_orange',
    skinId: 'color_light_orange',
    name: 'Light Orange',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#fbbc04'
    }
  },
  {
    id: 'default_color_light_yellow',
    skinId: 'color_light_yellow',
    name: 'Light Yellow',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#fff475'
    }
  },
  {
    id: 'default_color_light_green',
    skinId: 'color_light_green',
    name: 'Light Green',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#ccff90'
    }
  },
  {
    id: 'default_color_light_teal',
    skinId: 'color_light_teal',
    name: 'Light Teal',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#a7ffeb'
    }
  },
  {
    id: 'default_color_light_blue',
    skinId: 'color_light_blue',
    name: 'Light Blue',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#cbf0f8'
    }
  },
  {
    id: 'default_color_light_dark_blue',
    skinId: 'color_light_dark_blue',
    name: 'Light Dark Blue',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#aecbfa'
    }
  },
  {
    id: 'default_color_light_purple',
    skinId: 'color_light_purple',
    name: 'Light Purple',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#d7aefb'
    }
  },
  {
    id: 'default_color_light_pinkle',
    skinId: 'color_light_pinkle',
    name: 'Light Pink',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#fdcfe8'
    }
  },
  {
    id: 'default_color_light_light_brown',
    skinId: 'color_light_light_brown',
    name: 'Light Brown',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#e6c9a8'
    }
  },
  {
    id: 'default_color_light_light_gray',
    skinId: 'color_light_light_gray',
    name: 'Light Gray',
    tags: [CATALOG_TAG.COLOR],
    type: 'default',
    skin: {
      color: '#e8eaed'
    }
  }
];

export default new Map(styles.map(s => [s.id, s]));
