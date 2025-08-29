import type { Vector3 } from 'three';
import type Unit from './Unit';
import PlayerUnitModule from './unitModule/Player';

export default class Player {
  id: string;
  name: string;
  unit?: Unit;

  constructor({ id, name }: { id?: string; name: string }) {
    this.id = id || crypto.randomUUID();
    this.name = name;
  }

  setUnit(unit: Unit) {
    this.unit = unit;
    if (PlayerUnitModule.TYPE in this.unit.modules) {
      this.unit.modules.player.setPlayer(this);
    }

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
