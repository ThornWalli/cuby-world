import { Vector3 } from 'three';
import type {
  GroundStyleDescription,
  GrountStyleIdentifier
} from '../types/ground';

const IGNORED_GROUND_STYLES = ['default_empty', 'default_editor_empty'];

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

  map: (GrountStyleIdentifier | undefined)[][][];

  constructor({
    map: map
  }: {
    map?: GrountStyleIdentifier[][][];
  } = {}) {
    this.map = map ?? [];
  }

  get(x: number, y: number, z: number) {
    if (this.map[y] && this.map[y][x] && this.map[y][x][z]) {
      return this.map[y][x][z];
    }
    // return 'default_empty';
  }

  set(x: number, y: number, z: number, styleId?: GrountStyleIdentifier) {
    if (!this.map[y]) {
      this.map[y] = [];
    }
    if (!this.map[y][x]) {
      this.map[y][x] = [];
    }

    this.map[y][x]![z] = styleId;
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
                if (!styleId || IGNORED_GROUND_STYLES.includes(styleId)) return;
                result.set(
                  styleId,
                  result.get(styleId) ?? { id: styleId, positions: [] }
                );
                result.get(styleId)!.positions.push(new Vector3(x, y, z));
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

  static fromGroundsStyles(groundstyles: GroundStyleDescription[]) {
    const groundStyleMap = new GroundStyleMap();
    groundstyles.forEach(({ id: styleId, positions }) => {
      positions.forEach(position => {
        groundStyleMap.set(position.x, position.y, position.z, styleId);
      });
    });
    return groundStyleMap;
  }
}
