import { Euler, Object3D, Vector2, Vector3 } from 'three';
import { ROTATION } from '../types';
import type { StairIdentifier } from '../types/stair';
import { Subscription } from 'rxjs';
import type { AnimationLoopSubject } from './Renderer';
import type { StairSkinIdentifier } from '../types/stair/skins';
import { FLOOR_HEIGHT } from '../utils/ground';

export interface EntryPositions {
  start: Vector2;
  end: Vector2;
}

export interface StairDescription<Position = Vector3> {
  skin: StairSkinIdentifier;
  position: Position;
  rotation: ROTATION;
}

export interface StairConstructorOptions {
  size: Vector2;
  skin: StairSkinIdentifier;
  entryPositions: EntryPositions;
  position: Vector3;
  rotation: ROTATION;
}

export default class Stair {
  /**
   * Der Typ muss eindeutig sein und dem Muster "<Kategorie>_<Name>" folgen, z.B. "stair_default"
   */
  static KEY: StairIdentifier;

  skin: StairSkinIdentifier = 'default_base';

  entryPositions: {
    start: Vector2;
    end: Vector2;
  } = { start: new Vector2(0, 0), end: new Vector2(0, 0) };

  size: Vector2 = new Vector2(1, 1);

  position: Vector3;

  /**
   * Standard Rotation im Mesh ist Norden.
   */
  rotation: ROTATION = ROTATION.NORTH;

  root = new Object3D();

  subscription = new Subscription();

  constructor({
    size,
    skin,
    entryPositions,
    position,
    rotation
  }:
    | StairConstructorOptions
    | (Omit<StairConstructorOptions, 'size' | 'entryPositions'> & {
        size?: Vector2;
        entryPositions?: EntryPositions;
      })) {
    this.size = size ?? this.size;
    this.skin = skin ?? this.skin;
    this.entryPositions = entryPositions ?? this.entryPositions;
    this.position = position;
    this.setRotation(rotation);
  }

  setupRoot() {
    const root = this.root;
    root.position.copy(
      new Vector3(
        this.position.x,
        this.position.y * FLOOR_HEIGHT,
        this.position.z
      )
    );
  }

  getEntryPositionByPosition(position: Vector3) {
    if (this.position.y === position.y) {
      return this.position
        .clone()
        .add(
          new Vector3(
            this.entryPositions.start.x,
            this.position.y,
            this.entryPositions.start.y
          )
        );
    } else if (this.position.y + 1 === position.y) {
      return this.position
        .clone()
        .add(
          new Vector3(
            this.entryPositions.end.x,
            this.position.y + 1,
            this.entryPositions.end.y
          )
        );
    } else {
      throw new Error('Position not on stair level');
    }
  }

  getMatrixPositions(): Vector3[] {
    const positions = [];
    const size = this.getSizeByRotation();
    for (let x = 0; x < size.x; x++) {
      for (let y = 0; y < size.y; y++) {
        positions.push(
          new Vector3(this.position.x + x, this.position.y, this.position.z + y)
        );
      }
    }
    return positions;
  }

  getSizeByRotation(): Vector2 {
    if (
      this.rotation === ROTATION.EAST ||
      this.rotation === ROTATION.WEST ||
      this.rotation === ROTATION.EAST_UP ||
      this.rotation === ROTATION.EAST_DOWN ||
      this.rotation === ROTATION.WEST_UP ||
      this.rotation === ROTATION.WEST_DOWN
    ) {
      return new Vector2(this.size.y, this.size.x);
    }
    return this.size;
  }

  setRotation(rotation: ROTATION) {
    this.rotation = rotation;
    switch (rotation) {
      case ROTATION.WEST:
        this.setRootRotation(new Euler(0, Math.PI, 0));
        break;
      case ROTATION.EAST:
        this.setRootRotation(new Euler(0, 0, 0));
        break;
      case ROTATION.WEST_UP:
        this.setRootRotation(new Euler(0, (3 * Math.PI) / 4, 0));
        break;
      case ROTATION.WEST_DOWN:
        this.setRootRotation(new Euler(0, -(3 * Math.PI) / 4, 0));
        break;
      case ROTATION.EAST_UP:
        this.setRootRotation(new Euler(0, Math.PI / 4, 0));
        break;
      case ROTATION.EAST_DOWN:
        this.setRootRotation(new Euler(0, -Math.PI / 4, 0));
        break;
      case ROTATION.NORTH:
        this.setRootRotation(new Euler(0, Math.PI / 2, 0));
        break;
      case ROTATION.SOUTH:
        this.setRootRotation(new Euler(0, -Math.PI / 2, 0));
        break;
      default:
        this.setRootRotation(new Euler(0, 0, 0));
        break;
    }
  }
  setRootRotation(rotation: Euler) {
    this.root.rotation.copy(rotation);
  }

  toDescription(): StairDescription {
    return {
      skin: this.skin,
      position: this.position.clone(),
      rotation: this.rotation
    };
  }

  destroy(): void {
    this.subscription.unsubscribe();
    this.root.remove();
  }

  async setup(_context: { animationLoop$: AnimationLoopSubject }) {
    this.setupRoot();
  }

  get key(): string {
    return (this.constructor as typeof Stair).KEY;
  }
}
