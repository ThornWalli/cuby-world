import { Vector2, Vector3 } from 'three';

import type {
  JsonRoomDescription,
  RoomDescription
} from '@cuby-world/app/lib/classes/RoomDescription';
import type { UNIT_ROTATION } from '@cuby-world/app/lib/types/unit';

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
    start: {
      ...room.start,
      position: Array.isArray(room.start.position)
        ? new Vector3().fromArray(room.start.position)
        : room.start.position,
      rotation: room.start.rotation as UNIT_ROTATION
    },
    walls: (room.walls ?? []).map(wall => ({
      ...wall,
      position: Array.isArray(wall.position)
        ? new Vector2().fromArray(wall.position)
        : wall.position,
      startPosition:
        wall.startPosition && Array.isArray(wall.startPosition)
          ? new Vector2().fromArray(wall.startPosition)
          : wall.startPosition,
      endPosition:
        wall.endPosition && Array.isArray(wall.endPosition)
          ? new Vector2().fromArray(wall.endPosition)
          : wall.endPosition
    })),
    units: room.units.map(unit => ({
      ...unit,
      options: {
        ...unit.options,
        position: Array.isArray(unit.options.position)
          ? new Vector3().fromArray(unit.options.position)
          : unit.options.position,
        rotation: unit.options.rotation as UNIT_ROTATION
      }
    })),
    groundStyles: room.groundStyles.map(({ positions, ...groundStyle }) => ({
      ...groundStyle,
      positions: positions.map(position =>
        Array.isArray(position) ? new Vector2().fromArray(position) : position
      )
    }))
  };
}
