import type { Vector3 } from 'three';
import type { UnitModuleState } from '../classes/UnitModule';
import type { ROTATION } from '../utils/rotation';

export type UnitIdentifier = string;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UnitType {}

export const UNIT_TYPE: UnitType = {} as UnitType;

export interface RawUnitDescription<Rotation = string, Position = number[]> {
  id: string;
  unit: string;
  options: {
    skin: string;
    accessible?: boolean;
    position: Position;
    rotation: Rotation;
    // options: { [key: string]: unknown };
    moduleStates: { [key: string]: UnitModuleState };
    [key: string]: unknown;
  };
}
export type UnitDescription<
  Rotation = ROTATION,
  Position = Vector3
> = RawUnitDescription<Rotation, Position>;
