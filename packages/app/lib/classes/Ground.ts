import {
  type Texture,
  type Vector3,
  BoxGeometry,
  MeshPhongMaterial,
  PlaneGeometry
} from 'three';

export default class Ground {
  position: Vector3;
  type: string = 'default';
  color: string | number = '#cccccc';
  texture: Texture | null | undefined = undefined;

  get identifier() {
    return `${this.type}_${this.color}_${this.texture?.id}`;
  }

  constructor({
    position,
    type,
    color,
    texture
  }: {
    position: Vector3;
    type?: string;
    color?: string | number;
    texture?: Texture | null;
  }) {
    this.position = position;
    this.type = type ?? this.type;
    this.color = color ?? this.color;
    this.texture = texture ?? this.texture;
  }

  get plane() {
    const geometry = new PlaneGeometry(1, 1);
    geometry.rotateX(-Math.PI / 2);
    const material = new MeshPhongMaterial({
      color: this.color,
      map: this.texture ?? null
    });
    return { geometry, material };
  }

  get box() {
    const geometry = new BoxGeometry(1, 0.1, 1);
    geometry.translate(0, -0.05, 0);
    const material = new MeshPhongMaterial({
      color: this.color,
      map: this.texture ?? null
    });
    return { geometry, material };
  }
}
