import type { AppModuleObservables, AppModuleState } from '../../AppModule';
import AppModule from '../../AppModule';
import { STAIR_ACTION } from '@cuby-world/app/lib/types/editor';
import { ReplaySubject, Subscription } from 'rxjs';
import type App from '../../App';
import type { StairAction } from '@cuby-world/app/components/editor/panel/StairActions.vue';
import type AppModuleController from '../../AppModuleController';
import PlannerController from './stair/PlannerController';

interface Observables extends AppModuleObservables {
  currentController$: ReplaySubject<AppModuleController | null>;
}

interface State extends AppModuleState {
  action: StairAction;
}
export default class EditorStairModule extends AppModule<State, Observables> {
  static override TYPE = 'editorStair';

  currentController: AppModuleController | null = null;

  interactionSubscription = new Subscription();

  state: State = {
    action: {
      primary: STAIR_ACTION.NONE
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
    return this.state.action.primary !== STAIR_ACTION.NONE;
  }

  setAction(action: StairAction) {
    const { primary } = action;
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

    if (primary !== STAIR_ACTION.NONE) {
      if (primary === STAIR_ACTION.DEFAULT) {
        const controller = new PlannerController(this.app);
        this.currentController = controller;
        this.observables.currentController$.next(this.currentController);
      }
      this.currentController?.setup();
    }
  }
}
