import type { Subscription } from 'rxjs';

import type Renderer from './Renderer';

import AssetLoader from './AssetLoader';
import UnitFocusAppModule from './appModule/UnitFocus';
import RoomAppModule from './appModule/Room';
import PlayerAppModule from './appModule/Player';
import SelectionAppModule from './appModule/Selection';
import PlacementAppModule from './appModule/Placement';
import MultiplayerAppModule from './appModule/Multiplayer';

type AppModuleList = (
  | typeof UnitFocusAppModule
  | typeof PlayerAppModule
  | typeof RoomAppModule
  | typeof SelectionAppModule
  | typeof PlacementAppModule
  | typeof MultiplayerAppModule
)[];
interface AppModules {
  room: RoomAppModule;
  player: PlayerAppModule;
  unitFocus: UnitFocusAppModule;
  selection: SelectionAppModule;
  placement: PlacementAppModule;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppState {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AppConfig {}

export class BaseApp<Modules extends AppModules = AppModules> {
  assetLoader = new AssetLoader();

  state: AppState = {};

  // #region room
  roomSubscription?: Subscription;
  // #endregion

  modules: Modules;

  ready = false;

  constructor(
    public config: AppConfig,
    public renderer: Renderer,
    modules: AppModuleList = []
  ) {
    modules.push(
      RoomAppModule,
      PlayerAppModule,
      UnitFocusAppModule,
      SelectionAppModule,
      PlacementAppModule
    );

    if (config.multiplayer?.enabled) {
      modules.push(MultiplayerAppModule);
    }

    // #region Modules
    const preparedModules = modules.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    // #endregion
  }

  async setup() {
    if (this.ready) return;

    await Promise.all(
      Object.values(this.modules).map(module => module.setup())
    );

    this.ready = true;
  }

  destroy() {
    this.roomSubscription?.unsubscribe();
  }

  resetCamera() {
    this.renderer.resetCamera();
  }
}

interface AppPlaygroundModules extends AppModules {
  player: PlayerAppModule;
  multiplayer?: MultiplayerAppModule;
}

export default class App extends BaseApp<AppPlaygroundModules> {}
