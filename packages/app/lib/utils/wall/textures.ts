import image_wall_texture_1 from '../../../assets/wall/texture_1.png?url';

export interface WallTexture {
  id: string;
  name: string;
  description?: string;
  url: string;
}

export default [
  {
    id: 'default',
    name: 'Default',
    url: image_wall_texture_1
  }
] as WallTexture[];
