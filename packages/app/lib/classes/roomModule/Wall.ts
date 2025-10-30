import {
  Box3,
  BufferGeometry,
  Frustum,
  type Vector2,
  type Object3D,
  type Material,
  type Camera,
  Line,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Raycaster,
  Vector3
} from 'three';
import RoomModule, {
  type RoomModuleObservables,
  type RoomModuleState
} from '../RoomModule';
import type Wall from '../Wall';

import createWalls, {
  getWallIdentifierFromObject,
  getWallRoomDescriptions,
  loadWallGeometries
} from '../../utils/wall';
import {
  ReplaySubject,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  concatMap
} from 'rxjs';
import type Unit from '../Unit';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type Room from '../Room';
import { OBJECT_NAME, OBJECT_USER_DATA } from '../../utils/object';

import {
  WALL_DIRECTION,
  WALL_SIZE,
  type WallDescription,
  type WallGeometryMap,
  type WallRoomDescription
} from '../../types/wall';
import { ArrayKeyMap } from '../ArrayKeyMap';
import type { FloorIndex } from '../../types/floor';
import { default_mesh as MeshWall } from '@cuby-world/walls';
import { FLOOR_HEIGHT } from '../../utils/ground';
import type { WallIdentifier } from '../Wall';
import { invertRotation, ROTATION } from '../../utils/rotation';
import { APP_MODE } from '../App';

interface WallRoomTile {
  mesh: Mesh;
  position: Vector2;
}

export class WallRoom implements Omit<WallRoomDescription, 'tiles'> {
  debug: boolean = false;
  id: string;
  floor: number;
  tiles: WallRoomTile[];
  centroid: Vector2;
  size: number;
  meshes: Mesh[] = [];
  visible: boolean = true;

  private colors: {
    default: number;
    track: number;
    untrack: number;
  } = {
    default: 0x000000,
    track: 0x00ff00,
    untrack: 0xff0000
  };

  constructor(desc: WallRoomDescription & { debug?: boolean }) {
    this.debug = desc.debug ?? false;
    this.id = desc.id;
    this.floor = desc.floor;
    this.centroid = desc.centroid;
    this.size = desc.size;
    this.tiles = desc.tiles.map(tile => {
      const mesh = this.createWallRoomTileMergedMesh(tile);
      mesh.material.opacity = this.debug ? 1 : 0;
      this.meshes.push(mesh);
      return { mesh, position: tile };
    });

    if (this.debug) {
      this.untrack();
    }
  }

  reset() {
    this.tiles.forEach(tile => {
      tile.mesh.removeFromParent();
      tile.mesh.geometry.dispose();
      (tile.mesh.material as Material).dispose();
    });
    this.tiles = [];
    this.meshes = [];
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.tiles.forEach(({ mesh }) => {
      mesh.visible = visible;
    });
  }

  destroy() {
    this.reset();
  }

  track() {
    if (this.debug) {
      this.tiles.forEach(tile => {
        (tile.mesh.material as MeshBasicMaterial).color.set(this.colors.track);
      });
    }
  }
  untrack() {
    if (this.debug) {
      this.tiles.forEach(tile => {
        (tile.mesh.material as MeshBasicMaterial).color.set(
          this.colors.untrack
        );
      });
    }
  }

  createWallRoomTileMergedMesh(tile: Vector2) {
    const size = 0.2;

    const edgePositions = [
      // [0, 0]
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1]
    ];
    const gemometries = edgePositions.map(([dx, dy]) => {
      const position = new Vector3(tile.x + dx! * 0.25, 0, tile.y + dy! * 0.25);
      const geometry = new PlaneGeometry(size, size);
      geometry.rotateX(-Math.PI / 2);
      geometry.translate(0, 0.01, 0);
      geometry.translate(position.x, position.y, position.z);
      return geometry;
    });

    return new Mesh(
      mergeGeometries(gemometries),
      new MeshBasicMaterial({
        color: 0x000000,
        opacity: 0,
        transparent: true
      })
    );
  }
}

export enum WALL_VIEW_MODE {
  SMALL = 'small',
  DYNAMIC = 'dynamic',
  LARGE = 'large'
}

interface State extends RoomModuleState {
  viewMode: WALL_VIEW_MODE;
  currentWallRoom?: WallRoomDescription;
  walls: Wall[];
  wallMap: ArrayKeyMap<[number, number, number, WALL_DIRECTION], Wall>;
  targets: Object3D[];
  wallRoomTargets: Object3D[];
  activeWallRooms: Map<string, WallRoom>;
  wallRooms: Set<WallRoom>;
  wallRoomTiles: Map<string, WallRoom>;
  trackingUnits: Set<Unit>;
  baseWallGeometryMap: WallGeometryMap;
}

interface WallModuleObservables extends RoomModuleObservables {
  viewMode$: ReplaySubject<WALL_VIEW_MODE>;
  currentWallRoom$: ReplaySubject<WallRoomDescription>;
  wallRooms$: ReplaySubject<Set<WallRoom>>;
  activeWallRooms$: ReplaySubject<Map<string, WallRoom>>;
}

interface WallState {
  direction: Vector3;
  targetBox: Box3;
  raycaster: Raycaster;
  matrix: Matrix4;
  frustum: Frustum;
  wallsToHide: Set<Wall>;
}

export default class WallModule extends RoomModule<
  State,
  WallModuleObservables
> {
  static override TYPE = 'wall';

  state: State = {
    viewMode: WALL_VIEW_MODE.DYNAMIC,
    walls: [],
    wallMap: new ArrayKeyMap(),
    targets: [],
    wallRoomTargets: [],
    activeWallRooms: new Map<string, WallRoom>(),
    wallRooms: new Set(),
    wallRoomTiles: new Map(),
    trackingUnits: new Set<Unit>(),
    baseWallGeometryMap: new Map()
  };

  wallState: WallState = {
    targetBox: new Box3(),
    direction: new Vector3(),
    raycaster: new Raycaster(),
    wallsToHide: new Set(),
    matrix: new Matrix4(),
    frustum: new Frustum()
  };

  constructor(room: Room, debug: boolean = false) {
    super(room, debug);
    this.observables.viewMode$ = new ReplaySubject<WALL_VIEW_MODE>(0);
    this.observables.viewMode$.next(this.state.viewMode);
    this.observables.currentWallRoom$ = new ReplaySubject<WallRoomDescription>(
      0
    );
    this.observables.wallRooms$ = new ReplaySubject<Set<WallRoom>>(0);
    this.observables.activeWallRooms$ = new ReplaySubject<
      Map<string, WallRoom>
    >(0);
  }

  //#region tracking

  addUnitForTracking(unit: Unit) {
    this.state.trackingUnits.add(unit);
  }
  removeUnitForTracking(unit: Unit) {
    this.state.trackingUnits.delete(unit);
  }

  //#endregion

  //#region targets

  addTarget(mesh: Mesh | Object3D) {
    const raycasterMesh = mesh.getObjectByName(OBJECT_NAME.RAYCASTER) ?? mesh;
    if (raycasterMesh instanceof Mesh) {
      this.state.targets.push(raycasterMesh);
    } else {
      throw new Error('Only Mesh objects can be added as targets');
    }
  }

  removeTarget(mesh: Mesh | Object3D) {
    const raycasterMesh = mesh.getObjectByName(OBJECT_NAME.RAYCASTER) ?? mesh;
    if (raycasterMesh instanceof Mesh) {
      const index = this.state.targets.indexOf(raycasterMesh);
      if (index !== -1) {
        this.state.targets.splice(index, 1);
      }
    }
  }

  //#endregion

  selectionPosition: Vector3 = new Vector3();

  override async setup(): Promise<void> {
    const app = this.room.app;
    const description = this.room.description;

    this.state.baseWallGeometryMap = await loadWallGeometries(MeshWall);

    await this.addWalls(description.walls);

    this.subscription.add(
      this.room.modules.floor.observables.floor$.subscribe(floorIndex => {
        this.updateVisibility(
          app.renderer.camera,
          getFloorDescendingList(floorIndex)
        );
      })
    );

    this.subscription.add(
      app.modules.player.observables.currentPlayer$
        .pipe(
          switchMap(player => player.unit$),
          switchMap(unit => unit.observables.ready$),
          switchMap(unit => unit.observables.position$),
          map(position => position.clone().ceil()),
          distinctUntilChanged((a, b) => a.equals(b)),
          concatMap(async () => {
            if (this.updateActiveWallRooms()) {
              this.updateVisibility(app.renderer.camera);
            }
          })
        )
        // TEST
        .subscribe(void 0)
    );

    this.subscription.add(
      this.room.modules.selection.observables.position$
        .pipe(debounceTime(500))
        .subscribe(position => {
          this.selectionPosition = position;
          // this.updateTotalVisibility({ camera: this.room.app.renderer.camera });
        })
    );

    this.subscription.add(
      this.room.modules.selection.observables.selectionVisible$.subscribe(
        _visible => {
          const selectionObject =
            this.room.modules.selection.state.selectionMesh?.getObjectByName(
              OBJECT_NAME.RAYCASTER
            ) as Mesh;
          if (!selectionObject) {
            return;
          }
          // if (visible) {
          //   this.addTarget(selectionObject);
          // } else {
          //   this.removeTarget(selectionObject);
          // }
        }
      )
    );

    this.subscription.add(
      app.modules.player.observables.currentPlayer$
        .pipe(switchMap(player => player.unit$))
        .subscribe(unit => {
          this.addUnitForTracking(unit);
        })
    );

    app.modules.player.observables.currentPlayer$
      .pipe(
        switchMap(player => player.unit$),
        switchMap(unit => unit.observables.ready$),
        map(unit => unit.root),
        filter(Boolean)
      )
      .subscribe(mesh => {
        this.state.targets.push(mesh);
      });

    this.subscription.add(
      app.observables.mode$
        .pipe(
          switchMap(mode => {
            return app.modules.room.observables.room$.pipe(
              concatMap(async room => {
                if (room) {
                  const wallModule = app.modules.room.getRoom()!.modules.wall!;
                  const walls = wallModule.getWalls() || [];
                  walls.forEach(wall =>
                    wall.setEditMode(mode === APP_MODE.EDITOR)
                  );

                  for (const wall of wallModule.state.walls) {
                    await wall.refreshWallMeshes();
                  }
                  wallModule.updateVisibility(app.renderer.camera);
                }
              })
            );
          })
        )
        .subscribe(void 0)
    );
  }

  //#region viewMode

  getViewMode() {
    return this.state.viewMode;
  }

  toggleViewMode() {
    const modes = Object.values(WALL_VIEW_MODE);
    this.state.viewMode =
      modes[(modes.indexOf(this.state.viewMode) + 1) % modes.length]!;
    this.updateVisibility(this.room.app.renderer.camera);
    this.observables.viewMode$.next(this.state.viewMode);
  }

  //#endregion

  //#region walls

  getWalls() {
    return this.state.walls.map(wall => wall);
  }

  getWallById(id: WallIdentifier) {
    return this.state.walls.find(wall => wall.id === id);
  }

  getWallsByPosition(position: Vector3, direction?: WALL_DIRECTION) {
    return this.state.walls.filter(
      wall =>
        wall.position.x === position.x &&
        wall.position.y === position.y &&
        wall.position.z === position.z &&
        (!direction || wall.direction === direction)
    );
  }

  getBackSideWallByPositionAndRotation(position: Vector3, rotation: ROTATION) {
    /**
     * Invertiert die Rotation, da wir die Wand auf der Rückseite suchen
     */
    const invertedRotation = invertRotation(rotation);
    /**
     * Erst alle Walls sammeln:
     * - Auf der aktuellen position
     * - Auf der position z:+1 mit Direction Horizontal
     * - Auf der position x:+1 mit Direction Vertical
     *
     * Dann je nach Rotation den passenden Wall zurückgeben
     */
    const possibleWalls = this.state.walls.filter(
      wall =>
        (wall.position.x === position.x &&
          wall.position.y === position.y &&
          wall.position.z === position.z) ||
        (wall.position.x === position.x &&
          wall.position.y === position.y &&
          wall.position.z === position.z + 1 &&
          wall.direction === WALL_DIRECTION.HORIZONTAL) ||
        (wall.position.x === position.x + 1 &&
          wall.position.y === position.y &&
          wall.position.z === position.z &&
          wall.direction === WALL_DIRECTION.VERTICAL)
    );

    switch (invertedRotation) {
      case ROTATION.NORTH: {
        return possibleWalls.find(
          wall =>
            wall.position.x === position.x &&
            wall.position.y === position.y &&
            wall.position.z === position.z &&
            wall.direction === WALL_DIRECTION.HORIZONTAL
        );
      }
      case ROTATION.EAST: {
        return possibleWalls.find(
          wall =>
            wall.position.x === position.x + 1 &&
            wall.position.y === position.y &&
            wall.position.z === position.z &&
            wall.direction === WALL_DIRECTION.VERTICAL
        );
      }
      case ROTATION.SOUTH: {
        return possibleWalls.find(
          wall =>
            wall.position.x === position.x &&
            wall.position.y === position.y &&
            wall.position.z === position.z + 1 &&
            wall.direction === WALL_DIRECTION.HORIZONTAL
        );
      }
      case ROTATION.WEST: {
        return possibleWalls.find(
          wall =>
            wall.position.x === position.x &&
            wall.position.y === position.y &&
            wall.position.z === position.z &&
            wall.direction === WALL_DIRECTION.VERTICAL
        );
      }
    }
  }

  async addWalls(wallDescriptions: WallDescription[], refresh = true) {
    wallDescriptions = wallDescriptions.filter(
      ({ position, direction }) =>
        !this.state.wallMap.has([position.x, position.y, position.z, direction])
    );

    if (wallDescriptions.length === 0) {
      return [];
    }

    const walls = await createWalls(wallDescriptions, this.isEditMode(), {
      animationLoop$: this.room.app.renderer.observables.animationLoop$,
      wallGeometryMap: this.state.baseWallGeometryMap!
    });

    walls.forEach(wall => {
      this.state.walls.push(wall);
      this.state.wallMap.set(
        [wall.position.x, wall.position.y, wall.position.z, wall.direction],
        wall
      );
      this.wallsByFloorMap.set(
        wall.position.y,
        (this.wallsByFloorMap.get(wall.position.y) || []).concat([wall])
      );
    });

    walls.forEach(wall => {
      this.room.app.renderer.modules.intersection?.globalListener.addMeshes(
        wall.getRaycasterMeshes()
      );
      this.room.addToRoot(wall.root!);
    });

    if (refresh) {
      const floors = Array.from(new Set(walls.map(wall => wall.position.y)));
      this.refreshWallRooms(floors);
      const descriptions = this.getWallsByFloor(floors).map(wall =>
        wall.toDescription()
      );
      for (const wall of this.state.walls) {
        wall.update(descriptions);
        await wall.refreshWallMeshes();
      }
      this.updateVisibility(this.room.app.renderer.camera, floors);
    }

    return walls;
  }

  removeWallsByDescriptions(
    wallDescriptions: WallDescription[],
    refresh = true
  ) {
    const wallsToRemove = this.state.walls.filter(wall =>
      wallDescriptions.some(desc => {
        return (
          desc.position.x === wall.position.x &&
          desc.position.y === wall.position.y &&
          desc.position.z === wall.position.z &&
          desc.direction === wall.direction
        );
      })
    );
    this.removeWalls(wallsToRemove, refresh);
  }

  async removeWalls(walls: Wall[], refresh = true) {
    walls = walls || this.state.walls;

    walls.forEach(wall => {
      this.room.app.renderer.modules.intersection?.globalListener.removeMeshes(
        wall.getRaycasterMeshes()
      );
      wall.destroy();
    });
    this.state.walls = this.state.walls.filter(w => !walls.includes(w));
    walls.forEach(wall => {
      this.state.wallMap.delete([
        wall.position.x,
        wall.position.y,
        wall.position.z,
        wall.direction
      ]);

      this.wallsByFloorMap.set(
        wall.position.y,
        (this.wallsByFloorMap.get(wall.position.y) || []).filter(
          w => w !== wall
        )
      );
    });

    if (refresh) {
      this.refreshWallRooms();
      const descriptions = this.state.walls.map(wall => wall.toDescription());
      for (const wall of this.state.walls) {
        wall.update(descriptions);
        await wall.refreshWallMeshes();
      }
      this.updateVisibility(this.room.app.renderer.camera);
    }
  }

  //#endregion

  wallsByFloorMap: Map<FloorIndex, Wall[]> = new Map();
  getWallsByFloor(floors?: FloorIndex[]) {
    if (floors === undefined) {
      return this.state.walls;
    }

    return floors.map(index => this.wallsByFloorMap.get(index) || []).flat();
  }

  test: number = 0;
  updateVisibility(camera: Camera, floors?: FloorIndex[]) {
    floors =
      floors ?? getFloorDescendingList(this.room.modules.floor.getFloor());

    this.getWallRooms().forEach(wallRoom => {
      wallRoom.setVisible(false);
    });
    this.state.walls.forEach(wall => {
      wall.setSize(getSizeByViewMode(this.state.viewMode));
      wall.setVisible(false);
    });

    const maxFloorIndex = Math.max(...floors);
    // console.log('Updating wall visibility for floors', floors, maxFloorIndex);
    this.getWallsByFloor(floors).forEach(wall => {
      wall.setSize(
        getSizeByViewMode(
          wall.position.y < maxFloorIndex
            ? WALL_VIEW_MODE.LARGE
            : this.state.viewMode
        )
      );
      wall.setVisible(true);
    });

    this.getWallRoomsByFloor(floors).forEach(wallRoom => {
      wallRoom.setVisible(true);
    });

    if (this.getViewMode() === WALL_VIEW_MODE.DYNAMIC) {
      this.getWallsToHideByTarget(camera, floors).forEach(wall =>
        wall.setSize(WALL_SIZE.SMALL)
      );
    }
  }

  getWallsToHideByTarget(camera: Camera, floors: FloorIndex[]) {
    const objectsToKeepVisible = Array<Object3D>()
      .concat(this.state.targets, this.state.wallRoomTargets)
      .filter(target => {
        return target.position.y / FLOOR_HEIGHT === floors[floors.length - 1];
      });

    const { targetBox, direction, raycaster, matrix, frustum } = this.wallState;

    matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(matrix);

    const visibleWalls = this.getWallsByFloor(floors.slice(-1)).reduce(
      (result, wall) => {
        if (frustum.intersectsBox(wall.getTmpBox())) {
          result.push(wall.root!);
        }
        return result;
      },
      [] as Object3D[]
    );

    const wallsToHide = new Set<Wall>();
    objectsToKeepVisible.forEach(target => {
      targetBox.setFromObject(target);

      const min = targetBox.min;
      const max = targetBox.max;

      const corners = [
        { x: min.x, y: min.y, z: min.z },
        { x: max.x, y: min.y, z: min.z },
        { x: min.x, y: max.y, z: min.z },
        { x: min.x, y: min.y, z: max.z },
        { x: max.x, y: max.y, z: min.z },
        { x: max.x, y: min.y, z: max.z },
        { x: min.x, y: max.y, z: max.z },
        { x: max.x, y: max.y, z: max.z }
      ];

      corners.forEach(corner => {
        this.wallState.direction
          .subVectors(corner, camera.position)
          .normalize();
        raycaster.set(camera.position, direction);

        const intersects = raycaster.intersectObjects(visibleWalls);

        if (intersects.length > 0) {
          const distanceToCorner = camera.position.distanceTo(corner);
          if (intersects[0] && intersects[0].distance < distanceToCorner) {
            const wallObj = this.room.app.renderer.scene.getObjectById(
              intersects[0].object.userData[OBJECT_USER_DATA.MAIN_OBJECT]
            );
            const wallId = getWallIdentifierFromObject(wallObj);
            const wall = this.getWallById(wallId!);
            if (!wall) {
              throw new Error('Wall not found in object parent chain');
            }
            wallsToHide.add(wall);
          }
        }

        if (this.debug) {
          createDebugRayLines(
            this.room,
            camera.position,
            direction,
            50,
            0x00ff00
          );
        }
      });
    });
    return wallsToHide;
  }

  //#region wallRooms

  getWallRooms() {
    return this.state.wallRooms;
  }

  getWallRoomsByFloor(floorIndex: FloorIndex[]) {
    return Array.from(this.state.wallRooms).filter(wallRoom =>
      floorIndex.includes(wallRoom.floor)
    );
  }

  updateActiveWallRooms() {
    const activeWallRooms = new Set<WallRoom>();
    [this.selectionPosition.clone().ceil()]
      .concat(
        Array.from(
          this.state.trackingUnits
            .values()
            .map(unit => unit.getPosition().ceil())
        )
      )
      .forEach(position => {
        const wallRoom = this.state.wallRoomTiles.get(
          position.toArray().toString()
        );
        if (wallRoom) {
          activeWallRooms.add(wallRoom);
        }
      });

    const noChanges =
      this.state.activeWallRooms.size === activeWallRooms.size &&
      Array.from(
        this.state.activeWallRooms.values().filter(a => activeWallRooms.has(a))
      ).length === activeWallRooms.size;

    if (!noChanges) {
      this.state.activeWallRooms.values().forEach(wallRoom => {
        if (!activeWallRooms.has(wallRoom)) {
          wallRoom.untrack();
          this.state.activeWallRooms.delete(wallRoom.id);
        }
      });

      this.state.wallRoomTargets = [];
      activeWallRooms.forEach(wallRoom => {
        if (!this.state.activeWallRooms.has(wallRoom.id)) {
          wallRoom.track();
          this.state.activeWallRooms.set(wallRoom.id, wallRoom);
        }

        this.state.wallRoomTargets.push(...wallRoom.meshes);
      });

      this.observables.activeWallRooms$.next(this.state.activeWallRooms);
    }
    return true;
  }

  removeWallRooms(floors?: FloorIndex[]) {
    if (floors === undefined) {
      this.state.wallRooms.forEach(wallRoom => wallRoom.destroy());
      this.state.wallRooms.clear();
      this.state.wallRoomTiles.clear();
    } else {
      this.state.wallRooms.forEach(wallRoom => {
        if (floors.includes(wallRoom.floor)) {
          this.state.wallRooms.delete(wallRoom);
          wallRoom.tiles.forEach(tile => {
            this.state.wallRoomTiles.get(
              `${tile.position.x},${floors},${tile.position.y}`
            );
          });
          wallRoom.destroy();
        }
      });
    }
  }

  refreshWallRooms(floors?: FloorIndex[], walls: Wall[] = this.state.walls) {
    if (this.state.wallRooms.size) {
      this.removeWallRooms(floors);
    }

    const roomsDescriptions = getWallRoomDescriptions(walls);
    const rooms = roomsDescriptions.map(
      desc => new WallRoom({ ...desc, debug: this.debug })
    );

    rooms.forEach(room => {
      room.tiles.forEach(tile => {
        tile.mesh.position.y = room.floor * FLOOR_HEIGHT;
        this.room.addToRoot(tile.mesh);
      });
    });

    rooms.forEach(room => {
      this.state.wallRooms.add(room);
    });
    this.observables.wallRooms$.next(this.state.wallRooms);

    this.state.wallRoomTiles = rooms.reduce((result, room) => {
      room.tiles.forEach(tile => {
        result.set(
          [tile.position.x, room.floor, tile.position.y].toString(),
          room
        );
      });
      return result;
    }, new Map<string, WallRoom>());
  }

  //#endregion
}

function createRayLine(
  origin: Vector3,
  direction: Vector3,
  length = 10,
  color = 0xff0000
) {
  const points = [
    origin.clone(),
    origin.clone().add(direction.clone().multiplyScalar(length))
  ];

  const geometry = new BufferGeometry().setFromPoints(points);
  const material = new LineBasicMaterial({ color });
  const line = new Line(geometry, material);
  line.userData = { [OBJECT_USER_DATA.IGNORE_INTERSECTION_SELECT]: true };
  return line;
}
function createDebugRayLines(
  room: Room,
  cameraPosition: Vector3,
  direction: Vector3,
  length = 10,
  color = 0x00ff00
) {
  const line = createRayLine(cameraPosition, direction, length, color);
  room.addToRoot(line);

  setTimeout(() => {
    room.root.remove(line);
    line.geometry.dispose();
    (line.material as Material).dispose();
  }, 1000);
}

// function getWallFromParent(object: Object3D | null): Wall | null {
//   if (!object) {
//     return null;
//   }
//   if (object.userData[OBJECT_USER_DATA.WALL]) {
//     return object.userData[OBJECT_USER_DATA.WALL];
//   }
//   return getWallFromParent(object.parent);
// }

function getFloorDescendingList(floorIndex: FloorIndex): FloorIndex[] {
  return Array(floorIndex + 1)
    .fill(0)
    .map((_, index) => index);
}

function getSizeByViewMode(viewMode: WALL_VIEW_MODE): WALL_SIZE {
  if (viewMode === WALL_VIEW_MODE.SMALL) {
    return WALL_SIZE.SMALL;
  } else if (viewMode === WALL_VIEW_MODE.LARGE) {
    return WALL_SIZE.LARGE;
  } else if (viewMode === WALL_VIEW_MODE.DYNAMIC) {
    return WALL_SIZE.LARGE;
  }
  return WALL_SIZE.LARGE;
}
