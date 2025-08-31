import type { Vector3 } from 'three';
import type Unit from './Unit';
import PlayerUnitModule from './unitModule/Player';
import { ReplaySubject } from 'rxjs';

export default class Player {
  private _client: boolean = false;
  get client() {
    return this._client;
  }

  id: string;
  name: string;
  unit?: Unit;

  unit$ = new ReplaySubject<Unit>(1);

  constructor({
    client,
    id,
    name
  }: {
    client?: boolean;
    id?: string;
    name: string;
  }) {
    this._client = client ?? false;
    this.id = id || crypto.randomUUID();
    this.name = name;
  }

  destroy() {
    this.unit?.destroy();
    this.unit$.unsubscribe();
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
