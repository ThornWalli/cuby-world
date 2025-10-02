import type { Vector2 } from 'three';

export interface GroundDescription {
  type: string;
  values: [number, number][];
}

export interface GroundStyleDescription<V = Vector2[]> {
  id: string;
  options?: { color?: string | number };
  positions: V;
}
