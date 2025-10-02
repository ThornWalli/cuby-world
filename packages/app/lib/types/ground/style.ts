export type GroundStyleType = string;

export interface GroundStyle {
  id: string;
  options?: { color?: string | number };
}

export interface GroundStyleTemplate {
  id: string;
  name: string;
  style: GroundStyle;
}
