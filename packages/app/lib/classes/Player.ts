import type { Vector3 } from 'three';
import type Unit from './Unit';
import PlayerUnitModule from './unitModule/Player';
import { ReplaySubject, Subject } from 'rxjs';
import Cuby, { CUBY_COLOR as PLAYER_COLOR } from '@cuby-world/units/cuby/Cuby';

export interface PlayerSettings {
  name: string;
  color: PLAYER_COLOR;
}

export enum PLAYER_STATE {
  IDLE = 'idle',
  SLEEP_1 = 'sleep_1',
  SLEEP_2 = 'sleep_2',
  SPEAK_1 = 'speak_1',
  DEAD = 'dead'
}

export interface PlayerState {
  state: PLAYER_STATE;
  name: string;
  color: PLAYER_COLOR;
}

export interface PlayerConstructorOptions {
  client?: boolean;
  id?: string;
  name: string;
  color?: PLAYER_COLOR;
}

export { PLAYER_COLOR };
export default class Player {
  private _client: boolean = false;
  get client() {
    return this._client;
  }

  state: PlayerState;

  id: string;
  unit?: Unit;

  playerSettings$ = new Subject<PlayerSettings>();
  unit$ = new ReplaySubject<Unit>(1);

  constructor({ client, id, name, color }: PlayerConstructorOptions) {
    this._client = client ?? false;
    this.id = id || crypto.randomUUID();

    this.state = {
      state: PLAYER_STATE.IDLE,
      name,
      color: color || PLAYER_COLOR.BLUE
    };
  }

  destroy() {
    this.unit?.destroy();
    this.unit$.unsubscribe();

    this.playerSettings$.unsubscribe();
  }

  setUnit(unit: Unit) {
    this.unit = unit;
    if (PlayerUnitModule.TYPE in this.unit.modules) {
      this.unit.modules.player.setPlayer(this);
    }

    this.unit$.next(unit);
    console.log('Player unit set:', this.unit.name);
  }

  moveTo(position: Vector3) {
    if (this.unit) {
      this.unit.modules.movement.moveTo(position);
    } else {
      throw new Error('Player unit is not set, cannot move to position');
    }
  }

  setColor(color: PLAYER_COLOR) {
    this.state.color = color;
    if (this.unit instanceof Cuby) {
      this.unit.setColor(color);
    }
  }

  getSettings() {
    return {
      name: this.state.name,
      color: this.state.color
    };
  }

  setSettings(settings: Partial<PlayerState>) {
    if (settings.name !== undefined) {
      this.state.name = settings.name;
    }
    if (settings.color !== undefined) {
      this.setColor(settings.color);
    }
  }
}
