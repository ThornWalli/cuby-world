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
    ROTATION.WEST,
    ROTATION.NORTH,
    ROTATION.NORTH_WEST,
    ROTATION.NORTH_EAST,
    ROTATION.EAST,
    ROTATION.SOUTH,
    ROTATION.SOUTH_EAST,
    ROTATION.SOUTH_WEST
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
