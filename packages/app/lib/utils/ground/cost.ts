export interface GroundCost {
  VERY_SLOW: number;
  SLOW: number;
  NORMAL: number;
  FAST: number;
  VERY_FAST: number;
}

export const GROUND_COST: GroundCost = {
  VERY_SLOW: 10,
  SLOW: 5,
  NORMAL: 1,
  FAST: 0.5,
  VERY_FAST: 0.1
};
