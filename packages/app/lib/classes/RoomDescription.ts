import type { Vector2, Vector3 } from 'three';
import type { WallDescription } from './Wall';
import type { UNIT_ROTATION } from '../types/unit';
import type { UnitDescription } from './Unit';

export enum WALL_TYPE {
  DEFAULT = 'default',
  DOOR = 'door'
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
  grid: number[][];
  units: UnitDescription<Rotation, UnitPosition>[];
  walls: WallDescription<WallPosition>[];

  start: {
    position: UnitPosition;
    rotation: Rotation;
  };
}

export type ImportRoomDescription = RoomDescription<
  UNIT_ROTATION,
  Vector2,
  Vector3
>;
export type JsonRoomDescription = RoomDescription<string, number[], number[]>;
