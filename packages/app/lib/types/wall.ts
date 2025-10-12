import type { BufferGeometry, Vector2, Vector3 } from 'three';
import type { WallTexture } from './textures';
import type { WallExtensionDescription } from '../classes/WallExtension';
import type { WallSkins } from './wall/skins';

export type WallGeometryMap = Map<WALL_GEOMETRY, BufferGeometry | null>;
export type WallTextureMap = Map<string, WallTexture>;

export enum FACE_INDEX {
  FRONT = 0,
  BACK = 1
}

export enum WALL_GEOMETRY {
  //#region default
  DEFAULT_LARGE_N_N = 'default_large_n_n',
  DEFAULT_LARGE_N_L = 'default_large_n_l',
  DEFAULT_LARGE_N_E0 = 'default_large_n_e0',
  DEFAULT_LARGE_N_E1 = 'default_large_n_e1',
  DEFAULT_LARGE_E0_N = 'default_large_e0_n',
  DEFAULT_LARGE_E0_L = 'default_large_e0_l',
  DEFAULT_LARGE_E0_E0 = 'default_large_e0_e0',
  DEFAULT_LARGE_E0_E1 = 'default_large_e0_e1',
  DEFAULT_LARGE_E1_N = 'default_large_e1_n',
  DEFAULT_LARGE_E1_L = 'default_large_e1_l',
  DEFAULT_LARGE_E1_E0 = 'default_large_e1_e0',
  DEFAULT_LARGE_E1_E1 = 'default_large_e1_e1',
  DEFAULT_LARGE_L_L = 'default_large_l_l',
  DEFAILT_LARGE_L_N = 'default_large_l_n',
  DEFAILT_LARGE_L_E0 = 'default_large_l_e0',
  DEFAULT_LARGE_L_E1 = 'default_large_l_e1',
  //#endregion

  //#region default small
  DEFAULT_SMALL_N_N = 'default_small_n_n',
  DEFAULT_SMALL_N_L = 'default_small_n_l',
  DEFAULT_SMALL_N_E0 = 'default_small_n_e0',
  DEFAULT_SMALL_N_E1 = 'default_small_n_e1',
  DEFAULT_SMALL_E0_N = 'default_small_e0_n',
  DEFAULT_SMALL_E0_L = 'default_small_e0_l',
  DEFAULT_SMALL_E0_E0 = 'default_small_e0_e0',
  DEFAULT_SMALL_E0_E1 = 'default_small_e0_e1',
  DEFAULT_SMALL_E1_N = 'default_small_e1_n',
  DEFAULT_SMALL_E1_L = 'default_small_e1_l',
  DEFAULT_SMALL_E1_E0 = 'default_small_e1_e0',
  DEFAULT_SMALL_E1_E1 = 'default_small_e1_e1',
  DEFAULT_SMALL_L_L = 'default_small_l_l',
  DEFAILT_SMALL_L_N = 'default_small_l_n',
  DEFAILT_SMALL_L_E0 = 'default_small_l_e0',
  DEFAULT_SMALL_L_E1 = 'default_small_l_e1',
  //#endregion

  //#region door

  DOOR_LARGE_N_N = 'door_large_n_n',
  DOOR_LARGE_N_L = 'door_large_n_l',
  DOOR_LARGE_N_E0 = 'door_large_n_e0',
  DOOR_LARGE_N_E1 = 'door_large_n_e1',
  DOOR_LARGE_E0_N = 'door_large_e0_n',
  DOOR_LARGE_E0_L = 'door_large_e0_l',
  DOOR_LARGE_E0_E0 = 'door_large_e0_e0',
  DOOR_LARGE_E0_E1 = 'door_large_e0_e1',
  DOOR_LARGE_E1_N = 'door_large_e1_n',
  DOOR_LARGE_E1_L = 'door_large_e1_l',
  DOOR_LARGE_E1_E0 = 'door_large_e1_e0',
  DOOR_LARGE_E1_E1 = 'door_large_e1_e1',
  DOOR_LARGE_L_L = 'door_large_l_l',
  DOOR_LARGE_L_N = 'door_large_l_n',
  DOOR_LARGE_L_E0 = 'door_large_l_e0',
  DOOR_LARGE_L_E1 = 'door_large_l_e1',
  //#endregion

  //#region door small

  DOOR_SMALL_N_N = 'door_small_n_n',
  DOOR_SMALL_N_L = 'door_small_n_l',
  DOOR_SMALL_N_E0 = 'door_small_n_e0',
  DOOR_SMALL_N_E1 = 'door_small_n_e1',
  DOOR_SMALL_E0_N = 'door_small_e0_n',
  DOOR_SMALL_E0_L = 'door_small_e0_l',
  DOOR_SMALL_E0_E0 = 'door_small_e0_e0',
  DOOR_SMALL_E0_E1 = 'door_small_e0_e1',
  DOOR_SMALL_E1_N = 'door_small_e1_n',
  DOOR_SMALL_E1_L = 'door_small_e1_l',
  DOOR_SMALL_E1_E0 = 'door_small_e1_e0',
  DOOR_SMALL_E1_E1 = 'door_small_e1_e1',
  DOOR_SMALL_L_L = 'door_small_l_l',
  DOOR_SMALL_L_N = 'door_small_l_n',
  DOOR_SMALL_L_E0 = 'door_small_l_e0',
  DOOR_SMALL_L_E1 = 'door_small_l_e1',

  //#endregion

  //#region window small

  WINDOW_LARGE_SMALL_N_N = 'window_large_small_n_n',
  WINDOW_LARGE_SMALL_N_L = 'window_large_small_n_l',
  WINDOW_LARGE_SMALL_N_E0 = 'window_large_small_n_e0',
  WINDOW_LARGE_SMALL_N_E1 = 'window_large_small_n_e1',
  WINDOW_LARGE_SMALL_E0_N = 'window_large_small_e0_n',
  WINDOW_LARGE_SMALL_E0_L = 'window_large_small_e0_l',
  WINDOW_LARGE_SMALL_E0_E0 = 'window_large_small_e0_e0',
  WINDOW_LARGE_SMALL_E0_E1 = 'window_large_small_e0_e1',
  WINDOW_LARGE_SMALL_E1_N = 'window_large_small_e1_n',
  WINDOW_LARGE_SMALL_E1_L = 'window_large_small_e1_l',
  WINDOW_LARGE_SMALL_E1_E0 = 'window_large_small_e1_e0',
  WINDOW_LARGE_SMALL_E1_E1 = 'window_large_small_e1_e1',
  WINDOW_LARGE_SMALL_L_L = 'window_large_small_l_l',
  WINDOW_LARGE_SMALL_L_N = 'window_large_small_l_n',
  WINDOW_LARGE_SMALL_L_E0 = 'window_large_small_l_e0',
  WINDOW_LARGE_SMALL_L_E1 = 'window_large_small_l_e1',

  //#endregion

  //#region window medium

  WINDOW_LARGE_MEDIUM_N_N = 'window_large_medium_n_n',
  WINDOW_LARGE_MEDIUM_N_L = 'window_large_medium_n_l',
  WINDOW_LARGE_MEDIUM_N_E0 = 'window_large_medium_n_e0',
  WINDOW_LARGE_MEDIUM_N_E1 = 'window_large_medium_n_e1',
  WINDOW_LARGE_MEDIUM_E0_N = 'window_large_medium_e0_n',
  WINDOW_LARGE_MEDIUM_E0_L = 'window_large_medium_e0_l',
  WINDOW_LARGE_MEDIUM_E0_E0 = 'window_large_medium_e0_e0',
  WINDOW_LARGE_MEDIUM_E0_E1 = 'window_large_medium_e0_e1',
  WINDOW_LARGE_MEDIUM_E1_N = 'window_large_medium_e1_n',
  WINDOW_LARGE_MEDIUM_E1_L = 'window_large_medium_e1_l',
  WINDOW_LARGE_MEDIUM_E1_E0 = 'window_large_medium_e1_e0',
  WINDOW_LARGE_MEDIUM_E1_E1 = 'window_large_medium_e1_e1',
  WINDOW_LARGE_MEDIUM_L_L = 'window_large_medium_l_l',
  WINDOW_LARGE_MEDIUM_L_N = 'window_large_medium_l_n',
  WINDOW_LARGE_MEDIUM_L_E0 = 'window_large_medium_l_e0',
  WINDOW_LARGE_MEDIUM_L_E1 = 'window_large_medium_l_e1',

  //#endregion

  //#region window large

  WINDOW_LARGE_LARGE_N_N = 'window_large_large_n_n',
  WINDOW_LARGE_LARGE_N_L = 'window_large_large_n_l',
  WINDOW_LARGE_LARGE_N_E0 = 'window_large_large_n_e0',
  WINDOW_LARGE_LARGE_N_E1 = 'window_large_large_n_e1',
  WINDOW_LARGE_LARGE_E0_N = 'window_large_large_e0_n',
  WINDOW_LARGE_LARGE_E0_L = 'window_large_large_e0_l',
  WINDOW_LARGE_LARGE_E0_E0 = 'window_large_large_e0_e0',
  WINDOW_LARGE_LARGE_E0_E1 = 'window_large_large_e0_e1',
  WINDOW_LARGE_LARGE_E1_N = 'window_large_large_e1_n',
  WINDOW_LARGE_LARGE_E1_L = 'window_large_large_e1_l',
  WINDOW_LARGE_LARGE_E1_E0 = 'window_large_large_e1_e0',
  WINDOW_LARGE_LARGE_E1_E1 = 'window_large_large_e1_e1',
  WINDOW_LARGE_LARGE_L_L = 'window_large_large_l_l',
  WINDOW_LARGE_LARGE_L_N = 'window_large_large_l_n',
  WINDOW_LARGE_LARGE_L_E0 = 'window_large_large_l_e0',
  WINDOW_LARGE_LARGE_L_E1 = 'window_large_large_l_e1'

  //#endregion
}

export enum WALL_EDGE_TYPE {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  TOP_LEFT = 'top_left',
  TOP_RIGHT = 'top_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_RIGHT = 'bottom_right',
  CROSS = 'cross',
  T_CROSS_LEFT = 't_cross_left',
  T_CROSS_I_LEFT = 't_cross_left_i', // Nur für innere ecken
  T_CROSS_RIGHT = 't_cross_right',
  T_CROSS_I_RIGHT = 't_cross_right_i', // Nur für innere ecken
  T_CROSS_TOP = 't_cross_top',
  T_CROSS_I_TOP = 't_cross_top_i', // Nur für innere ecken
  T_CROSS_BOTTOM = 't_cross_bottom',
  T_CROSS_I_BOTTOM = 't_cross_i_bottom' // Nur für innere ecken
}

export enum WALL_SIZE {
  SMALL = 'small',
  LARGE = 'large'
}
export enum WALL_WINDOW_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum WALL_GEOMETRY_TYPE {
  NONE = 'n',
  LINE = 'l',
  EDGE_LEFT = 'e0',
  EDGE_RIGHT = 'e1'
}

export interface WallDescription<
  Position = Vector3,
  Extension = WallExtensionDescription
> {
  type?: WALL_TYPE;
  direction: WALL_DIRECTION;
  position: Position;
  skins: WallSkins;
  extensions: Extension[];
}

export interface WallEdge {
  wall: WallDescription;
  // position: Vector2;
  // direction: WALL_DIRECTION;
  type: WALL_TYPE;
  offset: Vector3;
  edgeType: WALL_EDGE_TYPE;
}

export interface WallRoomDescription {
  id: string;
  floor: number;
  tiles: Vector2[];
  centroid: Vector2;
  size: number;
}

export interface WallOptions {
  type: WALL_TYPE;
  direction: WALL_DIRECTION;
  size: WALL_SIZE;
  windowSize?: WALL_WINDOW_SIZE;
  left: WALL_GEOMETRY_TYPE;
  right: WALL_GEOMETRY_TYPE;
}

export enum WALL_DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export enum WALL_TYPE {
  DEFAULT = 'default',
  DOOR = 'door',
  WINDOW = 'window'
}
