import {
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  Path,
  BoxGeometry,
  Vector3
} from 'three';
import RoomModule, {
  type RoomModuleObservables,
  type RoomModuleState
} from '../RoomModule';
import { OBJECT_NAME } from '../Unit';
import type { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import type Room from '../Room';
import { FLOOR_HEIGHT } from '../../utils/ground';
import { OBJECT_USER_DATA } from '../../utils/objectMeta';

interface Observables extends RoomModuleObservables {
  selectionVisible$: ReplaySubject<boolean>;
  position$: Observable<Vector3>;
}

interface State extends RoomModuleState {
  position: Vector3;
  selectionMesh?: Mesh;
  visible: boolean;
}

export default class SelectionModule extends RoomModule<State, Observables> {
  static override TYPE = 'selection';

  state: State = {
    position: new Vector3(),
    selectionMesh: undefined,
    visible: true
  };

  private positionSubject = new ReplaySubject<Vector3>(0);

  constructor(room: Room, debug: boolean = false) {
    super(room, debug);
    //#region observables
    this.observables.selectionVisible$ = new ReplaySubject<boolean>(0);
    this.observables.position$ = this.positionSubject.pipe();
    //#endregion
  }

  override setup(): void {
    this.state.selectionMesh = createSelectionMesh();
    if (this.state.visible) {
      this.showSelection();
    }

    this.room.mesh.add(this.state.selectionMesh);
  }

  //#region getter/setters

  setSelectionPosition(position: Vector3) {
    this.state.position = position;
    this.positionSubject.next(position);
    if (this.state.visible) {
      this.state.selectionMesh!.position.copy(
        new Vector3(position.x, position.y * FLOOR_HEIGHT, position.z)
      );
    }
  }

  //#endregion

  //#region methods

  showSelection() {
    if (this.state.selectionMesh && !this.state.selectionMesh.visible) {
      this.state.selectionMesh.visible = true;
      this.observables.selectionVisible$.next(true);
    }
  }

  hideSelection() {
    if (this.state.selectionMesh && this.state.selectionMesh.visible) {
      this.state.selectionMesh.visible = false;
      this.observables.selectionVisible$.next(false);
    }
  }

  isSelectionVisible() {
    return this.state.selectionMesh?.visible;
  }

  //#endregion
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
  mesh.userData[OBJECT_USER_DATA.IGNORE_SELECT] = true;
  return mesh;
}
