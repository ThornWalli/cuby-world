import {
  ReplaySubject,
  Subscription,
  switchMap,
  EMPTY,
  type SubscriptionLike
} from 'rxjs';

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
import InventoryAppModule from './appModule/Inventory';
import ShopAppModule from './appModule/Shop';
import TimeAppModule from './appModule/Time';
import LightAppModule from './appModule/Light';
import type { UnitIdentifier } from '../types/unit';
import type { Vector3 } from 'three';

const DEFAULT_TIMEZONE = 'UTC';

type AppModuleList = (
  | typeof CursorAppModule
  | typeof UnitFocusAppModule
  | typeof PlayerAppModule
  | typeof RoomAppModule
  | typeof SelectionAppModule
  | typeof PlacementAppModule
  | typeof MultiplayerAppModule
  | typeof InventoryAppModule
  | typeof ShopAppModule
  | typeof TimeAppModule
  | typeof LightAppModule
  // editor
  | typeof EditorWallAppModule
  | typeof EditorGroundAppModule
  | typeof EditorStairModule
)[];
interface AppModules {
  cursor: CursorAppModule;
  room: RoomAppModule;
  player: PlayerAppModule;
  unitFocus: UnitFocusAppModule;
  selection: SelectionAppModule;
  placement: PlacementAppModule;
  inventory: InventoryAppModule;
  shop: ShopAppModule;
  time: TimeAppModule;
  light: LightAppModule;
  // editor
  editorWall: EditorWallAppModule;
  editorGround: EditorGroundAppModule;
  editorStair: EditorStairModule;
}

interface AppObservables {
  mode$: ReplaySubject<APP_MODE>;
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

  observables: AppObservables = {
    mode$: new ReplaySubject<APP_MODE>(1)
  };

  state: AppState = {};

  subscription = new Subscription();

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
      PlacementAppModule,
      InventoryAppModule,
      ShopAppModule,
      TimeAppModule,
      LightAppModule
    );

    // editor
    moduleList.push(
      EditorWallAppModule,
      EditorGroundAppModule,
      EditorStairModule
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

    this.subscription.add(
      this.modules.room.observables.room$
        .pipe(
          switchMap(room => {
            if (room) {
              return this.modules.player.observables.addPlayer$;
            }
            return EMPTY;
          })
        )
        .subscribe(({ player, teleporterUnitId }) => {
          this.modules.room.addPlayer(player, teleporterUnitId);
        })
    );

    this.ready = true;
  }

  destroy() {
    this.subscription.unsubscribe();
    Object.values(this.observables).forEach(o =>
      (o as SubscriptionLike).unsubscribe()
    );
    this.roomSubscription?.unsubscribe();
    Object.values(this.modules).forEach(module => {
      module.destroy();
    });
    this.renderer.destroy();
  }

  resetCamera(position?: Vector3) {
    this.renderer.resetCamera(position);
  }

  async enterRoom(
    roomDescription: ImportRoomDescription,
    targetTeleporterUnitId?: UnitIdentifier
  ) {
    const { player: playerModule, room: roomModule } = this.modules;

    this.modules.room.removeRoom();

    await Promise.all(
      playerModule.getPlayers().map(player => player.recreateUnit())
    );

    const room = await this.loadRoom(roomDescription);

    this.modules.time.setTimezone(
      room.description.info.timezone ?? DEFAULT_TIMEZONE
    );

    playerModule.getPlayers().forEach(player => {
      if (player.client) {
        roomModule.addPlayer(player, targetTeleporterUnitId);
      } else {
        roomModule.addPlayer(player);
      }
    });

    console.log('Joining default room', room.id);
    if ('multiplayer' in this.modules) {
      const multiplayer = this.modules.multiplayer as MultiplayerAppModule;
      await multiplayer.joinRoom(room!.id, targetTeleporterUnitId);
    }
  }

  async loadRoom(roomDescription: ImportRoomDescription) {
    return this.modules.room.fromDescription(roomDescription);
  }

  isEditMode() {
    return this.config.mode === APP_MODE.EDITOR;
  }

  setMode(mode: APP_MODE) {
    this.config.mode = mode;
    this.observables.mode$.next(mode);
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
