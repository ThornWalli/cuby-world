/* eslint-disable complexity */
import type {
  UnitModuleObservables,
  UnitModuleOptions,
  UnitModuleState
} from './../UnitModule';
import { Object3D, type Material } from 'three';
import {
  Vector3,
  Euler,
  InstancedMesh,
  MeshBasicMaterial,
  BoxGeometry
} from 'three';
import UnitModule from '../UnitModule';
import type Unit from '../Unit';
import { Subject } from 'rxjs';
import { getRadByRotation, type UnitOptions } from '../Unit';
import { easeOutQuad } from '@cuby-world/app/utils/easings';
import RoomGrid from '../RoomGrid';
import type { ArrayKeyMap } from '../ArrayKeyMap';
import type { AnimationLoopValue } from '../Renderer';
import type DoorWallExtension from '../wallExtension/Door';
import { WALL_DIRECTION } from '../../types/wall';
import { FLOOR_HEIGHT } from '../../utils/ground';
import { findBestPathByStairs } from '../../utils/pathfindng';
import { GRID_BLOCKED } from '../roomModule/Ground';

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

  movements: MovementDescription[] = [];
  currentMovement: MovementDescription | null = null;

  constructor(unit: Unit, state: State, debug: boolean) {
    super(unit, state, debug);
    this.observables.moveStart$ = new Subject<Vector3>();
    this.observables.moveStep$ = new Subject<Vector3>();
    this.observables.moveEnd$ = new Subject<void>();
  }

  /**
   * Wenn Bewegung vorhanden, wird die aktuelle Bewegung abgebrochen.
   * Es wird die nächste Position als Ziel gesetzt.
   */
  private abortMovement() {
    if (this.currentMovement) {
      this.currentMovement.path = this.currentMovement.path.slice(0, 1);
      return true;
    }
    return false;
  }

  async moveTo(position: Vector3) {
    if (this.abortMovement()) {
      return;
    }

    const grid = createRoomGrid(this.unit);

    const startPosition = this.unit.getPosition().clone().round();

    if (
      position.x >= 0 &&
      position.z >= 0 &&
      position.x < grid.width &&
      position.z < grid.depth
    ) {
      this.moveOptions = getDefaultMoveOptions();
      this.rotateOptions = getDefaultRotateOptions();
      this.movements = await this.prepareMovement(
        startPosition,
        position.clone().round(),
        grid
      );
      if (this.movements.length) {
        this.observables.moveStart$.next(position);
      }
    } else {
      console.warn(
        'Zielposition außerhalb des Raumgrids:',
        position,
        grid.width,
        grid.height
      );
      return;
    }
  }

  /**
   * Bewegt und animiert die Position des Einheitsobjekts.
   * @param time
   */
  override update(v: AnimationLoopValue) {
    this.currentMovement =
      this.currentMovement || this.movements.shift() || null;

    if (this.currentMovement) {
      this.movementUpdate(v);
    }
  }

  private async prepareMovement(
    startPosition: Vector3,
    endPosition: Vector3,
    roomGrid: RoomGrid
  ): Promise<MovementDescription[]> {
    const room = this.currentRoom;
    if (!room) {
      throw new Error('Unit is not in a room, cannot create grid data');
    }

    const matrixList = roomGrid.toMatrix().map((matrix, floorIndex) => ({
      matrix,
      floorIndex
    }));
    console.log('matrixList', matrixList);

    const unit = this.unit;
    const movementOptions = (unit as Unit<UnitOptions<MovementModuleOptions>>)
      .options.movement;

    const tileCostsMap = this.currentRoom.modules.ground.getTileCostMap();
    debugger;
    const paths = await findBestPathByStairs(matrixList, {
      positions: { start: startPosition, end: endPosition },
      options: {
        tileDescriptions: Array.from(tileCostsMap.values()),
        diagonalMovement: movementOptions.diagonalMovement
      },
      functions: {
        getStairs: room.modules.stair.getStairs.bind(room.modules.stair),
        getStairsByPositions: room.modules.stair.getStairsByPositions.bind(
          room.modules.stair
        ),
        getWallsByFloor: room.modules.wall.getWallsByFloor.bind(
          room.modules.wall
        )
      }
    });

    const isFailed =
      paths.some(path => {
        return !path.success;
      }) ||
      (paths.length === 1 &&
        paths[0]!.path.length === 1 &&
        paths[0]!.path[0]?.equals(startPosition));

    console.log('paths', paths, isFailed);

    /**
     * Spezialfall: Start- und Endpunkt sind gleich, keine Bewegung notwendig.
     */
    if (isFailed) {
      return [];
    }

    if (this.debug) {
      this.createPathHelper(
        paths
          .map(({ path }) => {
            return path;
          })
          .flat()
      );
    }

    return paths;
  }

  pathHelper?: InstancedMesh;
  createPathHelper(path: Vector3[]) {
    if (this.pathHelper) {
      this.pathHelper.parent?.remove(this.pathHelper);
      this.pathHelper.geometry.dispose();
      (this.pathHelper.material as Material).dispose();
      this.pathHelper = undefined!;
    }
    const geometry = new BoxGeometry(0.2, 0.2, 0.2);

    const instancedMesh = new InstancedMesh(
      geometry,
      new MeshBasicMaterial({ color: 0x000000 }),
      path.length
    );

    const helper = new Object3D();
    path.forEach((path, index) => {
      helper.updateMatrix();
      helper.matrix.makeTranslation(path.x, path.y * FLOOR_HEIGHT, path.z);
      instancedMesh.setMatrixAt(index, helper.matrix);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;

    this.pathHelper = instancedMesh;

    const room = this.unit.modules.room?.getRoom();
    if (room) {
      room.addToRoot(instancedMesh);
    }
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

    const abort = () => {
      this.currentMovement = null;
      this.moveOptions = null;
      this.rotateOptions = null;
      this.observables.moveEnd$.next();
      return;
    };

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

        if (moveOptions.startPosition.equals(moveOptions.nextPosition)) {
          moveOptions.nextPosition = this.currentMovement.path.shift()!;
        }

        //#endregion

        if (!moveOptions.nextPosition) {
          debugger;
          moveOptions.nextPosition = null;
          this.currentMovement = null;
          return;
        }

        if (
          !room?.modules.units?.isPositionFree(moveOptions.nextPosition, [unit])
        ) {
          abort();
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
        preparedNextPosition = new Vector3(
          preparedNextPosition.x,
          preparedNextPosition.y,
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

  room.modules.stair.getStairs().forEach(stair => {
    stair
      .getMatrixPositions()
      .filter(
        p =>
          p.x >= 0 && p.x < room.gridSize.x && p.z >= 0 && p.z < room.gridSize.y
      )
      .forEach(p => {
        grid.set(p.x, p.y, p.z, GRID_BLOCKED);
        grid.set(p.x, p.y + 1, p.z, GRID_BLOCKED);
      });
  });

  return grid;
}
