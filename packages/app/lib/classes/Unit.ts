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

export type UnitModuleList =
  | typeof PlayerUnitModule
  | typeof MovementUnitModule
  | typeof SelectionUnitModule
  | typeof AnimationUnitModule
  | typeof PlacementUnitModule;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UnitOptionsPlaceholder = {};
export type UnitOptions<OtherOptions = UnitOptionsPlaceholder> =
  OtherOptions & {
    canPlaced?: boolean;
    canRotate?: boolean;
  };

export interface AnimatedUnit {
  // animation: UnitModule;
  animate: (deltaTime: number) => void;
}

export interface SelectableUnit {
  selectable?: boolean;
  select: () => void;
  unselect: () => void;
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
  rotation?: UNIT_ROTATION;
  options?: Options;
}

export enum UNIT_ROTATION {
  LEFT = 'left',
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down'
}

export const rotationDirections: UNIT_ROTATION[] = [
  UNIT_ROTATION.LEFT,
  UNIT_ROTATION.UP,
  UNIT_ROTATION.RIGHT,
  UNIT_ROTATION.DOWN
];

export function getRotationByEuler(euler: Euler): UNIT_ROTATION | null {
  if (euler.x === 0 && euler.y === 0 && euler.z === 0) {
    return null;
  }
  if (euler.x === Math.PI / 2) {
    return UNIT_ROTATION.UP;
  } else if (euler.x === -Math.PI / 2) {
    return UNIT_ROTATION.DOWN;
  } else if (euler.y === Math.PI / 2) {
    return UNIT_ROTATION.RIGHT;
  } else if (euler.y === -Math.PI / 2) {
    return UNIT_ROTATION.LEFT;
  }
  return null;
}

export function getRadByRotation(rotation: UNIT_ROTATION): number {
  switch (rotation) {
    case UNIT_ROTATION.LEFT:
      return Math.PI;
    case UNIT_ROTATION.RIGHT:
      return 0;
    case UNIT_ROTATION.UP:
      return Math.PI / 2;
    case UNIT_ROTATION.DOWN:
      return -Math.PI / 2;
    default:
      return 0;
  }
}

export interface UnitModules {
  player: PlayerUnitModule;
  movement: MovementUnitModule;
  selection?: SelectionUnitModule;
  placement?: PlacementUnitModule;
}

export interface SetupContext {
  unit: Unit;
  assetLoader: AssetLoader;
  room?: Room;
}

export default class Unit<
  Options extends UnitOptions = UnitOptions,
  Modules extends UnitModules = UnitModules
> {
  currentChunkKeys: string[] = [];
  static KEY = 'unit';
  static NAME = 'Unit';
  // #region subscriptions
  ready$ = new ReplaySubject<void>(1);
  materialReady$ = new ReplaySubject<void>(1);
  rotate$ = new ReplaySubject<UNIT_ROTATION>(0);
  // #endregion

  moduleDefinitions = [PlayerUnitModule];
  modules: Modules;

  room?: Room;
  subscription = new Subscription();
  options: Options = {
    canPlaced: true,
    canRotate: true
  } as Options;
  root: Object3D;

  accessible: boolean;

  position$: ReplaySubject<Vector3> = new ReplaySubject(0);
  private _position: Vector3 = new Vector3(0, 0, 0);
  rotation: UNIT_ROTATION = UNIT_ROTATION.DOWN;

  size: Vector3 = new Vector3(1, 1, 1);

  constructor(
    {
      name,
      selectable,
      placeable,
      accessible,
      position,
      size,
      rotation,
      options
    }: UnitConstructorOptions<Options> = {
      name: 'Unit'
    },
    modules: UnitModuleList[] = []
  ) {
    this.options = {
      ...this.options,
      ...(options || {})
    } as Options;

    this.size = size || this.size;
    this.accessible = accessible ?? false;

    modules.push(PlayerUnitModule);
    modules.push(MovementUnitModule);

    if (selectable) {
      modules.push(SelectionUnitModule);
    }

    if (placeable) {
      modules.push(PlacementUnitModule);
    }

    const preparedModules = modules.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);

    this.root = new Object3D();
    this.setPosition(position ?? this._position);
    this.setRotation(
      rotation || getRotationByEuler(this.root.rotation) || UNIT_ROTATION.DOWN
    );
    this.root.name = name;
    this.root.userData = {
      unit: this
    };
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
    this.root.position.copy(this.centerInTile(position));
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
    return this._position;
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

  // #region rotation

  setRotation(rotation: UNIT_ROTATION) {
    this.rotation = rotation;
    switch (rotation) {
      case UNIT_ROTATION.LEFT:
        this.setRootRotation(new Euler(0, Math.PI, 0));
        break;
      case UNIT_ROTATION.RIGHT:
        this.setRootRotation(new Euler(0, 0, 0));
        break;
      case UNIT_ROTATION.UP:
        this.setRootRotation(new Euler(0, Math.PI / 2, 0));
        break;
      case UNIT_ROTATION.DOWN:
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
    const directions = rotationDirections;
    const length = directions.length;
    const index = (directions.indexOf(this.rotation) - 1 + length) % length;
    this.setRotation(directions[index]!);
  }
  rotateRight() {
    const directions = rotationDirections;
    const length = directions.length;
    const index = (directions.indexOf(this.rotation) + 1) % length;
    this.setRotation(rotationDirections[index]!);
  }
  // #endregion

  centerInTile(position: Vector3) {
    let offset: Vector3 = new Vector3(0, 0, 0);
    switch (this.rotation) {
      case UNIT_ROTATION.LEFT:
        offset = new Vector3(-(this.size.z - 1) / 2, 0, (this.size.x - 1) / 2);
        break;
      case UNIT_ROTATION.RIGHT:
        offset = new Vector3((this.size.z - 1) / 2, 0, (this.size.x - 1) / 2);
        break;
      case UNIT_ROTATION.UP:
        offset = new Vector3((this.size.x - 1) / 2, 0, -(this.size.z - 1) / 2);
        break;
      case UNIT_ROTATION.DOWN:
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
        if (UNIT_ROTATION.UP === this.rotation) {
          x_ = x_ + x;
        } else if (UNIT_ROTATION.LEFT === this.rotation) {
          x_ = x_ - x;
        } else {
          x_ = x_ + x;
        }

        let z_ = pos.z;
        if (UNIT_ROTATION.UP === this.rotation) {
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
    this.room = context.room;
    let mesh = this.createMesh(context);

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

    this.ready$.next();
  }

  _updateModules: UnitModule[] = [];

  update(time: number) {
    this._updateModules.forEach(module => {
      module.update(time);
    });
  }

  // #region visible
  getVisible() {
    return this.root.visible;
  }
  setVisible(visible: boolean) {
    this.root.visible = visible;
  }
  // #endregion

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createMesh(context: SetupContext): Object3D {
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
  MESH_OUTLINE = 'MeshOutline'
}
