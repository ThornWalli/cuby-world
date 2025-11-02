import type { Vector2 } from 'three';
import type { SkinDescription, SkinIdentifier, SkinOptions } from '../skin';

export type WallSkinIdentifier = SkinIdentifier;

export interface WallSkinOptions extends SkinOptions {
  texture?: WallStyleTexture;
  color: string | number;
}

export type WallSkinDescription<
  Options = WallSkinOptions,
  Id = WallSkinIdentifier
> = SkinDescription<Options, Id>;

export type WallSkins = [WallSkinIdentifier, WallSkinIdentifier];

export interface WallStyleTexture {
  /**
   * Internal or External path to the texture image
   */
  path: string;
  normal?: string;
  displacement?: string;
  specular?: string;
  options?: {
    position: Vector2;
    dimension: Vector2;
  };
}

/**
 * @deprecated Use path instead
 */
export interface ExternalWallStyleTexture extends WallStyleTexture {
  url: string;
}

/**
 * @deprecated Use path instead
 */
export interface InternalWallStyleTexture extends WallStyleTexture {
  id: string;
}

export interface WallStyle {
  texture?:
    | ExternalWallStyleTexture
    | InternalWallStyleTexture
    | WallStyleTexture;
  color: string | number;
}

export interface WallStyleTemplate extends WallStyle {
  name: string;
}
