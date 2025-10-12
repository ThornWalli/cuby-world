import {
  image_wall_default_texture_brick_1,
  image_wall_default_texture_default
} from '@cuby-world/walls';

export interface WallTexture {
  id: string;
  name: string;
  description?: string;
  url: string;
}

const textures = [
  {
    id: 'default',
    name: 'Default',
    url: image_wall_default_texture_default
  },
  {
    id: 'brick_1',
    name: 'Brick 1',
    url: image_wall_default_texture_brick_1
  }
] as WallTexture[];

export default textures;

export const textureMap = new Map(textures.map(t => [t.id, t]));
