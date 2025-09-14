import type { Vector3 } from 'three';
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import type { AppModuleState, SceneSelectContext } from '../../AppModule';
import AppModule from '../../AppModule';
import type App from '../../App';
import { switchMap } from 'rxjs';
import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import type { WallDescription } from '../../Wall';
import { WALL_DIRECTION } from '../../Wall';
import { WALL_TYPE } from '../../RoomDescription';

interface State extends AppModuleState {
  action: WALL_ACTION;
}
export default class EditorWallModule extends AppModule<State> {
  static override TYPE = 'editorWall';

  state: State = {
    action: WALL_ACTION.NONE
  };

  creatorMesh: Mesh;

  constructor(app: App) {
    super(app);
    this.creatorMesh = createWallCreatorMesh();
  }

  override destroy(): void {
    this.stopEditing();
    this.creatorMesh.geometry.dispose();
    (this.creatorMesh.material as MeshBasicMaterial).dispose();
  }

  override setup(): void {
    this.subscription.add(
      this.app.modules.room.room$
        .pipe(switchMap(room => room!.modules.selection.position$))
        .subscribe(position => {
          this.onDrag(position);
          this.creatorMesh.position.copy(position);
        })
    );

    this.subscription.add(
      this.app.renderer.pointerUp$.subscribe(() => {
        this.stopDrag();
        console.log('pointer up', this.state.action);
      })
    );
  }

  setAction(action: WALL_ACTION) {
    const lastAction = this.state.action;
    if (lastAction === action) {
      return;
    }

    this.state.action = action;

    if (lastAction === WALL_ACTION.ADD_REMOVE) {
      this.stopEditing();
    }

    if (action === WALL_ACTION.ADD_REMOVE) {
      this.startEditing();
    }
  }

  private startEditing() {
    const room = this.app.modules.room.getRoom()!;
    room.modules.selection.hideSelection();
    console.log('start editing walls');

    room.mesh.add(this.creatorMesh);
  }

  private stopEditing() {
    const room = this.app.modules.room.getRoom()!;
    this.creatorMesh?.removeFromParent();
    room.modules.selection.showSelection();
  }

  override onSceneSelect({
    preparedPosition: { worldPosition }
  }: SceneSelectContext) {
    this.startDrag(worldPosition!);
    return this.state.action !== WALL_ACTION.NONE;
  }

  dragOptions: {
    startPosition?: Vector3;
    endPosition?: Vector3;
    position: Vector2;
    moving: boolean;
  } = {
    position: new Vector2(),
    moving: false
  };

  startDrag(position: Vector3) {
    this.dragOptions.startPosition = position;
    this.dragOptions.moving = true;
  }

  onDrag(position: Vector3) {
    if (!this.dragOptions.moving) {
      return;
    }
    this.dragOptions.endPosition = position;

    console.log(
      getWallsFromPositions(
        vector3ToVector2(this.dragOptions.startPosition!),
        vector3ToVector2(this.dragOptions.endPosition!)
      )
    );
  }

  stopDrag() {
    this.dragOptions.moving = false;
  }
}

function getWallsFromPositions(
  start: Vector2,
  end: Vector2
): WallDescription[] {
  const wallList: WallDescription[] = [];
  const diff = new Vector2().subVectors(end, start);
  const length = Math.abs(Math.ceil(diff.length()));
  const direction = getDirection(start, end);
  if (length >= 1 && direction) {
    const totalDirection = end.clone().sub(start);
    const stepVector = totalDirection.divideScalar(length - 1);
    for (let i = 0; i < length; i++) {
      const newVector = new Vector2()
        .copy(start)
        .add(stepVector.clone().multiplyScalar(i));
      wallList.push({
        type: WALL_TYPE.DEFAULT,
        direction,
        position: newVector,
        color: 0x00ffff
      });
    }
  }
  return wallList;
}

function vector3ToVector2(v: Vector3) {
  return new Vector2(v.x, v.z);
}

function getDirection(
  startPosition: Vector2,
  endPosition: Vector2
): WALL_DIRECTION | undefined {
  if (startPosition!.x === endPosition!.x) {
    return WALL_DIRECTION.VERTICAL;
  } else if (startPosition!.y === endPosition!.y) {
    return WALL_DIRECTION.HORIZONTAL;
  }
}

function createWallCreatorMesh() {
  const height = 2.5;
  const geometry = new BoxGeometry(0.15, height, 0.15);
  // geometry.rotateX(Math.PI / 2);

  geometry.translate(0, height / 2, 0);
  geometry.translate(-0.5, 0, -0.5);
  const material = new MeshBasicMaterial({
    color: 0x00ff00,
    opacity: 0.5,
    transparent: true,
    depthWrite: false
  });

  const mesh = new Mesh(geometry, material);
  // mesh.rotation.x = -Math.PI / 2;
  mesh.name = 'WallCreatorMesh';
  return mesh;
}
