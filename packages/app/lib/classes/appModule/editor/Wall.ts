/* eslint-disable complexity */
import type { Object3D, Vector3 } from 'three';
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import type { AppModuleState, SceneSelectContext } from '../../AppModule';
import AppModule from '../../AppModule';
import type App from '../../App';
import { concatMap, debounceTime, filter, map, Subject, switchMap } from 'rxjs';
import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import type Wall from '../../Wall';
import { prepareForRaycast } from '@cuby-world/app/lib/utils/raycast';

import { getFaceGroupIndex } from '@cuby-world/app/lib/utils/wall';
import type {
  WallStyle,
  WallStyleTemplate
} from '@cuby-world/app/lib/types/wall/style';
import {
  type WALL_WINDOW_TYPE,
  type FACE_INDEX,
  WALL_DIRECTION,
  WALL_TYPE,
  type WallDescription
} from '@cuby-world/app/lib/types/wall';
import type { WallAction } from '@cuby-world/app/components/editor/panel/WallActions.vue';

interface State extends AppModuleState {
  action: WallAction;
  style: WallStyle;
  selection?: {
    faceIndex: FACE_INDEX;
    wall: Wall | null;
  };
}
export default class EditorWallModule extends AppModule<State> {
  static override TYPE = 'editorWall';

  state: State = {
    action: {
      primary: WALL_ACTION.NONE
    },
    style: {
      id: 'color_blue',
      color: '#0066ff'
    }
  };

  creatorMesh: Mesh;

  observables = {
    current$: new Subject<{
      wall: Wall | null;
      faceIndex: FACE_INDEX;
    } | null>(),
    hover$: new Subject<{
      current: Wall;
      last: Wall | null;
      faceIndex: FACE_INDEX;
    }>(),
    select$: new Subject<{
      current: Object3D | null;
      last: Object3D | null;
      faceIndex: FACE_INDEX;
    }>()
  };

  constructor(app: App) {
    super(app);
    this.creatorMesh = createWallCreatorMesh();
  }

  override destroy(): void {
    super.destroy();
    Object.values(this.observables).forEach(obs => obs.unsubscribe());
    this.stopEditing();
    this.creatorMesh.geometry.dispose();
    (this.creatorMesh.material as MeshBasicMaterial).dispose();
  }

  override setup(): void {
    this.subscription.add(
      this.app.modules.room.observables.room$
        .pipe(
          filter(Boolean),
          switchMap(room => room!.modules.selection.position$),
          map(position => position.clone().ceil()),
          debounceTime(50),
          concatMap(this.onDrag.bind(this))
        )
        .subscribe(void 0)
    );

    this.subscription.add(
      this.app.renderer.observables.pointerUp$.subscribe(() => {
        this.stopDrag();
      })
    );

    this.subscription.add(
      this.observables.current$
        .pipe(concatMap(this.onCurrent.bind(this)))
        .subscribe({
          next: () => void 0
        })
    );

    this.subscription.add(
      this.observables.select$
        .pipe(concatMap(this.onSelect.bind(this)))
        .subscribe({
          next: () => void 0
        })
    );

    this.subscription.add(
      this.observables.hover$
        .pipe(concatMap(this.onHover.bind(this)))
        .subscribe(void 0)
    );
  }

  private async onCurrent(
    options: {
      wall: Wall | null;
      faceIndex: FACE_INDEX;
    } | null
  ) {
    if (options) {
      const { wall, faceIndex } = options;

      if (wall) {
        this.state.selection = {
          faceIndex,
          wall
        };
        return;
      }
    }
    this.state.selection = undefined;
  }

  private async onSelect({
    current,
    faceIndex
  }: {
    current: Object3D | null;
    faceIndex: FACE_INDEX;
  }) {
    const wall = this.getWallFromObject(current!)!;

    console.log('select', { current, wall, faceIndex });

    this.app.renderer.setSelectedObjects([wall.getMesh()]);
    if (this.state.action.primary === WALL_ACTION.MODE_STYLE && wall) {
      this.lastWall?.resetTmpState();
      this.lastWall = null;
      wall.setStyle(this.state.style, faceIndex);
    } else if (this.state.action.primary === WALL_ACTION.MODE_DOOR && wall) {
      this.lastWall?.resetTmpState();
      this.lastWall = wall;

      const type =
        wall.state.type === WALL_TYPE.DEFAULT
          ? WALL_TYPE.DOOR
          : WALL_TYPE.DEFAULT;

      await wall.saveTmpState({
        type
      });
    } else if (this.state.action.primary === WALL_ACTION.MODE_WINDOW && wall) {
      this.lastWall?.resetTmpState();
      this.lastWall = wall;

      const type =
        wall.state.type === WALL_TYPE.DEFAULT
          ? WALL_TYPE.WINDOW
          : WALL_TYPE.DEFAULT;

      await wall.saveTmpState({
        type
      });
    } else if (current && current.parent!.name === MESH_WALL_CREATOR) {
      this.startDrag();
    }
  }

  private async onHover({
    current,
    faceIndex
  }: {
    current: Wall;
    faceIndex: FACE_INDEX;
  }) {
    if (current) {
      if (this.state.action.primary === WALL_ACTION.MODE_STYLE) {
        if (faceIndex > -1 && [0, 1].includes(faceIndex)) {
          const style: [WallStyle | null, WallStyle | null] = [
            current.state.style?.[0] || null,
            current.state.style?.[1] || null
          ];

          if (!style[faceIndex]) {
            throw new Error('Face index out of range');
          }

          if (this.state.style.id !== style[faceIndex].id) {
            style[faceIndex] = { ...this.state.style };

            this.lastWall?.restoreTmpState();
            this.lastWall = current;

            this.observables.current$.next({ wall: current, faceIndex });

            await current.saveTmpState({
              style: style
            });
          }
          return;
        }
      } else if (this.state.action.primary === WALL_ACTION.MODE_DOOR) {
        if (
          !current.equal(this.lastWall) ||
          current.state.type !== this.lastWall?.state.type
        ) {
          const type =
            current.state.type === WALL_TYPE.DEFAULT
              ? WALL_TYPE.DOOR
              : WALL_TYPE.DEFAULT;

          this.lastWall?.restoreTmpState();
          this.lastWall = current;

          await current.saveTmpState({
            type
          });
        }
        return;
      } else if (this.state.action.primary === WALL_ACTION.MODE_WINDOW) {
        if (
          !current.equal(this.lastWall) ||
          current.state.type !== this.lastWall?.state.type
        ) {
          const type =
            current.state.type === WALL_TYPE.DEFAULT
              ? WALL_TYPE.WINDOW
              : WALL_TYPE.DEFAULT;

          this.lastWall?.restoreTmpState();
          this.lastWall = current;

          await current.saveTmpState({
            type,
            windowType: this.state.action.secondary as WALL_WINDOW_TYPE
          });
        }
        return;
      }
    }
    this.observables.current$.next(null);
    this.lastWall?.restoreTmpState();
    this.lastWall = null;
  }

  changeColor() {
    const { primary } = this.state.action;
    if (this.dragOptions.moving) {
      (this.creatorMesh.material as MeshBasicMaterial).color.set(0xffa500);
    } else if (primary === WALL_ACTION.ADD) {
      (this.creatorMesh.material as MeshBasicMaterial).color.set(0x00ff00);
    } else if (primary === WALL_ACTION.REMOVE) {
      (this.creatorMesh.material as MeshBasicMaterial).color.set(0xff0000);
    }
  }

  setAction(action: WallAction) {
    const { primary } = action;
    const lastAction = this.state.action;

    if (lastAction.primary === primary) {
      return;
    }

    this.state.action = action;

    this.changeColor();

    if (
      lastAction.primary === WALL_ACTION.ADD ||
      lastAction.primary === WALL_ACTION.REMOVE
    ) {
      this.stopEditing();
    }

    if (primary === WALL_ACTION.ADD || primary === WALL_ACTION.REMOVE) {
      this.startEditing();
    }
  }

  setStyle(style: WallStyle | WallStyleTemplate) {
    if ('id' in style || 'texture' in style) {
      this.state.style = style as WallStyle;
    }
    this.state.style = style;
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

  override onSceneHover({ preparedPositions }: SceneSelectContext) {
    const object = preparedPositions?.[0]?.object;
    const wall = object?.parent?.userData.wall;

    const faceIndex = preparedPositions[0]
      ? getFaceGroupIndex(preparedPositions[0])
      : -1;

    this.observables.hover$.next({
      current: wall ?? null,
      last: this.lastWall,
      faceIndex
    });
    this.lastWall = wall;
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
    const faceIndex = getFaceGroupIndex(preparedPositions[0]!);

    this.observables.select$.next({
      current: object ?? null,
      last: this._lastObject,
      faceIndex
    });
    this._lastObject = object ?? null;

    return this.state.action.primary !== WALL_ACTION.NONE;
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
    if (this.state.action.primary === WALL_ACTION.ADD) {
      this.app.modules.room
        .getRoom()!
        .modules.wall.addedWalls(this.wallDescriptions);
    } else if (this.state.action.primary === WALL_ACTION.REMOVE) {
      this.app.modules.room
        .getRoom()!
        .modules.wall.removeWallsByDescriptions(this.wallDescriptions);
    }
    this.wallDescriptions = [];
    this.dragOptions.moving = false;
    this.changeColor();
    this.app.renderer.enableControls();
  }

  lastPosition?: Vector3;
  async onDrag(position: Vector3) {
    if (this.dragOptions.moving) {
      if (
        this.state.action.primary === WALL_ACTION.ADD ||
        this.state.action.primary === WALL_ACTION.REMOVE
      ) {
        this.wallDescriptions = [];

        this.dragOptions.endPosition = position;

        const wallDescriptions = getWallsFromPositions(
          vector3ToVector2(this.dragOptions.startPosition!),
          vector3ToVector2(this.dragOptions.endPosition!)
        );

        if (this.state.action.primary === WALL_ACTION.ADD) {
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

    this.creatorMesh.position.copy(position);
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
      style: [
        {
          id: 'color_cyan',
          color: 0x00ffff
        },
        {
          id: 'color_cyan',
          color: 0x00ffff
        }
      ]
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
        style: [
          {
            id: 'color_cyan',
            color: 0x00ffff
          },
          {
            id: 'color_cyan',
            color: 0x00ffff
          }
        ]
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

  mesh.name = MESH_WALL_CREATOR;
  prepareForRaycast(mesh);
  return mesh;
}

const MESH_WALL_CREATOR = 'WallCreatorMesh';
