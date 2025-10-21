import {
  WALL_DIRECTION,
  WALL_TYPE,
  type WallDescription
} from '../../../../types/wall';
import { FLOOR_HEIGHT } from '../../../../utils/ground';
import { prepareForRaycast } from '../../../../utils/raycast';
import { getDefaultSkin } from '../../../../utils/wall/skins';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Vector2,
  Vector3,
  MeshPhongMaterial
} from 'three';
import type App from '../../../App';
import {
  ReplaySubject,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  map
} from 'rxjs';
import type {
  AppModuleControllerObservables,
  AppModuleControllerState
} from '../../../AppModuleController';
import type { PreparedPosition } from '../../../../utils/matrix';
import {
  disposeObject3D,
  OBJECT_USER_DATA,
  setMainObjectRecursive
} from '../../../../utils/object';
import { OBJECT_NAME } from '../../../Unit';
import type Wall from '../../../Wall';
import AppModuleController from '../../../AppModuleController';
import { OUTLINE_TYPE } from '../../../Renderer';

declare module '../../../Unit' {
  interface ObjectName {
    EDITOR_WALL_INDICATOR: 'EditorWallIndicator';
  }
}

OBJECT_NAME.EDITOR_WALL_INDICATOR = 'EditorWallIndicator';

export enum MASON_MODE {
  ADD = 'add',
  REMOVE = 'remove'
}

export enum MASON_STATUS {
  NONE = 'none',
  PLACE = 'place',
  PLACED = 'placed'
}

interface Observables extends AppModuleControllerObservables {
  indicatorMeshes$: ReplaySubject<{ start: Mesh; end: Mesh }>;
  status$: ReplaySubject<MASON_STATUS>;
  startPosition$: ReplaySubject<Vector3 | null>;
  endPosition$: ReplaySubject<Vector3 | null>;
  endIndicatorPosition$: ReplaySubject<Vector3 | null>;
}

interface State extends AppModuleControllerState {
  mode: MASON_MODE;
  status: MASON_STATUS;
  startPosition: Vector3 | null;
  endPosition: Vector3 | null;
}
export default class MasonController extends AppModuleController<
  State,
  Observables
> {
  override state: State = {
    mode: MASON_MODE.ADD,
    status: MASON_STATUS.NONE,
    startPosition: null,
    endPosition: null
  };
  private wallDescriptions: WallDescription[] = [];

  private indicatorMeshes: {
    start: Mesh;
    end: Mesh;
  };

  private walls: Wall[] = [];

  constructor(app: App, mode: MASON_MODE) {
    super(app);

    this.state.mode = mode;

    //#region observables
    this.observables.indicatorMeshes$ = new ReplaySubject<{
      start: Mesh;
      end: Mesh;
    }>(0);
    this.observables.status$ = new ReplaySubject<MASON_STATUS>(0);
    this.observables.startPosition$ = new ReplaySubject<Vector3 | null>(0);
    this.observables.endPosition$ = new ReplaySubject<Vector3 | null>(0);
    this.observables.endIndicatorPosition$ = new ReplaySubject<Vector3 | null>(
      0
    );
    //#endregion

    this.indicatorMeshes = {
      start: createWallCreatorMesh(),
      end: createWallCreatorMesh()
    };
    this.setIndicatorColor();
  }

  override async destroy() {
    await this.abort();
    const room = this.app.modules.room.getRoom()!;

    Object.values(this.indicatorMeshes).forEach(mesh => {
      mesh.parent?.remove(mesh);
      disposeObject3D(mesh);
    });
    // this.creatorMesh?.removeFromParent();
    room.modules.selection.showSelection();

    super.destroy();
  }

  override setup() {
    super.setup();

    this.subscription.add(
      this.app.modules.room.observables.hover$
        .pipe(
          filter(Boolean),
          debounceTime(25),
          map((preparedPositions: PreparedPosition[]) => {
            const preparedPosition = preparedPositions.find(
              p => p.object?.name === OBJECT_NAME.GROUND
            );
            const position = preparedPosition?.worldPosition;
            return position;
          }),
          // filter(Boolean),
          distinctUntilChanged(
            (prev, curr) => !!prev && !!curr && prev.equals(curr)
          ),
          concatMap(this.onMove.bind(this))
        )
        .subscribe(void 0)
    );

    this.subscription.add(
      this.app.modules.room.observables.select$
        .pipe(
          map(({ preparedPositions }) => {
            const position = preparedPositions.find(p =>
              p.object?.name.includes(OBJECT_NAME.GROUND)
            )?.worldPosition;
            return position ?? null;
          }),
          concatMap(this.onSelect.bind(this))
        )
        .subscribe(void 0)
    );

    const room = this.app.modules.room.getRoom()!;
    room.modules.selection.hideSelection();
    Object.values(this.indicatorMeshes).forEach(mesh => room.addToRoot(mesh));
  }

  //#region events

  public async onSelect(position: Vector3 | null) {
    if (this.state.status === MASON_STATUS.PLACE) {
      this.onMoveEnd();
    } else {
      this.onMoveStart(position);
    }
  }

  public onMoveStart(position: Vector3 | null) {
    if (!position) {
      throw new Error('No position on move start');
    }
    if (this.wallDescriptions.length < 1) {
      this.setStartPosition(position);
      this.setIndicatorPosition(position);
      this.showEndIndicators();
      this.setStatus(MASON_STATUS.PLACE);
    }
  }
  public async onMoveEnd() {
    if (this.wallDescriptions.length > 0) {
      this.setStatus(MASON_STATUS.PLACED);
    }
  }

  // eslint-disable-next-line complexity
  public async onMove(position?: Vector3 | null) {
    if (position && this.state.status === MASON_STATUS.PLACE) {
      const offset = position.clone().sub(this.state.startPosition!);
      if (Math.abs(offset.x) < Math.abs(offset.z)) {
        position = new Vector3(
          this.state.startPosition?.x ?? position.x,
          position.y * FLOOR_HEIGHT,
          position.z
        );
      } else {
        position = new Vector3(
          position.x,
          position.y * FLOOR_HEIGHT,
          this.state.startPosition?.z ?? position.z
        );
      }

      this.setEndPosition(position);

      console.log(
        this.state.startPosition!.toArray(),
        this.state.endPosition!.toArray()
      );

      const wallDescriptions = getWallsFromPositions(
        this.state.startPosition!,
        this.state.endPosition!
      );
      console.log('Wall descriptions:', wallDescriptions);
      const keys = wallDescriptions.map(wallDesc => {
        return String([wallDesc.position.toArray(), wallDesc.direction]);
      });

      if (this.state.mode === MASON_MODE.ADD) {
        const wallsDiff = this.walls.filter(wall => {
          return !keys.includes(
            String([wall.position.toArray(), wall.direction])
          );
        });
        this.wallDescriptions = wallDescriptions;
        await this.app.modules.room
          .getRoom()!
          .modules.wall.removeWalls(wallsDiff, false);

        const walls = [
          ...this.walls.filter(wall => !wallsDiff.includes(wall)),
          ...(await this.app.modules.room
            .getRoom()!
            .modules.wall.addWalls(wallDescriptions))
        ];
        this.walls = walls;

        //#region outline
        walls.forEach(wall =>
          this.app.renderer.registerOutlineObject(wall.root, OUTLINE_TYPE.ADD)
        );
      } else {
        const wallDescriptionsDiff = this.wallDescriptions.filter(wall => {
          return !keys.includes(
            String([wall.position.toArray(), wall.direction])
          );
        });
        this.wallDescriptions = wallDescriptions;

        const resetRemoveWalls = wallDescriptionsDiff
          .map(desc => {
            return this.app.modules.room
              .getRoom()!
              .modules.wall.getWallsByPosition(desc.position, desc.direction);
          })
          .flat();
        const wallsToRemove = this.wallDescriptions
          .map(desc => {
            return this.app.modules.room
              .getRoom()!
              .modules.wall.getWallsByPosition(desc.position, desc.direction);
          })
          .flat();

        //#region outline
        wallsToRemove.forEach(wall =>
          this.app.renderer.registerOutlineObject(
            wall.root,
            OUTLINE_TYPE.REMOVE
          )
        );

        resetRemoveWalls.forEach(wall =>
          this.app.renderer.unregisterOutlineObject(
            wall.root,
            OUTLINE_TYPE.REMOVE
          )
        );
        //#endregion
      }
    } else if (position && this.state.status === MASON_STATUS.NONE) {
      this.showStartIndicator(position);
    } else if (!position) {
      this.hideIndicators();
    }

    if (
      position &&
      (this.state.status === MASON_STATUS.PLACE ||
        this.state.status === MASON_STATUS.NONE)
    ) {
      this.setIndicatorPosition(position);
    }
  }

  //#endregion

  //#region methods
  private reset() {
    this.setStatus(MASON_STATUS.NONE);
    this.setStartPosition(null);
    this.setEndPosition(null);
    this.walls = [];
    this.hideIndicators();
    this.wallDescriptions = [];
  }

  public async abort() {
    if (this.state.mode === MASON_MODE.ADD) {
      await this.app.modules.room
        .getRoom()!
        .modules.wall.removeWalls(this.walls, false);
    } else if (this.state.mode === MASON_MODE.REMOVE) {
      this.getWallsFromDescriptions().forEach(wall => {
        this.app.renderer.unregisterOutlineObject(
          wall.root,
          OUTLINE_TYPE.REMOVE
        );
      });
    }
    this.reset();
  }

  public async apply() {
    if (this.state.mode === MASON_MODE.ADD) {
      if (this.walls.length > 0) {
        console.log('Create new walls:', this.walls.length);
      }

      this.walls.forEach(wall =>
        this.app.renderer.unregisterOutlineObject(wall.root, OUTLINE_TYPE.ADD)
      );
    } else if (this.state.mode === MASON_MODE.REMOVE) {
      const wallDescriptions = this.wallDescriptions;

      this.getWallsFromDescriptions().forEach(wall =>
        this.app.renderer.unregisterAllOutlinesObject(wall.root)
      );
      await this.app.modules.room
        .getRoom()!
        .modules.wall.removeWallsByDescriptions(wallDescriptions);
      if (wallDescriptions.length > 0) {
        console.log('Remove new walls:', wallDescriptions.length);
      }
    }
    this.reset();
  }

  public edit() {
    this.setStatus(MASON_STATUS.PLACE);
  }

  private getWallsFromDescriptions(): Wall[] {
    return this.wallDescriptions
      .map(desc =>
        this.app.modules.room
          .getRoom()!
          .modules.wall.getWallsByPosition(desc.position, desc.direction)
      )
      .flat();
  }

  private setIndicatorColor() {
    let color: number | string = '#FFFF00';
    if (this.state.status === MASON_STATUS.PLACE) {
      if (this.state.mode === MASON_MODE.REMOVE) {
        color = '#ff0000';
      } else {
        color = '#00ff00';
      }
    }
    (this.indicatorMeshes.start.material as MeshPhongMaterial).color.set(color);
    (this.indicatorMeshes.start.material as MeshPhongMaterial).needsUpdate =
      true;
    (this.indicatorMeshes.end.material as MeshPhongMaterial).color.set(color);
    (this.indicatorMeshes.end.material as MeshPhongMaterial).needsUpdate = true;
  }

  //#endregion

  //#region getters/setters

  private setStatus(status: MASON_STATUS) {
    this.state.status = status;
    this.observables.status$.next(status);
    this.setIndicatorColor();
    if (status === MASON_STATUS.PLACE) {
      this.app.renderer.disableControls();
    } else {
      this.app.renderer.enableControls();
    }
  }

  private setStartPosition(position: Vector3 | null) {
    this.state.startPosition = position;
    this.observables.startPosition$.next(position);
  }
  private setEndPosition(position: Vector3 | null) {
    this.state.endPosition = position;
    this.observables.endPosition$.next(position);
  }

  //#endregion

  //#region indicators
  private showStartIndicator(position: Vector3) {
    this.indicatorMeshes.start.position.copy(
      new Vector3(position!.x, position!.y * FLOOR_HEIGHT, position!.z)
    );
    if (!this.indicatorMeshes.start.visible) {
      this.indicatorMeshes.start.visible = true;
    }
  }

  private showEndIndicators() {
    this.indicatorMeshes.end.visible = true;
  }

  private hideIndicators() {
    this.indicatorMeshes.start.visible = false;
    this.indicatorMeshes.end.visible = false;
  }

  private setIndicatorPosition(position: Vector3 | null) {
    if (position) {
      this.indicatorMeshes.end.position.copy(position);
      this.observables.endIndicatorPosition$.next(position);
    }
  }

  //#endregion
}

function createWallCreatorMesh(): Mesh {
  const height = 2.6;
  const geometry = new BoxGeometry(0.2, height, 0.2);

  geometry.translate(0, height / 2, 0);
  geometry.translate(-0.5, 0, -0.5);
  const material = new MeshPhongMaterial({
    // color: 0x000000,
    opacity: 1,
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
  subMeshPlane.position.y = 0.6;
  subMeshPlane.rotation.x = -Math.PI / 2;

  const mesh = new Mesh(geometry, material);
  mesh.add(subMeshPlane);

  mesh.name = OBJECT_NAME.EDITOR_WALL_INDICATOR;
  prepareForRaycast(mesh);
  mesh.userData[OBJECT_USER_DATA.MAIN_OBJECT] = mesh.id;
  setMainObjectRecursive(mesh, mesh);

  mesh.visible = false;

  return mesh;
}

function getDirection(
  startPosition: Vector3,
  endPosition: Vector3
): WALL_DIRECTION | undefined {
  if (startPosition!.x === endPosition!.x) {
    return WALL_DIRECTION.VERTICAL;
  } else if (startPosition!.z === endPosition!.z) {
    return WALL_DIRECTION.HORIZONTAL;
  }
}

function getWallsFromPositions(
  start: Vector3,
  end: Vector3
): WallDescription[] {
  const wallList: WallDescription[] = [];

  if (start.x === end.x || start.z === end.z) {
    const isNorth = start.x === end.x && start.z > end.z;
    const isWest = start.z === end.z && start.x > end.x;

    const direction = getDirection(start, end)!;

    const originLength = Math.abs(
      new Vector2(end.x - start.x, end.z - start.z).ceil().length()
    );

    if (originLength < 1 || !direction) {
      return wallList;
    }

    const startPosition = start.clone();
    const endPosition = end.clone();
    if (isNorth) {
      startPosition.z--;
    } else if (isWest) {
      startPosition.x--;
    }
    const diff = new Vector2(
      endPosition.x - startPosition.x,
      endPosition.z - startPosition.z
    );
    let length = Math.abs(Math.ceil(diff.length()));
    wallList.push({
      type: WALL_TYPE.DEFAULT,
      direction,
      position: startPosition.clone(),
      skins: getDefaultSkin(),
      extensions: []
    });

    if (isWest) {
      length++;
      endPosition.x--;
    } else if (isNorth) {
      length++;
      endPosition.z--;
    }

    const totalDirection = endPosition.clone().sub(startPosition);
    const stepVector = totalDirection.divideScalar(length);
    for (let i = wallList.length; i < length; i++) {
      const newVector = startPosition
        .clone()
        .add(new Vector3(stepVector.x, 0, stepVector.z).multiplyScalar(i));
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
