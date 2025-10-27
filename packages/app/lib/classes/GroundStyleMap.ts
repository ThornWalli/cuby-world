import type { GroundSkinIdentifier } from './../types/ground/skins';
import { Vector3 } from 'three';
import type { GroundStyleDescription } from '../types/ground';

const IGNORED_GROUND_STYLES = ['default_empty', 'default_editor_empty'];

export interface GroundStyleMapValue {
  skinId: GroundSkinIdentifier;
  type: string;
}
export default class GroundStyleMap {
  getPositions() {
    return this.map
      .map((_, y) =>
        _.map((__, x) =>
          __.map((styleId, z) => {
            return new Vector3(x, y, z);
          })
        )
      )
      .flat()
      .flat();
  }

  map: (GroundStyleMapValue | undefined)[][][];

  constructor({
    map: map
  }: {
    map?: GroundStyleMapValue[][][];
  } = {}) {
    this.map = map ?? [];
  }

  get(x: number, y: number, z: number) {
    if (this.map[y] && this.map[y][x] && this.map[y][x][z]) {
      return this.map[y][x][z];
    }
    // return 'default_empty';
  }

  set(x: number, y: number, z: number, value?: GroundStyleMapValue) {
    if (!this.map[y]) {
      this.map[y] = [];
    }
    if (!this.map[y][x]) {
      this.map[y][x] = [];
    }

    this.map[y][x]![z] = value;
  }

  delete(x: number, y: number, z: number) {
    if (this.map[y] && this.map[y][x] && this.map[y][x][z]) {
      this.map[y][x][z] = undefined;
    }
  }

  clear() {
    this.map = [];
  }

  toGroundStyles() {
    return Array.from(
      this.map
        .reduce(
          (result, map_, y) => {
            map_.forEach((map__, x) => {
              map__.forEach((styleId, z) => {
                if (!styleId || IGNORED_GROUND_STYLES.includes(styleId.skinId))
                  return;

                const key = `${styleId.type}_${styleId.skinId}`;
                result.set(
                  key,
                  result.get(key) ?? { ...styleId, positions: [] }
                );
                result.get(key)!.positions.push(new Vector3(x, y, z));
              });
            });
            return result;
          },
          new Map() as Map<string, GroundStyleDescription<Vector3[]>>
        )
        .values()
    );
  }

  toJSON() {
    return {
      map: this.map
    };
  }

  values() {
    return this.map
      .flat()
      .flat()
      .filter(v => v !== undefined) as GroundStyleMapValue[];
  }

  static fromGroundsStyles(groundstyles: GroundStyleDescription[]) {
    const groundStyleMap = new GroundStyleMap();
    groundstyles.forEach(({ type, skinId, positions }) => {
      positions.forEach(position => {
        groundStyleMap.set(position.x, position.y, position.z, {
          type,
          skinId
        });
      });
    });
    return groundStyleMap;
  }
}
