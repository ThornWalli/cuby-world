import type { Texture } from 'three';

export interface Textures {
  [key: string]: Texture;
}

export enum ROTATION {
  WEST = 'west',
  WEST_UP = 'west-north',
  WEST_DOWN = 'west-south',
  NORTH = 'north',
  EAST = 'east',
  EAST_UP = 'east-north',
  EAST_DOWN = 'east-south',
  SOUTH = 'south'
}
export enum ROTATION_TYPE {
  BASIC = 'basic',
  EXTENDED = 'extended'
}
