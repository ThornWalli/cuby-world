import type { Vector3 } from 'three';

export function getFloorFromPosition(position: Vector3) {
  return Math.floor(position.y);
}
