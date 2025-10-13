import { FLOOR_HEIGHT } from '@cuby-world/app/lib/utils/ground';
import { ReplaySubject, Subscription } from 'rxjs';
import { Box3, Euler, Vector3, type Mesh } from 'three';
import { Object3D } from 'three';
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
import { ROTATION, ROTATION_TYPE } from '../types';
import { OBJECT_USER_DATA } from '../../lib/utils/objectMeta';

declare module '../../lib/utils/objectMeta' {
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
  position?: Vector3;
  size?: Vector3;
  rotation?: ROTATION;
  options?: Options;
  moduleState?: { [key: string]: UnitModuleState };
}

export const rotationDirections = {
  [ROTATION_TYPE.BASIC]: [
    ROTATION.WEST,
    ROTATION.NORTH,
    ROTATION.EAST,
    ROTATION.SOUTH
  ],
  [ROTATION_TYPE.EXTENDED]: [
    ROTATION.WEST,
    ROTATION.WEST_UP,
    ROTATION.WEST_DOWN,
    ROTATION.NORTH,
    ROTATION.EAST,
    ROTATION.EAST_UP,
    ROTATION.EAST_DOWN,
    ROTATION.SOUTH
  ]
};

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
    case ROTATION.WEST_UP:
      return (3 * Math.PI) / 4;
    case ROTATION.WEST_DOWN:
      return -(3 * Math.PI) / 4;
    case ROTATION.EAST:
      return 0;
    case ROTATION.EAST_UP:
      return Math.PI / 4;
    case ROTATION.EAST_DOWN:
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

export default class Unit<
  Options extends UnitOptions = UnitOptions,
  Modules extends UnitModules = UnitModules,
  ModuleList extends UnitModuleList = UnitModuleList
> implements UnitChunking
{
  debug = false;

  currentChunkKeys: string[] = [];

  static KEY = 'unit';
  static NAME = 'Unit';

  //#region subscriptions
  ready$ = new ReplaySubject<Unit>(1);
  materialReady$ = new ReplaySubject<void>(1);
  rotate$ = new ReplaySubject<ROTATION>(0);
  //#endregion

  modules: Modules = {} as Modules;
  moduleList: ModuleList;

  assetLoader?: AssetLoader;

  subscription = new Subscription();
  options: Options = {
    canPlaced: true,
    canRotate: true
  } as Options;
  root: Object3D;

  accessible: boolean | ACCESSIBLE_TYPE[];

  position$: ReplaySubject<Vector3> = new ReplaySubject(0);
  private _position: Vector3 = new Vector3(0, 0, 0);
  get position() {
    return this._position;
  }
  rotation: ROTATION = ROTATION.SOUTH;

  size: Vector3 = new Vector3(1, 1, 1);

  get key(): string {
    return (this.constructor as typeof Unit).KEY;
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
      accessible,
      position,
      size,
      rotation,
      options,
      moduleState
    }: UnitConstructorOptions<Options> & { debug?: boolean } = {
      name: 'Unit',
      moduleState: {}
    },
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    this.debug = debug ?? false;
    this.options = {
      ...this.options,
      ...(options || {})
    } as Options;

    this.size = size || this.size;
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
    console.log(moduleState);
    const preparedModules = moduleList.map(ModuleClass => {
      const state = moduleState?.[ModuleClass.TYPE] ?? {};
      const moduleInstance = new ModuleClass(this, state, this.debug);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);

    //#endregion

    this.root = this.createRoot(name);

    this.setPosition(position ?? this._position);
    this.setRotation(
      rotation || getRotationByEuler(this.root.rotation) || ROTATION.SOUTH
    );
  }

  equal(unit: Unit) {
    return this.id === unit.id;
  }

  createRoot(name: string) {
    const root = new Object3D();
    root.name = name;
    root.userData[OBJECT_USER_DATA.UNIT] = this;
    return root;
  }

  destroy() {
    this.position$.unsubscribe();
    this.rotate$.unsubscribe();
    this.ready$.unsubscribe();
    this.materialReady$.unsubscribe();
    this.subscription.unsubscribe();
    findAllMeshes(this.root).forEach(mesh => {
      mesh.geometry?.dispose();
    });
    this.root.removeFromParent();
    this.root.remove();
  }

  get name() {
    return this.root.name;
  }

  get id() {
    return this.root.uuid;
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
    this.setScenePosition(new Vector3(position.x, position.y, position.z));
    this.position$.next(this._position);
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

    this.fixPosition();
    this.rotate$.next(rotation);
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

    // Setup modules
    mesh = await modules.reduce((result, module) => {
      return result.then(mesh => module.setup({ mesh, ...context }));
    }, Promise.resolve(mesh));

    this.root.add(mesh);

    // center unit in tile
    const position = this.centerInTile(
      matrixPositionToPosition(this._position)
    );

    this.root.position.copy(position);

    // Filter modules that have update method
    const updateModules = modules.filter(
      module => typeof module.update === 'function'
    );
    this._updateModules = updateModules;

    this.ready$.next(this);
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
  getVisible() {
    return this.root.visible;
  }
  setVisible(visible: boolean) {
    this.root.visible = visible;
  }
  //#endregion

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createMesh(context: SetupContext): Promise<Object3D> {
    // Override in subclasses to create a mesh
    throw new Error('createMesh method must be implemented in subclasses');
  }

  get mesh() {
    return this.root.getObjectByName(OBJECT_NAME.MESH) as Mesh;
  }

  toString() {
    return `${(this.constructor as typeof Unit).NAME}(${this.name})(${this.id})`;
  }
}
export enum OBJECT_NAME {
  MESH = 'Mesh',
  MESH_OUTLINE = 'MeshOutline',
  MESH_ANIMATION = 'MeshAnimation',
  RAYCASTER = 'Raycaster'
}

function getRotationFromVector(direction: Vector3, diagonal = true) {
  const isHorizontal = Math.abs(direction.x) > Math.abs(direction.z);

  // Check for diagonal movement
  if (diagonal && direction.x !== 0 && direction.z !== 0) {
    if (direction.x > 0) {
      // Right
      return direction.z > 0 ? ROTATION.EAST_DOWN : ROTATION.EAST_UP;
    } else {
      // Left
      return direction.z > 0 ? ROTATION.WEST_DOWN : ROTATION.WEST_UP;
    }
  }

  // Fallback to cardinal directions
  if (isHorizontal) {
    return direction.x > 0 ? ROTATION.EAST : ROTATION.WEST;
  } else {
    return direction.z > 0 ? ROTATION.SOUTH : ROTATION.NORTH;
  }
}
