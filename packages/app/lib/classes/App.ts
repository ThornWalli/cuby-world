import type { Subscription } from 'rxjs';

import type Renderer from './Renderer';

import AssetLoader from './AssetLoader';
import CursorAppModule from './appModule/Cursor';
import UnitFocusAppModule from './appModule/UnitFocus';
import RoomAppModule from './appModule/Room';
import PlayerAppModule from './appModule/Player';
import SelectionAppModule from './appModule/Selection';
import PlacementAppModule from './appModule/Placement';
import MultiplayerAppModule from './appModule/Multiplayer';
import EditorWallAppModule from './appModule/editor/Wall';
import EditorGroundAppModule from './appModule/editor/Ground';
import type { ImportRoomDescription } from '../types/room';
import EditorStairModule from './appModule/editor/Stair';

type AppModuleList = (
  | typeof CursorAppModule
  | typeof UnitFocusAppModule
  | typeof PlayerAppModule
  | typeof RoomAppModule
  | typeof SelectionAppModule
  | typeof PlacementAppModule
  | typeof MultiplayerAppModule
)[];
interface AppModules {
  cursor: CursorAppModule;
  room: RoomAppModule;
  player: PlayerAppModule;
  unitFocus: UnitFocusAppModule;
  selection: SelectionAppModule;
  placement: PlacementAppModule;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppState {}

export enum APP_MODE {
  PLAYGROUND = 'playground',
  EDITOR = 'editor'
}

export interface AppConfig {
  mode?: APP_MODE;
}

export class BaseApp<
  Modules extends AppModules = AppModules,
  ModuleList extends AppModuleList = AppModuleList
> {
  assetLoader = new AssetLoader();

  state: AppState = {};

  //#region room
  roomSubscription?: Subscription;
  //#endregion

  modules: Modules = {} as Modules;
  moduleList: ModuleList;

  ready = false;

  constructor(
    public config: AppConfig,
    public renderer: Renderer,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(
      CursorAppModule,
      RoomAppModule,
      PlayerAppModule,
      UnitFocusAppModule,
      SelectionAppModule,
      PlacementAppModule
    );
    this.moduleList = moduleList;
  }

  async setup() {
    if (this.ready) return;

    //#region Modules
    const preparedModules = this.moduleList.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    //#endregion

    await Promise.all(
      Object.values(this.modules).map(module => module.setup())
    );

    this.ready = true;
  }

  destroy() {
    this.roomSubscription?.unsubscribe();
    Object.values(this.modules).forEach(module => {
      module.destroy();
    });
    this.renderer.destroy();
  }

  resetCamera() {
    this.renderer.resetCamera();
  }

  loadRoom(roomDescription: ImportRoomDescription) {
    return this.modules.room.fromDescription(roomDescription);
  }
}

interface AppPlaygroundModules extends AppModules {
  player: PlayerAppModule;
  multiplayer?: MultiplayerAppModule;
}

export default class App extends BaseApp<AppPlaygroundModules> {
  constructor(
    config: AppConfig,
    renderer: Renderer,
    modules: AppModuleList = []
  ) {
    if (config.multiplayer?.enabled) {
      modules.push(MultiplayerAppModule);
    }

    super(config, renderer, modules);
  }
}

interface AppEditorModules extends AppModules {
  editorWall: EditorWallAppModule;
  editorGround: EditorGroundAppModule;
  editorStair: EditorStairModule;
}

export class EditorApp extends BaseApp<
  AppEditorModules,
  (
    | typeof EditorWallAppModule
    | typeof EditorGroundAppModule
    | typeof EditorStairModule
  )[] &
    AppModuleList
> {
  constructor(
    config: AppConfig,
    renderer: Renderer,
    moduleList: (
      | typeof EditorWallAppModule
      | typeof EditorGroundAppModule
      | typeof EditorStairModule
    )[] &
      AppModuleList = []
  ) {
    moduleList.push(EditorWallAppModule);
    moduleList.push(EditorGroundAppModule);
    moduleList.push(EditorStairModule);

    super(config, renderer, moduleList);
  }
}
