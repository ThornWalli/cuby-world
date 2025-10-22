import type { Vector2 } from 'three';
import type { SkinDescription, SkinIdentifier, SkinOptions } from '../skin';

export type GroundSkinIdentifier = SkinIdentifier;
export interface GroundSkinOptions extends SkinOptions {
  cost: number;
  color?: string;
  accessible?: boolean;
  opacity?: number;
  texture?: ExternalGroundSkinTexture | InternalGroundSkinTexture;
}

export type GroundSkinDescription<
  Options = GroundSkinOptions,
  Id = SkinIdentifier
> = SkinDescription<Options, Id>;
export type GroundStyleType = string;

export interface GroundSkinTexture {
  options?: {
    position: Vector2;
    dimension: Vector2;
  };
}

export interface ExternalGroundSkinTexture extends GroundSkinTexture {
  url: string;
}

export interface InternalGroundSkinTexture extends GroundSkinTexture {
  id: string;
}
export interface GroundSkin {
  accessible?: boolean;
  texture?: ExternalGroundSkinTexture | InternalGroundSkinTexture;
  color?: string | number;
  opacity?: number;
}

export interface GroundSkinTemplate {
  id: string;
  name: string;
  style: GroundSkin;
}
