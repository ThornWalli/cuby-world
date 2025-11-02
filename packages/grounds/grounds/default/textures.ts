//#region wood_laminate_1
import image_ground_texture_small_wood_laminate_1 from './texture/wood_laminate_1/small.png?url';
import image_ground_texture_medium_wood_laminate_1 from './texture/wood_laminate_1/medium.png?url';
import image_ground_texture_small_wood_laminate_1_normal from './texture/wood_laminate_1/small_normal.png?url';
import image_ground_texture_medium_wood_laminate_1_normal from './texture/wood_laminate_1/medium_normal.png?url';
import image_ground_texture_small_wood_laminate_1_ambient from './texture/wood_laminate_1/small_ambient.png?url';
import image_ground_texture_medium_wood_laminate_1_ambient from './texture/wood_laminate_1/medium_ambient.png?url';
import image_ground_texture_small_wood_laminate_1_specular from './texture/wood_laminate_1/small_specular.png?url';
import image_ground_texture_medium_wood_laminate_1_specular from './texture/wood_laminate_1/medium_specular.png?url';
//#endregion

import image_ground_texture_small_hidden from './texture/hidden/small.svg?url';
import image_ground_texture_medium_hidden from './texture/hidden/medium.svg?url';

//#region grass_1
import image_ground_texture_small_grass_1 from './texture/grass_1/small.png?url';
import image_ground_texture_medium_grass_1 from './texture/grass_1/medium.png?url';
// import image_ground_texture_small_grass_1_normal from './texture/grass_1/small_normal.png?url';
// import image_ground_texture_medium_grass_1_normal from './texture/grass_1/medium_normal.png?url';
import image_ground_texture_small_grass_1_ambient from './texture/grass_1/small_ambient.png?url';
import image_ground_texture_medium_grass_1_ambient from './texture/grass_1/medium_ambient.png?url';
import image_ground_texture_small_grass_1_specular from './texture/grass_1/small_specular.png?url';
import image_ground_texture_medium_grass_1_specular from './texture/grass_1/medium_specular.png?url';
//#endregion

//#region stone_1
import image_ground_texture_small_stone_1 from './texture/stone_1/small.png?url';
import image_ground_texture_medium_stone_1 from './texture/stone_1/medium.png?url';
import image_ground_texture_small_stone_1_normal from './texture/stone_1/small_normal.png?url';
import image_ground_texture_medium_stone_1_normal from './texture/stone_1/medium_normal.png?url';
import image_ground_texture_small_stone_1_ambient from './texture/stone_1/small_ambient.png?url';
import image_ground_texture_medium_stone_1_ambient from './texture/stone_1/medium_ambient.png?url';
import image_ground_texture_small_stone_1_specular from './texture/stone_1/small_specular.png?url';
import image_ground_texture_medium_stone_1_specular from './texture/stone_1/medium_specular.png?url';
//#endregion

//#region tile_1
import image_ground_texture_small_tile_1 from './texture/tile_1/small.png?url';
import image_ground_texture_medium_tile_1 from './texture/tile_1/medium.png?url';
import image_ground_texture_small_tile_1_normal from './texture/tile_1/small_normal.png?url';
import image_ground_texture_medium_tile_1_normal from './texture/tile_1/medium_normal.png?url';
import image_ground_texture_small_tile_1_ambient from './texture/tile_1/small_ambient.png?url';
import image_ground_texture_medium_tile_1_ambient from './texture/tile_1/medium_ambient.png?url';
import image_ground_texture_small_tile_1_specular from './texture/tile_1/small_specular.png?url';
import image_ground_texture_medium_tile_1_specular from './texture/tile_1/medium_specular.png?url';
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
    },
    normal: {
      small: image_ground_texture_small_wood_laminate_1_normal,
      medium: image_ground_texture_medium_wood_laminate_1_normal
    },
    ambient: {
      small: image_ground_texture_small_wood_laminate_1_ambient,
      medium: image_ground_texture_medium_wood_laminate_1_ambient
    },
    specular: {
      small: image_ground_texture_small_wood_laminate_1_specular,
      medium: image_ground_texture_medium_wood_laminate_1_specular
    }
  },
  {
    id: 'grass_1',
    name: 'Grass 1',
    color: {
      small: image_ground_texture_small_grass_1,
      medium: image_ground_texture_medium_grass_1
    },
    ambient: {
      small: image_ground_texture_small_grass_1_ambient,
      medium: image_ground_texture_medium_grass_1_ambient
    },
    // normal: {
    //   small: image_ground_texture_small_grass_1_normal,
    //   medium: image_ground_texture_medium_grass_1_normal
    // },
    specular: {
      small: image_ground_texture_small_grass_1_specular,
      medium: image_ground_texture_medium_grass_1_specular
    }
  },
  {
    id: 'stone_1',
    name: 'Stone 1',
    color: {
      small: image_ground_texture_small_stone_1,
      medium: image_ground_texture_medium_stone_1
    },
    ambient: {
      small: image_ground_texture_small_stone_1_ambient,
      medium: image_ground_texture_medium_stone_1_ambient
    },
    normal: {
      small: image_ground_texture_small_stone_1_normal,
      medium: image_ground_texture_medium_stone_1_normal
    },
    specular: {
      small: image_ground_texture_small_stone_1_specular,
      medium: image_ground_texture_medium_stone_1_specular
    }
  },
  {
    id: 'tile_1',
    name: 'Tile 1',
    color: {
      small: image_ground_texture_small_tile_1,
      medium: image_ground_texture_medium_tile_1
    },
    ambient: {
      small: image_ground_texture_small_tile_1_ambient,
      medium: image_ground_texture_medium_tile_1_ambient
    },
    normal: {
      small: image_ground_texture_small_tile_1_normal,
      medium: image_ground_texture_medium_tile_1_normal
    },
    specular: {
      small: image_ground_texture_small_tile_1_specular,
      medium: image_ground_texture_medium_tile_1_specular
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
