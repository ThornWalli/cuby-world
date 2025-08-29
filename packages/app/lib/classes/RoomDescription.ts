import type { Vector3 } from 'three';
import type { UNIT_ROTATION } from './Unit';
import type Unit from './Unit';
import type RoomGrid from './RoomGrid';

export default class RoomDescription {
  id: string;
  name: string;
  description: string;
  grid: RoomGrid;
  units: Unit[];

  start?: {
    position: Vector3;
    rotation: UNIT_ROTATION;
  };

  constructor({
    id,
    name,
    description,
    grid,
    units,
    start
  }: {
    id: string;
    name: string;
    description: string;
    grid: RoomGrid;
    units?: Unit[];
    start?: {
      position: Vector3;
      rotation: UNIT_ROTATION;
    };
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.grid = grid;
    this.units = units || [];
    this.start = start;
  }
}
