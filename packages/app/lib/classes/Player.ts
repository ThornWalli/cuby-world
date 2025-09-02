import type { Vector3 } from 'three';
import type Unit from './Unit';
import PlayerUnitModule from './unitModule/Player';
import { ReplaySubject } from 'rxjs';
import Cuby, { CUBY_COLOR as PLAYER_COLOR } from '@cuby-world/units/cuby/Cuby';

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

  id: string;
  name: string;
  color: PLAYER_COLOR;
  unit?: Unit;

  unit$ = new ReplaySubject<Unit>(1);

  constructor({ client, id, name, color }: PlayerConstructorOptions) {
    this._client = client ?? false;
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.color = color || PLAYER_COLOR.BLUE;
  }

  destroy() {
    this.unit?.destroy();
    this.unit$.unsubscribe();
  }

  setColor(color: PLAYER_COLOR) {
    this.color = color;
    if (this.unit instanceof Cuby) {
      this.unit.setColor(color);
    }
  }

  setUnit(unit: Unit) {
    this.unit = unit;
    if (PlayerUnitModule.TYPE in this.unit.modules) {
      this.unit.modules.player.setPlayer(this);
    }

    this.unit$.next(unit);
    console.log('Player unit set:', this.unit.name);
  }

  get position() {
    if (this.unit) {
      return this.unit.root.position;
    } else {
      throw new Error('Player unit is not set, cannot get position');
    }
  }

  set position(position: Vector3) {
    if (this.unit) {
      this.unit.setPosition(position);
    } else {
      throw new Error('Player unit is not set, cannot update position');
    }
  }

  moveTo(position: Vector3) {
    if (this.unit) {
      this.unit.modules.movement.moveTo(position);
    } else {
      throw new Error('Player unit is not set, cannot move to position');
    }
  }
}
