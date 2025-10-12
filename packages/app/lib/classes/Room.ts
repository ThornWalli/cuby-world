import type { Vector2 } from 'three';
import { Object3D } from 'three';
import type App from './App';
import WallModule from './roomModule/Wall';
import GroundModule from './roomModule/Ground';
import SelectionMode from './roomModule/Selection';
import UnitsModule from './roomModule/Units';
import type { RoomDescription } from './RoomDescription';
import type { AnimationLoopValue } from './Renderer';
import RoofModule from './roomModule/Roof';
import FloorModule from './roomModule/Floor';
import StairModule from './roomModule/Stair';

type RoomModuleList = (
  | typeof WallModule
  | typeof RoofModule
  | typeof StairModule
  | typeof FloorModule
  | typeof GroundModule
  | typeof SelectionMode
  | typeof UnitsModule
)[];

interface RoomModules {
  wall: WallModule;
  roof: RoofModule;
  stair: StairModule;
  floor: FloorModule;
  ground: GroundModule;
  selection: SelectionMode;
  units: UnitsModule;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RoomState {}

export default class Room<Modules extends RoomModules = RoomModules> {
  debug = false;

  state: RoomState = {};
  modules: Modules = {} as Modules;
  mesh = new Object3D();
  description: RoomDescription;
  gridSize: Vector2;

  constructor(
    public app: App,
    description: RoomDescription,
    protected moduleList: RoomModuleList = []
  ) {
    this.description = description;
    this.gridSize = description.gridSize.clone();
    this.mesh = new Object3D();
    this.mesh.name = 'room';
  }

  async setupModules() {
    const moduleList = this.moduleList;
    moduleList.push(SelectionMode);
    moduleList.push(WallModule);
    moduleList.push(RoofModule);
    moduleList.push(StairModule);
    moduleList.push(FloorModule);
    moduleList.push(GroundModule);
    moduleList.push(UnitsModule);

    //#region editor

    //#endregion

    //#region Modules
    const preparedModules = moduleList.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this, this.debug);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    //#endregion
  }

  destroy() {
    Object.values(this.modules).forEach(module => {
      module.destroy();
    });
    this.app.renderer.scene.remove(this.mesh);
  }

  update(value: AnimationLoopValue) {
    Object.values(this.modules).forEach(module => {
      module.update(value);
    });
  }

  updateThrottle(value: AnimationLoopValue) {
    Object.values(this.modules).forEach(module => {
      module.updateThrottle(value, { camera: this.app.renderer.camera });
    });
  }

  updateThrottle500ms(value: AnimationLoopValue) {
    Object.values(this.modules).forEach(module => {
      module.updateThrottle500ms(value, { camera: this.app.renderer.camera });
    });
  }

  updateThrottle1Sec(value: AnimationLoopValue) {
    Object.values(this.modules).forEach(module => {
      module.updateThrottle1Sec(value, { camera: this.app.renderer.camera });
    });
  }

  toDescription(): RoomDescription {
    const description = this.description!;
    const start = description.start!;

    return {
      id: description.id,
      info: {
        name: this.description?.info.name ?? '',
        description: this.description?.info.description ?? ''
      },
      gridSize: this.gridSize,
      start,
      walls: this.modules.wall.getWalls().map(wall => wall.toDescription()),
      units: this.modules.units
        .getUnits()
        .filter(unit => !unit.modules.player.player)
        .map(unit => unit.toJSON()),
      groundStyles: this.modules.ground.getGroundStyleMap().toGroundStyles(),
      stairs: this.modules.stair.getStairs().map(stair => stair.toDescription())
    };
  }
}
