import EasyStar from 'easystarjs';
import { Vector3 } from 'three';
import type Stair from '../classes/Stair';
import type { FloorIndex } from '../types/floor';
import type Wall from '../classes/Wall';
import type { ArrayKeyMap } from '../classes/ArrayKeyMap';
import type DoorWallExtension from '../classes/wallExtension/Door';
import type { DoorState } from '../classes/wallExtension/Door';
import {
  getWallConditions,
  getWallDoorExtensionsByPosition,
  type DirectionWallDescription,
  type DirectionWallDescriptionKey
} from './wall';
import { WALL_DIRECTION } from '../types/wall';
import type { TileCostDescription } from '../types/ground';
import { ROTATION } from './rotation';
import { ANIMATION_ACTION } from '../types/animation';
import { GRID_TYPE } from '../classes/roomModule/Ground';

export enum PATHFINDING_COSTS {
  GROUND_VERY_SLOW = 10,
  GROUND_SLOW = 5,
  GROUND_NORMAL = 1,
  GROUND_FAST = 0.5,
  GROUND_VERY_FAST = 0.1,
  UNIT = 20
}

export enum DIRECTION {
  TOP = 'TOP',
  TOP_RIGHT = 'TOP_RIGHT',
  RIGHT = 'RIGHT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM = 'BOTTOM',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  LEFT = 'LEFT',
  TOP_LEFT = 'TOP_LEFT'
}

export interface ConditionDirectionsDescription {
  position: Vector3;
  directions: DIRECTION[];
}

// export type Direction =
//   | 'TOP'
//   | 'TOP_RIGHT'
//   | 'RIGHT'
//   | 'BOTTOM_RIGHT'
//   | 'BOTTOM'
//   | 'BOTTOM_LEFT'
//   | 'LEFT'
//   | 'TOP_LEFT';

interface MatrixDescription {
  matrix: number[][];
  floorIndex: FloorIndex;
}

export interface PathPartDescription {
  position: Vector3;
  animationAction?: ANIMATION_ACTION;
}

interface Result {
  success: boolean;
  path: PathPartDescription[];
  doorWallByPosition: ArrayKeyMap<
    [number, number],
    DoorWallExtension<DoorState>
  >;
}

type findPath = (
  matrix: number[][],
  positions: { startPosition: Vector3; endPosition: Vector3 },
  floorIndex: FloorIndex
) => Promise<{
  success: boolean;
  path: PathPartDescription[];
  doorWallByPosition: ArrayKeyMap<
    [number, number],
    DoorWallExtension<DoorState>
  >;
}>;

/**
 * Es kann meherer Treppen geben mit verschiedenen Treppenaufgängen.
 * Finde den besten Pfad über die Treppen.
 *
 * Es muss von jeder Treppe aus die matrixList durchgegangen werden.
 */
export async function findBestPathByStairs(
  matrixList: MatrixDescription[],
  {
    conditionalDirections,
    positions,
    options,
    functions
  }: {
    conditionalDirections: ConditionDirectionsDescription[];
    positions: {
      start: Vector3;
      end: Vector3;
    };
    options: {
      diagonalMovement: boolean;
      tileDescriptions: TileCostDescription[];
    };
    functions: {
      getStairs: () => Stair[];
      getStairsByPositions: (
        startPosition: Vector3,
        endPosition?: Vector3
      ) => Stair[];
      getWallsByFloor: (floorIndex?: FloorIndex[]) => Wall[];
    };
  }
): Promise<Result[]> {
  //#region FindPath
  const findPath = (
    matrix: number[][],
    positions: {
      startPosition: Vector3;
      endPosition: Vector3;
    },
    floorIndex: FloorIndex
  ) =>
    findPath_(matrix, {
      positions,
      conditionalDirections,
      options: {
        tileDescriptions: options.tileDescriptions,
        walls: functions.getWallsByFloor([floorIndex]),
        diagonalMovement: options.diagonalMovement
      }
    });
  //#endregion

  /**
   * Überprüfe ob Start und Ende auf der selben Ebene sind.
   * Wenn ja, dann kann direkt der Pfad gesucht werden.
   */
  if (positions.start.y === positions.end.y) {
    const result = await findPath_(matrixList[positions.start.y]!.matrix, {
      conditionalDirections,
      positions: {
        startPosition: positions.start,
        endPosition: positions.end
      },
      options: {
        tileDescriptions: options.tileDescriptions,
        walls: functions.getWallsByFloor([positions.start.y]),
        diagonalMovement: options.diagonalMovement
      }
    });
    if (result.success) {
      if (result.path.length > 0) {
        return [result];
      } else {
        return [];
      }
    }
  }

  const stairs = functions.getStairs().filter(stair => {
    const entryPositions = Object.values(stair.getEntryPositions());
    return !entryPositions.some(
      position =>
        !(
          position.x >= 0 &&
          position.z >= 0 &&
          position.z < matrixList[0]!.matrix.length &&
          position.x < matrixList[0]!.matrix[0]!.length
        )
    );
  });

  /**
   * Alle Treppen finden, die mit dem Start- und Endpunkt verbunden sind.
   */
  let stairConnections = await findStairConnections(
    matrixList,
    {
      stairs,
      diagonalMovement: options.diagonalMovement
    },
    {
      getWallsByFloor: functions.getWallsByFloor,
      findPath
    }
  );

  /**
   * Abfrage der Star- und End-Treppe.
   */
  const startStairs = await getStairsByPosition(positions.start, {
    matrixList,
    stairs,
    findPath
  });
  const endStairs = await getStairsByPosition(positions.end, {
    matrixList,
    stairs,
    findPath
  });

  /**
   * Gibt es eine Start Stair im End? Wenn ja kann braucht nicht weiter geguckt werden.
   */
  // if (Array.from(startStairs).some(s => endStairs.has(s))) {
  //   endStairs = [];
  // }

  // debugger;
  // let match;
  for (const start of startStairs) {
    const test = Array.from(stairConnections.get(start)?.values() || []).find(
      s => endStairs.has(s)
    );

    if (test) {
      stairConnections = new Map([[start, new Set([test])]]);
      console.log('Direct stair connection found');
      break;
    }
  }

  const match = findStairMatch(stairConnections, startStairs, endStairs);

  // console.log({
  //   matrixList,
  //   match,
  //   startStairs,
  //   endStairs,
  //   stairConnections
  // });

  const results = [];
  let startPosition = positions.start;
  let endPosition = positions.end;

  for (const stair of match ?? []) {
    endPosition = stair.getEntryPositionByPosition(startPosition);

    const positions_ = {
      startPosition,
      endPosition
    };

    startPosition = stair.getCounterpartEntryPositionByPosition(
      positions_.endPosition
    );

    const result = await findPath_(matrixList[endPosition.y]!.matrix, {
      conditionalDirections,
      positions: positions_,
      options: {
        tileDescriptions: options.tileDescriptions,
        walls: functions.getWallsByFloor([endPosition.y])
      }
    });

    if (result.path.length > 0) {
      results.push(result);
      results.push({
        success: true,
        path: stair.getMovementPath(startPosition),
        doorWallByPosition: result.doorWallByPosition
      });
    }
  }

  const result = await findPath_(matrixList[positions.end.y]!.matrix, {
    conditionalDirections,
    positions: {
      startPosition,
      endPosition: positions.end
    },
    options: {
      tileDescriptions: options.tileDescriptions,
      walls: functions.getWallsByFloor([positions.end.y])
    }
  });

  // if (result.success && result.path.length > 0){
  results.push(result);
  // }

  return results;
}

function findStairMatch<S = Stair>(
  stairConnections: Map<S, Set<S>>,
  startStairs: Set<S>,
  endStairs: Set<S>
): S[] | null {
  for (const start of startStairs) {
    if (endStairs.has(start)) {
      return [start];
    }
  }

  const visited = new Set<S>();

  function dfs(current: S, path: S[]): S[] | null {
    if (endStairs.has(current)) {
      return [...path, current];
    }

    const nextStairs = stairConnections.get(current);
    if (!nextStairs) return null;

    for (const next of nextStairs) {
      if (!visited.has(next)) {
        visited.add(next);
        const result = dfs(next, [...path, current]);
        if (result) return result;
      }
    }

    return null;
  }

  for (const start of startStairs) {
    visited.clear();
    visited.add(start);
    const result = dfs(start, []);
    if (result) return result;
  }

  return null;
}

async function getStairsByPosition(
  position: Vector3,
  {
    matrixList,
    stairs,
    findPath
  }: {
    matrixList: MatrixDescription[];
    stairs: Stair[];
    findPath: findPath;
  }
) {
  const result: Set<Stair> = new Set();
  const matrix = matrixList.find(m => m.floorIndex === position.y)!.matrix;
  for (const stair of stairs) {
    const entryPositions = Object.values(stair.getEntryPositions()).filter(
      pos => pos.y === position.y
    );
    for (const entryPosition of entryPositions) {
      const findResult = await findPath(
        matrix,
        { startPosition: position, endPosition: entryPosition },
        position.y
      );
      if (findResult.success) {
        result.add(stair);
      }
    }
  }
  return result;
}

/**
 * Fragt treppen eine Stockwerks ab, die miteinander verbunden werden können.
 */
async function findStairConnections(
  matrixList: MatrixDescription[],
  options: { stairs: Stair[]; diagonalMovement: boolean },
  functions: {
    getWallsByFloor: (floorIndex?: FloorIndex[]) => Wall[];
    findPath: findPath;
  }
) {
  const stairsByFloors = groupStairsByFloor(options.stairs);

  const connections: Map<Stair, Set<Stair>> = new Map();
  let lastStairs: {
    position: Vector3;
    stair: Stair;
  }[] = [];
  for (const floorIndex in stairsByFloors) {
    const stairs = stairsByFloors[Number(floorIndex)]!;

    await Promise.all(
      stairs.map(async stair => {
        await Promise.all(
          [...stairs, ...lastStairs]
            .filter(s => s !== stair)
            .map(async targetStair => {
              const test = await functions.findPath(
                matrixList[Number(floorIndex)]!.matrix,
                {
                  startPosition: stair.position,
                  endPosition: targetStair.position
                },
                Number(floorIndex)
              );
              // console.log(test.success, stair.position, targetStair.position);
              if (test.success) {
                connections.set(
                  stair.stair,
                  new Set([
                    ...(connections.get(stair.stair) ?? []),
                    targetStair.stair
                  ])
                );
                connections.set(
                  targetStair.stair,
                  new Set([
                    ...(connections.get(targetStair.stair) ?? []),
                    stair.stair
                  ])
                );
              }
            })
        );

        // for (const targetStair of [...stairs, ...lastStairs].filter(
        //   s => s !== stair
        // )) {
        //   const test = await functions.findPath(
        //     matrixList[Number(floorIndex)]!.matrix,
        //     {
        //       startPosition: stair.position,
        //       endPosition: targetStair.position
        //     },
        //     Number(floorIndex)
        //   );
        //   // console.log(test.success, stair.position, targetStair.position);
        //   if (test.success) {
        //     connections.set(
        //       stair.stair,
        //       new Set([
        //         ...(connections.get(stair.stair) ?? []),
        //         targetStair.stair
        //       ])
        //     );
        //     connections.set(
        //       targetStair.stair,
        //       new Set([
        //         ...(connections.get(targetStair.stair) ?? []),
        //         stair.stair
        //       ])
        //     );
        //   }
        // }
      })
    );
    lastStairs = [...stairs];
  }
  return connections;
}

async function findPath_(
  matrix: number[][],
  {
    positions: { startPosition, endPosition },
    conditionalDirections,
    options: { walls, tileDescriptions, diagonalMovement }
  }: {
    positions: { startPosition: Vector3; endPosition: Vector3 };
    conditionalDirections: ConditionDirectionsDescription[];
    options: {
      walls: Wall[];
      tileDescriptions: TileCostDescription[];
      diagonalMovement?: boolean;
    };
  }
) {
  const doorWallByPosition = getWallDoorExtensionsByPosition(walls);

  if (startPosition.y !== endPosition.y) {
    return {
      success: false,
      path: [],
      doorWallByPosition
    };
  }

  const easystar = new EasyStar.js();

  easystar.setGrid(matrix);

  if (diagonalMovement) {
    easystar.enableDiagonals();
  }

  easystar.setAcceptableTiles([
    GRID_TYPE.NON_BLOCKED,
    GRID_TYPE.UNIT,
    ...tileDescriptions.map(({ index }) => index)
  ]);
  tileDescriptions.forEach(({ index, cost }) =>
    easystar.setTileCost(index, cost)
  );

  easystar.setTileCost(GRID_TYPE.UNIT, PATHFINDING_COSTS.UNIT);

  mergeDirectionalConditions([
    ...getWallConditions(walls),
    ...conditionalDirections
  ]).forEach(({ position, directions }) => {
    easystar.setDirectionalCondition(position.x, position.z, directions);
  });

  const path = await new Promise<number[][]>(resolve => {
    easystar.findPath(
      startPosition.x,
      startPosition.z,
      endPosition.x,
      endPosition.z,
      path =>
        resolve(
          (path ?? []).map(({ x, y }: { x: number; y: number }) => [x, y])
        )
    );
    easystar.calculate();
  });

  const preparedPath = path.map(
    point => new Vector3(point[0], startPosition.y, point[1])
  );
  // .slice(0, path.length - 0);

  const samePosition = startPosition.equals(endPosition);

  const success =
    (samePosition ||
      preparedPath[preparedPath.length - 1]?.equals(endPosition)) ??
    false;
  if (success && preparedPath.length < 1) {
    preparedPath.push(endPosition.clone());
  }

  // TODO: Wird der IDLE wirklich benötigt?
  const preparedPath_ = preparedPath.map(position => {
    const animationAction = ANIMATION_ACTION.WALK;
    // if (index === 0 || index === preparedPath.length - 1) {
    //   animationAction = ANIMATION_ACTION.IDLE;
    // }
    return {
      position,
      animationAction
    };
  });

  return {
    success,
    path: preparedPath_,
    doorWallByPosition
  };
}

function groupStairsByFloor(stairs: Stair[]) {
  const test: [Vector3, Stair][] = stairs
    .map(stair => {
      return Object.values(stair.getEntryPositions()).map(
        position => [position, stair] as [Vector3, Stair]
      );
    })
    .flat();

  const test2 = test.reduce(
    (result, [position, stair]) => {
      const key = position!.y;
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push({
        position,
        stair
      });

      return result;
    },
    {} as Record<
      number,
      {
        position: Vector3;
        stair: Stair;
      }[]
    >
  );
  return test2;
}

export function canWalkBetweenPositions(
  posA: Vector3,
  posB: Vector3,
  {
    preparedWalls
  }: {
    preparedWalls: ArrayKeyMap<
      DirectionWallDescriptionKey,
      DirectionWallDescription
    >;
  }
) {
  const deltaX = posB.x - posA.x;
  const deltaZ = posB.z - posA.z;

  if (Math.abs(deltaX) + Math.abs(deltaZ) !== 1) {
    return false;
  }

  const direction =
    deltaX === 1 || deltaX === -1
      ? WALL_DIRECTION.VERTICAL
      : WALL_DIRECTION.HORIZONTAL;

  const checkPosA = preparedWalls.get([posA.x, posA.z, direction]);
  const checkPosB = preparedWalls.get([posB.x, posB.z, direction]);
  // console.log(
  //   'canWalkBetweenPositions',
  //   posA.toArray(),
  //   posB.toArray(),
  //   direction,
  //   checkPosA,
  //   checkPosB
  // );

  return (
    (checkPosA?.directions.size ?? 0) > 0 &&
    (checkPosB?.directions.size ?? 0) > 0
  );
}

// export function getEntryConditionDirections(
//   position: Vector3,
//   rotation: ROTATION
// ): ConditionDirectionsDescription[] {
//   const topLeft = new Vector2(-1, -1);
//   const top = new Vector2(0, -1);
//   const topRight = new Vector2(1, -1);
//   const left = new Vector2(-1, 0);
//   const bottomLeft = new Vector2(-1, 1);
//   const bottom = new Vector2(0, 1);
//   const bottomRight = new Vector2(1, 1);
//   const right = new Vector2(1, 0);

//   const directions = Object.values(DIRECTION);

//   function getDirectionFromRotation(rotation: ROTATION): DIRECTION {
//     switch (rotation) {
//       case ROTATION.SOUTH:
//         return DIRECTION.BOTTOM;
//       case ROTATION.WEST:
//         return DIRECTION.LEFT;
//       case ROTATION.NORTH:
//         return DIRECTION.TOP;
//       case ROTATION.EAST:
//         return DIRECTION.RIGHT;
//     }
//     return DIRECTION.TOP;
//   }

//   // default south
//   const directions_ = [
//     [DIRECTION.BOTTOM_RIGHT], // 0
//     [DIRECTION.BOTTOM], // 1
//     [DIRECTION.BOTTOM_LEFT], // 2
//     [DIRECTION.RIGHT], // 3
//     [DIRECTION.LEFT], // 4
//     [DIRECTION.TOP_RIGHT], // 5
//     [DIRECTION.TOP], // 6
//     [DIRECTION.TOP_LEFT] // 7
//   ];

//   switch (rotation) {
//     case ROTATION.SOUTH:
//       directions_[6] = [];
//       break;
//     case ROTATION.WEST:
//       directions_[3] = [];
//       break;
//     case ROTATION.NORTH:
//       directions_[1] = [];
//       break;
//     case ROTATION.EAST:
//       directions_[4] = [];
//       break;
//   }

//   const test: [Vector3, DIRECTION[]][] = [
//     [new Vector3(topLeft.x, 0, topLeft.y), directions_[0]!],
//     [new Vector3(top.x, 0, top.y), directions_[1]!],
//     [new Vector3(topRight.x, 0, topRight.y), directions_[2]!],
//     [new Vector3(left.x, 0, left.y), directions_[3]!],
//     [new Vector3(right.x, 0, right.y), directions_[4]!],
//     [new Vector3(bottomLeft.x, 0, bottomLeft.y), directions_[5]!],
//     [new Vector3(bottom.x, 0, bottom.y), directions_[6]!],
//     [new Vector3(bottomRight.x, 0, bottomRight.y), directions_[7]!],
//     [
//       new Vector3(0, 0, 0),
//       Object.values(DIRECTION).filter(
//         d => d !== getDirectionFromRotation(rotation)
//       )
//     ]
//   ];

//   return test.map(([pos, dirs]) => ({
//     position: position.clone().add(pos),
//     directions: directions.filter(d => !dirs.includes(d))
//   }));
// }

export enum RELATIVE_ENTRY {
  FRONT = 'front',
  LEFT = 'left',
  RIGHT = 'right',
  BACK = 'back'
}

const ROT_TO_ABS = {
  [ROTATION.NORTH]: {
    [RELATIVE_ENTRY.FRONT]: DIRECTION.TOP,
    [RELATIVE_ENTRY.BACK]: DIRECTION.BOTTOM,
    [RELATIVE_ENTRY.LEFT]: DIRECTION.RIGHT,
    [RELATIVE_ENTRY.RIGHT]: DIRECTION.LEFT
  },
  [ROTATION.SOUTH]: {
    [RELATIVE_ENTRY.FRONT]: DIRECTION.BOTTOM,
    [RELATIVE_ENTRY.BACK]: DIRECTION.TOP,
    [RELATIVE_ENTRY.LEFT]: DIRECTION.LEFT,
    [RELATIVE_ENTRY.RIGHT]: DIRECTION.RIGHT
  },
  [ROTATION.EAST]: {
    [RELATIVE_ENTRY.FRONT]: DIRECTION.RIGHT,
    [RELATIVE_ENTRY.BACK]: DIRECTION.LEFT,
    [RELATIVE_ENTRY.LEFT]: DIRECTION.BOTTOM,
    [RELATIVE_ENTRY.RIGHT]: DIRECTION.TOP
  },
  [ROTATION.WEST]: {
    [RELATIVE_ENTRY.FRONT]: DIRECTION.LEFT,
    [RELATIVE_ENTRY.BACK]: DIRECTION.RIGHT,
    [RELATIVE_ENTRY.LEFT]: DIRECTION.TOP,
    [RELATIVE_ENTRY.RIGHT]: DIRECTION.BOTTOM
  }
};
// export function getEntryConditionDirections(
//   position: Vector3,
//   rotation: ROTATION,
//   allowedRelativeEntries: RELATIVE_ENTRY[] = [RELATIVE_ENTRY.FRONT]
// ): ConditionDirectionsDescription[] {
//   const offsets: [Vector3, DIRECTION][] = [
//     [new Vector3(-1, 0, -1), DIRECTION.TOP_LEFT],
//     [new Vector3(0, 0, -1), DIRECTION.TOP],
//     [new Vector3(1, 0, -1), DIRECTION.TOP_RIGHT],
//     [new Vector3(-1, 0, 0), DIRECTION.LEFT],
//     [new Vector3(1, 0, 0), DIRECTION.RIGHT],
//     [new Vector3(-1, 0, 1), DIRECTION.BOTTOM_LEFT],
//     [new Vector3(0, 0, 1), DIRECTION.BOTTOM],
//     [new Vector3(1, 0, 1), DIRECTION.BOTTOM_RIGHT]
//   ];

//   const allDirections = Object.values(DIRECTION);

//   // 1) relative → absolut
//   const allowedAbsolute = allowedRelativeEntries.map(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     rel => (ROT_TO_ABS as any)[rotation as any][rel] as DIRECTION
//   );

//   const center: ConditionDirectionsDescription = {
//     position: position.clone(),
//     directions: allowedAbsolute
//   };

//   // 2) Nachbarfelder → niemals hart blockieren!
//   const around = offsets.map(([offset]) => ({
//     position: position.clone().add(offset),
//     directions: allDirections // <-- Keine Einschränkung
//   }));

//   return [center, ...around];
// }
export function getEntryConditionDirections(
  position: Vector3,
  rotation: ROTATION,
  allowedRelativeEntries: RELATIVE_ENTRY[] = [RELATIVE_ENTRY.FRONT]
): ConditionDirectionsDescription[] {
  const offsets: [Vector3, DIRECTION][] = [
    [new Vector3(-1, 0, -1), DIRECTION.TOP_LEFT],
    [new Vector3(0, 0, -1), DIRECTION.TOP],
    [new Vector3(1, 0, -1), DIRECTION.TOP_RIGHT],
    [new Vector3(-1, 0, 0), DIRECTION.LEFT],
    [new Vector3(1, 0, 0), DIRECTION.RIGHT],
    [new Vector3(-1, 0, 1), DIRECTION.BOTTOM_LEFT],
    [new Vector3(0, 0, 1), DIRECTION.BOTTOM],
    [new Vector3(1, 0, 1), DIRECTION.BOTTOM_RIGHT]
  ];

  const allDirections = Object.values(DIRECTION);

  function oppositeDirection(dir: DIRECTION): DIRECTION {
    switch (dir) {
      case DIRECTION.TOP:
        return DIRECTION.BOTTOM;
      case DIRECTION.TOP_RIGHT:
        return DIRECTION.BOTTOM_LEFT;
      case DIRECTION.RIGHT:
        return DIRECTION.LEFT;
      case DIRECTION.BOTTOM_RIGHT:
        return DIRECTION.TOP_LEFT;
      case DIRECTION.BOTTOM:
        return DIRECTION.TOP;
      case DIRECTION.BOTTOM_LEFT:
        return DIRECTION.TOP_RIGHT;
      case DIRECTION.LEFT:
        return DIRECTION.RIGHT;
      case DIRECTION.TOP_LEFT:
        return DIRECTION.BOTTOM_RIGHT;
    }
  }

  const allowedAbsolute = allowedRelativeEntries.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rel => (ROT_TO_ABS as any)[rotation as any][rel] as DIRECTION
  );

  const center: ConditionDirectionsDescription = {
    position: position.clone(),
    directions: allowedAbsolute // <-- Eintrittsrichtung!
  };

  // Nachbarfelder einschränken
  const around = offsets.map(([offset, dirToCenter]) => {
    const absDir = dirToCenter;
    const opposite = oppositeDirection(absDir);

    // darf man das Center aus dieser Richtung betreten?
    const isAllowedEntry = allowedAbsolute.includes(absDir);

    return {
      position: position.clone().add(offset),
      directions: isAllowedEntry
        ? allDirections // darf rein → nichts blockieren
        : allDirections.filter(d => d !== opposite) // blockiere Eintritt in Center
    };
  });

  return [center, ...around];
}

export function mergeDirectionalConditions(
  conditions: ConditionDirectionsDescription[]
): ConditionDirectionsDescription[] {
  const grouped = new Map<string, string[][]>();

  for (const c of conditions) {
    const key = `${c.position.x},${c.position.y},${c.position.z}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(c.directions);
  }

  const result: ConditionDirectionsDescription[] = [];

  for (const [key, dirsList] of grouped.entries()) {
    let intersection = new Set(dirsList[0]);
    for (let i = 1; i < dirsList.length; i++) {
      const current = new Set(dirsList[i]);
      intersection = new Set([...intersection].filter(d => current.has(d)));
    }

    const [x, y, z] = key.split(',').map(Number);

    result.push({
      position: new Vector3(x, y, z),
      directions: [...(intersection as unknown as DIRECTION[])]
    });
  }

  return result;
}
