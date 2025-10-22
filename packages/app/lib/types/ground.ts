import type { BufferGeometry, Vector3 } from 'three';
import type { GroundTexture } from '../utils/ground/textures';
import type { GroundSkinIdentifier } from './ground/skins';

export type GrountStyleIdentifier = string;

export interface GroundDescription {
  type: string;
  values: [number, number][];
}

export interface GroundStyleDescription<Position = Vector3[]> {
  type: string;
  skinId: GroundSkinIdentifier;
  positions: Position;
}

export type GroundGeometryMap = Map<GROUND_GEOMETRY, BufferGeometry | null>;
export type GroundTextureMap = Map<string, GroundTexture>;

export enum GROUND_GEOMETRY {
  MEDIUM = 'medium',
  SMALL = 'small'
}

export type GroundCost = number;
export interface TileCostDescription {
  index: number;
  cost: GroundCost;
}
