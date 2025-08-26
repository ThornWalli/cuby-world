import { Vector3, Euler } from 'three';

import PathFinder from 'pathfinding';
import UnitModule from '../UnitModule';
import {
  matrixPositionToPosition,
  positionToMatrixPosition
} from '../../utils/matrix';

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

export default class MovementUnitModule extends UnitModule {
  static override TYPE = 'movement';

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
  private stepDuration: number = 300;
  private rotationDuration: number = 125;

  currentPath: Vector3[] = [];

  moveTo(position: Vector3) {
    if (this.unit.room?.description) {
      const grid = this.unit.room.description.grid;

      const gridData = new PathFinder.Grid(
        grid.map(row => row.map(value => (value ? 0 : 1)))
      );
      // Convert positions to matrix positions
      const startPosition = positionToMatrixPosition(
        this.unit.getRootPosition()
      );
      const endPosition = position.clone();

      // Use PathFinder to find the path
      const finder = new PathFinder.AStarFinder();
      const path = finder
        .findPath(
          startPosition.x,
          startPosition.z,
          endPosition.x,
          endPosition.z,
          gridData
        )
        .map(point => new Vector3(point[0], 0, point[1]));
      this.currentPath = path.slice(1);

      if (this.rotateOptions.nextRotation && this.moveOptions.nextPosition) {
        this.moveOptions.nextPosition = null;
      }
    } else {
      throw new Error('Unit is not in a room, cannot move to position');
    }
  }

  get room() {
    return this.unit.room;
  }

  /**
   * Bewegt und animiert die Position des Einheitsobjekts.
   * @param time
   */
  override update(time: number) {
    this.movementUpdate(time);
  }
  // eslint-disable-next-line complexity
  movementUpdate(time: number) {
    const rotateOptions = this.rotateOptions;
    const moveOptions = this.moveOptions;
    const unit = this.unit;
    if (this.currentPath.length || moveOptions.nextPosition) {
      const { nextPosition, startPosition, startDuration } = moveOptions;
      if (!nextPosition) {
        moveOptions.startPosition = positionToMatrixPosition(
          unit.getRootPosition()
        );
        moveOptions.nextPosition = this.currentPath.shift()!;
        rotateOptions.startDuration = time;
        rotateOptions.startRotation = unit.root.rotation.clone();
        const nextRotation = new Euler(
          0,
          getRotateByDirection(
            getDirection(
              this.moveOptions
                .nextPosition!.clone()
                .sub(this.moveOptions.startPosition!)
            )
          ),
          0
        );

        rotateOptions.nextRotation = nextRotation;
      }

      if (!this.rotateOptions.nextRotation && nextPosition) {
        const elapsedTime = time - startDuration;
        const progress = elapsedTime / this.stepDuration;
        const distance = nextPosition!.clone().sub(startPosition!);
        const position = startPosition!
          .clone()
          .add(distance!.clone().multiplyScalar(Math.min(progress, 1)));
        this.unit.setRootPosition(matrixPositionToPosition(position));

        if (progress >= 1) {
          this.moveOptions.nextPosition = null;
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
        const progress = Math.min(elapsedTime / this.rotationDuration, 1);

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
      return Math.PI;
    case DIRECTION.RIGHT:
      return 0;
    case DIRECTION.UP:
      return Math.PI / 2;
    case DIRECTION.DOWN:
      return -Math.PI / 2;
    default:
      return 0;
  }
}
