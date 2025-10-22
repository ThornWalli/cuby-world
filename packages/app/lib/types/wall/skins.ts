import type { Vector2 } from 'three';
import type { SkinDescription, SkinIdentifier, SkinOptions } from '../skin';

export type WallSkinIdentifier = SkinIdentifier;

export interface WallSkinOptions extends SkinOptions {
  texture?: ExternalWallStyleTexture | InternalWallStyleTexture;
  color: string | number;
}

export type WallSkinDescription<
  Options = WallSkinOptions,
  Id = WallSkinIdentifier
> = SkinDescription<Options, Id>;

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
  texture?: ExternalWallStyleTexture | InternalWallStyleTexture;
  color: string | number;
}

export interface WallStyleTemplate extends WallStyle {
  name: string;
}
