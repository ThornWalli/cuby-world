import type { Vector3 } from 'three';
import type Room from '../classes/Room';
import { positionToMatrixPosition } from './matrix';
import type Unit from '../classes/Unit';
import { getFloorFromPosition } from './floor';

export function getYPositionByPosition(
  room: Room,
  position: Vector3,
  ignoreUnits: Unit[] = []
) {
  const ignoreIds = ignoreUnits.map(u => u.id);
  const intersectedUnits = room.modules.units.getUnits().filter(u => {
    return (
      !u.wallOnly &&
      !ignoreIds.includes(u.id) &&
      u.getFloor() === getFloorFromPosition(position) &&
      u
        .getMatrixPositions()
        .some(p => p.equals(positionToMatrixPosition(position)))
    );
  });

  const sortedUnits = Array.from(intersectedUnits).sort((a, b) => {
    return a.getPosition().y - b.getPosition().y;
  });

  const topUnit = sortedUnits[sortedUnits.length - 1];
  let y = position.y;
  if (topUnit) {
    y = topUnit.getPosition().y + topUnit.getSize().y || 0;
  }
  return y;
}
