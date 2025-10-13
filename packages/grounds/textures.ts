import image_ground_texture_small_wood_laminate_1 from './skins/default/texture/wood_laminate_1/small.svg?url';
import image_ground_texture_medium_wood_laminate_1 from './skins/default/texture/wood_laminate_1/medium.svg?url';

import image_ground_texture_small_hidden from './skins/default/texture/hidden/small.svg?url';
import image_ground_texture_medium_hidden from './skins/default/texture/hidden/medium.svg?url';

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
    id: 'edit_empty',
    name: 'Edit Empty',
    small: image_ground_texture_small_hidden,
    medium: image_ground_texture_medium_hidden
  }
] as GroundTexture[];
export default textures;

export const groundTextureMap = new Map(textures.map(t => [t.id, t]));
