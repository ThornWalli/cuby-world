import type { Vector2 } from 'three';
import type { SkinIdentifier } from '../skin';

export type GroundSkinIdentifier = SkinIdentifier;
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
