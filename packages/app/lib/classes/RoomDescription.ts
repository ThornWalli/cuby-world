import type { Vector2, Vector3 } from 'three';
import type { UnitDescription } from './Unit';
import type { WallDescription } from '../types/wall';
import type { GroundStyleDescription } from '../types/ground';
import type { ROTATION } from '../types';
import type { StairDescription } from './Stair';

export type Grid = number[][];

export interface StartPosition<Position = Vector3, Rotation = ROTATION> {
  position: Position;
  rotation: Rotation;
}

export interface RoomStartPosition<Position = Vector3, Rotation = ROTATION> {
  position: Position;
  rotation: Rotation;
}

export interface RoomDescription<
  Rotation = ROTATION,
  GridSize = Vector2,
  Position = Vector3
> {
  id: string;
  info: {
    name: string;
    description?: string;
  };
  gridSize: GridSize;
  start: StartPosition<Position, Rotation>;

  units: UnitDescription<Rotation, Position>[];
  walls: WallDescription<Position>[];
  groundStyles: GroundStyleDescription<Position[]>[];
  stairs: StairDescription<Position>[];
}

// export interface EditorRoomDescription extends RoomDescription { }

export type ImportRoomDescription = RoomDescription<ROTATION, Vector2, Vector3>;
export type JsonRoomDescription = RoomDescription<string, number[], number[]>;

export type GroundMap = string[][];
