import type { Vector2, Vector3 } from 'three';
import type { UNIT_ROTATION } from './Unit';
import type Unit from './Unit';
import type RoomGrid from './RoomGrid';

export enum WALL_TYPE {
  DEFAULT = 'default',
  DOOR = 'door'
}

export interface WallDescription<Position = Vector2> {
  startPosition: Position;
  endPosition: Position;
  type: WALL_TYPE;
}
export default class RoomDescription {
  id: string;
  info: {
    name: string;
    description?: string;
  };
  grid: RoomGrid;
  units: Unit[];
  walls: WallDescription[];

  start?: {
    position: Vector3;
    rotation: UNIT_ROTATION;
  };

  constructor({
    id,
    info,
    grid,
    units,
    walls,
    start
  }: {
    id: string;
    info: {
      name: string;
      description?: string;
    };
    grid: RoomGrid;
    units?: Unit[];
    walls?: WallDescription[];
    start?: {
      position: Vector3;
      rotation: UNIT_ROTATION;
    };
  }) {
    this.id = id;
    this.info = info;
    this.grid = grid;
    this.units = units || [];
    this.walls = walls || [];
    this.start = start;
  }
}
