import {
  type Vector3,
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  Path,
  BoxGeometry
} from 'three';
import RoomModule, { type RoomModuleState } from '../RoomModule';
import { OBJECT_NAME } from '../Unit';

interface State extends RoomModuleState {
  selectionMesh?: Mesh;
}

export default class SelectionModule extends RoomModule<State> {
  static override TYPE = 'selection';

  state: State = {
    selectionMesh: undefined
  };

  override setup(): void {
    this.state.selectionMesh = createMesh();
    if (this.state.selectionMesh) {
      this.room.mesh.add(this.state.selectionMesh);
    }
  }

  setSelectionPosition(position: Vector3) {
    this.state.selectionMesh!.position.copy(position);
  }
}

function createMesh() {
  const size = 0.9;
  const outerShape = new Shape();
  const outerSize = size;
  outerShape.moveTo(-outerSize / 2, -outerSize / 2);
  outerShape.lineTo(outerSize / 2, -outerSize / 2);
  outerShape.lineTo(outerSize / 2, outerSize / 2);
  outerShape.lineTo(-outerSize / 2, outerSize / 2);
  outerShape.lineTo(-outerSize / 2, -outerSize / 2);

  const innerShape = new Path();
  const innerSize = size * (4 / 5);
  innerShape.moveTo(-innerSize / 2, -innerSize / 2);
  innerShape.lineTo(innerSize / 2, -innerSize / 2);
  innerShape.lineTo(innerSize / 2, innerSize / 2);
  innerShape.lineTo(-innerSize / 2, innerSize / 2);
  innerShape.lineTo(-innerSize / 2, -innerSize / 2);

  outerShape.holes.push(innerShape);

  const geometry = new ShapeGeometry(outerShape);
  geometry.translate(0, 0, 0.1);
  geometry.rotateX(-Math.PI / 2);
  const material = new MeshBasicMaterial({
    color: 0xffffff
  });
  const selectionMesh = new Mesh(geometry, material);
  selectionMesh.position.set(0, 0, 0);
  selectionMesh.add(extendMesh());
  return selectionMesh;
}

function extendMesh() {
  const geometry = new BoxGeometry(0.5, 1, 0.5);
  geometry.translate(0, 1 / 2, 0);
  const material = new MeshBasicMaterial({
    color: 0xffffff,
    depthWrite: false,
    visible: false
  });
  const mesh = new Mesh(geometry, material);
  mesh.name = OBJECT_NAME.RAYCASTER;
  mesh.userData = { ignoreSelect: true };
  return mesh;
}
