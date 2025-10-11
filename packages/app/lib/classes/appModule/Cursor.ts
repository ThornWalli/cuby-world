import type { Observable } from 'rxjs';
import { distinctUntilChanged, ReplaySubject } from 'rxjs';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import type App from '../App';

export enum CURSOR_TYPE {
  DEFAULT = 'default',
  POINTER = 'pointer',
  MOVE = 'move'
}
export interface Cursor {
  type: CURSOR_TYPE;
  src?: string;
}

interface Observables extends AppModuleObservables {
  current$: Observable<Cursor>;
}

interface State extends AppModuleState {
  current: Cursor;
}
export default class CursorAppModule extends AppModule<State, Observables> {
  static override TYPE = 'cursor';

  state: State = {
    current: getDefaultCursor()
  };

  private currentSubject = new ReplaySubject<Cursor>(0);

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.current$ = this.currentSubject.pipe(
      distinctUntilChanged((prev, current) => current.type === prev.type)
    );
    //#endregion
  }

  setCursor(type?: CURSOR_TYPE) {
    if (type) {
      this.state.current = getDefaultCursor(type);
      this.currentSubject.next(this.state.current);
    } else {
      this.resetCursor();
    }
  }

  resetCursor() {
    this.state.current = getDefaultCursor();
    this.currentSubject.next(this.state.current);
  }
}

function getDefaultCursor(type: CURSOR_TYPE = CURSOR_TYPE.DEFAULT): Cursor {
  switch (type) {
    case CURSOR_TYPE.POINTER:
      return {
        type: CURSOR_TYPE.POINTER
      };
    case CURSOR_TYPE.MOVE:
      return {
        type: CURSOR_TYPE.MOVE,
        src: 'move'
      };
    default:
      return {
        type: CURSOR_TYPE.DEFAULT
      };
  }
}
