import type { WallDescription } from '../../Wall';
import type { Object3D, Vector3 } from 'three';
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import type { AppModuleState, SceneSelectContext } from '../../AppModule';
import AppModule from '../../AppModule';
import type App from '../../App';
import { debounceTime, filter, map, Subject, switchMap } from 'rxjs';
import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import type Wall from '../../Wall';
import { WALL_DIRECTION } from '../../Wall';
import { WALL_TYPE } from '../../RoomDescription';
import { prepareForRaycast } from '@cuby-world/app/lib/utils/raycast';

interface State extends AppModuleState {
  action: WALL_ACTION;
}
export default class EditorWallModule extends AppModule<State> {
  static override TYPE = 'editorWall';

  state: State = {
    action: WALL_ACTION.NONE
  };

  creatorMesh: Mesh;

  hoverObject$ = new Subject<{
    current: Object3D | null;
    last: Object3D | null;
  }>();
  selectObject$ = new Subject<{
    current: Object3D | null;
    last: Object3D | null;
  }>();

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
        .pipe(
          filter(Boolean),
          switchMap(room => room!.modules.selection.position$),
          map(position => position.clone().ceil()),
          debounceTime(50)
        )
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

    this.subscription.add(
      this.selectObject$.subscribe(({ current }) => {
        const wall = this.getWallFromObject(current!)!;
        if (this.state.action === WALL_ACTION.DOOR && wall) {
          wall.setType(
            wall.state.type === WALL_TYPE.DEFAULT
              ? WALL_TYPE.DOOR
              : WALL_TYPE.DEFAULT
          );
        } else if (current && current.parent!.name === MESH_WALL_CREATOR) {
          this.startDrag();
        }
      })
    );

    this.subscription.add(
      this.hoverObject$.subscribe(({ current }) => {
        if (this.lastWall !== current?.parent?.userData.wall) {
          this.lastWall?.setTmpType();
          if (current?.parent?.userData.wall) {
            const wall = current?.parent?.userData.wall as Wall;
            this.lastWall = wall;
            wall.setTmpType(
              wall.state.type === WALL_TYPE.DEFAULT
                ? WALL_TYPE.DOOR
                : WALL_TYPE.DEFAULT
            );
          }
        }
      })
    );
  }
  changeColor() {
    const action = this.state.action;
    if (this.dragOptions.moving) {
      (this.creatorMesh.material as MeshBasicMaterial).color.set(0xffa500);
    } else if (action === WALL_ACTION.ADD) {
      (this.creatorMesh.material as MeshBasicMaterial).color.set(0x00ff00);
    } else if (action === WALL_ACTION.REMOVE) {
      (this.creatorMesh.material as MeshBasicMaterial).color.set(0xff0000);
    }
  }

  setAction(action: WALL_ACTION) {
    const lastAction = this.state.action;
    if (lastAction === action) {
      return;
    }

    this.state.action = action;

    this.changeColor();

    if (lastAction === WALL_ACTION.ADD || lastAction === WALL_ACTION.REMOVE) {
      this.stopEditing();
    }

    if (action === WALL_ACTION.ADD || action === WALL_ACTION.REMOVE) {
      this.startEditing();
    }
  }

  setColor(_color: string) {
    alert('Not implemented yet');
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

  lastObject: Object3D | null = null;
  lastWall: Wall | null = null;
  lastType: WALL_TYPE | null = null;

  override onSceneHover({ preparedPositions }: SceneSelectContext) {
    if (this.state.action === WALL_ACTION.DOOR) {
      const object = preparedPositions[0]?.object;
      if (object !== this.lastObject) {
        this.hoverObject$.next({
          current: object ?? null,
          last: this.lastObject
        });
        this.lastObject = object ?? null;
      }
    }

    // if (object && object.parent!.name === MESH_WALL_CREATOR) {
    //   this.startDrag();
    // }
  }

  getWallFromObject(object: Object3D): Wall | null {
    if (object.parent?.userData.wall) {
      return object.parent.userData.wall as Wall;
    }
    return null;
  }

  private _lastObject: Object3D | null = null;
  override onSceneSelect({ preparedPositions }: SceneSelectContext) {
    const object = preparedPositions[0]?.object;

    this.selectObject$.next({
      current: object ?? null,
      last: this._lastObject
    });
    this._lastObject = object ?? null;

    return this.state.action !== WALL_ACTION.NONE;
  }

  wallDescriptions: WallDescription[] = [];
  dragOptions: {
    startPosition?: Vector3;
    endPosition?: Vector3;
    position: Vector2;
    moving: boolean;
    added: boolean;
  } = {
    position: new Vector2(),
    moving: false,
    added: true
  };

  startDrag() {
    this.dragOptions.startPosition = this.lastPosition;
    this.dragOptions.moving = true;
    this.changeColor();

    this.app.renderer.disableControls();
  }

  stopDrag() {
    if (this.state.action === WALL_ACTION.ADD) {
      this.app.modules.room
        .getRoom()!
        .modules.wall.addedWalls(this.wallDescriptions);
    } else if (this.state.action === WALL_ACTION.REMOVE) {
      this.app.modules.room
        .getRoom()!
        .modules.wall.removeWallsByDescriptions(this.wallDescriptions);
    }
    this.wallDescriptions = [];
    this.dragOptions.moving = false;
    this.changeColor();
  }

  lastPosition?: Vector3;
  onDrag(position: Vector3) {
    if (this.dragOptions.moving) {
      if (
        this.state.action === WALL_ACTION.ADD ||
        this.state.action === WALL_ACTION.REMOVE
      ) {
        this.wallDescriptions = [];

        this.dragOptions.endPosition = position;

        const wallDescriptions = getWallsFromPositions(
          vector3ToVector2(this.dragOptions.startPosition!),
          vector3ToVector2(this.dragOptions.endPosition!)
        );

        if (this.state.action === WALL_ACTION.ADD) {
          this.app.modules.room
            .getRoom()!
            .modules.wall.addedWalls(wallDescriptions);
        } else {
          this.app.modules.room
            .getRoom()!
            .modules.wall.removeWallsByDescriptions(wallDescriptions);
        }
        this.wallDescriptions = wallDescriptions;
      }
    }

    this.lastPosition = position;
  }
}

function getWallsFromPositions(
  start: Vector2,
  end: Vector2
): WallDescription[] {
  const wallList: WallDescription[] = [];

  if (start.x === end.x || start.y === end.y) {
    const isNorth = start.x === end.x && start.y > end.y;
    const isWest = start.y === end.y && start.x > end.x;

    const direction = getDirection(start, end)!;

    const originLength = Math.abs(
      new Vector2().subVectors(end, start).ceil().length()
    );

    if (originLength < 1 || !direction) {
      return wallList;
    }

    const startPosition = start.clone();
    const endPosition = end.clone();
    if (isNorth) {
      startPosition.y--;
    } else if (isWest) {
      startPosition.x--;
    }
    const diff = new Vector2().subVectors(endPosition, startPosition);
    let length = Math.abs(Math.ceil(diff.length()));

    wallList.push({
      type: WALL_TYPE.DEFAULT,
      direction,
      position: startPosition,
      color: [0x00ffff, 0x00ffff]
    });

    if (isWest) {
      length++;
      endPosition.x--;
    } else if (isNorth) {
      length++;
      endPosition.y--;
    }

    const totalDirection = endPosition.clone().sub(startPosition);
    const stepVector = totalDirection.divideScalar(length);

    for (let i = wallList.length; i < length; i++) {
      const newVector = new Vector2()
        .copy(startPosition)
        .add(stepVector.clone().multiplyScalar(i));
      wallList.push({
        type: WALL_TYPE.DEFAULT,
        direction,
        position: newVector,
        color: [0x00ffff, 0x00ffff]
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
  const height = 2.05;
  const geometry = new BoxGeometry(0.2, height, 0.2);

  geometry.translate(0, height / 2, 0);
  geometry.translate(-0.5, 0, -0.5);
  const material = new MeshBasicMaterial({
    color: 0x00ff00,
    opacity: 0.5,
    transparent: true,
    depthWrite: false
  });

  const subMeshPlane = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({
      color: 0x000000,
      visible: false,
      depthWrite: false
    })
  );
  subMeshPlane.position.y = 0.0001;
  subMeshPlane.rotation.x = -Math.PI / 2;

  const mesh = new Mesh(geometry, material);
  mesh.add(subMeshPlane);
  // mesh.rotation.x = -Math.PI / 2;
  mesh.name = MESH_WALL_CREATOR;
  prepareForRaycast(mesh);
  return mesh;
}

const MESH_WALL_CREATOR = 'WallCreatorMesh';
