import type { Vector2 } from 'three';
import type { SkinIdentifier } from '../skin';

export type WallSkinIdentifier = SkinIdentifier;
export type ExtensionSkinIdentifier = SkinIdentifier;

export type WallSkins = [WallSkinIdentifier, WallSkinIdentifier];

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
  type: string;
  texture?: ExternalWallStyleTexture | InternalWallStyleTexture;
  color: string | number;
}

export interface WallStyleTemplate extends WallStyle {
  name: string;
}
