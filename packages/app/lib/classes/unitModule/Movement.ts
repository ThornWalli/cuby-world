/* eslint-disable complexity */
import type {
  UnitModuleObservables,
  UnitModuleOptions,
  UnitModuleState
} from './../UnitModule';
import { Vector3, Euler } from 'three';
import EasyStar from 'easystarjs';
import UnitModule from '../UnitModule';
import type Unit from '../Unit';
import { Subject } from 'rxjs';
import { getYPositionByPosition } from '../../utils/room';
import { getRadByRotation, type UnitOptions } from '../Unit';
import { easeOutExpo, easeOutQuad } from '@cuby-world/app/utils/easings';
import RoomGrid from '../RoomGrid';
import {
  getWallDoorExtensionsByPosition,
  setWallConditions
} from '../../utils/wall';
import type Wall from '../Wall';
import type { ArrayKeyMap } from '../ArrayKeyMap';
import type { AnimationLoopValue } from '../Renderer';
import type DoorWallExtension from '../wallExtension/Door';
import { WALL_DIRECTION } from '../../types/wall';

interface MoveOptions {
  startDuration: number; // Startzeitpunkt der Bewegung
  nextPosition: Vector3 | null; // Nächste Position, zu der sich die Einheit bewegen soll
  startPosition: Vector3 | null; // Startposition der Bewegung
  lastPosition: Vector3 | null; // Letzte Position der Bewegung
}

interface RotateOptions {
  startDuration: number; // Startzeitpunkt der Rotation
  nextRotation: Euler | null; // Nächste Rotation, zu der sich die Einheit bewegen soll
  startRotation: Euler | null; // Startrotation der Bewegung
  lastRotation?: Euler | null; // Letzte Rotation der Bewegung
}

export interface MovementModuleOptions extends UnitModuleOptions {
  movement: {
    diagonalMovement: boolean;
    stepDuration: number;
    rotationDuration: number;
  };
}

function getDefaultMoveOptions(): MoveOptions {
  return {
    startDuration: 0,
    nextPosition: null,
    startPosition: null,
    lastPosition: null
  };
}

function getDefaultRotateOptions(): RotateOptions {
  return {
    startDuration: 0,
    nextRotation: null,
    startRotation: null,
    lastRotation: null
  };
}

interface MovementDescription {
  path: Vector3[];
  doorWallByPosition: ArrayKeyMap<[number, number], DoorWallExtension>;
}

interface Observables extends UnitModuleObservables {
  moveStart$: Subject<Vector3>;
  moveStep$: Subject<Vector3>;
  moveEnd$: Subject<void>;
}

type State = UnitModuleState;

export default class MovementUnitModule extends UnitModule<State, Observables> {
  static override TYPE = 'movement';

  private moveOptions: MoveOptions | null = null;
  private rotateOptions: RotateOptions | null = null;

  currentMovement: MovementDescription | null = null;

  constructor(unit: Unit, state: State, debug: boolean) {
    super(unit, state, debug);
    this.observables.moveStart$ = new Subject<Vector3>();
    this.observables.moveStep$ = new Subject<Vector3>();
    this.observables.moveEnd$ = new Subject<void>();
  }

  async moveTo(position: Vector3, options: { force?: boolean } = {}) {
    const room = this.currentRoom!;

    if (this.currentMovement) {
      console.log('Bewegung läuft bereits');
      return;
    }

    const grid = createRoomGrid(this.unit);

    console.log('Grid for pathfinding:', grid, grid.toMatrix());

    /**
     * Temporär die Position als begehbar markieren im Grid, damit die Einheit dort hinlaufen kann.
     */
    let isBlocked = false;

    if (grid.get(position.x, position.y, position.z) === 1) {
      isBlocked = true;
      grid.set(position.x, position.y, position.z, 0);
    }

    const startPosition = this.unit.getPosition().clone().round();

    this.moveOptions = getDefaultMoveOptions();
    this.rotateOptions = getDefaultRotateOptions();
    this.currentMovement = await this.prepareMovement(
      startPosition,
      position.clone().round(),
      grid,
      room.modules.wall.getWalls(),
      isBlocked,
      options.force
    );

    this.observables.moveStart$.next(position);
  }

  /**
   * Bewegt und animiert die Position des Einheitsobjekts.
   * @param time
   */
  override update(v: AnimationLoopValue) {
    if (this.currentMovement) {
      this.movementUpdate(v);
    }
  }

  private async prepareMovement(
    startPosition: Vector3,
    endPosition: Vector3,
    roomGrid: RoomGrid,
    walls: Wall[],
    isBlocked: boolean,
    force?: boolean
  ): Promise<MovementDescription> {
    const movementOptions = (
      this.unit as Unit<UnitOptions<MovementModuleOptions>>
    ).options.movement;

    const easystar = new EasyStar.js();

    // TODO: STOCKWERKE!
    easystar.setGrid(roomGrid.toMatrix()[0]!);

    if (movementOptions.diagonalMovement) {
      easystar.enableDiagonals();
    }

    easystar.setAcceptableTiles([0]);

    /**
     * Übernehme Wand-Daten in das Grid
     * Beispiel Wände nicht begehbar, Türen begehbar
     */
    setWallConditions(walls, easystar);

    let path = await new Promise<number[][]>(resolve => {
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
    // console.log('Found path:', path);

    // Wenn kein Pfad gefunden wurde und force true ist, direkten Pfad setzen. (Treppe)
    if (path.length === 0 && force) {
      path = [
        [startPosition.x, startPosition.z],
        [endPosition.x, endPosition.z]
      ];
    }

    const doorWallByPosition = getWallDoorExtensionsByPosition(walls);

    // Exclude the starting position and the blocked end position if necessary
    return {
      path: path
        .map(point => new Vector3(point[0], 0, point[1]))
        .slice(1, path.length - (isBlocked ? 1 : 0)),
      doorWallByPosition
    };
  }

  lastRotation: Euler | null = null;

  /**
   * Bewegt die Einheit entlang des aktuellen Pfads.
   * Aktion Reihenfolge: Rotation -> Bewegung
   * Rotation wird nur ausgeführt, wenn die nächste Position nicht in Blickrichtung liegt.
   */
  movementUpdate({ time }: AnimationLoopValue) {
    const room = this.currentRoom!;
    const rotateOptions = this.rotateOptions;
    const moveOptions = this.moveOptions;
    const unit = this.unit;

    if (!moveOptions || !rotateOptions) {
      throw new Error('MoveOptions or RotateOptions not set');
    }

    if (this.currentMovement === null) {
      throw new Error('No current movement set');
    }

    const movementOptions = (unit as Unit<UnitOptions<MovementModuleOptions>>)
      .options.movement;

    if (this.currentMovement?.path.length || moveOptions.nextPosition) {
      const { startDuration } = moveOptions;
      const nextPosition = moveOptions.nextPosition;
      const startPosition = moveOptions.startPosition;
      const lastPosition = moveOptions.lastPosition;

      const lastDoor =
        lastPosition &&
        this.currentMovement.doorWallByPosition.get([
          lastPosition.x,
          lastPosition.z
        ]);
      let nextDoor =
        moveOptions.nextPosition &&
        this.currentMovement.doorWallByPosition.get([
          moveOptions.nextPosition.x,
          moveOptions.nextPosition.z
        ]);
      if (nextDoor && nextDoor.isOpening()) {
        return;
      }

      if (lastDoor && lastDoor.isClosing()) {
        return;
      }

      /**
       * Wenn `nextPosition` nicht gesetzt ist, handelt es sich um den Beginn eines neuen Bewegungsschritts.
       * Nächste Aktion wird definiert: Rotation oder Bewegung.
       *
       * Bricht ab, wenn die nächste Position nicht begehbar ist.
       */
      if (!nextPosition) {
        moveOptions.startPosition = unit.getPosition().clone();
        moveOptions.nextPosition = this.currentMovement.path.shift()!;

        //#endregion

        if (
          !room?.modules.units?.isPositionFree(moveOptions.nextPosition, [unit])
        ) {
          moveOptions.nextPosition = null;
          return;
        }

        //#region set start values

        rotateOptions.startDuration = time;
        rotateOptions.startRotation = unit.root.rotation.clone();

        const rotation = unit.getRotationByPosition(
          moveOptions.nextPosition!,
          movementOptions.diagonalMovement
        );

        const nextRotation = new Euler(0, getRadByRotation(rotation), 0);
        if (!this.lastRotation?.equals(nextRotation)) {
          rotateOptions.nextRotation = nextRotation;
        } else {
          moveOptions.startDuration = time;
          rotateOptions.nextRotation = null;
        }

        this.lastRotation = nextRotation;

        //#endregion
      }

      nextDoor =
        moveOptions.nextPosition &&
        this.currentMovement.doorWallByPosition.get([
          moveOptions.nextPosition.x,
          moveOptions.nextPosition.z
        ]);

      // console.log({
      //   nextDoor,
      //   lastDoor
      // });

      //#region Door Check
      if (nextDoor && nextDoor == lastDoor && !nextDoor.isOpen()) {
        // console.log(
        //   'Öffne Tür',
        //   [moveOptions.lastPosition!.x, moveOptions.nextPosition!.x],
        //   [moveOptions.lastPosition!.z, moveOptions.nextPosition!.z],
        //   (nextDoor.wall.direction === WALL_DIRECTION.VERTICAL &&
        //     moveOptions.lastPosition!.x < moveOptions.nextPosition!.x) ||
        //     (nextDoor.wall.direction === WALL_DIRECTION.HORIZONTAL &&
        //       moveOptions.lastPosition!.z > moveOptions.nextPosition!.z)
        //     ? false
        //     : true
        // );
        if (
          !nextDoor.open(
            (nextDoor.wall.direction === WALL_DIRECTION.VERTICAL &&
              moveOptions.lastPosition!.x < moveOptions.nextPosition!.x) ||
              (nextDoor.wall.direction === WALL_DIRECTION.HORIZONTAL &&
                moveOptions.lastPosition!.z > moveOptions.nextPosition!.z)
              ? false
              : true
          )
        ) {
          // Wenn Tür verschlossen oder nicht geöffnet werden kann, Abbruch der Bewegung
          debugger;
          moveOptions.nextPosition = null;
        }
        return;
      } else if (lastDoor && !nextDoor && lastDoor.isOpen()) {
        // console.log('Schließe Tür');
        // lastDoor.close();
        // return;
      }

      /**
       * Fahre mit der Bewegung fort, wenn keine Rotation mehr aussteht.
       */
      if (!rotateOptions.nextRotation && nextPosition) {
        const elapsedTime = time - startDuration;

        const progress = Math.min(
          elapsedTime / movementOptions.stepDuration,
          1
        );

        let preparedNextPosition = nextPosition!.clone();
        const y = getYPositionByPosition(room, preparedNextPosition, [unit]);

        preparedNextPosition = new Vector3(
          preparedNextPosition.x,
          y +
            (y - unit.getPosition().y !== 0
              ? easeOutExpo(Math.pow(-2 + 2 * progress, 2))
              : 0),
          preparedNextPosition.z
        );

        const distance = preparedNextPosition.sub(startPosition!);
        const position = startPosition!
          .clone()
          .add(distance!.multiplyScalar(Math.min(progress, 1)));
        this.unit.setPosition(new Vector3(position.x, position.y, position.z));

        /**
         * Bewegungsschritt beendet
         */
        if (progress >= 1) {
          moveOptions.lastPosition = moveOptions.nextPosition?.clone() || null;
          moveOptions.nextPosition = null;
          moveOptions.startDuration = time;
          if (!this.currentMovement.path.length) {
            /**
             * Bewegung beendet
             */
            this.currentMovement = null;
            this.observables.moveEnd$.next();
          }
        }
      }

      /**
       * Überprft ob Rotation notwendig, wenn nicht, dann Abbruch der nächsten Rotation.
       */
      if (
        rotateOptions.lastRotation &&
        rotateOptions.nextRotation?.equals(rotateOptions.lastRotation)
      ) {
        rotateOptions.nextRotation = null;
        moveOptions.startDuration = time;
        return;
      }

      /**
       * Fahre mit der Rotation fort, wenn eine Rotation definiert ist.
       */
      if (rotateOptions.nextRotation) {
        const { nextRotation, startRotation, startDuration } = rotateOptions;
        const elapsedTime = time - startDuration;
        const progress = easeOutQuad(
          Math.min(elapsedTime / movementOptions.rotationDuration, 1)
        );

        const rotationDifference = getShortestRotationDifference(
          startRotation!,
          nextRotation!
        );

        const interpolatedRotation = new Euler(
          startRotation!.x + rotationDifference.x * progress,
          startRotation!.y + rotationDifference.y * progress,
          startRotation!.z + rotationDifference.z * progress
        );

        unit.setRootRotation(interpolatedRotation);

        /**
         * Rotation beendet
         */
        if (progress >= 1) {
          rotateOptions.lastRotation =
            rotateOptions.nextRotation?.clone() || null;
          rotateOptions.nextRotation = null;
          moveOptions.startDuration = time;
          this.observables.moveStep$.next(unit.getPosition());
        }
      }
    }
  }
}

function getShortestRotationDifference(
  startRotation: Euler,
  endRotation: Euler
) {
  const diffX = normalizeAngle(endRotation.x - startRotation.x);
  const diffY = normalizeAngle(endRotation.y - startRotation.y);
  const diffZ = normalizeAngle(endRotation.z - startRotation.z);

  return new Euler(diffX, diffY, diffZ);
}

function normalizeAngle(angle: number) {
  let normalized = angle % (2 * Math.PI);

  if (normalized > Math.PI) {
    normalized -= 2 * Math.PI;
  } else if (normalized < -Math.PI) {
    normalized += 2 * Math.PI;
  }

  return normalized;
}

// function createRoomGrid(unit: Unit) {
//   const room = unit.modules.room?.getRoom();

//   if (!room) {
//     throw new Error('Unit is not in a room, cannot create grid data');
//   }

//   const data: number[] = room.modules.ground.getGridByFloor(0);
//   console.log(room.modules.units.getUnits());
//   room.modules.units
//     .getUnits()
//     .reduce(
//       (result, unit_) => {
//         if (!unit_.accessible && !unit.equal(unit_)) {
//           result.push({ unit: unit_, value: 0 });
//         }
//         return result;
//       },
//       [] as { unit: Unit; value: number }[]
//     )
//     .forEach(({ unit: otherUnit, value }) => {
//       otherUnit
//         .getMatrixPositions()
//         .filter(
//           p =>
//             p.x >= 0 &&
//             p.x < room.gridSize.x &&
//             p.z >= 0 &&
//             p.z < room.gridSize.y
//         )
//         .forEach(p => {
//           data[p.z * room.gridSize.x + p.x] = value;
//         });
//     });
//   // console.log('Grid data for pathfinding:', grid.toMatrix());

//   return RoomGrid.fromData(
//     data.map(value => (value ? 0 : 1)),
//     room.gridSize.x
//   );
// }

function createRoomGrid(unit: Unit) {
  const room = unit.modules.room?.getRoom();

  if (!room) {
    throw new Error('Unit is not in a room, cannot create grid data');
  }

  /**
   * Grid wird erst vom Boden übernommen.
   */
  const data: number[][] = room.modules.ground.getGrids();

  const grid = RoomGrid.fromData(data, room.gridSize.x);

  room.modules.units.getUnits().forEach(unit_ => {
    if (!unit_.accessible && !unit.equal(unit_)) {
      unit_
        .getMatrixPositions()
        .filter(
          p =>
            p.x >= 0 &&
            p.x < room.gridSize.x &&
            p.z >= 0 &&
            p.z < room.gridSize.y
        )
        .forEach(p => {
          grid.set(p.x, p.y, p.z, 1);
        });
    }
  });

  room.modules.stair.getStairs().forEach(stair => {
    stair
      .getMatrixPositions()
      .filter(
        p =>
          p.x >= 0 && p.x < room.gridSize.x && p.z >= 0 && p.z < room.gridSize.y
      )
      .forEach(p => {
        grid.set(p.x, p.y, p.z, 1);
      });
  });

  return grid;
}

// function createRoomGrid(unit: Unit, heightMultiplicator = 4) {
//   const room = unit.modules.room?.getRoom();

//   if (!room) {
//     throw new Error('Unit is not in a room, cannot create grid data');
//   }

//   let data: number[] = room.modules.ground.getGrid();

//   const unitY = unit.getPosition().y;

//   data = data.map(v => {
//     if (
//       unitY > 0 &&
//       unitY * heightMultiplicator >= 1 &&
//       unitY * heightMultiplicator >= -1
//     ) {
//       return unitY * heightMultiplicator > 1 ? 0 : 1;
//     }
//     return v;
//   });

//   room.modules.units
//     .getUnits()
//     .reduce(
//       (result, unit_) => {
//         const unitPosition = unit_.getPosition();
//         const y_diff = unitPosition.y + unit_.size.y - unit.getPosition().y;

//         if (!unit_.accessible) {
//           result.push({ unit: unit_, value: 0 });
//         } else if (
//           unit_.accessible &&
//           y_diff * heightMultiplicator > 1 &&
//           y_diff * heightMultiplicator > -1
//         ) {
//           result.push({ unit: unit_, value: 0 });
//         } else if (
//           unit_.accessible &&
//           y_diff * heightMultiplicator <= 1 &&
//           y_diff * heightMultiplicator >= -1
//         ) {
//           result.push({ unit: unit_, value: 1 });
//         }
//         return result;
//       },
//       [] as { unit: Unit; value: number }[]
//     )
//     .forEach(({ unit: otherUnit, value }) => {
//       if (unit.id !== otherUnit.id) {
//         otherUnit
//           .getMatrixPositions()
//           .filter(
//             p =>
//               p.x >= 0 &&
//               p.x < room.gridSize.x &&
//               p.z >= 0 &&
//               p.z < room.gridSize.y
//           )
//           .forEach(p => {
//             data[p.z * room.gridSize.x + p.x] = value;
//           });
//       }
//     });
//   // console.log('Grid data for pathfinding:', grid.toMatrix());

//   return RoomGrid.fromData(
//     data.map(value => (value ? 0 : 1)),
//     room.gridSize.x
//   );
// }
