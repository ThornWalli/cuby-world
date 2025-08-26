import type { Subscription } from 'rxjs';

import type Renderer from './Renderer';

import AssetLoader from './AssetLoader';
import UnitFocusAppModule from './appModule/UnitFocus';
import RoomAppModule from './appModule/Room';
import PlayerAppModule from './appModule/Player';
import SelectionAppModule from './appModule/Selection';

type AppModuleList = (
  | typeof UnitFocusAppModule
  | typeof PlayerAppModule
  | typeof RoomAppModule
  | typeof SelectionAppModule
)[];
interface AppModules {
  room: RoomAppModule;
  player: PlayerAppModule;
  unitFocus: UnitFocusAppModule;
  selection: SelectionAppModule;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppState {}

export default class App {
  texturePreloader = new AssetLoader();

  state: AppState = {};

  // #region room
  roomSubscription?: Subscription;
  // #endregion

  modules: AppModules;

  constructor(
    public renderer: Renderer,
    modules: AppModuleList = []
  ) {
    modules.push(
      RoomAppModule,
      PlayerAppModule,
      UnitFocusAppModule,
      SelectionAppModule
    );

    // #region Modules
    const preparedModules = modules.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    Object.values(this.modules).forEach(module => module.setup());
    // #endregion
  }

  destroy() {
    this.roomSubscription?.unsubscribe();
  }

  resetCamera() {
    this.renderer.resetCamera();
  }
}
