import type { Texture } from 'three';

export interface WallTexture {
  id: string;
  name: string;
  description?: string;
  url: string;
}

export interface GroundTexture {
  id: string;
  name: string;
  description?: string;
  small: string;
  medium: string;
}

export interface TextureDescription {
  color: string;
  ambient: string;
  normal: string;
  displacement: string;
  specular: string;
}

export interface TextureMaps {
  colorMap: Texture;
  ambientMap?: Texture;
  normalMap?: Texture;
}
