import image_ground_texture_small_wood_laminate_1 from './skins/default/texture/wood_laminate_1/small.svg?url';
import image_ground_texture_medium_wood_laminate_1 from './skins/default/texture/wood_laminate_1/medium.svg?url';

import image_ground_texture_small_hidden from './skins/default/texture/hidden/small.svg?url';
import image_ground_texture_medium_hidden from './skins/default/texture/hidden/medium.svg?url';

import image_ground_texture_small_grass_1 from './skins/default/texture/grass_1/small.svg?url';
import image_ground_texture_medium_grass_1 from './skins/default/texture/grass_1/medium.svg?url';

import image_ground_texture_small_grass_2 from './skins/default/texture/grass_2/small.svg?url';
import image_ground_texture_medium_grass_2 from './skins/default/texture/grass_2/medium.svg?url';

import image_ground_texture_small_grass_3 from './skins/default/texture/grass_3/small.svg?url';
import image_ground_texture_medium_grass_3 from './skins/default/texture/grass_3/medium.svg?url';

import image_ground_texture_small_grass_4 from './skins/default/texture/grass_4/small.svg?url';
import image_ground_texture_medium_grass_4 from './skins/default/texture/grass_4/medium.svg?url';

export interface GroundTexture {
  id: string;
  name: string;
  description?: string;
  small: string;
  medium: string;
}

const textures = [
  {
    id: 'wood_laminate_1',
    name: 'Wood Laminate 1',
    small: image_ground_texture_small_wood_laminate_1,
    medium: image_ground_texture_medium_wood_laminate_1
  },
  {
    id: 'grass_1',
    name: 'Grass 1',
    small: image_ground_texture_small_grass_1,
    medium: image_ground_texture_medium_grass_1
  },
  {
    id: 'grass_2',
    name: 'Grass 2',
    small: image_ground_texture_small_grass_2,
    medium: image_ground_texture_medium_grass_2
  },
  {
    id: 'grass_3',
    name: 'Grass 3',
    small: image_ground_texture_small_grass_3,
    medium: image_ground_texture_medium_grass_3
  },
  {
    id: 'grass_4',
    name: 'Grass 4',
    small: image_ground_texture_small_grass_4,
    medium: image_ground_texture_medium_grass_4
  },
  {
    id: 'edit_empty',
    name: 'Edit Empty',
    small: image_ground_texture_small_hidden,
    medium: image_ground_texture_medium_hidden
  }
] as GroundTexture[];
export default textures;

export const groundTextureMap = new Map(textures.map(t => [t.id, t]));
