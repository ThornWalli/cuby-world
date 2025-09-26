import {
  type Vector3,
  BoxGeometry,
  MeshPhongMaterial,
  PlaneGeometry
} from 'three';
import GroundTile from '../GroundTile';

export default class EditModeGroundTile extends GroundTile {
  active: boolean = false;

  constructor({
    active,
    position,
    type
  }: {
    active: boolean;
    position: Vector3;
    type?: string;
  }) {
    super({ position, type: type ?? 'EditModeGroundTile' });
    this.active = active;
  }

  getColor() {
    return this.active ? 0x00ff00 : 0xcccccc;
  }

  override get plane() {
    const geometry = new PlaneGeometry(1, 1);
    geometry.rotateX(-Math.PI / 2);
    const material = new MeshPhongMaterial({ color: this.getColor() });
    return { geometry, material };
  }

  override get box() {
    const geometry = new BoxGeometry(1, 0.1, 1);
    geometry.translate(0, -0.05, 0);
    const material = new MeshPhongMaterial({ color: this.getColor() });
    return { geometry, material };
  }
}
