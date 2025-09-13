import { Object3D, Vector2 } from 'three';
import type RoomDescription from './RoomDescription';
import type App from './App';
import RoomGrid from './RoomGrid';
import WallModule from './roomModule/Wall';
import GroundModule from './roomModule/Ground';
import SelectionMode from './roomModule/Selection';
import UnitsModule from './roomModule/Units';

type RoomModuleList = (
  | typeof WallModule
  | typeof GroundModule
  | typeof SelectionMode
  | typeof UnitsModule
)[];

interface RoomModules {
  wall: WallModule;
  ground: GroundModule;
  selection: SelectionMode;
  units: UnitsModule;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RoomState {}

export default class Room<Modules extends RoomModules = RoomModules> {
  debug = false;

  state: RoomState = {};
  modules: Modules;
  mesh = new Object3D();
  description?: RoomDescription;

  private _grid: RoomGrid;

  get grid() {
    return this._grid;
  }

  constructor(
    public app: App,
    grid: RoomGrid = new RoomGrid([], 0, 0),
    modules: RoomModuleList = []
  ) {
    modules.push(SelectionMode);
    modules.push(WallModule);
    modules.push(GroundModule);
    modules.push(UnitsModule);

    // #region Modules
    const preparedModules = modules.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this, this.debug);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    // #endregion

    this._grid = grid;
    this.mesh = new Object3D();
    this.mesh.name = 'room';
  }

  destroy() {
    Object.values(this.modules).forEach(module => {
      module.destroy();
    });
    this.app.renderer.scene.remove(this.mesh);
  }

  get gridSize() {
    return new Vector2(this.grid.width, this.grid.height);
  }

  update(time: number) {
    Object.values(this.modules).forEach(module => {
      module.update(time);
    });
  }

  updateThrottle(time: number) {
    Object.values(this.modules).forEach(module => {
      module.updateThrottle(time, { camera: this.app.renderer.camera });
    });
  }
}
