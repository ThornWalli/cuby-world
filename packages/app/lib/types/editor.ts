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
  STYLE = 'style',
  REMOVE = 'remove',
  STYLE_SINGLE_SET = 'style_single_set',
  STYLE_MULTIPLE_SET = 'style_multiple_set',
  REMOVE_SINGLE_SET = 'remove_single_set',
  REMOVE_MULTIPLE_SET = 'remove_multiple_set'
}
