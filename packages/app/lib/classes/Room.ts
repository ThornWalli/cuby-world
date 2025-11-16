import type { Vector2 } from 'three';
import { Object3D } from 'three';
import type App from './App';
import WallModule from './roomModule/Wall';
import GroundModule from './roomModule/Ground';
import SelectionMode from './roomModule/Selection';
import UnitsModule from './roomModule/Units';
import type { RoomDescription } from '../types/room';
import type { AnimationLoopValue } from './Renderer';
import RoofModule from './roomModule/Roof';
import FloorModule from './roomModule/Floor';
import StairModule from './roomModule/Stair';

type RoomModuleList = (
  | typeof GroundModule
  | typeof WallModule
  | typeof StairModule
  | typeof RoofModule
  | typeof FloorModule
  | typeof SelectionMode
  | typeof UnitsModule
)[];

interface RoomModules {
  ground: GroundModule;
  wall: WallModule;
  stair: StairModule;
  roof: RoofModule;
  floor: FloorModule;
  selection: SelectionMode;
  units: UnitsModule;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RoomState {}

export default class Room<Modules extends RoomModules = RoomModules> {
  debug = false;

  state: RoomState = {};
  modules: Modules = {} as Modules;
  root: Object3D;
  description: RoomDescription;
  gridSize: Vector2;

  constructor(
    public app: App,
    description: RoomDescription,
    protected moduleList: RoomModuleList = []
  ) {
    this.description = description;
    this.gridSize = description.gridSize.clone();
    this.root = new Object3D();
    this.root.name = 'room';
  }

  async setupModules() {
    const moduleList = this.moduleList;
    moduleList.push(GroundModule);
    moduleList.push(WallModule);
    moduleList.push(SelectionMode);
    moduleList.push(StairModule);
    moduleList.push(UnitsModule);
    moduleList.push(FloorModule);
    moduleList.push(RoofModule);

    //#region Modules
    const preparedModules = moduleList.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this, this.debug);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    //#endregion
  }

  destroy() {
    this.app.renderer.scene.remove(this.root);
    Object.values(this.modules).forEach(module => module.destroy());
  }

  get id() {
    return this.description.id;
  }

  addToRoot(object: Object3D) {
    this.root.add(object);
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
    return {
      id: description.id,
      info: {
        name: this.description?.info.name ?? '',
        description: this.description?.info.description ?? ''
      },
      gridSize: this.gridSize,
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
