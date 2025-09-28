import type { Vector2 } from 'three';

export interface WallStyleTexture {
  options?: {
    position: Vector2;
    dimension: Vector2;
  };
}

export interface ExternalWallStyleTexture extends WallStyleTexture {
  url: string;
}

export interface InternalWallStyleTexture extends WallStyleTexture {
  id: string;
}

export interface WallStyle {
  id: string;
  texture?:
    | WallStyleTexture
    | ExternalWallStyleTexture
    | InternalWallStyleTexture;
  color: string | number;
}

export interface WallStyleTemplate extends WallStyle {
  name: string;
}
