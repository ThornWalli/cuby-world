import type { UnitModuleOptions } from './../UnitModule';
import { Vector3, Euler } from 'three';

import PathFinder from 'pathfinding';
import UnitModule from '../UnitModule';
import type Unit from '../Unit';
import { Subject } from 'rxjs';
import { getYPositionByPosition } from '../../utils/room';
import { getRadByRotation, UNIT_ROTATION, type UnitOptions } from '../Unit';
import { easeOutExpo, easeOutQuad } from '@cuby-world/app/utils/easings';

interface MoveOptions {
  startDuration: number; // Startzeitpunkt der Bewegung
  nextPosition: Vector3 | null; // Nächste Position, zu der sich die Einheit bewegen soll
  startPosition: Vector3 | null; // Startposition der Bewegung
}

interface RotateOptions {
  startDuration: number; // Startzeitpunkt der Rotation
  nextRotation: Euler | null; // Nächste Rotation, zu der sich die Einheit bewegen soll
  startRotation: Euler | null; // Startrotation der Bewegung
  lastRotation?: Euler | null; // Letzte Rotation der Bewegung
}

export interface MovementModuleOptions extends UnitModuleOptions {
  movement: {
    stepDuration: number;
    rotationDuration: number;
  };
}

export default class MovementUnitModule extends UnitModule {
  static override TYPE = 'movement';

  moveStart$ = new Subject<Vector3>();
  moveStep$ = new Subject<Vector3>();
  moveEnd$ = new Subject<void>();

  private moveOptions: MoveOptions = {
    startDuration: 0,
    nextPosition: null,
    startPosition: null
  };
  private rotateOptions: RotateOptions = {
    startDuration: 0,
    nextRotation: null,
    startRotation: null,
    lastRotation: null
  };

  currentPath: Vector3[] = [];

  moveTo(position: Vector3, options: { force?: boolean } = {}) {
    if (!this.unit.room?.description) {
      throw new Error('Unit is not in a room, cannot move to position');
    }

    const grid = createRoomGrid(this.unit, 1 / (1 / 4));
    const data = grid.data;

    let isBlocked = false;
    if (Array.isArray(data[position.z])) {
      const i = position.z * this.unit.room.description.grid.width + position.x;

      isBlocked = data[i] === 1;
      data[i] = 0;
    }

    const gridData = new PathFinder.Grid(grid.toMatrix());
    const startPosition = this.unit.getPosition().clone().round();

    this.setCurrentPath(
      startPosition,
      position.clone().round(),
      gridData,
      isBlocked,
      options.force
    );

    if (this.rotateOptions.nextRotation && this.moveOptions.nextPosition) {
      this.moveOptions.nextPosition = null;
    }

    this.moveStart$.next(position);
  }

  /**
   * Bewegt und animiert die Position des Einheitsobjekts.
   * @param time
   */
  override update(time: number) {
    this.movementUpdate(time);
  }

  endPosition: Vector3 | null = null;
  setCurrentPath(
    startPosition: Vector3,
    endPosition: Vector3,
    gridData: PathFinder.Grid,
    isBlocked: boolean,
    force?: boolean
  ) {
    this.endPosition = endPosition;
    // Use PathFinder to find the path
    const finder = new PathFinder.AStarFinder({
      diagonalMovement: PathFinder.DiagonalMovement.Never,
      allowDiagonal: false
    });
    let path = finder.findPath(
      startPosition.x,
      startPosition.z,
      endPosition.x,
      endPosition.z,
      gridData
    );

    // Wenn kein Pfad gefunden wurde und force true ist, direkten Pfad setzen. (Treppe)
    if (path.length === 0 && force) {
      path = [
        [startPosition.x, startPosition.z],
        [endPosition.x, endPosition.z]
      ];
    }

    // Exclude the starting position and the blocked end position if necessary
    this.currentPath = path
      .map(point => new Vector3(point[0], 0, point[1]))
      .slice(1, path.length - (isBlocked ? 1 : 0));
  }

  // eslint-disable-next-line complexity
  movementUpdate(time: number) {
    const rotateOptions = this.rotateOptions;
    const moveOptions = this.moveOptions;
    const unit = this.unit;

    if (this.currentPath.length || moveOptions.nextPosition) {
      const { startDuration } = moveOptions;
      const nextPosition = moveOptions.nextPosition;
      const startPosition = moveOptions.startPosition;

      if (!nextPosition) {
        moveOptions.startPosition = unit.getPosition().clone();
        moveOptions.nextPosition = this.currentPath.shift()!;

        if (!this.room?.isPositionFree(moveOptions.nextPosition, [unit])) {
          moveOptions.nextPosition = null;
          return;
        }

        rotateOptions.startDuration = time;
        rotateOptions.startRotation = unit.root.rotation.clone();

        const rotation = getRotateByDirection(
          getDirection(
            this.moveOptions
              .nextPosition!.clone()
              .sub(this.moveOptions.startPosition!)
          )
        );
        const nextRotation = new Euler(0, getRadByRotation(rotation), 0);
        rotateOptions.nextRotation = nextRotation;
      }

      const movementOptions = (unit as Unit<UnitOptions<MovementModuleOptions>>)
        .options.movement;

      if (!this.rotateOptions.nextRotation && nextPosition) {
        const elapsedTime = time - startDuration;

        const progress = Math.min(
          elapsedTime / movementOptions.stepDuration,
          1
        );

        let preparedNextPosition = nextPosition!.clone();
        const y = getYPositionByPosition(unit.room!, preparedNextPosition, [
          unit
        ]);

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

        if (progress >= 1) {
          this.moveOptions.nextPosition = null;
          if (!this.currentPath.length) {
            this.moveEnd$.next();
          }
        }
      }

      if (
        rotateOptions.lastRotation &&
        rotateOptions.nextRotation?.equals(rotateOptions.lastRotation)
      ) {
        rotateOptions.nextRotation = null;
        moveOptions.startDuration = time;
        return;
      }

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

        if (progress >= 1) {
          rotateOptions.lastRotation =
            rotateOptions.nextRotation?.clone() || null;
          rotateOptions.nextRotation = null;
          moveOptions.startDuration = time;
          this.moveStep$.next(unit.getPosition());
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

enum DIRECTION {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  NONE = 'none'
}

function getDirection(position: Vector3): DIRECTION {
  if (position.x < 0) {
    return DIRECTION.LEFT;
  } else if (position.x > 0) {
    return DIRECTION.RIGHT;
  } else if (position.z < 0) {
    return DIRECTION.UP;
  } else if (position.z > 0) {
    return DIRECTION.DOWN;
  }
  return DIRECTION.NONE;
}

function getRotateByDirection(direction: DIRECTION) {
  switch (direction) {
    case DIRECTION.LEFT:
      return UNIT_ROTATION.LEFT;
    case DIRECTION.RIGHT:
      return UNIT_ROTATION.RIGHT;
    case DIRECTION.UP:
      return UNIT_ROTATION.UP;
    case DIRECTION.DOWN:
      return UNIT_ROTATION.DOWN;
    default:
      return UNIT_ROTATION.DOWN;
  }
}

function createRoomGrid(unit: Unit, heightMultiplicator = 4) {
  const room = unit.room;

  if (!room) {
    throw new Error('Unit is not in a room, cannot create grid data');
  }

  const grid = room.grid.clone();
  const unitY = unit.getPosition().y;

  grid.data = grid.data.map(v => {
    if (
      unitY > 0 &&
      unitY * heightMultiplicator >= 1 &&
      unitY * heightMultiplicator >= -1
    ) {
      return unitY * heightMultiplicator > 1 ? 0 : 1;
    }
    return v;
  });

  room.units
    .values()
    .reduce(
      (result, unit_) => {
        const unitPosition = unit_.getPosition();
        const y_diff = unitPosition.y + unit_.size.y - unit.getPosition().y;

        if (!unit_.accessible) {
          result.push({ unit: unit_, value: 0 });
        } else if (
          unit_.accessible &&
          y_diff * heightMultiplicator > 1 &&
          y_diff * heightMultiplicator > -1
        ) {
          result.push({ unit: unit_, value: 0 });
        } else if (
          unit_.accessible &&
          y_diff * heightMultiplicator <= 1 &&
          y_diff * heightMultiplicator >= -1
        ) {
          result.push({ unit: unit_, value: 1 });
        }
        return result;
      },
      [] as { unit: Unit; value: number }[]
    )
    .forEach(({ unit: otherUnit, value }) => {
      if (unit.id !== otherUnit.id) {
        otherUnit
          .getMatrixPositions()
          .filter(
            p => p.x >= 0 && p.x < grid.width && p.z >= 0 && p.z < grid.height
          )
          .forEach(p => {
            grid.data[p.z * grid.width + p.x] = value;
          });
      }
    });
  grid.data = grid.data.map(value => (value ? 0 : 1));
  // console.log('Grid data for pathfinding:', grid.toMatrix());
  return grid;
}
