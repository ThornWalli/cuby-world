import { Object3D } from 'three';
import type Wall from './Wall';
import { Subscription, type SubscriptionLike } from 'rxjs';
import {
  OBJECT_USER_DATA,
  setMainObjectRecursive
} from '@cuby-world/app/lib/utils/object';
import type { WallExtensionSkinIdentifier } from '../types/wall/extension/skins';
import { AnimationWallExtensionModule } from './wallExtension/module/Animation';
import type WallExtensionModule from './WallExtensionModule';
import type { AnimationLoopValue } from './Renderer';

type WallExtensionModuleList = (typeof AnimationWallExtensionModule)[];

interface WallExtensionModules {
  animation: AnimationWallExtensionModule;
}

declare module '@cuby-world/app/lib/utils/object' {
  interface ObjectUserData {
    WALL_EXTENSION: string;
    WALL_EXTENSION_WALL: string;
  }
}

OBJECT_USER_DATA.WALL_EXTENSION = 'wallExtension';
OBJECT_USER_DATA.WALL_EXTENSION_WALL = 'wallExtensionWall';

export enum WALL_EXTENSION_TYPE {
  DOOR = 'door',
  WINDOW = 'window',
  DECORATION = 'decoration'
}

export interface WallExtensionDescription<
  State extends WallExtensionState = WallExtensionState
> {
  key: string;
  state?: State;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type WallExtensionObservables = {};

export type WallExtensionState = {
  skin: WallExtensionSkinIdentifier;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default class WallExtension<
  State extends WallExtensionState = WallExtensionState,
  Observables extends WallExtensionObservables = WallExtensionObservables,
  Modules extends WallExtensionModules = WallExtensionModules
> {
  update(context: AnimationLoopValue): void {
    Object.values(this.modules).forEach(module => {
      module.update(context);
    });
  }
  debug: boolean = false;
  id: string = crypto.randomUUID();

  /**
   * Der Typ muss eindeutig sein und dem Muster "<Kategorie>_<Name>" folgen, z.B. "door_default"
   */
  static KEY: string;
  static TYPE: WALL_EXTENSION_TYPE;

  private enabled = true;

  modules: Modules = {} as Modules;

  observables: Observables = {} as Observables;

  wall: Wall;
  state: State = {} as State;
  root: Object3D = new Object3D();

  subscription = new Subscription();
  private visible = true;

  constructor(
    { wall, state }: { wall: Wall; state?: State },
    protected moduleList: WallExtensionModuleList = []
  ) {
    this.wall = wall;
    if (state) {
      this.state = state;
    }
    this.setupModules();
  }

  private setupModules() {
    const moduleList = this.moduleList;
    moduleList.push(AnimationWallExtensionModule);

    //#region Modules
    const preparedModules = moduleList.map(ModuleClass => {
      const moduleInstance = new ModuleClass(this, this.debug);
      return [ModuleClass.TYPE, moduleInstance];
    });
    this.modules = Object.fromEntries(preparedModules);
    //#endregion
  }

  destroy() {
    Object.values(this.observables).forEach(o =>
      (o as SubscriptionLike).unsubscribe()
    );
    this.subscription.unsubscribe();
    this.root.parent?.remove(this.root);
    this.root.remove();
  }

  getPosition() {
    return this.wall.position.clone();
  }

  createMesh() {
    return Promise.resolve(new Object3D());
  }

  async setup() {
    let mesh = await this.createMesh();

    this.setupRoot();

    const modules: WallExtensionModule[] = Object.values(this.modules);

    // Setup modules
    mesh = await modules.reduce((result, module) => {
      return result.then(mesh => module.setup({ mesh }));
    }, Promise.resolve(mesh));
    this.addToRoot(mesh);
  }

  private setupRoot() {
    this.root.name = `WallExtension(${this.type})`;
    this.root.visible = this.enabled && this.visible;
    this.root.userData[OBJECT_USER_DATA.WALL_EXTENSION] = this.id;
    this.root.userData[OBJECT_USER_DATA.WALL_EXTENSION_WALL] = this.wall.id;
    setMainObjectRecursive(this.root, this.root);
  }

  addToRoot(object: Object3D) {
    this.root.add(object);
    setMainObjectRecursive(object, this.root);
  }

  get key(): string {
    return (this.constructor as typeof WallExtension).KEY;
  }
  get type(): WALL_EXTENSION_TYPE {
    return (this.constructor as typeof WallExtension).TYPE;
  }

  isEnabled() {
    return this.enabled;
  }

  enable() {
    this.enabled = true;
    this.root.visible = true;
  }

  disable() {
    this.enabled = false;
    this.root.visible = false;
  }

  isVisible() {
    return this.visible;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.root.visible = this.enabled && visible;
  }
}
