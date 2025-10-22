export interface RendererOptions {
  pixelated: boolean;
  controls: boolean;
}

export enum ORIGIN {
  TOP_LEFT = 'top_left',
  TOP = 'top',
  TOP_RIGHT = 'top_right',
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM = 'bottom',
  BOTTOM_RIGHT = 'bottom_right'
}
