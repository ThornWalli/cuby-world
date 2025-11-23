//#region wood_laminate_1
import image_ground_texture_small_wood_laminate_1 from './texture/wood_laminate_1/small.png?url';
import image_ground_texture_medium_wood_laminate_1 from './texture/wood_laminate_1/medium.png?url';
//#endregion

import image_ground_texture_small_hidden from './texture/hidden/small.svg?url';
import image_ground_texture_medium_hidden from './texture/hidden/medium.svg?url';

//#region grass_1
import image_ground_texture_small_grass_1 from './texture/grass_1/small.png?url';
import image_ground_texture_medium_grass_1 from './texture/grass_1/medium.png?url';
//#endregion

//#region stone_1
import image_ground_texture_small_stone_1 from './texture/stone_1/small.png?url';
import image_ground_texture_medium_stone_1 from './texture/stone_1/medium.png?url';
//#endregion

//#region bathroom_tile_small_1
import image_ground_texture_small_bathroom_tile_small_1 from './texture/bathroom_tile_small_1/small.png?url';
import image_ground_texture_medium_bathroom_tile_small_1 from './texture/bathroom_tile_small_1/medium.png?url';
//#endregion
//#region bathroom_tile_medium_1
import image_ground_texture_small_bathroom_tile_medium_1 from './texture/bathroom_tile_medium_1/small.png?url';
import image_ground_texture_medium_bathroom_tile_medium_1 from './texture/bathroom_tile_medium_1/medium.png?url';
//#endregion

//#region tile_large_terracota_1
import image_ground_texture_small_tile_large_terracota_1 from './texture/tile_large/terracota_1/small.png?url';
import image_ground_texture_medium_tile_large_terracota_1 from './texture/tile_large/terracota_1/medium.png?url';
//#endregion

export interface GroundTexture {
  id: string;
  name: string;
  description?: string;
  color: {
    small: string;
    medium: string;
  };
  normal?: {
    small: string;
    medium: string;
  };
  displacement?: {
    small: string;
    medium: string;
  };
  specular?: {
    small: string;
    medium: string;
  };
}

const textures = [
  {
    id: 'wood_laminate_1',
    name: 'Wood Laminate 1',
    color: {
      small: image_ground_texture_small_wood_laminate_1,
      medium: image_ground_texture_medium_wood_laminate_1
    }
  },
  {
    id: 'grass_1',
    name: 'Grass 1',
    color: {
      small: image_ground_texture_small_grass_1,
      medium: image_ground_texture_medium_grass_1
    }
  },
  {
    id: 'stone_1',
    name: 'Stone 1',
    color: {
      small: image_ground_texture_small_stone_1,
      medium: image_ground_texture_medium_stone_1
    }
  },
  {
    id: 'bathroom_tile_small_1',
    name: 'Bathroom Tile Small 1',
    color: {
      small: image_ground_texture_small_bathroom_tile_small_1,
      medium: image_ground_texture_medium_bathroom_tile_small_1
    }
  },
  {
    id: 'bathroom_tile_medium_1',
    name: 'Bathroom Tile Medium 1',
    color: {
      small: image_ground_texture_small_bathroom_tile_medium_1,
      medium: image_ground_texture_medium_bathroom_tile_medium_1
    }
  },
  {
    id: 'tile_large_terracota_1',
    name: 'Tile Large Terracota 1',
    color: {
      small: image_ground_texture_small_tile_large_terracota_1,
      medium: image_ground_texture_medium_tile_large_terracota_1
    }
  },
  {
    id: 'edit_empty',
    name: 'Edit Empty',
    color: {
      small: image_ground_texture_small_hidden,
      medium: image_ground_texture_medium_hidden
    }
  }
] as GroundTexture[];
export default textures;

export const groundTextureMap = new Map(textures.map(t => [t.id, t]));
