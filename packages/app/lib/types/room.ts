import type { Vector2, Vector3 } from 'three';
import type { UnitDescription } from '../classes/Unit';
import type { WallDescription } from './wall';
import type { GroundStyleDescription } from './ground';
import type { ROTATION } from '../types';
import type { StairDescription } from './stair';

export type Grid = number[][];

export interface StartPosition<Position = Vector3, Rotation = ROTATION> {
  position: Position;
  rotation: Rotation;
}

export interface RoomStartPosition<Position = Vector3, Rotation = ROTATION> {
  position: Position;
  rotation: Rotation;
}

export enum TELEPORT_TYPE {
  DEFAULT = 'default',
  ENTRANCE = 'entrance',
  ROOM = 'room'
}

export type TELEPORT_ROTATION =
  | ROTATION.NORTH
  | ROTATION.EAST
  | ROTATION.SOUTH
  | ROTATION.WEST;

export interface TeleportDescription<Position = Vector3> {
  type: TELEPORT_TYPE;
  position: Position;
  rotation: TELEPORT_ROTATION;
}

export interface EntranceTeleportDescription<Position = Vector3>
  extends TeleportDescription<Position> {
  type: TELEPORT_TYPE.ENTRANCE;
}

export interface RoomTeleportDescription extends TeleportDescription {
  type: TELEPORT_TYPE.ROOM;
  roomId?: string;
  roomTeleportId?: string;
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
  teleports: TeleportDescription[];

  units: UnitDescription<Rotation, Position>[];
  walls: WallDescription<Position>[];
  groundStyles: GroundStyleDescription<Position[]>[];
  stairs: StairDescription<Position>[];
}

// export interface EditorRoomDescription extends RoomDescription { }

export type ImportRoomDescription = RoomDescription<ROTATION, Vector2, Vector3>;
export type JsonRoomDescription = RoomDescription<string, number[], number[]>;

export type GroundMap = string[][];
