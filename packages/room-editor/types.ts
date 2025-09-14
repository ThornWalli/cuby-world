import type { RoomDescription } from '@cuby-world/app/lib/classes/RoomDescription';
import type { UnitDescription } from '@cuby-world/app/lib/classes/Unit';
import type { WallDescription } from '@cuby-world/app/lib/classes/Wall';

import type { Vector3 } from 'three';

export enum ACTION_TYPE {
  NONE = 'none',
  ADD = 'add',
  REMOVE = 'remove',
  START_POSITION = 'start_position',
  SET_WALL = 'set_wall',
  EDIT_WALL = 'edit_wall',
  SET_UNIT = 'set_unit'
}
export interface GridCell {
  position: Vector3;
  value: number;
}
export interface GridModel {
  selectedPosition?: Vector3;
  units: UnitDescription[];
  walls: WallDescription[];
  grid: number[][];
  startPosition: Vector3;
}

export interface RoomEditorModel {
  actionType: ACTION_TYPE;
  roomModel: RoomDescription;
}

export enum ORIGIN {
  TOP_LEFT = 'top_left',
  TOP_RIGHT = 'top_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_RIGHT = 'bottom_right'
}

export type RawWallDescription = WallDescription<number[]>;

export interface RawCellDescription<WallDescription = RawWallDescription> {
  value: number;
  wall?: WallDescription;
}
export type CellDescription = RawCellDescription<WallDescription>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EditorRoomDescription extends RoomDescription {}

// export interface RawEditorRoomDescription<
//   Position = number[],
//   Rotation = string,
//   Unit = RawUnitDescription
// > {
//   id: string;
//   info: {
//     name: string;
//     description?: string;
//   };
//   grid: number[][];
//   walls: WallDescription[];
//   units: Unit[];
//   start: {
//     position: Position;
//     rotation: Rotation;
//   };
// }

// export type EditorRoomDescription = RawEditorRoomDescription<
//   Vector3,
//   UNIT_ROTATION,
//   UnitDescription
// >;
