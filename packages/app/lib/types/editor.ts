export enum EDITOR_ACTION {
  NONE = 'none',
  WALL = 'wall',
  GROUND = 'ground'
}

export enum WALL_ACTION {
  NONE = 'none',
  ADD = 'add',
  REMOVE = 'remove',
  MODE_DOOR = 'mode_door',
  MODE_WINDOW = 'mode_window',
  MODE_STYLE = 'style'
}

export enum GROUND_ACTION {
  NONE = 'none',
  MODE_STYLE = 'style',
  GROUND_SINGLE_SET = 'ground_single_set',
  GROUND_MULTIPLE_SET = 'ground_multiple_set'
}

// export interface WallStyleSelect {
//   id: string;
//   color: string;
//   name: string;
// }
