import type { Vector3 } from 'three';

export function getFloorFromPosition(position: Vector3) {
  return Math.floor(position.y);
}

export function getFloorRange(max: number, min = 0): number[] {
  const range: number[] = [];
  for (let i = min; i <= max; i++) {
    range.push(i);
  }
  return range;
}
