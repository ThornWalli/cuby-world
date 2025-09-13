import { Vector2, Vector3 } from 'three';
import type { RawEditorRoomDescription, EditorRoomDescription } from './types';

export function parseRoomDescription(
  room: RawEditorRoomDescription
): EditorRoomDescription {
  return {
    ...room,
    grid: room.grid,
    start: {
      ...room.start,
      position: Array.isArray(room.start.position)
        ? new Vector3().fromArray(room.start.position)
        : room.start.position,
      rotation: room.start
        .rotation as EditorRoomDescription['start']['rotation']
    },
    walls: room.walls ?? [],
    units: room.units.map(unit => ({
      ...unit,
      options: {
        ...unit.options,
        position: Array.isArray(unit.options.position)
          ? new Vector3().fromArray(unit.options.position)
          : unit.options.position,
        rotation: unit.options
          .rotation as EditorRoomDescription['units'][0]['options']['rotation']
      }
    }))
  };
}

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
