import {
  BoxGeometry,
  Euler,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Vector2,
  Vector3
} from 'three';
import { ROTATION, ROTATION_TYPE, rotationDirections } from '../utils/rotation';
import type { StairDescription, StairIdentifier } from '../types/stair';
import { Subscription } from 'rxjs';
import type { AnimationLoopSubject } from './Renderer';
import type { StairSkinIdentifier } from '../types/stair/skins';
import { FLOOR_HEIGHT } from '../utils/ground';
import { OBJECT_NAME } from '../utils/object';
import {
  disposeObject3D,
  setMainObjectRecursive
} from '@cuby-world/app/lib/utils/object';
import type Room from './Room';

declare module '../../lib/utils/object' {
  interface ObjectName {
    STAIR: string;
  }
}

OBJECT_NAME.STAIR = 'stair';

export interface EntryPositions {
  start: Vector2;
  end: Vector2;
}

export interface StairConstructorOptions {
  size: Vector2;
  skin: StairSkinIdentifier;
  entryPositions: EntryPositions;
  position: Vector3;
  rotation: ROTATION;
}

export default class Stair {
  id: string = crypto.randomUUID();
  debug = true;
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

  room: Room | undefined;

  /**
   * Standard Rotation im Mesh ist Norden.
   */
  rotation: ROTATION = ROTATION.NORTH;

  root = new Object3D();

  subscription = new Subscription();

  visible = true;

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

  destroy(): void {
    this.subscription.unsubscribe();

    this.root.parent?.remove(this.root);
    this.root.remove();
    disposeObject3D(this.root);
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

    root.name = OBJECT_NAME.STAIR;
    root.userData[OBJECT_NAME.STAIR] = this.id;

    if (this.debug) {
      this.getDebugEntryMeshes().forEach(mesh => root.add(mesh));
    }
    setMainObjectRecursive(root, root);
  }

  setPosition(position: Vector3) {
    this.position = position;
    this.root.position.set(position.x, position.y * FLOOR_HEIGHT, position.z);
  }

  addToRoot(object: Object3D) {
    this.root.add(object);
    setMainObjectRecursive(object, this.root);
  }

  getDebugEntryMeshes(): Mesh[] {
    const entryPositions = this.entryPositions;
    /**
     * Create Entry Positions
     */
    const startMesh = new Mesh(
      new BoxGeometry(0.1, 0.1, 0.1),
      new MeshBasicMaterial({ color: 0x00ff00 })
    );
    startMesh.position.set(-entryPositions.start.x, 0, -entryPositions.start.y);

    const endMesh = new Mesh(
      new BoxGeometry(0.1, 0.1, 0.1),
      new MeshBasicMaterial({ color: 0xff0000 })
    );
    endMesh.position.set(
      -entryPositions.end.x,
      1 * FLOOR_HEIGHT,
      -entryPositions.end.y
    );

    return [startMesh, endMesh];
  }

  getEntryPositions(): { start: Vector3; end: Vector3 } {
    const entryPositions = this.getEntryPositionsByRotation(this.rotation);
    return {
      start: this.position
        .clone()
        .sub(new Vector3(entryPositions.start.x, 0, entryPositions.start.y)),
      end: this.position
        .clone()
        .add(new Vector3(0, 1, 0))
        .sub(new Vector3(entryPositions.end.x, 0, entryPositions.end.y))
    };
  }

  getEntryPositionByPosition(position: Vector3) {
    const entryPositions = this.getEntryPositionsByRotation(this.rotation);
    if (this.position.y === position.y) {
      return this.position
        .clone()
        .sub(new Vector3(entryPositions.start.x, 0, entryPositions.start.y));
    } else if (this.position.y + 1 === position.y) {
      return this.position
        .clone()
        .add(new Vector3(0, 1, 0))
        .sub(new Vector3(entryPositions.end.x, 0, entryPositions.end.y));
    } else {
      throw new Error('Position not on stair level');
    }
  }

  /**
   * Gibt die gegenüberliegende Einstiegposition zurück.
   * Z.B. wenn die übergebene Position auf der unteren Ebene ist, wird die obere Einstiegposition zurückgegeben.
   */
  getCounterpartEntryPositionByPosition(position: Vector3) {
    const entryPositions = this.getEntryPositionsByRotation(this.rotation);
    if (this.position.y === position.y) {
      return this.position
        .clone()
        .add(new Vector3(0, 1, 0))
        .sub(new Vector3(entryPositions.end.x, 0, entryPositions.end.y));
    } else if (this.position.y + 1 === position.y) {
      return this.position
        .clone()
        .sub(new Vector3(entryPositions.start.x, 0, entryPositions.start.y));
    } else {
      throw new Error('Position not on stair level');
    }
  }

  getEntryPositionsByRotation(rotation: ROTATION = this.rotation) {
    const rotateVector2 = (vec: Vector2, rotation: ROTATION): Vector2 => {
      const { x, y } = vec.clone();
      let rx = x;
      let rz = y;

      switch (rotation) {
        case ROTATION.NORTH:
          rx = x;
          rz = y;
          break;
        case ROTATION.SOUTH:
          rx = y;
          rz = x;
          break;

        case ROTATION.EAST:
          rx = x;
          rz = y;
          break;
        case ROTATION.WEST:
          rx = -x;
          rz = y;
          break;

        // case ROTATION.EAST_UP:
        //   rx = y;
        //   rz = -x;
        //   break;
        // case ROTATION.WEST_UP:
        //   rx = -y;
        //   rz = x;
        //   break;
        // case ROTATION.EAST_DOWN:
        //   rx = y;
        //   rz = -x;
        //   break;
        // case ROTATION.WEST_DOWN:
        //   rx = -y;
        //   rz = x;
        //   break;

        default:
          rx = x;
          rz = y;
          break;
      }

      return new Vector2(rx, rz);
    };

    return {
      start: rotateVector2(this.entryPositions.start, rotation),
      end: rotateVector2(this.entryPositions.end, rotation)
    };
  }

  getMatrixPositions(rotation: ROTATION = this.rotation): Vector3[] {
    const positions = [];
    const size = this.getSizeByRotation(rotation);
    const offset = this.getMatrixOffsets(rotation);
    for (let x = 0; x < size.x; x++) {
      for (let y = 0; y < size.y; y++) {
        positions.push(
          new Vector3(
            this.position.x + x * offset.x,
            this.position.y,
            this.position.z + y * offset.y
          )
        );
      }
    }
    return positions;
  }

  getSizeByRotation(rotation = this.rotation): Vector2 {
    return sizeByRotation(this.size, rotation);
  }

  getMatrixOffsets(rotation = this.rotation): Vector2 {
    return matrixOffsets(rotation);
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.root.visible = visible;
  }

  setRootRotation(rotation: Euler) {
    this.root.rotation.copy(rotation);
  }

  toDescription(): StairDescription {
    return {
      type: this.key,
      skin: this.skin,
      position: this.position.clone(),
      rotation: this.rotation
    };
  }

  async setup(context: { room?: Room; animationLoop$: AnimationLoopSubject }) {
    this.room = context.room;
    this.setupRoot();
  }

  get key(): string {
    return (this.constructor as typeof Stair).KEY;
  }

  equals(stair: Stair): boolean {
    return this.id === stair.id;
  }

  //#region rotation

  setRotation(rotation: ROTATION) {
    this.rotation = rotation;
    switch (rotation) {
      case ROTATION.WEST:
        this.setRootRotation(new Euler(0, Math.PI, 0));
        break;
      case ROTATION.EAST:
        this.setRootRotation(new Euler(0, 0, 0));
        break;
      case ROTATION.NORTH_WEST:
        this.setRootRotation(new Euler(0, (3 * Math.PI) / 4, 0));
        break;
      case ROTATION.SOUTH_WEST:
        this.setRootRotation(new Euler(0, -(3 * Math.PI) / 4, 0));
        break;
      case ROTATION.NORTH_EAST:
        this.setRootRotation(new Euler(0, Math.PI / 4, 0));
        break;
      case ROTATION.SOUTH_EAST:
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

  rotateLeft() {
    const directions = rotationDirections[ROTATION_TYPE.BASIC];
    const length = directions.length;
    const index = (directions.indexOf(this.rotation) - 1 + length) % length;
    this.setRotation(directions[index]!);
  }
  rotateRight(offset = 0) {
    const directions = rotationDirections[ROTATION_TYPE.BASIC];
    const length = directions.length;
    const index = (directions.indexOf(this.rotation) + 1 + offset) % length;
    this.setRotation(rotationDirections[ROTATION_TYPE.BASIC][index]!);
  }

  getLeftRotation() {
    const directions = rotationDirections[ROTATION_TYPE.BASIC];
    const length = directions.length;
    const index = (directions.indexOf(this.rotation) - 1 + length) % length;
    return directions[index]!;
  }
  getRightRotation(offset = 0) {
    const directions = rotationDirections[ROTATION_TYPE.BASIC];
    const length = directions.length;
    const index = (directions.indexOf(this.rotation) + 1 + offset) % length;
    return directions[index]!;
  }

  //#endregion
}

function sizeByRotation(size: Vector2, rotation: ROTATION) {
  if (
    rotation === ROTATION.NORTH ||
    rotation === ROTATION.SOUTH ||
    rotation === ROTATION.NORTH_WEST ||
    rotation === ROTATION.NORTH_EAST ||
    rotation === ROTATION.SOUTH_WEST ||
    rotation === ROTATION.SOUTH_EAST
  ) {
    // Tauscht die Dimensionen
    return new Vector2(size.y, size.x);
  }
  // Behält die Dimensionen
  return size;
}

function matrixOffsets(rotation: ROTATION): Vector2 {
  let scaleX = 1;
  let scaleZ = 1;

  if (
    rotation === ROTATION.EAST
    // this.rotation === ROTATION.NORTH_EAST ||
    // this.rotation === ROTATION.SOUTH_EAST
  ) {
    scaleX = -1;
  }

  if (
    rotation === ROTATION.SOUTH
    // this.rotation === ROTATION.SOUTH_EAST ||
    // this.rotation === ROTATION.SOUTH_WEST
  ) {
    scaleZ = -1;
  }

  return new Vector2(scaleX, scaleZ);
}
