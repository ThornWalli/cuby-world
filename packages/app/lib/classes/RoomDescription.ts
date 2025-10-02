import type { Vector2, Vector3 } from 'three';
import type { UNIT_ROTATION } from '../types/unit';
import type { UnitDescription } from './Unit';
import type { WallDescription } from '../types/wall';
import type { GroundStyleDescription } from '../types/ground';

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
  UnitPosition = Vector3,
  GroundPosition = Vector2
> {
  id: string;
  info: {
    name: string;
    description?: string;
  };
  grid: Grid;
  units: UnitDescription<Rotation, UnitPosition>[];
  walls: WallDescription<WallPosition>[];
  groundStyles: GroundStyleDescription<GroundPosition[]>[];

  start: StartPosition;
}

// export interface EditorRoomDescription extends RoomDescription { }

export type ImportRoomDescription = RoomDescription<
  UNIT_ROTATION,
  Vector2,
  Vector3,
  Vector2
>;
export type JsonRoomDescription = RoomDescription<
  string,
  number[],
  number[],
  number[]
>;

export type GroundMap = string[][];
