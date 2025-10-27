/* eslint-disable complexity */
import { FLOOR_HEIGHT } from '@cuby-world/app/lib/utils/ground';
import { ReplaySubject, Subscription, type SubscriptionLike } from 'rxjs';
import { Box3, Euler, Group, Vector3, type Mesh, type Object3D } from 'three';
import type Room from './Room';
import MovementUnitModule from './unitModule/Movement';
import PlayerUnitModule from './unitModule/Player';
import type UnitModule from './UnitModule';
import type AssetLoader from './AssetLoader';
import SelectionUnitModule from './unitModule/Selection';
import {
  matrixPositionToPosition,
  positionToMatrixPosition
} from '../utils/matrix';
import type { AnimationUnitModule } from './unitModule/Animation';
import { PlacementUnitModule } from './unitModule/Placement';
import { findAllMeshes } from '@cuby-world/units/utils/mesh';
import RoomUnitModule from './unitModule/Room';
import type { UnitChunking } from './UnitChunkManager';
import type { UnitModuleState } from './UnitModule';
import type { AnimationLoopValue } from './Renderer';
import {
  disposeObject3D,
  OBJECT_NAME,
  OBJECT_USER_DATA,
  setMainObjectRecursive
} from '../utils/object';
import { getFloorFromPosition } from '../utils/floor';
import { ROTATION, ROTATION_TYPE, rotationDirections } from '../utils/rotation';

declare module '../../lib/utils/object' {
  interface ObjectUserData {
    UNIT: string;
  }
}
OBJECT_USER_DATA.UNIT = 'unit';

export interface RawUnitDescription<Rotation = string, Position = number[]> {
  unit: string;
  options: {
    accessible?: boolean;
    position: Position;
    rotation: Rotation;
    options: { [key: string]: unknown };
    moduleStates: { [key: string]: UnitModuleState };
    [key: string]: unknown;
  };
}
export type UnitDescription<
  Rotation = ROTATION,
  Position = Vector3
> = RawUnitDescription<Rotation, Position>;

export type UnitModuleList = (
  | typeof PlayerUnitModule
  | typeof RoomUnitModule
  | typeof MovementUnitModule
  | typeof SelectionUnitModule
  | typeof AnimationUnitModule
  | typeof PlacementUnitModule
)[];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UnitOptionsPlaceholder = {};
export type UnitOptions<OtherOptions = UnitOptionsPlaceholder> =
  OtherOptions & {
    rotationType?: ROTATION_TYPE;
    canPlaced?: boolean;
    canRotate?: boolean;
    hasControls?: boolean;
  };

export interface AnimatedUnit {
  // animation: UnitModule;
  animate: (deltaTime: number) => void;
}

export interface UnitConstructorOptions<
  Options extends UnitOptions = UnitOptions
> {
  name: string;
  selectable?: boolean;
  placeable?: boolean;
  accessible?: boolean;
  /**
   * Wenn gesetzt, kann die Unit nur an einer Wand platziert werden.
   */
  wallOnly?: boolean;
  position?: Vector3;
  size?: Vector3;
  rotation?: ROTATION;
  options?: Options;
  preview?: boolean;
  moduleStates?: { [key: string]: UnitModuleState };
}

export function getRotationByEuler(euler: Euler): ROTATION | null {
  if (euler.x === 0 && euler.y === 0 && euler.z === 0) {
    return null;
  }

  if (euler.x === Math.PI / 2) {
    return ROTATION.NORTH;
  } else if (euler.x === -Math.PI / 2) {
    return ROTATION.SOUTH;
  } else if (euler.y === Math.PI / 2) {
    return ROTATION.EAST;
  } else if (euler.y === -Math.PI / 2) {
    return ROTATION.WEST;
  }
  return null;
}

export function getRadByRotation(rotation: ROTATION): number {
  switch (rotation) {
    case ROTATION.WEST:
      return Math.PI;
    case ROTATION.NORTH_WEST:
      return (3 * Math.PI) / 4;
    case ROTATION.SOUTH_WEST:
      return -(3 * Math.PI) / 4;
    case ROTATION.EAST:
      return 0;
    case ROTATION.NORTH_EAST:
      return Math.PI / 4;
    case ROTATION.SOUTH_EAST:
      return -Math.PI / 4;
    case ROTATION.NORTH:
      return Math.PI / 2;
    case ROTATION.SOUTH:
      return -Math.PI / 2;
    default:
      return 0;
  }
}

export interface UnitModules {
  player: PlayerUnitModule;
  room?: RoomUnitModule;
  movement: MovementUnitModule;
  selection?: SelectionUnitModule;
  placement?: PlacementUnitModule;
}

export interface SetupContext {
  unit: Unit;
  assetLoader: AssetLoader;
  room?: Room;
}

export enum ACCESSIBLE_TYPE {
  UP = 'up',
  LEFT = 'left',
  RIGHT = 'right',
  DOWN = 'down'
}
export interface PreviewOptions {
  ground?: boolean;
}

export interface UnitObservables {
  ready$: ReplaySubject<Unit>;
  materialReady$: ReplaySubject<void>;
  position$: ReplaySubject<Vector3>;
  rotate$: ReplaySubject<ROTATION>;
}

export default class Unit<
  Options extends UnitOptions = UnitOptions,
  Modules extends UnitModules = UnitModules,
  ModuleList extends UnitModuleList = UnitModuleList,
  Observables extends UnitObservables = UnitObservables
> implements UnitChunking
{
  getFloor() {
    return getFloorFromPosition(this.getPosition());
  }
  debug = false;
  previewOptions: PreviewOptions = {};
  private preview = false;

  currentChunkKeys: string[] = [];

  static KEY = 'unit';
  static NAME = 'Unit';

  observables: Observables = {} as Observables;

  modules: Modules = {} as Modules;
  moduleList: ModuleList;

  assetLoader?: AssetLoader;

  subscription = new Subscription();
  options: Options = {
    hasControls: true,
    canPlaced: true,
    canRotate: true
  } as Options;
  root: Group;

  wallOnly: boolean;
  accessible: boolean | ACCESSIBLE_TYPE[];

  private _position: Vector3 = new Vector3(0, 0, 0);
  get position() {
    return this._position;
  }
  rotation: ROTATION = ROTATION.SOUTH;

  private size: Vector3 = new Vector3(1, 1, 1);
  private visible = true;
  private chunkVisible = true;

  get key(): string {
    return (this.constructor as typeof Unit).KEY;
  }

  equals(unit: Unit): boolean {
    return this.id === unit.id;
  }

  toDescription(): UnitDescription {
    const moduleStates = Object.fromEntries(
      Object.entries(this.modules).map(([key, module]) => {
        return [key, module.getState()];
      })
    );
    return {
      unit: this.key,
      options: {
        position: this._position.clone(),
        rotation: this.rotation,
        options: { ...this.options },
        moduleStates
      }
    };
  }

  toJSON(): UnitDescription {
    return this.toDescription();
  }

  constructor(
    {
      debug,
      name,
      selectable,
      placeable,
      wallOnly,
      accessible,
      position,
      size,
      rotation,
      options,
      preview,
      moduleStates
    }: UnitConstructorOptions<Options> & { debug?: boolean } = {
      name: 'Unit',
      moduleStates: {}
    },
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    //#region observables
    this.observables.ready$ = new ReplaySubject<Unit>(1);
    this.observables.materialReady$ = new ReplaySubject<void>(1);
    this.observables.position$ = new ReplaySubject<Vector3>(1);
    this.observables.rotate$ = new ReplaySubject<ROTATION>(1);
    //#endregion

    this.debug = debug ?? false;
    this.preview = preview ?? false;
    this.options = {
      ...this.options,
      ...(options || {})
    } as Options;

    this.size = size || this.size;
    this.wallOnly = wallOnly ?? false;
    this.accessible = accessible ?? false;

    //#region modules
    moduleList.push(PlayerUnitModule, RoomUnitModule, MovementUnitModule);
    if (selectable) {
      moduleList.push(SelectionUnitModule);
    }

    if (placeable) {
      moduleList.push(PlacementUnitModule);
    }

    this.moduleList = moduleList;

    const preparedModules = moduleList.map(ModuleClass => {
      const state = moduleStates?.[ModuleClass.TYPE] ?? {};
      const moduleInstance = new ModuleClass(
        this,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state as any,
        this.debug
      );
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);

    //#endregion

    this.root = this.setupRoot(name);

    this.setPosition(position ?? this._position);
    this.setRotation(
      rotation || getRotationByEuler(this.root.rotation) || ROTATION.SOUTH
    );
  }

  equal(unit: Unit) {
    return this.id === unit.id;
  }

  setupRoot(name: string) {
    const root = new Group();
    root.name = name;
    root.userData[OBJECT_USER_DATA.MAIN_OBJECT] = root.id;
    root.userData[OBJECT_USER_DATA.UNIT] = this;
    setMainObjectRecursive(root, root);
    return root;
  }

  addToRoot(object: Object3D) {
    this.root.add(object);
    setMainObjectRecursive(object, this.root);
  }

  destroy() {
    Object.values(this.observables).forEach(o =>
      (o as SubscriptionLike).unsubscribe()
    );
    this.subscription.unsubscribe();
    findAllMeshes(this.root).forEach(mesh => {
      disposeObject3D(mesh);
    });
    this.root.removeFromParent();
    this.root.remove();
  }

  canDelete() {
    return !this.modules.player.player;
  }

  get name() {
    return this.root.name;
  }

  get id() {
    return this.root.uuid;
  }

  isPreview() {
    return this.preview;
  }

  getScenePosition(): Vector3 {
    return this.getPosition().clone();
  }

  setScenePosition(position: Vector3) {
    this.root.position.copy(
      this.centerInTile(position).multiply(new Vector3(1, FLOOR_HEIGHT, 1))
    );
  }

  getRootRotation() {
    return this.root.rotation;
  }

  setRootRotation(rotation: Euler) {
    this.root.rotation.copy(rotation);
  }

  getBoundingBox() {
    return new Box3().setFromObject(this.root);
  }

  getPosition() {
    return this._position.clone();
  }

  setPosition(position: Vector3) {
    this._position.copy(position);
    this.setScenePosition(position.clone());
    this.updateMesh();
    this.observables.position$.next(this._position);
  }

  /**
   * Positioniert die Unit neu anhand der offset losen Position.
   * Wichtig zumbeispiel beim rotieren eines Großen objektes.
   */
  fixPosition() {
    this.setPosition(this.getPosition());
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

    this.fixPosition();
    this.observables.rotate$.next(rotation);
  }

  rotateLeft() {
    const directions =
      rotationDirections[this.options.rotationType || ROTATION_TYPE.BASIC];
    const length = directions.length;
    const index = (directions.indexOf(this.rotation) - 1 + length) % length;
    this.setRotation(directions[index]!);
  }
  rotateRight() {
    const directions =
      rotationDirections[this.options.rotationType || ROTATION_TYPE.BASIC];
    const length = directions.length;
    const index = (directions.indexOf(this.rotation) + 1) % length;
    this.setRotation(
      rotationDirections[this.options.rotationType || ROTATION_TYPE.BASIC][
        index
      ]!
    );
  }
  //#endregion

  centerInTile(position: Vector3) {
    let offset: Vector3 = new Vector3(0, 0, 0);
    switch (this.rotation) {
      case ROTATION.WEST:
        offset = new Vector3(-(this.size.z - 1) / 2, 0, (this.size.x - 1) / 2);
        break;
      case ROTATION.EAST:
        offset = new Vector3((this.size.z - 1) / 2, 0, (this.size.x - 1) / 2);
        break;
      case ROTATION.NORTH:
        offset = new Vector3((this.size.x - 1) / 2, 0, -(this.size.z - 1) / 2);
        break;
      case ROTATION.SOUTH:
        offset = new Vector3((this.size.x - 1) / 2, 0, (this.size.z - 1) / 2);
        break;
      default:
        offset = new Vector3(0, 0, 0);
        break;
    }
    return position.add(offset);
  }

  getSize() {
    return this.size.clone();
  }

  setSize(size: Vector3) {
    this.size = size.clone();
  }

  getMatrixPositions(): Vector3[] {
    const positions: Vector3[] = [];
    const pos = positionToMatrixPosition(this.getPosition());
    const size = this.size;

    for (let x = 0; x < size.x; x++) {
      for (let z = 0; z < size.z; z++) {
        let x_ = pos.x;
        if (ROTATION.NORTH === this.rotation) {
          x_ = x_ + x;
        } else if (ROTATION.WEST === this.rotation) {
          x_ = x_ - x;
        } else {
          x_ = x_ + x;
        }

        let z_ = pos.z;
        if (ROTATION.NORTH === this.rotation) {
          z_ = z_ - z;
        } else {
          z_ = z_ + z;
        }

        positions.push(new Vector3(x_, 0, z_));
      }
    }
    return positions;
  }

  async setup(context: SetupContext) {
    this.assetLoader = context.assetLoader;
    let mesh = await this.createMesh(context);

    const modules: UnitModule[] = Object.values(this.modules);

    // center unit in tile
    const position = this.centerInTile(
      matrixPositionToPosition(this._position)
    );

    this.root.position.copy(position);

    // Setup modules
    mesh = await modules.reduce((result, module) => {
      return result.then(mesh => module.setup({ mesh, ...context }));
    }, Promise.resolve(mesh));
    this.addToRoot(mesh);
    // Filter modules that have update method
    const updateModules = modules.filter(
      module => typeof module.update === 'function'
    );
    this._updateModules = updateModules;

    this.observables.ready$.next(this);
  }

  _updateModules: UnitModule[] = [];

  update(v: AnimationLoopValue) {
    this._updateModules.forEach(module => {
      module.update(v);
    });
  }

  getRotationByPosition(target: Vector3, diagonal = true) {
    const direction = target.clone().sub(this._position);
    direction.y = 0;
    return getRotationFromVector(direction, diagonal);
  }

  //#region visible
  isVisible() {
    return this.visible;
  }
  setVisible(visible: boolean) {
    this.visible = visible;
    this.setRootVisible();
  }
  setChunkVisible(visible: boolean) {
    this.chunkVisible = visible;
    this.setRootVisible();
  }

  private setRootVisible(visible = this.visible && this.chunkVisible) {
    this.root.visible = visible;
  }
  //#endregion

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createMesh(context: SetupContext): Promise<Object3D> {
    // Override in subclasses to create a mesh
    throw new Error('createMesh method must be implemented in subclasses');
  }

  /**
   * Wird aufgerufen, wenn sich die Position wechselt.
   * Beispiel: Regal an Wand.
   */
  updateMesh(): void {
    // Override in subclasses to update the mesh based on position/rotation/size changes
  }

  /**
   * @deprecated sollte weg
   */
  get mesh() {
    return this.root.getObjectByName(OBJECT_NAME.MESH) as Mesh;
  }

  /**
   * Kann überschrieben werden um die Meshes zu definieren, die für Raycaster genutzt werden.
   */
  getRaycasterMeshes(): Object3D[] {
    return findAllMeshes(this.root);
  }

  toString() {
    return `${(this.constructor as typeof Unit).NAME}(${this.name})(${this.id})`;
  }
}

function getRotationFromVector(direction: Vector3, diagonal = true) {
  const isHorizontal = Math.abs(direction.x) > Math.abs(direction.z);

  // Check for diagonal movement
  if (diagonal && direction.x !== 0 && direction.z !== 0) {
    if (direction.x > 0) {
      // Right
      return direction.z > 0 ? ROTATION.SOUTH_EAST : ROTATION.NORTH_EAST;
    } else {
      // Left
      return direction.z > 0 ? ROTATION.SOUTH_WEST : ROTATION.NORTH_WEST;
    }
  }

  // Fallback to cardinal directions
  if (isHorizontal) {
    return direction.x > 0 ? ROTATION.EAST : ROTATION.WEST;
  } else {
    return direction.z > 0 ? ROTATION.SOUTH : ROTATION.NORTH;
  }
}
