import { ORIGIN } from '@cuby-world/app/types';
import type { RoomDescription } from '../../classes/RoomDescription';
import { Vector3, type Vector2 } from 'three';
import { UNIT_ROTATION } from '../../types/unit';

// eslint-disable-next-line complexity
export function resizeRoom(
  description: RoomDescription,
  origin: ORIGIN,
  dimension: Vector2
): RoomDescription {
  const grid = Array(dimension.y)
    .fill(0)
    .map(() => Array(dimension.x).fill({ value: 0 }));

  switch (origin) {
    case ORIGIN.TOP_LEFT:
      for (let z = 0; z < dimension.y; z++) {
        grid[z] = [];
        for (let x = 0; x < dimension.x; x++) {
          grid[z]![x] = description.grid[z]?.[x] ?? 0;
        }
      }
      break;
    case ORIGIN.TOP_RIGHT:
      for (let z = 0; z < dimension.y; z++) {
        grid[z] = [];
        for (let x = 0; x < dimension.x; x++) {
          grid[z]![x] =
            description.grid[z]?.[
              x + description.grid[0]!.length - dimension.x
            ] ?? 0;
        }
      }
      break;
    case ORIGIN.BOTTOM_LEFT:
      for (let z = 0; z < dimension.y; z++) {
        grid[z] = [];
        for (let x = 0; x < dimension.x; x++) {
          grid[z]![x] =
            description.grid[z + description.grid.length - dimension.y]?.[x] ??
            0;
        }
      }
      break;
    case ORIGIN.BOTTOM_RIGHT:
      for (let z = 0; z < dimension.y; z++) {
        grid[z] = [];
        for (let x = 0; x < dimension.x; x++) {
          grid[z]![x] =
            description.grid[z + description.grid.length - dimension.y]?.[
              x + description.grid[0]!.length - dimension.x
            ] ?? 0;
        }
      }
      break;
  }

  let start = { ...description.start };
  if (
    description.start.position.x >= dimension.x ||
    description.start.position.z >= dimension.y
  ) {
    start = {
      position: new Vector3(0, 0, 0),
      rotation: UNIT_ROTATION.SOUTH
    };
  }

  return {
    id: crypto.randomUUID(),
    info: description.info,
    units: description.units.filter(
      u =>
        u.options.position.x < dimension.x && u.options.position.z < dimension.y
    ),
    walls: description.walls.filter(
      w => w.position.x < dimension.x && w.position.y < dimension.y
    ),
    groundStyles: description.groundStyles.map(groundStyle => ({
      ...groundStyle,
      values: groundStyle.positions.filter(
        ({ x, y }) => x < dimension.x && y < dimension.y
      )
    })),
    grid,
    start
  };
}

// grounds: Object.fromEntries(
//   description.groundStyles.map(({ type, values }) => [type, values])
// ),
// .entries().map(ground => {
//   return {
//     ...ground,
//     values: ground.values.filter(
//       ([x, y]) => x < dimension.x && y < dimension.y
//     )
//   };
// }),
