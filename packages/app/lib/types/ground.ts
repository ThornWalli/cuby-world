import type { BufferGeometry, Vector3 } from 'three';
import type { GroundTexture } from '../utils/ground/textures';

export type GrountStyleIdentifier = string;

export interface GroundDescription {
  type: string;
  values: [number, number][];
}

export interface GroundStyleDescription<V = Vector3[]> {
  id: string;
  positions: V;
}

export type GroundGeometryMap = Map<GROUND_GEOMETRY, BufferGeometry | null>;
export type GroundTextureMap = Map<string, GroundTexture>;

export enum GROUND_GEOMETRY {
  MEDIUM = 'medium',
  SMALL = 'small'
}
