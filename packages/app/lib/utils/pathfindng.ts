import EasyStar from 'easystarjs';
import { Vector3 } from 'three';
import type Stair from '../classes/Stair';
import type { FloorIndex } from '../types/floor';
import type Wall from '../classes/Wall';
import type { ArrayKeyMap } from '../classes/ArrayKeyMap';
import type DoorWallExtension from '../classes/wallExtension/Door';
import type { DoorState } from '../classes/wallExtension/Door';
import {
  getWallDoorExtensionsByPosition,
  setWallConditions,
  type DirectionWallDescription,
  type DirectionWallDescriptionKey
} from './wall';
import { WALL_DIRECTION } from '../types/wall';
import type { TileCostDescription } from '../types/ground';
import { ANIMATION_ACTION } from '../classes/unitModule/Animation';

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
    positions,
    options,
    functions
  }: {
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
          position.x < matrixList[0]!.matrix.length &&
          position.z < matrixList[0]!.matrix[0]!.length
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
    const test = stairConnections
      .get(start)
      ?.values()
      .find(s => endStairs.has(s));

    if (test) {
      stairConnections = new Map([[start, new Set([test])]]);
      console.log('Direct stair connection found');
      break;
    }
  }

  const match = findStairMatch(stairConnections, startStairs, endStairs);

  console.log({
    matrixList,
    match,
    startStairs,
    endStairs,
    stairConnections
  });

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
    } else {
      debugger;
    }
  }

  const result = await findPath_(matrixList[positions.end.y]!.matrix, {
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
    options: { walls, tileDescriptions, diagonalMovement }
  }: {
    positions: { startPosition: Vector3; endPosition: Vector3 };
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

  easystar.setAcceptableTiles(tileDescriptions.map(({ index }) => index));
  tileDescriptions.forEach(({ index, cost }) =>
    easystar.setTileCost(index, cost)
  );

  /**
   * Übernehme Wand-Daten in das Grid
   * Beispiel Wände nicht begehbar, Türen begehbar
   */
  setWallConditions(walls, easystar);
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
