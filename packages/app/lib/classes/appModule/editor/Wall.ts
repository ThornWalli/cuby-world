import type { WallAction } from '@cuby-world/app/components/editor/panel/WallActions.vue';
import type { AppModuleObservables, AppModuleState } from '../../AppModule';
import AppModule from '../../AppModule';
import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import MasonController, { MASON_MODE } from './wall/MasonController';
import type App from '../../App';
import { ReplaySubject } from 'rxjs';
import type AppModuleController from '../../AppModuleController';
import PainterController from './wall/PainterController';
import DoorController from './wall/DoorController';
import WindowController from './wall/WindowController';

interface Observables extends AppModuleObservables {
  currentController$: ReplaySubject<AppModuleController | null>;
}

interface State extends AppModuleState {
  action: WallAction;
}
export default class EditorWallModule extends AppModule<State, Observables> {
  static override TYPE = 'editorWall';

  currentController: AppModuleController | null = null;

  state: State = {
    action: {
      primary: WALL_ACTION.NONE
    }
  };

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.currentController$ =
      new ReplaySubject<AppModuleController | null>(0);
    //#endregion
  }

  override onSceneSelect() {
    return this.state.action.primary !== WALL_ACTION.NONE;
  }

  setAction(action: WallAction) {
    const { primary, secondary } = action;
    const lastAction = this.state.action;

    if (lastAction.primary === primary) {
      return;
    }

    this.state.action = action;

    // remove current controller if action changed
    if (lastAction.primary !== action.primary && this.currentController) {
      this.currentController.destroy();
      this.currentController = null;
      this.observables.currentController$.next(this.currentController);
    }

    if (primary !== WALL_ACTION.NONE) {
      if (primary === WALL_ACTION.MODE_MASON) {
        const mode =
          secondary === MASON_MODE.ADD ? MASON_MODE.ADD : MASON_MODE.REMOVE;
        const controller = new MasonController(this.app, mode);
        this.currentController = controller;
        this.observables.currentController$.next(this.currentController);
      } else if (primary === WALL_ACTION.MODE_PAINTER) {
        const controller = new PainterController(this.app);
        this.currentController = controller;
        this.observables.currentController$.next(this.currentController);
      } else if (primary === WALL_ACTION.MODE_DOOR) {
        const controller = new DoorController(this.app);
        this.currentController = controller;
        this.observables.currentController$.next(this.currentController);
      } else if (primary === WALL_ACTION.MODE_WINDOW) {
        const controller = new WindowController(this.app);
        this.currentController = controller;
        this.observables.currentController$.next(this.currentController);
      }
      this.currentController?.setup();
    }
  }

  //#endregion
}
