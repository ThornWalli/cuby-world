import { ReplaySubject, Subscription } from 'rxjs';
import { Euler, Vector3, type Mesh } from 'three';
import { Object3D } from 'three';
import type Room from './Room';
import MovementUnitModule from './unitModule/Movement';
import PlayerUnitModule from './unitModule/Player';
import type UnitModule from './UnitModule';
import type AssetLoader from './AssetLoader';
import SelectionUnitModule from './unitModule/Selection';
import { matrixPositionToPosition } from '../utils/matrix';
import type { AnimationUnitModule } from './unitModule/Animation';

export type UnitModuleList =
  | typeof PlayerUnitModule
  | typeof MovementUnitModule
  | typeof SelectionUnitModule
  | typeof AnimationUnitModule;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type UnitOptions = {};

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
  position?: Vector3;
  rotation?: UNIT_ROTATION;
  options?: Options;
}

export enum UNIT_ROTATION {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}

export const rotationDirections: UNIT_ROTATION[] = [
  UNIT_ROTATION.LEFT,
  UNIT_ROTATION.UP,
  UNIT_ROTATION.RIGHT,
  UNIT_ROTATION.DOWN
];

function getRotationByEuler(euler: Euler): UNIT_ROTATION | null {
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

export interface UnitModules {
  player: PlayerUnitModule;
  movement: MovementUnitModule;
  selection?: SelectionUnitModule;
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
  options: Options = {} as Options;
  root: Object3D;

  position: Vector3;
  rotation: UNIT_ROTATION = UNIT_ROTATION.DOWN;

  constructor(
    {
      name,
      selectable,
      position,
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

    modules.push(PlayerUnitModule);
    modules.push(MovementUnitModule);
    if (selectable) {
      modules.push(SelectionUnitModule);
    }

    const preparedModules = modules.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);

    this.root = new Object3D();
    this.position = position || new Vector3(0, 0, 0);
    this.setRotation(
      rotation || getRotationByEuler(this.root.rotation) || UNIT_ROTATION.DOWN
    );
    this.root.name = name;
    this.root.userData = {
      unit: this
    };
  }

  destroy() {
    this.subscription.unsubscribe();
    this.mesh.geometry?.dispose();
    this.mesh.remove();
  }

  get name() {
    return this.root.name;
  }

  get id() {
    return this.root.uuid;
  }

  getRootPosition(): Vector3 {
    return this.root.position;
  }

  setRootPosition(position: Vector3) {
    this.root.position.copy(position);
  }

  getRootRotation() {
    return this.root.rotation;
  }

  setRootRotation(rotation: Euler) {
    this.root.rotation.copy(rotation);
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

  async setup(context: SetupContext) {
    this.room = context.room;
    let mesh = this.createMesh(context);

    const modules: UnitModule[] = Object.values(this.modules);

    // Setup modules
    mesh = await modules.reduce((result, module) => {
      return result.then(mesh => module.setup({ mesh, ...context }));
    }, Promise.resolve(mesh));

    this.root.add(mesh);
    this.root.position.copy(matrixPositionToPosition(this.position));

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createMesh(context: SetupContext): Object3D {
    // Override in subclasses to create a mesh
    throw new Error('createMesh method must be implemented in subclasses');
  }

  get mesh() {
    return this.root.getObjectByName(OBJECT_NAME.MESH) as Mesh;
  }
}
export enum OBJECT_NAME {
  MESH = 'Mesh',
  MESH_OUTLINE = 'MeshOutline'
}
