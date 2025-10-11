import type { RoomDescription } from '../../classes/RoomDescription';
import { Vector3, type Vector2 } from 'three';
import { UNIT_ROTATION } from '../../types/unit';

export function resizeRoom(
  description: RoomDescription,
  gridSize: Vector2
): RoomDescription {
  let start = { ...description.start };
  if (
    description.start.position.x >= gridSize.x ||
    description.start.position.z >= gridSize.y
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
        u.options.position.x < gridSize.x && u.options.position.z < gridSize.y
    ),
    walls: description.walls.filter(
      w => w.position.x < gridSize.x && w.position.y < gridSize.y
    ),
    groundStyles: description.groundStyles.map(groundStyle => ({
      ...groundStyle,
      values: groundStyle.positions.filter(
        ({ x, y }) => x < gridSize.x && y < gridSize.y
      )
    })),
    gridSize,
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
