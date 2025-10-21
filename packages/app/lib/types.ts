import type { Texture } from 'three';

export interface Textures {
  [key: string]: Texture;
}

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

export const rotationDirections = {
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
};
