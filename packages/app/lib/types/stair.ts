import type { Vector3 } from 'three';
import type { ROTATION } from '../utils/rotation';
import type { StairSkinIdentifier } from './stair/skins';

export type StairIdentifier = string;

export interface StairDescription<Position = Vector3> {
  type: StairIdentifier;
  skin: StairSkinIdentifier;
  position: Position;
  rotation: ROTATION;
}
