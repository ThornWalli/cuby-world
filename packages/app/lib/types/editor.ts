export enum EDITOR_ACTION {
  NONE = 'none',
  WALL = 'wall',
  GROUND = 'ground',
  STAIR = 'stair'
}

export enum WALL_ACTION {
  NONE = 'none',
  MODE_MASON = 'mode_mason',
  MODE_PAINTER = 'mode_painter',
  MODE_DOOR = 'mode_door',
  MODE_WINDOW = 'mode_window'
}

export enum GROUND_ACTION {
  NONE = 'none',
  STYLE = 'style',
  REMOVE = 'remove',
  STYLE_SINGLE_SET = 'style_single_set',
  STYLE_MULTIPLE_SET = 'style_multiple_set',
  REMOVE_SINGLE_SET = 'remove_single_set',
  REMOVE_MULTIPLE_SET = 'remove_multiple_set'
}

export enum STAIR_ACTION {
  NONE = 'none',
  DEFAULT = 'default',
  ADD = 'add',
  SKIN = 'skin',
  SELECT = 'select'
}
