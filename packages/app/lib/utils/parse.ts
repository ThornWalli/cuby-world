import { Vector2, Vector3 } from 'three';

import type {
  JsonRoomDescription,
  RoomDescription
} from '@cuby-world/app/lib/types/room';
import type { ROTATION } from '../utils/rotation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonStringify(data: any) {
  return JSON.stringify(data, (key, value) => {
    if (value instanceof Vector3) {
      return { type: 'Vector3', value: value.toArray() };
    } else if (value instanceof Vector2) {
      return { type: 'Vector2', value: value.toArray() };
    }
    return value;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonParse(data: any) {
  return JSON.parse(data, (key, value) => {
    if (value && value.type === 'Vector3' && Array.isArray(value.value)) {
      return new Vector3().fromArray(value.value);
    } else if (
      value &&
      value.type === 'Vector2' &&
      Array.isArray(value.value)
    ) {
      return new Vector2().fromArray(value.value);
    }
    return value;
  });
}

export function parseRoomDescription(
  room: JsonRoomDescription
): RoomDescription {
  return {
    ...room,
    gridSize: Array.isArray(room.gridSize)
      ? new Vector2().fromArray(room.gridSize)
      : room.gridSize,
    teleports: room.teleports.map(teleport => ({
      ...teleport,
      position: Array.isArray(teleport.position)
        ? new Vector3().fromArray(teleport.position)
        : teleport.position
    })),
    walls: (room.walls ?? []).map(wall => ({
      ...wall,
      position: Array.isArray(wall.position)
        ? new Vector3().fromArray(wall.position)
        : wall.position
    })),
    units: room.units.map(unit => ({
      ...unit,
      options: {
        ...unit.options,
        position: Array.isArray(unit.options.position)
          ? new Vector3().fromArray(unit.options.position)
          : unit.options.position,
        rotation: unit.options.rotation as ROTATION
      }
    })),
    groundStyles: room.groundStyles.map(({ positions, ...groundStyle }) => ({
      ...groundStyle,
      positions: positions.map(position =>
        Array.isArray(position) ? new Vector3().fromArray(position) : position
      )
    })),
    stairs: (room.stairs ?? []).map(stair => ({
      ...stair,
      position: Array.isArray(stair.position)
        ? new Vector3().fromArray(stair.position)
        : stair.position
    }))
  };
}
