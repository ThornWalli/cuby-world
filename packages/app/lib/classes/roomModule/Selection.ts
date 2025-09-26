import {
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  Path,
  BoxGeometry,
  Vector3
} from 'three';
import RoomModule, { type RoomModuleState } from '../RoomModule';
import { OBJECT_NAME } from '../Unit';
import { ReplaySubject } from 'rxjs';

interface State extends RoomModuleState {
  position: Vector3;
  selectionMesh?: Mesh;
  visible: boolean;
}

export default class SelectionModule extends RoomModule<State> {
  static override TYPE = 'selection';

  state: State = {
    position: new Vector3(),
    selectionMesh: undefined,
    visible: true
  };

  selectionVisible$ = new ReplaySubject<boolean>(0);
  private positionSubject = new ReplaySubject<Vector3>(0);
  position$ = this.positionSubject.pipe();

  override setup(): void {
    this.state.selectionMesh = createSelectionMesh();
    if (this.state.visible) {
      this.showSelection();
    }
  }

  setSelectionPosition(position: Vector3) {
    this.state.position = position;
    this.positionSubject.next(position);
    if (this.state.visible) {
      this.state.selectionMesh!.position.copy(position);
    }
  }

  showSelection() {
    if (this.state.selectionMesh) {
      this.room.mesh.add(this.state.selectionMesh);
      this.state.selectionMesh.visible = true;
      this.selectionVisible$.next(true);
    }
  }

  hideSelection() {
    if (this.state.selectionMesh) {
      this.state.selectionMesh.removeFromParent();
      this.state.selectionMesh.visible = false;
      this.selectionVisible$.next(false);
    }
  }

  isSelectionVisible() {
    return this.state.selectionMesh?.visible;
  }
}

function createSelectionMesh() {
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
