import type { Vector3 } from 'three';
import type { ROTATION } from '../utils/rotation';

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
