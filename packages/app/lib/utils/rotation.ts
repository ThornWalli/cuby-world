import type { Vector3 } from 'three';
import { Euler } from 'three';

export enum ROTATION {
  WEST = 'west',
  NORTH = 'north',
  NORTH_EAST = 'north-east',
  NORTH_WEST = 'north-west',
  EAST = 'east',
  SOUTH = 'south',
  SOUTH_EAST = 'south-east',
  SOUTH_WEST = 'south-west'
}
export enum ROTATION_TYPE {
  BASIC = 'basic',
  EXTENDED = 'extended'
}

export const rotationDirections = Object.freeze({
  [ROTATION_TYPE.BASIC]: [
    ROTATION.WEST,
    ROTATION.NORTH,
    ROTATION.EAST,
    ROTATION.SOUTH
  ],
  [ROTATION_TYPE.EXTENDED]: [
    ROTATION.NORTH,
    ROTATION.NORTH_WEST,
    ROTATION.WEST,
    ROTATION.SOUTH_WEST,
    ROTATION.SOUTH,
    ROTATION.SOUTH_EAST,
    ROTATION.EAST,
    ROTATION.NORTH_EAST
  ]
});

export function invertRotation(rotation: ROTATION): ROTATION {
  switch (rotation) {
    case ROTATION.WEST:
      return ROTATION.EAST;
    case ROTATION.NORTH:
      return ROTATION.SOUTH;
    case ROTATION.EAST:
      return ROTATION.WEST;
    case ROTATION.SOUTH:
      return ROTATION.NORTH;
    case ROTATION.NORTH_EAST:
      return ROTATION.SOUTH_WEST;
    case ROTATION.NORTH_WEST:
      return ROTATION.SOUTH_EAST;
    case ROTATION.SOUTH_EAST:
      return ROTATION.NORTH_WEST;
    case ROTATION.SOUTH_WEST:
      return ROTATION.NORTH_EAST;
  }
}

export function getRotationAngle(rotation: ROTATION) {
  switch (rotation) {
    case ROTATION.WEST:
      return new Euler(0, Math.PI, 0);
    case ROTATION.EAST:
      return new Euler(0, 0, 0);
    case ROTATION.NORTH_WEST:
      return new Euler(0, (3 * Math.PI) / 4, 0);
    case ROTATION.SOUTH_WEST:
      return new Euler(0, -(3 * Math.PI) / 4, 0);
    case ROTATION.NORTH_EAST:
      return new Euler(0, Math.PI / 4, 0);
    case ROTATION.SOUTH_EAST:
      return new Euler(0, -Math.PI / 4, 0);
    case ROTATION.NORTH:
      return new Euler(0, Math.PI / 2, 0);
    case ROTATION.SOUTH:
      return new Euler(0, -Math.PI / 2, 0);
    default:
      return new Euler(0, 0, 0);
  }
}

export function getRotationByEuler(euler: Euler): ROTATION | null {
  if (euler.x === 0 && euler.y === 0 && euler.z === 0) {
    return null;
  }

  if (euler.x === Math.PI / 2) {
    return ROTATION.NORTH;
  } else if (euler.x === -Math.PI / 2) {
    return ROTATION.SOUTH;
  } else if (euler.y === Math.PI / 2) {
    return ROTATION.EAST;
  } else if (euler.y === -Math.PI / 2) {
    return ROTATION.WEST;
  }
  return null;
}

export function getRadByRotation(rotation: ROTATION): number {
  switch (rotation) {
    case ROTATION.WEST:
      return Math.PI;
    case ROTATION.NORTH_WEST:
      return (3 * Math.PI) / 4;
    case ROTATION.SOUTH_WEST:
      return -(3 * Math.PI) / 4;
    case ROTATION.EAST:
      return 0;
    case ROTATION.NORTH_EAST:
      return Math.PI / 4;
    case ROTATION.SOUTH_EAST:
      return -Math.PI / 4;
    case ROTATION.NORTH:
      return Math.PI / 2;
    case ROTATION.SOUTH:
      return -Math.PI / 2;
    default:
      return 0;
  }
}

export function getRotationByPosition(
  startPosition: Vector3,
  targetPosition: Vector3
): ROTATION {
  const deltaX = targetPosition.x - startPosition.x;
  const deltaZ = targetPosition.z - startPosition.z;

  if (Math.abs(deltaX) > Math.abs(deltaZ)) {
    // Horizontal movement is greater
    if (deltaX > 0) {
      return ROTATION.EAST;
    } else {
      return ROTATION.WEST;
    }
  } else if (Math.abs(deltaZ) > Math.abs(deltaX)) {
    // Vertical movement is greater
    if (deltaZ > 0) {
      return ROTATION.SOUTH;
    } else {
      return ROTATION.NORTH;
    }
  } else {
    // Diagonal movement
    if (deltaX > 0 && deltaZ > 0) {
      return ROTATION.SOUTH_EAST;
    } else if (deltaX > 0 && deltaZ < 0) {
      return ROTATION.NORTH_EAST;
    } else if (deltaX < 0 && deltaZ > 0) {
      return ROTATION.SOUTH_WEST;
    } else {
      return ROTATION.NORTH_WEST;
    }
  }
}
