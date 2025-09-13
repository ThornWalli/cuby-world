/* eslint-disable complexity */
import { Vector2, Vector3 } from 'three';
import { WALL_TYPE, type WallDescription } from '../classes/RoomDescription';

import type AssetLoader from '../classes/AssetLoader';
import Wall, { WALL_DIRECTION } from '../classes/Wall';
import EasyStar from 'easystarjs';

export interface WallRoomDescription {
  id: string;
  tiles: Vector2[];
  centroid: Vector2;
  size: number;
}

function getDefaultDirections() {
  return [
    EasyStar.TOP,
    EasyStar.BOTTOM,
    EasyStar.LEFT,
    EasyStar.RIGHT,
    EasyStar.TOP_LEFT,
    EasyStar.TOP_RIGHT,
    EasyStar.BOTTOM_LEFT,
    EasyStar.BOTTOM_RIGHT
  ];
}

const defaultDirections = getDefaultDirections();

enum WALL_ACCESIBLE_DIRECTIONS {
  NORTH = 'north',
  SOUTH = 'south',
  WEST = 'west',
  EAST = 'east'
}

// #region wall pathfinding

/**
 * Legt die Wandbedingungen für den Pfadfinder fest.
 */
export function setWallConditions(
  walls: WallDescription[],
  easystar: EasyStar.js
) {
  const preparedWalls = prepareWalls(walls);
  const doorMap = new Map<
    string,
    {
      type: WALL_TYPE;
      directions: Set<WALL_ACCESIBLE_DIRECTIONS>;
      position: Vector2;
    }
  >();
  preparedWalls.forEach(wall => {
    if (wall.type === WALL_TYPE.DOOR) {
      doorMap.set(
        getKey(wall.position.x, wall.position.y, wall.originDirection),
        wall
      );
    }
  });
  const directionMap = new Map<string, Set<EasyStar.Direction>>();

  preparedWalls.values().forEach(({ position, directions }) => {
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.WEST)) {
      setDirectionalCondition(
        directionMap,
        position.x,
        position.y,
        [EasyStar.LEFT, EasyStar.TOP_LEFT, EasyStar.BOTTOM_LEFT],
        easystar,
        doorMap.get(getKey(position.x, position.y, WALL_DIRECTION.VERTICAL))
          ? [EasyStar.LEFT]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x - 1,
        position.y,
        [EasyStar.RIGHT, EasyStar.TOP_RIGHT, EasyStar.BOTTOM_RIGHT],
        easystar,
        doorMap.get(getKey(position.x - 1, position.y, WALL_DIRECTION.VERTICAL))
          ? [EasyStar.RIGHT]
          : []
      );
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.EAST)) {
      setDirectionalCondition(
        directionMap,
        position.x,
        position.y,
        [EasyStar.RIGHT, EasyStar.TOP_RIGHT, EasyStar.BOTTOM_RIGHT],
        easystar,
        doorMap.get(getKey(position.x, position.y, WALL_DIRECTION.VERTICAL))
          ? [EasyStar.RIGHT]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x + 1,
        position.y,
        [EasyStar.LEFT, EasyStar.TOP_LEFT, EasyStar.BOTTOM_LEFT],
        easystar,
        doorMap.get(getKey(position.x + 1, position.y, WALL_DIRECTION.VERTICAL))
          ? [EasyStar.LEFT]
          : []
      );
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.NORTH)) {
      setDirectionalCondition(
        directionMap,
        position.x,
        position.y,
        [EasyStar.TOP, EasyStar.TOP_LEFT, EasyStar.TOP_RIGHT],
        easystar,
        doorMap.get(getKey(position.x, position.y, WALL_DIRECTION.HORIZONTAL))
          ? [EasyStar.TOP]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x,
        position.y - 1,
        [EasyStar.BOTTOM, EasyStar.BOTTOM_LEFT, EasyStar.BOTTOM_RIGHT],
        easystar,
        doorMap.get(
          getKey(position.x, position.y - 1, WALL_DIRECTION.HORIZONTAL)
        )
          ? [EasyStar.BOTTOM]
          : []
      );

      setDirectionalCondition(
        directionMap,
        position.x - 1,
        position.y - 1,
        [EasyStar.BOTTOM_RIGHT],
        easystar
      );
      setDirectionalCondition(
        directionMap,
        position.x + 1,
        position.y - 1,
        [EasyStar.BOTTOM_LEFT],
        easystar
      );
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.SOUTH)) {
      setDirectionalCondition(
        directionMap,
        position.x,
        position.y,
        [EasyStar.BOTTOM, EasyStar.BOTTOM_LEFT, EasyStar.BOTTOM_RIGHT],
        easystar,
        doorMap.get(getKey(position.x, position.y, WALL_DIRECTION.HORIZONTAL))
          ? [EasyStar.BOTTOM]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x,
        position.y + 1,
        [EasyStar.TOP, EasyStar.TOP_LEFT, EasyStar.TOP_RIGHT],
        easystar,
        doorMap.get(
          getKey(position.x, position.y + 1, WALL_DIRECTION.HORIZONTAL)
        )
          ? [EasyStar.TOP]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x - 1,
        position.y + 1,
        [EasyStar.TOP_RIGHT],
        easystar
      );
      setDirectionalCondition(
        directionMap,
        position.x + 1,
        position.y + 1,
        [EasyStar.TOP_LEFT],
        easystar
      );
    }
  });
}

function getDirection({ startPosition, endPosition }: WallDescription) {
  if (startPosition.x === endPosition.x) {
    return WALL_DIRECTION.VERTICAL;
  } else if (startPosition.y === endPosition.y) {
    return WALL_DIRECTION.HORIZONTAL;
  }
  throw new Error('Invalid wall positions');
}

function getKey(x: number, y: number, direction?: WALL_DIRECTION) {
  return `${x},${y}` + (direction ? `,${direction}` : '');
}

function prepareWalls(walls: WallDescription[]) {
  const wallMap = walls.reduce((result, wall) => {
    const key = getKey(wall.startPosition.x, wall.startPosition.y);

    const test = result.get(key) ?? [];
    test.push(wall);
    if (!result.has(key)) {
      result.set(key, test);
    }

    return result;
  }, new Map<string, WallDescription[]>());

  const preparedWalls = wallMap.values().reduce((result, walls) => {
    walls.forEach(wall => {
      const data: {
        type: WALL_TYPE;
        originDirection: WALL_DIRECTION;
        directions: Set<WALL_ACCESIBLE_DIRECTIONS>;
        position: Vector2;
      } = result.get(
        getKey(wall.startPosition.x, wall.startPosition.y, getDirection(wall))
      ) ?? {
        type: wall.type,
        originDirection: getDirection(wall),
        directions: new Set(),
        position: wall.startPosition
      };

      if (getDirection(wall) === WALL_DIRECTION.VERTICAL) {
        data.directions.add(WALL_ACCESIBLE_DIRECTIONS.WEST);
        const westWall = result.get(
          getKey(
            wall.startPosition.x - 1,
            wall.startPosition.y,
            getDirection(wall)
          )
        ) ?? {
          type: wall.type,
          originDirection: getDirection(wall),
          directions: new Set(),
          position: new Vector2(wall.startPosition.x - 1, wall.startPosition.y)
        };
        westWall.directions.add(WALL_ACCESIBLE_DIRECTIONS.EAST);
        result.set(
          getKey(westWall.position.x, westWall.position.y, getDirection(wall)),
          westWall
        );
      } else {
        data.directions.add(WALL_ACCESIBLE_DIRECTIONS.NORTH);
        const northWall = result.get(
          getKey(
            wall.startPosition.x,
            wall.startPosition.y - 1,
            getDirection(wall)
          )
        ) ?? {
          type: wall.type,
          originDirection: getDirection(wall),
          directions: new Set(),
          position: new Vector2(wall.startPosition.x, wall.startPosition.y - 1)
        };
        northWall.directions.add(WALL_ACCESIBLE_DIRECTIONS.SOUTH);
        result.set(
          getKey(
            northWall.position.x,
            northWall.position.y,
            getDirection(wall)
          ),
          northWall
        );
      }

      result.set(
        getKey(wall.startPosition.x, wall.startPosition.y, getDirection(wall)),
        data
      );
    });
    return result;
  }, new Map<string, { type: WALL_TYPE; originDirection: WALL_DIRECTION; directions: Set<WALL_ACCESIBLE_DIRECTIONS>; position: Vector2 }>());

  return preparedWalls;
}

function setDirectionalCondition(
  directionMap: Map<string, Set<EasyStar.Direction>>,
  x: number,
  y: number,
  directions: EasyStar.Direction[],
  easystar: EasyStar.js,
  ignoredDirections: EasyStar.Direction[] = []
) {
  const key = getKey(x, y);
  const d = directionMap.get(key) ?? new Set<EasyStar.Direction>();
  directions = directions.filter(d_ => !ignoredDirections.includes(d_));
  if (directions.length) {
    directions.forEach(d_ => d.add(d_));
  }
  directionMap.set(key, d);
  easystar.setDirectionalCondition(
    x,
    y,
    defaultDirections.filter(d_ => !d.has(d_))
  );
}

export default function createWalls(
  descriptions: WallDescription[],
  _assetLoader: AssetLoader
) {
  const walls = descriptions.map(
    description =>
      new Wall({
        type: description.type,
        direction: getDirection(description),
        position: new Vector3(
          description.startPosition.x,
          0,
          description.startPosition.y
        )
      })
  );

  const meshes = walls.map(wall => {
    wall.setup();
    // wall.root!.position.copy(wall.position);
    return wall;
  });

  return meshes;
}

// #endregion

// #region wall room detection

function buildWallSet(walls: WallDescription[]) {
  const set = new Set();
  const key = (a: Vector2, b: Vector2) => `${a.x},${a.y}-${b.x},${b.y}`;

  walls.forEach(w => {
    const a = w.startPosition;
    const b = w.endPosition;

    set.add(key(a, b));
    set.add(key(b, a));
  });

  return {
    has: (a: Vector2, b: Vector2) => set.has(key(a, b))
  };
}

function canMoveBetweenTiles(
  tx: number,
  ty: number,
  nx: number,
  ny: number,
  wallSet: {
    has: (a: Vector2, b: Vector2) => boolean;
  }
) {
  const dx = nx - tx;
  const dy = ny - ty;

  if (Math.abs(dx) + Math.abs(dy) !== 1) return false;

  if (dx === 1 && dy === 0) {
    const a = new Vector2(tx + 1, ty);
    const b = new Vector2(tx + 1, ty + 1);
    return !wallSet.has(a, b);
  }
  if (dx === -1 && dy === 0) {
    const a = new Vector2(tx, ty);
    const b = new Vector2(tx, ty + 1);
    return !wallSet.has(a, b);
  }

  if (dx === 0 && dy === 1) {
    const a = new Vector2(tx, ty + 1);
    const b = new Vector2(tx + 1, ty + 1);
    return !wallSet.has(a, b);
  }
  if (dx === 0 && dy === -1) {
    const a = new Vector2(tx, ty);
    const b = new Vector2(tx + 1, ty);
    return !wallSet.has(a, b);
  }

  return false;
}

/**
 * Wird genutzt um Räume zu erkennen, die durch Wände begrenzt sind.
 */
export function getWallRoomDescriptions(walls: WallDescription[]) {
  const wallSet = buildWallSet(walls);

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  walls.forEach(w => {
    minX = Math.min(minX, w.startPosition.x, w.endPosition.x);
    minY = Math.min(minY, w.startPosition.y, w.endPosition.y);
    maxX = Math.max(maxX, w.startPosition.x, w.endPosition.x);
    maxY = Math.max(maxY, w.startPosition.y, w.endPosition.y);
  });

  const tileMinX = Math.floor(minX - 1);
  const tileMinY = Math.floor(minY - 1);
  const tileMaxX = Math.ceil(maxX);
  const tileMaxY = Math.ceil(maxY);

  const visited = new Set();
  const rooms: WallRoomDescription[] = [];

  const inBounds = (x: number, y: number) =>
    x >= tileMinX && y >= tileMinY && x < tileMaxX && y < tileMaxY;

  for (let tx = tileMinX; tx < tileMaxX; tx++) {
    for (let ty = tileMinY; ty < tileMaxY; ty++) {
      const key = `${tx},${ty}`;
      if (visited.has(key)) continue;

      // Starte BFS
      const queue = [new Vector2(tx, ty)];
      const roomTiles = [];
      visited.add(key);

      while (queue.length > 0) {
        const cur = queue.shift()!;
        roomTiles.push(new Vector2(cur.x, cur.y));

        const neighs = [
          new Vector2(cur.x + 1, cur.y),
          new Vector2(cur.x - 1, cur.y),
          new Vector2(cur.x, cur.y + 1),
          new Vector2(cur.x, cur.y - 1)
        ];

        neighs.forEach(n => {
          const nKey = n.toArray().toString();
          if (!inBounds(n.x, n.y)) return;
          if (visited.has(nKey)) return;
          if (!canMoveBetweenTiles(cur.x, cur.y, n.x, n.y, wallSet)) return;
          visited.add(nKey);
          queue.push(n);
        });
      }

      if (roomTiles.length > 0) {
        const cx =
          roomTiles.reduce((s, p) => s + (p.x + 0.5), 0) / roomTiles.length;
        const cy =
          roomTiles.reduce((s, p) => s + (p.y + 0.5), 0) / roomTiles.length;

        rooms.push({
          id: crypto.randomUUID(),
          tiles: roomTiles,
          centroid: new Vector2(cx, cy),
          size: roomTiles.length
        });
      }
    }
  }

  const maxSize = Math.max(...rooms.map(r => r.size));
  return rooms.filter(r => r.size < maxSize);
}

// #endregion
