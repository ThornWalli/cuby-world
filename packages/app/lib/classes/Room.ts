import { Object3D, Vector2 } from 'three';
import type App from './App';
import RoomGrid from './RoomGrid';
import WallModule from './roomModule/Wall';
import GroundModule from './roomModule/Ground';
import SelectionMode from './roomModule/Selection';
import UnitsModule from './roomModule/Units';
import type { RoomDescription } from './RoomDescription';

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
  debug = true;

  state: RoomState = {};
  modules: Modules = {} as Modules;
  mesh = new Object3D();
  description: RoomDescription;
  grid: RoomGrid;

  constructor(
    public app: App,
    description: RoomDescription,
    protected moduleList: RoomModuleList = []
  ) {
    this.description = description;
    this.grid = new RoomGrid(description.grid);
    this.mesh = new Object3D();
    this.mesh.name = 'room';
  }

  async setupModules() {
    const moduleList = this.moduleList;
    moduleList.push(SelectionMode);
    moduleList.push(WallModule);
    moduleList.push(GroundModule);
    moduleList.push(UnitsModule);

    // #region editor

    // await Promise.all(
    //   [import('./roomModule/editor/Wall').then(m => m.default)].map(module => {
    //     moduleList.push(module);
    //   })
    // );

    // #endregion

    // #region Modules
    const preparedModules = moduleList.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this, this.debug);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    // #endregion
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

  updateThrottle500ms(time: number) {
    Object.values(this.modules).forEach(module => {
      module.updateThrottle500ms(time, { camera: this.app.renderer.camera });
    });
  }

  updateThrottle1Sec(time: number) {
    Object.values(this.modules).forEach(module => {
      module.updateThrottle1Sec(time, { camera: this.app.renderer.camera });
    });
  }

  toRoomDescription(): RoomDescription {
    const description = this.description!;
    const start = description.start!;

    return {
      id: description.id,
      info: {
        name: this.description?.info.name ?? '',
        description: this.description?.info.description ?? ''
      },
      grid: this.grid.toJSON(),
      start,
      walls: this.modules.wall.getWalls().map(wall => wall.toJSON()),
      units: this.modules.units
        .getUnits()
        .filter(unit => !unit.modules.player.player)
        .map(unit => unit.toJSON()),
      groundStyles: this.modules.ground.getGroundStyleMap().toGroundStyles()
    };
  }
}
