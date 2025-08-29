import {
  type Vector3,
  BoxGeometry,
  MeshPhongMaterial,
  PlaneGeometry
} from 'three';

export default class GroundTile {
  position: Vector3;
  type: string = 'GroundTile';

  constructor(position: Vector3) {
    this.position = position;
  }

  get plane() {
    const geometry = new PlaneGeometry(1, 1);
    geometry.rotateX(-Math.PI / 2);
    const material = new MeshPhongMaterial({ color: 0xcccccc });
    return { geometry, material };
  }

  get box() {
    const geometry = new BoxGeometry(1, 0.1, 1);
    geometry.translate(0, -0.05, 0);
    const material = new MeshPhongMaterial({ color: 0xcccccc });
    return { geometry, material };
  }
}
