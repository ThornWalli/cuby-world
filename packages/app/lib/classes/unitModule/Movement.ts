/* eslint-disable complexity */
import { Vector3, Euler } from 'three';

import PathFinder from 'pathfinding';
import UnitModule from '../UnitModule';
import type Unit from '../Unit';
import { Subject } from 'rxjs';
import { getYPositionByPosition } from '../../utils/room';
import { getRadByRotation, UNIT_ROTATION } from '../Unit';

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
  private stepDuration: number = 300;
  private rotationDuration: number = 125;

  currentPath: Vector3[] = [];

  moveTo(position: Vector3) {
    if (this.unit.room?.description) {
      const grid = prepareRoomGridGrid(this.unit, 1 / (1 / 4));
      const data = grid.data;

      let isBlocked = false;
      if (Array.isArray(data[position.z])) {
        const i =
          position.z * this.unit.room.description.grid.width + position.x;

        isBlocked = data[i] === 1;
        data[i] = 0;
      }

      const gridData = new PathFinder.Grid(grid.toMatrix());

      // Convert positions to matrix positions
      const startPosition = this.unit.getPosition().round();
      const endPosition = position.clone().round();

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

      // Exclude the starting position and the blocked end position if necessary
      this.currentPath = path.slice(1, path.length - (isBlocked ? 1 : 0));

      if (this.rotateOptions.nextRotation && this.moveOptions.nextPosition) {
        this.moveOptions.nextPosition = null;
      }

      this.moveStart$.next(position);
    } else {
      throw new Error('Unit is not in a room, cannot move to position');
    }
  }

  /**
   * Bewegt und animiert die Position des Einheitsobjekts.
   * @param time
   */
  override update(time: number) {
    this.movementUpdate(time);
  }

  movementUpdate(time: number) {
    const rotateOptions = this.rotateOptions;
    const moveOptions = this.moveOptions;
    const unit = this.unit;

    if (this.currentPath.length || moveOptions.nextPosition) {
      const { startDuration } = moveOptions;
      const nextPosition = moveOptions.nextPosition;
      const startPosition = moveOptions.startPosition;
      if (!nextPosition) {
        moveOptions.startPosition = unit.getPosition();
        moveOptions.nextPosition = this.currentPath.shift()!;
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

      if (!this.rotateOptions.nextRotation && nextPosition) {
        const elapsedTime = time - startDuration;

        const progress = elapsedTime / this.stepDuration;
        let preparedNextPosition = nextPosition!.clone();
        const y = getYPositionByPosition(unit.room!, preparedNextPosition, [
          unit
        ]);
        preparedNextPosition = new Vector3(
          preparedNextPosition.x,
          y,
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
          this.moveStep$.next(unit.getPosition());
        }
      }
    }
  }

  movementTimeline = new Timeline();
  lastPosition: Vector3 = new Vector3();
  createTimeline(unit: Unit, nextPosition: Vector3) {
    const timeline = new Timeline();

    // Setze die erste Position als Startpunkt für die Berechnung der ersten Rotation
    this.lastPosition = unit.getPosition().clone();
    const startPosition = unit.getPosition().clone();

    let rotationDuration = 0;
    let startRotation: Euler | null = null;
    let nextRotation: Euler | null = null;

    // Berechne die Vektoren für die alte und neue Richtung
    const lastDirection = nextPosition.clone().sub(this.lastPosition);
    const newDirection = nextPosition.clone().sub(startPosition);

    // Prüfe, ob sich die Richtung geändert hat
    if (!lastDirection.equals(newDirection)) {
      rotationDuration = this.rotationDuration;
      startRotation = unit.root.rotation.clone();

      const rotation = getRotateByDirection(getDirection(newDirection));
      nextRotation = new Euler(0, getRadByRotation(rotation), 0);

      // Füge den Rotationsschritt zur Timeline hinzu
      timeline.addStep((time: number, step: TimelineStep) => {
        const progress = step.progress(time);
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
      }, rotationDuration);
    }

    // Füge immer den Bewegungsschritt hinzu
    timeline.addStep((time: number, step: TimelineStep) => {
      const progress = step.progress(time);
      let preparedNextPosition = nextPosition.clone();
      const y = getYPositionByPosition(unit.room!, preparedNextPosition, [
        unit
      ]);
      preparedNextPosition = new Vector3(
        preparedNextPosition.x,
        y,
        preparedNextPosition.z
      );
      const distance = preparedNextPosition.clone().sub(startPosition);
      const position = startPosition
        .clone()
        .add(distance.multiplyScalar(Math.min(progress, 1)));
      unit.setPosition(position);
    }, this.stepDuration);

    // Aktualisiere die letzte Position für den nächsten Schleifendurchlauf
    this.lastPosition = nextPosition.clone();
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

function prepareRoomGridGrid(unit: Unit, heightMultiplicator = 4) {
  const room = unit.room;

  if (!room) {
    throw new Error('Unit is not in a room, cannot create grid data');
  }

  const grid = room.grid.clone();
  const unitY = unit.getPosition().y;

  grid.data = grid.data.map(v => {
    if (
      unitY > 0 &&
      unitY * heightMultiplicator >= 1 && // Optimierter Vergleich für 1/3
      unitY * heightMultiplicator >= -1
    ) {
      return unitY * 3 > 1 ? 0 : 1;
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
          y_diff * heightMultiplicator > 1 && // Optimierter Vergleich für 1/3
          y_diff * heightMultiplicator > -1 // Optimierter Vergleich für -2/3
        ) {
          result.push({ unit: unit_, value: 0 });
        } else if (
          unit_.accessible &&
          y_diff * heightMultiplicator <= 1 && // Optimierter Vergleich für 1/3
          y_diff * heightMultiplicator >= -1 // Optimierter Vergleich für -2/3
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
  console.log('Grid data for pathfinding:', grid.toMatrix());
  return grid;
}

class TimelineStep {
  constructor(
    public cb: (time: number, step: TimelineStep) => void,
    public startTime: number,
    public endTime: number
  ) {
    if (endTime <= startTime) {
      throw new Error('End time must be greater than start time');
    }
  }

  get duration() {
    return this.endTime - this.startTime;
  }

  progress(currentTime: number) {
    if (currentTime <= this.startTime) return 0;
    if (currentTime >= this.endTime) return 1;
    return (currentTime - this.startTime) / this.duration;
  }
}

class Timeline {
  private steps: TimelineStep[] = [];
  private currentStepIndex: number = -1;

  addStep(
    cb: (time: number, step: TimelineStep) => void,
    duration: number,
    startTime?: number
  ) {
    let effectiveStartTime: number;

    if (startTime !== undefined) {
      effectiveStartTime = startTime;
    } else {
      // Wenn startTime nicht gegeben ist, beginnt der Schritt nach dem letzten.
      effectiveStartTime =
        this.steps.length > 0 ? this.steps[this.steps.length - 1]!.endTime : 0;
    }

    if (duration <= 0) {
      throw new Error('Duration must be positive');
    }

    const endTime = effectiveStartTime + duration;
    this.steps.push(new TimelineStep(cb, effectiveStartTime, endTime));

    // Schritte nach ihrer Startzeit sortieren
    this.steps.sort((a, b) => a.startTime - b.startTime);
  }

  // Die update-Methode bleibt für parallele Schritte gleich
  update(currentTime: number) {
    const activeSteps = this.steps.filter(
      step => currentTime >= step.startTime && currentTime <= step.endTime
    );
    for (const step of activeSteps) {
      step.cb(currentTime, step);
    }
  }

  getCurrentStep(currentTime: number): TimelineStep | null {
    if (
      this.currentStepIndex >= 0 &&
      this.currentStepIndex < this.steps.length
    ) {
      const currentStep = this.steps[this.currentStepIndex]!;
      if (
        currentTime >= currentStep.startTime &&
        currentTime <= currentStep.endTime
      ) {
        return currentStep;
      }
    }

    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i]!;
      if (currentTime >= step.startTime && currentTime <= step.endTime) {
        this.currentStepIndex = i;
        return step;
      }
    }

    this.currentStepIndex = -1;
    return null;
  }

  reset() {
    this.currentStepIndex = -1;
  }
}
