/* eslint-disable complexity */
import { Vector3, type Object3D } from 'three';
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import type {
  AppModuleObservables,
  AppModuleState,
  SceneSelectContext
} from '../../AppModule';
import AppModule from '../../AppModule';
import type App from '../../App';
import {
  concatMap,
  debounceTime,
  filter,
  map,
  Subject,
  Subscription,
  switchMap
} from 'rxjs';
import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import type Wall from '../../Wall';
import { prepareForRaycast } from '@cuby-world/app/lib/utils/raycast';

import {
  getFaceGroupIndex,
  resolveWallExtensions
} from '@cuby-world/app/lib/utils/wall';
import {
  type FACE_INDEX,
  WALL_DIRECTION,
  WALL_TYPE,
  type WallDescription
} from '@cuby-world/app/lib/types/wall';
import type { WallAction } from '@cuby-world/app/components/editor/panel/WallActions.vue';
import {
  getDefaultSkin,
  type WallSkinItem
} from '@cuby-world/app/lib/utils/wall/skins';
import type { WallExtensionItem } from '@cuby-world/wall-extensions';
import type WallExtension from '../../WallExtension';
import { WALL_EXTENSION_TYPE } from '../../WallExtension';
import type { WallSkins } from '@cuby-world/app/lib/types/wall/skins';

interface Observables extends AppModuleObservables {
  current$: Subject<{
    wall: Wall | null;
    faceIndex: FACE_INDEX;
  } | null>;
  hover$: Subject<{
    current: Wall;
    last: Wall | null;
    faceIndex: FACE_INDEX;
  }>;
  select$: Subject<{
    current: Object3D | null;
    last: Object3D | null;
    faceIndex: FACE_INDEX;
  }>;
}

interface State extends AppModuleState {
  action: WallAction;
  selection?: {
    faceIndex: FACE_INDEX;
    wall: Wall | null;
  };
  currentExtension?: WallExtensionItem;
  currentSkin?: WallSkinItem;
}
export default class EditorWallModule extends AppModule<State, Observables> {
  static override TYPE = 'editorWall';

  state: State = {
    action: {
      primary: WALL_ACTION.NONE
    }
  };

  creatorMesh: Mesh;

  lastWallInfo: {
    lastSkins?: WallSkins;
    newExtension?: WallExtension;
    lastExtensions?: WallExtension[];
    wall: Wall;
  } | null = null;

  currentExtension: WallExtension | null = null;

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.current$ = new Subject<{
      wall: Wall | null;
      faceIndex: FACE_INDEX;
    } | null>();
    this.observables.hover$ = new Subject<{
      current: Wall;
      last: Wall | null;
      faceIndex: FACE_INDEX;
    }>();
    this.observables.select$ = new Subject<{
      current: Object3D | null;
      last: Object3D | null;
      faceIndex: FACE_INDEX;
    }>();
    //#endregion
    this.creatorMesh = createWallCreatorMesh();
  }

  override destroy(): void {
    super.destroy();
    this.stopEditing();
    this.creatorMesh.geometry.dispose();
    (this.creatorMesh.material as MeshBasicMaterial).dispose();
  }

  private interactionSubscriptions = new Subscription();
  private registerSubscriptions() {
    this.unregisterSubscriptions();
    const subscription = this.interactionSubscriptions;
    subscription.add(
      this.app.modules.room.observables.room$
        .pipe(
          filter(Boolean),
          switchMap(room => room!.modules.selection.observables.position$),
          map(position => position.clone().ceil()),
          debounceTime(50),
          concatMap(this.onDrag.bind(this))
        )
        .subscribe(void 0)
    );

    subscription.add(
      this.app.renderer.observables.pointerUp$
        .pipe(concatMap(this.stopDrag.bind(this)))
        .subscribe(() => void 0)
    );

    subscription.add(
      this.observables.current$
        .pipe(concatMap(this.onCurrent.bind(this)))
        .subscribe({
          next: () => void 0
        })
    );

    subscription.add(
      this.observables.select$
        .pipe(concatMap(this.onSelect.bind(this)))
        .subscribe({
          next: () => void 0
        })
    );

    subscription.add(
      this.observables.hover$
        .pipe(concatMap(this.onHover.bind(this)))
        .subscribe(void 0)
    );
  }

  private unregisterSubscriptions() {
    this.interactionSubscriptions.unsubscribe();
    this.interactionSubscriptions = new Subscription();
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

    if (this.state.action.primary === WALL_ACTION.MODE_STYLE && wall) {
      this.lastWallInfo = null;
      wall.setStyle(this.state.currentSkin!.skin, faceIndex);
    } else if (
      wall &&
      this.state.currentExtension &&
      (this.state.action.primary === WALL_ACTION.MODE_DOOR ||
        this.state.action.primary === WALL_ACTION.MODE_WINDOW)
    ) {
      const currentExtension = this.state.currentExtension;

      const [resolveExtension] = await resolveWallExtensions([
        {
          key: currentExtension.extension!,
          state: currentExtension.options
        }
      ]);

      await wall.addExtension(
        resolveExtension![0],
        this.app.renderer.observables.animationLoop$,
        resolveExtension![1]
      );

      if (this.lastWallInfo?.lastExtensions?.length) {
        this.lastWallInfo.lastExtensions.forEach(ext =>
          wall.removeExtension(ext)
        );
      }

      await wall.refresh();

      this.lastWallInfo = null;
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
    if (this.state.action.primary === WALL_ACTION.MODE_STYLE) {
      if (faceIndex > -1 && [0, 1].includes(faceIndex)) {
        if (this.lastWallInfo?.lastSkins) {
          this.lastWallInfo.wall.state.skins = this.lastWallInfo.lastSkins!;
          await this.lastWallInfo.wall.refresh();
          this.lastWallInfo = null;
        }

        if (current && this.state.currentSkin) {
          const skins: WallSkins = [
            current.state.skins?.[0] || 'default',
            current.state.skins?.[1] || 'default'
          ];

          if (!skins[faceIndex]) {
            throw new Error('Face index out of range');
          }

          if (
            this.state.currentSkin?.skin &&
            this.state.currentSkin.skin !== skins[faceIndex]
          ) {
            skins[faceIndex] = this.state.currentSkin.skin;

            this.observables.current$.next({ wall: current, faceIndex });

            this.lastWallInfo = {
              lastSkins: current.state.skins,
              wall: current
            };

            current.state.skins = skins;

            await current.refresh();
          }
        }
        return;
      }
    } else if (
      this.state.action.primary === WALL_ACTION.MODE_DOOR ||
      this.state.action.primary === WALL_ACTION.MODE_WINDOW
    ) {
      if (
        !this.lastWallInfo ||
        (this.lastWallInfo && !current?.equal(this.lastWallInfo.wall))
      ) {
        const currentExtension = this.state.currentExtension;

        if (this.lastWallInfo) {
          (this.lastWallInfo.lastExtensions ?? []).forEach(ext => ext.enable());
          if (this.lastWallInfo.newExtension) {
            this.lastWallInfo.wall.removeExtension(
              this.lastWallInfo.newExtension
            );
          }

          await this.lastWallInfo.wall.refresh();
          this.lastWallInfo = null;
        }

        if (current && currentExtension) {
          const lastExtensions = current.getExtensionByType([
            WALL_EXTENSION_TYPE.DOOR,
            WALL_EXTENSION_TYPE.WINDOW
          ]);
          if (lastExtensions.length) {
            lastExtensions.forEach(lastExtensions => {
              console.log(lastExtensions);
              lastExtensions.disable();
            });
          }

          const [resolveExtension] = await resolveWallExtensions([
            {
              key: currentExtension.extension!,
              state: currentExtension.options
            }
          ]);

          const newExtension = await current.addExtension(
            resolveExtension![0],
            this.app.renderer.observables.animationLoop$,
            resolveExtension![1]
          );

          await current.refresh();

          this.lastWallInfo = {
            newExtension,
            lastExtensions: lastExtensions,
            wall: current
          };
        }
      }
      return;
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

    if (primary !== WALL_ACTION.NONE) {
      if (primary === WALL_ACTION.ADD || primary === WALL_ACTION.REMOVE) {
        this.startEditing();
      }
      this.registerSubscriptions();
    } else {
      this.unregisterSubscriptions();
    }
  }

  setExtension(extension: WallExtensionItem) {
    if (extension) {
      this.registerSubscriptions();
    } else {
      this.unregisterSubscriptions();
    }
    this.state.currentExtension = extension;
  }

  setStyle(item: WallSkinItem | undefined) {
    if (item) {
      this.registerSubscriptions();
    } else {
      this.unregisterSubscriptions();
    }
    this.state.currentSkin = item;
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

  private getWallFromObject(object: Object3D): Wall | null {
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

  private wallDescriptions: WallDescription[] = [];
  private dragOptions: {
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

  private startDrag() {
    this.dragOptions.startPosition = this.lastPosition;
    this.dragOptions.moving = true;
    this.changeColor();

    this.app.renderer.disableControls();
  }

  private async stopDrag() {
    if (this.state.action.primary === WALL_ACTION.ADD) {
      await this.app.modules.room
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

  private lastPosition?: Vector3;
  private async onDrag(position: Vector3) {
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

        this.wallDescriptions = wallDescriptions;
        if (this.state.action.primary === WALL_ACTION.ADD) {
          await this.app.modules.room
            .getRoom()!
            .modules.wall.addedWalls(wallDescriptions);
        } else {
          this.app.modules.room
            .getRoom()!
            .modules.wall.removeWallsByDescriptions(wallDescriptions);
        }
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
      position: new Vector3(startPosition.x, 0, startPosition.y),
      skins: getDefaultSkin(),
      extensions: []
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
      const newVector = new Vector3()
        .copy(new Vector3(startPosition.x, 0, startPosition.y))
        .add(new Vector3(stepVector.x, 0, stepVector.y).multiplyScalar(i));
      wallList.push({
        type: WALL_TYPE.DEFAULT,
        direction,
        position: newVector,
        skins: getDefaultSkin(),
        extensions: []
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
