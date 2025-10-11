import image_wall_texture_default from '../../../assets/wall/texture/default.png?url';
import image_wall_texture_brick_1 from '../../../assets/wall/texture/brick_1.png?url';

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
    url: image_wall_texture_default
  },
  {
    id: 'brick_1',
    name: 'Brick 1',
    url: image_wall_texture_brick_1
  }
] as WallTexture[];

export default textures;

export const textureMap = new Map(textures.map(t => [t.id, t]));
