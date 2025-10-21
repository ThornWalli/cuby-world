/* eslint-disable complexity */
import type { Object3D, BufferAttribute } from 'three';
import {
  Vector2,
  Vector3,
  BoxGeometry,
  BufferGeometry,
  Mesh,
  MeshPhongMaterial
} from 'three';
import EasyStar from 'easystarjs';
import Wall, { type WallIdentifier } from '../classes/Wall';

import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LOADER } from '../classes/AssetLoader';
import {
  WALL_ACCESIBLE_DIRECTIONS,
  WALL_DIRECTION,
  WALL_EDGE_TYPE,
  WALL_GEOMETRY,
  WALL_GEOMETRY_TYPE,
  WALL_SIZE,
  WALL_TYPE,
  WALL_WINDOW_SIZE,
  type WallDescription,
  type WallEdge,
  type WallGeometryMap,
  type WallOptions,
  type WallRoomDescription
} from '../types/wall';
import { ArrayKeyMap } from '../classes/ArrayKeyMap';
import type WallExtension from '../classes/WallExtension';
import {
  WALL_EXTENSION_TYPE,
  type WallExtensionDescription,
  type WallExtensionState
} from '../classes/WallExtension';
import type { AnimationLoopSubject } from '../classes/Renderer';
import type DoorWallExtension from '../classes/wallExtension/Door';
import assetLoader from '@cuby-world/app/services/assetLoader';
import { textureMap as wallTextureMap } from '@cuby-world/walls/textures';
import type { FloorIndex } from '../types/floor';
import { OBJECT_USER_DATA } from '@cuby-world/app/lib/utils/object';

export function getWallIdentifierFromObject(
  object?: Object3D | null
): WallIdentifier | null {
  if (object?.userData[OBJECT_USER_DATA.WALL_EXTENSION_WALL]) {
    return object.userData[
      OBJECT_USER_DATA.WALL_EXTENSION_WALL
    ] as WallIdentifier;
  }
  if (object?.userData[OBJECT_USER_DATA.WALL]) {
    return object.userData[OBJECT_USER_DATA.WALL] as WallIdentifier;
  }
  return null;
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

//#region wall pathfinding

/**
 * Ruft alle Türen anhand der Wände ab und legt jeweils ein Eintrag auf beiden auf beiden Tiles an, die von der Wand getrennt werden.
 */
export function getWallDoorExtensionsByPosition(walls: Wall[]) {
  const preparedWalls = prepareWalls(walls);
  const doorWalls = Array.from(preparedWalls.values()).filter(({ wall }) =>
    wall.hasExtension(WALL_EXTENSION_TYPE.DOOR)
  );

  return doorWalls.reduce((result, { wall, directions, position }) => {
    const extension = wall.getExtensionByType<DoorWallExtension>(
      WALL_EXTENSION_TYPE.DOOR
    );

    if (!extension) throw new Error('No door extension found');

    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.WEST)) {
      result.set([position.x, position.z], extension); // Left
      result.set([position.x - 1, position.z], extension); // Right
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.EAST)) {
      result.set([position.x, position.z], extension); // Right
      result.set([position.x + 1, position.z], extension); // Left
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.NORTH)) {
      result.set([position.x, position.z], extension); // Top
      result.set([position.x, position.z - 1], extension); // Bottom
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.SOUTH)) {
      result.set([position.x, position.z], extension); // Bottom
      result.set([position.x, position.z + 1], extension); // Top
    }
    return result;
  }, new ArrayKeyMap<[number, number], DoorWallExtension>());
}

/**
 * Legt die Wandbedingungen für den Pfadfinder fest.
 * Beispiel: Wenn Türen vorhanden sind, können Einheiten durch diese hindurchgehen.
 */
export function setWallConditions(walls: Wall[], easystar: EasyStar.js) {
  const preparedWalls = prepareWalls(walls);

  const doorMap = new ArrayKeyMap<
    [number, number, WALL_DIRECTION],
    {
      type: WALL_TYPE;
      originDirection: WALL_DIRECTION;
      directions: Set<WALL_ACCESIBLE_DIRECTIONS>;
      position: Vector3;
    }
  >();
  preparedWalls.forEach(wall => {
    if (wall.type === WALL_TYPE.DOOR) {
      doorMap.set(
        [wall.position.x, wall.position.z, wall.originDirection],
        wall
      );
    }
  });
  const directionMap = new ArrayKeyMap<
    [number, number],
    Set<EasyStar.Direction>
  >();

  Array.from(preparedWalls.values()).forEach(({ position, directions }) => {
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.WEST)) {
      setDirectionalCondition(
        directionMap,
        position.x,
        position.z,
        [EasyStar.LEFT, EasyStar.TOP_LEFT, EasyStar.BOTTOM_LEFT],
        easystar,
        doorMap.get([position.x, position.z, WALL_DIRECTION.VERTICAL])
          ? [EasyStar.LEFT]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x - 1,
        position.z,
        [EasyStar.RIGHT, EasyStar.TOP_RIGHT, EasyStar.BOTTOM_RIGHT],
        easystar,
        doorMap.get([position.x - 1, position.z, WALL_DIRECTION.VERTICAL])
          ? [EasyStar.RIGHT]
          : []
      );
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.EAST)) {
      setDirectionalCondition(
        directionMap,
        position.x,
        position.z,
        [EasyStar.RIGHT, EasyStar.TOP_RIGHT, EasyStar.BOTTOM_RIGHT],
        easystar,
        doorMap.get([position.x, position.z, WALL_DIRECTION.VERTICAL])
          ? [EasyStar.RIGHT]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x + 1,
        position.z,
        [EasyStar.LEFT, EasyStar.TOP_LEFT, EasyStar.BOTTOM_LEFT],
        easystar,
        doorMap.get([position.x + 1, position.z, WALL_DIRECTION.VERTICAL])
          ? [EasyStar.LEFT]
          : []
      );
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.NORTH)) {
      setDirectionalCondition(
        directionMap,
        position.x,
        position.z,
        [EasyStar.TOP, EasyStar.TOP_LEFT, EasyStar.TOP_RIGHT],
        easystar,
        doorMap.get([position.x, position.z, WALL_DIRECTION.HORIZONTAL])
          ? [EasyStar.TOP]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x,
        position.z - 1,
        [EasyStar.BOTTOM, EasyStar.BOTTOM_LEFT, EasyStar.BOTTOM_RIGHT],
        easystar,
        doorMap.get([position.x, position.z - 1, WALL_DIRECTION.HORIZONTAL])
          ? [EasyStar.BOTTOM]
          : []
      );

      setDirectionalCondition(
        directionMap,
        position.x - 1,
        position.z - 1,
        [EasyStar.BOTTOM_RIGHT],
        easystar
      );
      setDirectionalCondition(
        directionMap,
        position.x + 1,
        position.z - 1,
        [EasyStar.BOTTOM_LEFT],
        easystar
      );
    }
    if (directions.has(WALL_ACCESIBLE_DIRECTIONS.SOUTH)) {
      setDirectionalCondition(
        directionMap,
        position.x,
        position.z,
        [EasyStar.BOTTOM, EasyStar.BOTTOM_LEFT, EasyStar.BOTTOM_RIGHT],
        easystar,
        doorMap.get([position.x, position.z, WALL_DIRECTION.HORIZONTAL])
          ? [EasyStar.BOTTOM]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x,
        position.z + 1,
        [EasyStar.TOP, EasyStar.TOP_LEFT, EasyStar.TOP_RIGHT],
        easystar,
        doorMap.get([position.x, position.z + 1, WALL_DIRECTION.HORIZONTAL])
          ? [EasyStar.TOP]
          : []
      );
      setDirectionalCondition(
        directionMap,
        position.x - 1,
        position.z + 1,
        [EasyStar.TOP_RIGHT],
        easystar
      );
      setDirectionalCondition(
        directionMap,
        position.x + 1,
        position.z + 1,
        [EasyStar.TOP_LEFT],
        easystar
      );
    }
  });
}

export function prepareWalls(walls: Wall[]) {
  const wallMap = walls.reduce((result, wall) => {
    const key: [number, number] = [wall.position.x, wall.position.z];

    const test = result.get(key) ?? [];
    test.push(wall);
    if (!result.has(key)) {
      result.set(key, test);
    }

    return result;
  }, new ArrayKeyMap<[number, number], Wall[]>());

  const preparedWalls = Array.from(wallMap.values()).reduce((result, walls) => {
    walls.forEach(wall => {
      const data: {
        wall: Wall;
        type: WALL_TYPE;
        originDirection: WALL_DIRECTION;
        directions: Set<WALL_ACCESIBLE_DIRECTIONS>;
        position: Vector3;
      } = result.get([wall.position.x, wall.position.z, wall.direction]) ?? {
        wall,
        type: wall.getType(),
        originDirection: wall.direction,
        directions: new Set(),
        position: wall.position!
      };

      if (wall.direction === WALL_DIRECTION.VERTICAL) {
        data.directions.add(WALL_ACCESIBLE_DIRECTIONS.WEST);
        const westWall = result.get([
          wall.position!.x - 1,
          wall.position!.z,
          wall.direction
        ]) ?? {
          wall,
          type: wall.getType(),
          originDirection: wall.direction,
          directions: new Set(),
          position: new Vector3(
            wall.position!.x - 1,
            wall.position.y,
            wall.position!.z
          )
        };
        westWall.directions.add(WALL_ACCESIBLE_DIRECTIONS.EAST);
        result.set(
          [westWall.position.x, westWall.position.z, wall.direction],
          westWall
        );
      } else {
        data.directions.add(WALL_ACCESIBLE_DIRECTIONS.NORTH);
        const northWall = result.get([
          wall.position.x,
          wall.position.z - 1,
          wall.direction
        ]) ?? {
          wall,
          type: wall.getType(),
          originDirection: wall.direction,
          directions: new Set(),
          position: new Vector3(
            wall.position!.x,
            wall.position.y,
            wall.position!.z - 1
          )
        };
        northWall.directions.add(WALL_ACCESIBLE_DIRECTIONS.SOUTH);
        result.set(
          [northWall.position.x, northWall.position.z, wall.direction],
          northWall
        );
      }

      result.set([wall.position.x, wall.position.z, wall.direction], data);
    });
    return result;
  }, new ArrayKeyMap<DirectionWallDescriptionKey, DirectionWallDescription>());

  return preparedWalls;
}

export type DirectionWallDescriptionKey = [number, number, WALL_DIRECTION];
export interface DirectionWallDescription {
  wall: Wall;
  type: WALL_TYPE;
  originDirection: WALL_DIRECTION;
  directions: Set<WALL_ACCESIBLE_DIRECTIONS>;
  position: Vector3;
}

function setDirectionalCondition(
  directionMap: ArrayKeyMap<[number, number], Set<EasyStar.Direction>>,
  x: number,
  y: number,
  directions: EasyStar.Direction[],
  easystar: EasyStar.js,
  ignoredDirections: EasyStar.Direction[] = []
) {
  const d = directionMap.get([x, y]) ?? new Set<EasyStar.Direction>();
  directions = directions.filter(d_ => !ignoredDirections.includes(d_));
  if (directions.length) {
    directions.forEach(d_ => d.add(d_));
  }
  directionMap.set([x, y], d);
  easystar.setDirectionalCondition(
    x,
    y,
    defaultDirections.filter(d_ => !d.has(d_))
  );
}

export function findNeighborWallEdges(
  wall: WallDescription,
  walls: WallDescription[]
) {
  const cellDirections: [
    WALL_DIRECTION,
    [number, number, WALL_DIRECTION][],
    WALL_EDGE_TYPE
  ][] = [
    //#region bottom right
    [
      WALL_DIRECTION.HORIZONTAL,
      [[1, -1, WALL_DIRECTION.VERTICAL]],
      WALL_EDGE_TYPE.BOTTOM_RIGHT
    ],
    [
      WALL_DIRECTION.VERTICAL,
      [[-1, 1, WALL_DIRECTION.HORIZONTAL]],
      WALL_EDGE_TYPE.BOTTOM_RIGHT
    ],

    //#endregion

    //#region top right
    [
      WALL_DIRECTION.VERTICAL,
      [[-1, 0, WALL_DIRECTION.HORIZONTAL]],
      WALL_EDGE_TYPE.TOP_RIGHT
    ],
    [
      WALL_DIRECTION.HORIZONTAL,
      [[1, 0, WALL_DIRECTION.VERTICAL]],
      WALL_EDGE_TYPE.TOP_RIGHT
    ],
    //#endregion

    //#region top left

    [
      WALL_DIRECTION.HORIZONTAL,
      [[0, 0, WALL_DIRECTION.VERTICAL]],
      WALL_EDGE_TYPE.TOP_LEFT
    ],
    [
      WALL_DIRECTION.VERTICAL,
      [[0, 0, WALL_DIRECTION.HORIZONTAL]],
      WALL_EDGE_TYPE.TOP_LEFT
    ],

    //#endregion

    //#region bottom left

    [
      WALL_DIRECTION.VERTICAL,
      [[0, 1, WALL_DIRECTION.HORIZONTAL]],
      WALL_EDGE_TYPE.BOTTOM_LEFT
    ],
    [
      WALL_DIRECTION.HORIZONTAL,
      [[0, -1, WALL_DIRECTION.VERTICAL]],
      WALL_EDGE_TYPE.BOTTOM_LEFT
    ],

    [
      WALL_DIRECTION.HORIZONTAL,
      [[-1, 0, WALL_DIRECTION.HORIZONTAL]],
      WALL_EDGE_TYPE.LEFT
    ],
    [
      WALL_DIRECTION.HORIZONTAL,
      [[1, 0, WALL_DIRECTION.HORIZONTAL]],
      WALL_EDGE_TYPE.RIGHT
    ],

    [
      WALL_DIRECTION.VERTICAL,
      [[0, -1, WALL_DIRECTION.VERTICAL]],
      WALL_EDGE_TYPE.TOP
    ],
    [
      WALL_DIRECTION.VERTICAL,
      [[0, 1, WALL_DIRECTION.VERTICAL]],
      WALL_EDGE_TYPE.BOTTOM
    ],

    //#region T-Left

    [
      WALL_DIRECTION.HORIZONTAL,
      [
        [1, -1, WALL_DIRECTION.VERTICAL],
        [1, 0, WALL_DIRECTION.VERTICAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_I_LEFT
    ],
    [
      WALL_DIRECTION.VERTICAL,
      [
        [0, 1, WALL_DIRECTION.VERTICAL],
        [-1, 1, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_RIGHT_LEFT
    ],
    [
      WALL_DIRECTION.VERTICAL,
      [
        [0, -1, WALL_DIRECTION.VERTICAL],
        [-1, 0, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_LEFT_LEFT
    ],

    //#endregion

    //#region T-Right (east),
    [
      WALL_DIRECTION.HORIZONTAL,
      [
        [0, 0, WALL_DIRECTION.VERTICAL],
        [0, -1, WALL_DIRECTION.VERTICAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_I_RIGHT
    ],
    [
      WALL_DIRECTION.VERTICAL,
      [
        [0, 1, WALL_DIRECTION.VERTICAL],
        [0, 1, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_RIGHT_RIGHT
    ],
    [
      WALL_DIRECTION.VERTICAL,
      [
        [0, -1, WALL_DIRECTION.VERTICAL],
        [0, 0, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_LEFT_RIGHT
    ],

    //#endregion

    //#region T-Top (north)

    [
      WALL_DIRECTION.VERTICAL,
      [
        [-1, 1, WALL_DIRECTION.HORIZONTAL],
        [0, 1, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_I_TOP
    ],
    [
      WALL_DIRECTION.HORIZONTAL,
      [
        [0, -1, WALL_DIRECTION.VERTICAL],
        [-1, 0, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_RIGHT_TOP
    ],
    [
      WALL_DIRECTION.HORIZONTAL,
      [
        [1, -1, WALL_DIRECTION.VERTICAL],
        [1, 0, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_LEFT_TOP
    ],

    //#endregion

    //#region T-Bottom (south)

    [
      WALL_DIRECTION.VERTICAL,
      [
        [-1, 0, WALL_DIRECTION.HORIZONTAL],
        [0, 0, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_I_BOTTOM
    ],
    [
      WALL_DIRECTION.HORIZONTAL,
      [
        [0, 0, WALL_DIRECTION.VERTICAL],
        [-1, 0, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_RIGHT_BOTTOM
    ],
    [
      WALL_DIRECTION.HORIZONTAL,
      [
        [1, 0, WALL_DIRECTION.HORIZONTAL],
        [1, 0, WALL_DIRECTION.VERTICAL]
      ],
      WALL_EDGE_TYPE.T_CROSS_LEFT_BOTTOM
    ],

    //#endregion

    //#region Cross

    [
      WALL_DIRECTION.VERTICAL,
      [
        [0, 1, WALL_DIRECTION.HORIZONTAL],
        [0, 1, WALL_DIRECTION.VERTICAL],
        [-1, 1, WALL_DIRECTION.HORIZONTAL]
      ],
      WALL_EDGE_TYPE.CROSS
    ],
    [
      WALL_DIRECTION.VERTICAL,
      [
        [0, 0, WALL_DIRECTION.HORIZONTAL],
        [-1, 0, WALL_DIRECTION.HORIZONTAL],
        [0, -1, WALL_DIRECTION.VERTICAL]
      ],
      WALL_EDGE_TYPE.CROSS
    ]

    //#endregion
  ];

  return cellDirections.reduce((result, [directionA, conditions, edgeType]) => {
    const walls_: WallEdge[] = conditions
      .map(c => {
        const [dx, dz, directionB] = c;
        const neighborPos = new Vector3(
          wall.position.x + dx,
          wall.position.y,
          wall.position.z + dz
        );
        const neighborWall = walls.find(
          w =>
            w.position.equals(neighborPos) &&
            wall.direction === directionA &&
            w.direction === directionB
        );
        if (neighborWall) {
          return {
            wall,
            offset: new Vector3(dx, 0, dz),
            // position: neighborWall.position,
            // direction: neighborWall.direction,
            type: neighborWall.type,
            edgeType
          };
        }
      })
      .filter(Boolean) as WallEdge[];

    if (walls_.length === conditions.length) {
      result.push(...walls_);
    }

    return result;
  }, [] as WallEdge[]);
}

export default async function createWalls(
  descriptions: WallDescription[],
  editMode: boolean,
  {
    animationLoop$,
    wallGeometryMap
  }: {
    animationLoop$: AnimationLoopSubject;
    wallGeometryMap: WallGeometryMap;
  }
) {
  const walls = await Promise.all(
    descriptions.map(async description => {
      const extensions = await resolveWallExtensions(description.extensions);
      const wall = new Wall({ ...description, extensions });
      wall.setEditMode(editMode);
      return wall;
    })
  );

  for (const wall of walls) {
    await wall.setup({
      animationLoop$,
      wallGeometryMap,
      wallTextureMap
    });
  }

  // walls = await Promise.all(
  //   walls.map(async wall => {
  //     await wall.setup({
  //       animationLoop$,
  //       wallGeometryMap,
  //       wallTextureMap
  //     });
  //     return wall;
  //   })
  // );

  return walls;
}

export async function resolveWallExtensions(
  extensions: WallExtensionDescription[]
) {
  const { defaultDoors: doors, defaultWindows: windows } = await import(
    '@cuby-world/walls'
  );
  const extList = [...Object.values(doors), ...Object.values(windows)];
  return extensions.map(ext => {
    const ExtClass = extList.find(e => e.KEY === ext.key);
    if (ExtClass) {
      return [ExtClass, ext.state ?? {}] as [
        typeof WallExtension,
        WallExtensionState
      ];
    } else {
      throw new Error(`Unknown wall extension: ${ext.key}`);
    }
  });
}

//#endregion

//#region wall room detection

function buildWallSet(walls: Wall[]) {
  const set = new Set();
  const key = (a: Vector3, b: Vector3) => `${a.toArray()}-${b.toArray()}`;

  walls.forEach(w => {
    const endPosition = getEndPositionFromStartPosition(
      w.position!,
      w.direction
    );
    const a = w.position;
    const b = endPosition;

    set.add(key(a, b));
    set.add(key(b, a));
  });

  return {
    has: (a: Vector3, b: Vector3) => set.has(key(a, b))
  };
}

function canMoveBetweenTiles(
  tx: number,
  tz: number,
  nx: number,
  ny: number,
  wallSet: {
    has: (a: Vector3, b: Vector3) => boolean;
  },
  floorIndex: FloorIndex
) {
  const dx = nx - tx;
  const dy = ny - tz;

  if (Math.abs(dx) + Math.abs(dy) !== 1) return false;

  if (dx === 1 && dy === 0) {
    const a = new Vector3(tx + 1, floorIndex, tz);
    const b = new Vector3(tx + 1, floorIndex, tz + 1);
    return !wallSet.has(a, b);
  }
  if (dx === -1 && dy === 0) {
    const a = new Vector3(tx, floorIndex, tz);
    const b = new Vector3(tx, floorIndex, tz + 1);
    return !wallSet.has(a, b);
  }

  if (dx === 0 && dy === 1) {
    const a = new Vector3(tx, floorIndex, tz + 1);
    const b = new Vector3(tx + 1, floorIndex, tz + 1);
    return !wallSet.has(a, b);
  }
  if (dx === 0 && dy === -1) {
    const a = new Vector3(tx, floorIndex, tz);
    const b = new Vector3(tx + 1, floorIndex, tz);
    return !wallSet.has(a, b);
  }

  return false;
}

function getEndPositionFromStartPosition(
  start: Vector3,
  direction: WALL_DIRECTION
) {
  if (direction === WALL_DIRECTION.HORIZONTAL) {
    return new Vector3(start.x + 1, start.y, start.z);
  } else {
    return new Vector3(start.x, start.y, start.z + 1);
  }
}

function splitWallsByFloors(walls: Wall[]) {
  const map = walls.reduce((result, wall) => {
    const floor = Math.floor(wall.position!.y);
    const test = result.get(floor) ?? [];
    test.push(wall);
    if (!result.has(floor)) {
      result.set(floor, test);
    }

    return result;
  }, new Map<number, Wall[]>());

  return map.values();
  // Nur die Wände des niedrigsten Stockwerks zurückgeben
  // const minFloor = Math.min(...Array.from(map.keys()));
  // return map.get(minFloor) ?? [];
}

/**
 * Wird genutzt um Räume zu erkennen, die durch Wände begrenzt sind.
 */
export function getWallRoomDescriptions(walls: Wall[]) {
  const wallsByFloors = Array.from(splitWallsByFloors(walls));
  return wallsByFloors
    .map((walls, floorIndex) => {
      const wallSet = buildWallSet(walls);

      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      walls.forEach(w => {
        const endPosition = getEndPositionFromStartPosition(
          w.position,
          w.direction
        );
        minX = Math.min(minX, w.position.x, endPosition.x);
        minY = Math.min(minY, w.position.z, endPosition.z);
        maxX = Math.max(maxX, w.position.x, endPosition.x);
        maxY = Math.max(maxY, w.position.z, endPosition.z);
      });

      const tileMinX = Math.floor(minX - 1);
      const tileMinY = Math.floor(minY - 1);
      const tileMaxX = Math.ceil(maxX + 1);
      const tileMaxY = Math.ceil(maxY + 1);

      const visited = new Set<string>();
      const rooms: WallRoomDescription[] = [];

      const inBounds = (x: number, y: number) =>
        x >= tileMinX && y >= tileMinY && x < tileMaxX && y < tileMaxY;

      for (let tx = tileMinX; tx < tileMaxX; tx++) {
        for (let ty = tileMinY; ty < tileMaxY; ty++) {
          const key = `${tx},${ty}`;
          if (visited.has(key)) continue;

          // BFS starten
          const queue = [new Vector2(tx, ty)];
          const roomTiles: Vector2[] = [];
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
              const nKey = `${n.x},${n.y}`;
              if (!inBounds(n.x, n.y)) return;
              if (visited.has(nKey)) return;
              if (
                !canMoveBetweenTiles(
                  cur.x,
                  cur.y,
                  n.x,
                  n.y,
                  wallSet,
                  floorIndex
                )
              )
                return;
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
              floor: floorIndex,
              tiles: roomTiles,
              centroid: new Vector2(cx, cy),
              size: roomTiles.length
            });
          }
        }
      }
      const isOutside = (room: WallRoomDescription) =>
        room.tiles.some(
          t =>
            t.x === tileMinX ||
            t.y === tileMinY ||
            t.x === tileMaxX - 1 ||
            t.y === tileMaxY - 1
        );

      return rooms.filter(r => !isOutside(r));
    })
    .flat();
}

//#endregion

export function loadWallGeometries(url: string) {
  return assetLoader.add<GLTF>({ loader: LOADER.GLTF, url }).then(gltf => {
    return Object.values(WALL_GEOMETRY).reduce((result, value: string) => {
      const mesh = gltf.scene.getObjectByName(value) as Mesh;
      if (!mesh) {
        console.warn(`Wall geometry ${value} not found in gltf`);
        result.set(value as WALL_GEOMETRY, null);
      } else {
        const geometry = mesh?.geometry.clone();
        geometry.rotateY(-Math.PI / 2);
        result.set(value as WALL_GEOMETRY, geometry);
      }
      return result;
    }, new Map<WALL_GEOMETRY, BufferGeometry | null>());
  });
}

export function getWallGeometry(
  wallGeometries: Map<WALL_GEOMETRY, BufferGeometry | null>,
  type: WALL_GEOMETRY
) {
  let geometry = wallGeometries.get(type);
  if (geometry instanceof BufferGeometry) {
    geometry = geometry.clone() as BufferGeometry;

    return geometry;
  } else {
    return null;
  }
}

function getGeometryKey(options: WallOptions, edges: WallEdge[]) {
  options = { ...options };
  // edges = edges.filter(
  //   edge =>
  //     ![
  //       WALL_EDGE_TYPE.LEFT,
  //       WALL_EDGE_TYPE.RIGHT,
  //       WALL_EDGE_TYPE.TOP,
  //       WALL_EDGE_TYPE.BOTTOM
  //     ].includes(edge.edgeType)
  // );

  edges.forEach(edge => {
    if (
      edge.edgeType === WALL_EDGE_TYPE.LEFT ||
      edge.edgeType === WALL_EDGE_TYPE.TOP
    ) {
      options.right = WALL_GEOMETRY_TYPE.LINE;
    } else if (
      edge.edgeType === WALL_EDGE_TYPE.RIGHT ||
      edge.edgeType === WALL_EDGE_TYPE.BOTTOM
    ) {
      options.left = WALL_GEOMETRY_TYPE.LINE;
    }
  });

  edges.forEach(edge => {
    switch (edge.edgeType) {
      case WALL_EDGE_TYPE.BOTTOM_RIGHT:
        if (options.direction === WALL_DIRECTION.HORIZONTAL) {
          options.left = WALL_GEOMETRY_TYPE.EDGE_RIGHT;
        } else {
          options.left = WALL_GEOMETRY_TYPE.EDGE_LEFT;
        }
        break;
      case WALL_EDGE_TYPE.TOP_RIGHT:
        if (options.direction === WALL_DIRECTION.HORIZONTAL) {
          options.left = WALL_GEOMETRY_TYPE.EDGE_LEFT;
        } else {
          options.right = WALL_GEOMETRY_TYPE.EDGE_RIGHT;
        }
        break;
      case WALL_EDGE_TYPE.TOP_LEFT:
        if (options.direction === WALL_DIRECTION.HORIZONTAL) {
          options.right = WALL_GEOMETRY_TYPE.EDGE_RIGHT;
        } else {
          options.right = WALL_GEOMETRY_TYPE.EDGE_LEFT;
        }
        break;
      case WALL_EDGE_TYPE.BOTTOM_LEFT:
        if (options.direction === WALL_DIRECTION.HORIZONTAL) {
          options.right = WALL_GEOMETRY_TYPE.EDGE_LEFT;
        } else {
          options.left = WALL_GEOMETRY_TYPE.EDGE_RIGHT;
        }
        break;
    }
  });

  const types = new Set(edges.map(edge => edge.edgeType));
  const isSpecial =
    types.has(WALL_EDGE_TYPE.CROSS) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_LEFT) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT_LEFT) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_LEFT_LEFT) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT_RIGHT) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_LEFT_BOTTOM) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT_BOTTOM) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_LEFT_TOP) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT_TOP) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_TOP) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_BOTTOM) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_I_BOTTOM) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_I_LEFT) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_I_RIGHT) ||
    types.has(WALL_EDGE_TYPE.T_CROSS_I_TOP);

  if (isSpecial) {
    let left = options.left ?? WALL_GEOMETRY_TYPE.NONE;
    let right = options.right ?? WALL_GEOMETRY_TYPE.NONE;

    //#region t-cross top

    if (types.has(WALL_EDGE_TYPE.T_CROSS_I_TOP)) {
      left = WALL_GEOMETRY_TYPE.NONE;
    } else if (types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT_TOP)) {
      right = WALL_GEOMETRY_TYPE.LINE;
    }
    if (types.has(WALL_EDGE_TYPE.T_CROSS_LEFT_TOP)) {
      left = WALL_GEOMETRY_TYPE.LINE;
    }
    //#endregion

    //#region t-cross left

    if (types.has(WALL_EDGE_TYPE.T_CROSS_I_LEFT)) {
      left = WALL_GEOMETRY_TYPE.NONE;
    } else if (types.has(WALL_EDGE_TYPE.T_CROSS_LEFT_LEFT)) {
      right = WALL_GEOMETRY_TYPE.LINE;
    }
    if (types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT_LEFT)) {
      left = WALL_GEOMETRY_TYPE.LINE;
    }
    //#endregion

    //#region t-cross right

    if (types.has(WALL_EDGE_TYPE.T_CROSS_I_RIGHT)) {
      right = WALL_GEOMETRY_TYPE.NONE;
    } else if (types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT_RIGHT)) {
      left = WALL_GEOMETRY_TYPE.LINE;
    }
    if (types.has(WALL_EDGE_TYPE.T_CROSS_LEFT_RIGHT)) {
      right = WALL_GEOMETRY_TYPE.LINE;
    }
    //#endregion

    //#region t-cross bottom

    if (types.has(WALL_EDGE_TYPE.T_CROSS_I_BOTTOM)) {
      right = WALL_GEOMETRY_TYPE.NONE;
    } else if (types.has(WALL_EDGE_TYPE.T_CROSS_RIGHT_BOTTOM)) {
      right = WALL_GEOMETRY_TYPE.LINE;
    }
    if (types.has(WALL_EDGE_TYPE.T_CROSS_LEFT_BOTTOM)) {
      left = WALL_GEOMETRY_TYPE.LINE;
    }
    //#endregion

    options = {
      ...options,
      left,
      right
    };
    // if (
    //   types.has(WALL_EDGE_TYPE.CROSS)
    //   //  ||
    //   // (!types.has(WALL_EDGE_TYPE.T_CROSS_I_BOTTOM) &&
    //   //   !types.has(WALL_EDGE_TYPE.T_CROSS_I_TOP) &&
    //   //   !types.has(WALL_EDGE_TYPE.T_CROSS_I_LEFT) &&
    //   //   !types.has(WALL_EDGE_TYPE.T_CROSS_I_RIGHT))
    // ) {
    //   debugger;
    //   options.left = WALL_GEOMETRY_TYPE.LINE;
    //   options.right = WALL_GEOMETRY_TYPE.LINE;
    // }
  }

  let type = options.type ?? WALL_TYPE.DEFAULT;

  let size = '';
  if (options.size) {
    size = '_' + options.size;
  }
  if (type === WALL_TYPE.WINDOW) {
    if (options.size !== WALL_SIZE.SMALL) {
      size += `_${options.windowSize || WALL_WINDOW_SIZE.MEDIUM}`;
    } else {
      type = WALL_TYPE.DEFAULT;
    }
  }
  // console.log(`${type}${size}_${options.left}_${options.right}`);
  return {
    key: `${type}${size}_${options.left}_${options.right}` as WALL_GEOMETRY,
    options
  };
}

const _wallGeometryCache: {
  [key: string]: {
    geometry: BufferGeometry | null;
  };
} = {};

export function createWallGeometry(
  direction: WALL_DIRECTION,
  type: WALL_TYPE = WALL_TYPE.DEFAULT,
  size: WALL_SIZE = WALL_SIZE.LARGE,
  windowSize: WALL_WINDOW_SIZE = WALL_WINDOW_SIZE.SMALL,
  {
    center = false,
    edges,
    wallGeometryMap
  }: {
    center?: boolean;
    edges: WallEdge[];
    wallGeometryMap: WallGeometryMap;
  }
) {
  const wallOptions = {
    direction,
    size,
    type,
    windowSize,
    left: WALL_GEOMETRY_TYPE.NONE,
    right: WALL_GEOMETRY_TYPE.NONE
  };

  const { key, options } = getGeometryKey(wallOptions, edges);

  const cacheKey = `${JSON.stringify({
    options,
    edges,
    key
  })}`;

  if (_wallGeometryCache[cacheKey]) {
    return _wallGeometryCache[cacheKey];
  }

  const geometry =
    getWallGeometry(wallGeometryMap, key) ||
    getWallGeometry(
      wallGeometryMap,
      getGeometryKey(
        {
          ...wallOptions,
          left: WALL_GEOMETRY_TYPE.NONE,
          right: WALL_GEOMETRY_TYPE.NONE,
          size: WALL_SIZE.LARGE,
          type: WALL_TYPE.DEFAULT
        },
        []
      ).key
    );

  if (!geometry) {
    throw new Error(`No wall geometry found for key ${key}`);
  }
  if (!center) {
    if (direction === WALL_DIRECTION.VERTICAL) {
      geometry.translate(-0.5, 0, 0);
    } else {
      geometry.translate(0, 0, -1);
      geometry.rotateY(Math.PI / 2);
      geometry.translate(1, 0, -0.5);
    }
  }
  groupByNormal(geometry, direction);

  _wallGeometryCache[cacheKey] = { geometry: geometry.clone() };
  return _wallGeometryCache[cacheKey]!;
}

export function createWallMesh(
  {
    type,
    windowSize,
    small,
    direction,
    materials
  }: {
    type: WALL_TYPE;
    windowSize?: WALL_WINDOW_SIZE;
    small: boolean;
    direction: WALL_DIRECTION;
    materials: MeshPhongMaterial[];
  },
  {
    center,
    edges,
    wallGeometryMap,
    editMode = false
  }: {
    center: boolean;
    edges: WallEdge[];
    editMode: boolean;
    wallGeometryMap: WallGeometryMap;
  }
) {
  const { geometry } = createWallGeometry(
    direction,
    type,
    small ? WALL_SIZE.SMALL : WALL_SIZE.LARGE,
    windowSize,
    {
      center,
      edges,
      wallGeometryMap
    }
  );

  let geometry_ = geometry?.clone();

  geometry_ = geometry_ || new BoxGeometry(1, 1, 1);

  const preparedGeometry = geometry_ || new BoxGeometry(1, 1, 1);

  const mesh = new Mesh(preparedGeometry, materials);

  //#region click helper
  if (editMode) {
    const { geometry: defaultGeometry } = createWallGeometry(
      direction,
      WALL_TYPE.DEFAULT,
      small ? WALL_SIZE.SMALL : WALL_SIZE.LARGE,
      windowSize,
      {
        edges,
        wallGeometryMap
      }
    );
    if (!defaultGeometry) {
      throw new Error('Keine Standard-Wandgeometrie gefunden');
    }
    groupByNormal(defaultGeometry, direction);
    const clickHelper = new Mesh(
      defaultGeometry,
      new MeshPhongMaterial({
        color: 0x000000,
        depthWrite: false
      })
    );
    clickHelper.material.wireframe = true;
    clickHelper.name = 'click_helper';
    clickHelper.visible = false;
    clickHelper.raycast = Mesh.prototype.raycast;
    mesh.add(clickHelper);
  }
  //#endregion

  mesh.castShadow = true;

  return mesh;
}

export function getFaceGroupIndex(
  object: Object3D,
  faceIndex?: number | null
): number {
  let groups: BufferGeometry['groups'] = [];

  object.traverse((node: Object3D) => {
    if (node instanceof Mesh && node.geometry instanceof BufferGeometry) {
      groups = node.geometry.groups;
    }
  });

  if (!(faceIndex !== null && groups.length > 0)) {
    return -1;
  }

  // faceIndex bezieht sich auf ein Dreieck → 3 Indizes pro Face
  const firstIndex = faceIndex! * 3;

  // überprüfen, zu welchem Group-Bereich dieses Dreieck gehört
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i]!;
    if (firstIndex >= g.start && firstIndex < g.start + g.count) {
      return i; // Index der passenden Gruppe
    }
  }

  return -1;
}

//#region geometry groups

export function groupByNormal(
  geometry: BufferGeometry,
  direction: WALL_DIRECTION
) {
  const pos = geometry.attributes.position!;
  const index = geometry.index!.array;
  const faceNormals = [];
  // 1. Normalen berechnen
  for (let i = 0; i < index.length; i += 3) {
    const vA = new Vector3().fromBufferAttribute(pos, index[i]!);
    const vB = new Vector3().fromBufferAttribute(pos, index[i + 1]!);
    const vC = new Vector3().fromBufferAttribute(pos, index[i + 2]!);
    const cb = new Vector3().subVectors(vC, vB);
    const ab = new Vector3().subVectors(vA, vB);
    cb.cross(ab).normalize();
    faceNormals.push({ i, normal: cb.clone() });
  }
  // 2. BoundingBox für Axis-Logik
  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }
  const size = new Vector3();
  geometry.boundingBox!.getSize(size);
  let axisDepth: 'x' | 'y' | 'z' = 'x';
  if (size.z < size.x && size.z < size.y) axisDepth = 'z';
  else if (size.x < size.y) axisDepth = 'x';
  else axisDepth = 'x';
  const threshold = 0.4;
  // 3. Faces pro Seite einsortieren
  const sideFaces: Record<number, number[]> = {}; // matIndex → indices
  faceNormals.forEach(({ i, normal }) => {
    let matIndex = 6;
    if (direction === WALL_DIRECTION.VERTICAL) {
      if (Math.abs(normal.y) > threshold) {
        matIndex = normal.y > 0 ? 2 : 3; // Oben/Unten
      } else if (Math.abs(normal[axisDepth]) > threshold) {
        matIndex = normal[axisDepth] > 0 ? 0 : 1; // Vorder/Rück
      } else {
        const otherAxis = axisDepth === 'x' ? 'z' : 'x';
        if (Math.abs(normal[otherAxis]) > threshold) {
          matIndex = normal[otherAxis] > 0 ? 4 : 5; // Rechts/Links
        }
      }
    } else if (direction === WALL_DIRECTION.HORIZONTAL) {
      if (Math.abs(normal.y) > threshold) {
        matIndex = normal.y > 0 ? 2 : 3;
      } else if (Math.abs(normal[axisDepth]) > threshold) {
        matIndex = normal[axisDepth] > 0 ? 0 : 1;
      } else {
        const otherAxis = axisDepth === 'x' ? 'z' : 'x';
        if (Math.abs(normal[otherAxis]) > threshold) {
          matIndex = normal[otherAxis] > 0 ? 4 : 5;
        }
      }
    }
    if (!sideFaces[matIndex]) sideFaces[matIndex] = [];
    sideFaces[matIndex]!.push(index[i]!, index[i + 1]!, index[i + 2]!);
  });
  // 4. Neues Index-Array bauen
  const newIndex: number[] = [];
  const groups: { start: number; count: number; mat: number }[] = [];
  for (const matIndex of Object.keys(sideFaces).map(Number)) {
    const start = newIndex.length;
    newIndex.push(...sideFaces[matIndex]!);
    groups.push({ start, count: sideFaces[matIndex]!.length, mat: matIndex });
  }
  // 5. Geometry neu schreiben
  geometry.setIndex(newIndex);
  geometry.clearGroups();
  groups.forEach(g => geometry.addGroup(g.start, g.count, g.mat));
}

export function getGroupBounds(geometry: BufferGeometry, groupIndex: number) {
  const group = geometry.groups[groupIndex];
  if (!group) return null;

  const pos = geometry.attributes.position as BufferAttribute;
  const indexArray = geometry.index!.array.slice(
    group.start,
    group.start + group.count
  );

  const min = new Vector3(Infinity, Infinity, Infinity);
  const max = new Vector3(-Infinity, -Infinity, -Infinity);

  for (const idx of indexArray) {
    const x = pos.getX(idx);
    const y = pos.getY(idx);
    const z = pos.getZ(idx);

    min.min(new Vector3(x, y, z));
    max.max(new Vector3(x, y, z));
  }

  return { min, max, size: new Vector3().subVectors(max, min) };
}

//#endregion

// -----

// export function findNeighbors(wall: WallDescription, walls: WallDescription[]) {
//   const neighbors = new Map<WALL_DIRECTION, WallDescription[]>();

//   const neighborDirections: [number, number][] = [
//     [1, 0],
//     [-1, 0],
//     [0, 1],
//     [0, -1],
//     [1, 1],
//     [-1, 1],
//     [1, -1],
//     [-1, -1]
//   ];

//   const direction = wall.direction;
//   neighborDirections.forEach(([dx, dy]) => {
//     const neighborPos = wall.position.clone().add(new Vector2(dx, dy));
//     const neighborWall = walls.find(w => {
//       return w.position.equals(neighborPos);
//     });
//     if (neighborWall) {
//       neighbors.set(direction, neighbors.get(direction) ?? []);
//       neighbors.get(direction)!.push(neighborWall);
//     }
//   });

//   return neighbors;
// }
