import type { Vector2, Vector3 } from 'three';
import type { UNIT_ROTATION } from '../types/unit';
import type { UnitDescription } from './Unit';
import type { WallDescription } from '../types/wall';

export type Grid = number[][];

export interface StartPosition {
  position: Vector3;
  rotation: UNIT_ROTATION;
}

export interface RoomStartPosition<
  Position = Vector3,
  Rotation = UNIT_ROTATION
> {
  position: Position;
  rotation: Rotation;
}
export interface RoomDescription<
  Rotation = UNIT_ROTATION,
  WallPosition = Vector2,
  UnitPosition = Vector3
> {
  id: string;
  info: {
    name: string;
    description?: string;
  };
  grid: Grid;
  units: UnitDescription<Rotation, UnitPosition>[];
  walls: WallDescription<WallPosition>[];

  start: StartPosition;
}

export type ImportRoomDescription = RoomDescription<
  UNIT_ROTATION,
  Vector2,
  Vector3
>;
export type JsonRoomDescription = RoomDescription<string, number[], number[]>;
