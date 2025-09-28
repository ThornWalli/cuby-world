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
import RoomModule, { type RoomModuleState } from '../RoomModule';
import type Wall from '../Wall';
import type { WALL_GEOMETRY, WallRoomDescription } from '../../utils/wall';
import createWalls, {
  getWallKey,
  getWallRoomDescriptions,
  loadWallGeometries
} from '../../utils/wall';
import {
  ReplaySubject,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs';
import type Unit from '../Unit';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type Room from '../Room';
import { OBJECT_NAME } from '../Unit';
import type { WALL_DIRECTION, WallDescription } from '../Wall';
import { APP_MODE } from '../App';

import MeshWall from '../../../assets/wall/wall.glb?url';

interface WallRoomTile {
  mesh: Mesh;
  position: Vector2;
}

class WallRoom implements Omit<WallRoomDescription, 'tiles'> {
  debug: boolean = false;
  id: string;
  tiles: WallRoomTile[];
  centroid: Vector2;
  size: number;
  meshes: Mesh[] = [];

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
  wallMap: Map<string, Wall>;
  targets: Mesh[];
  wallRoomTargets: Mesh[];
  activeWallRooms: Map<string, WallRoom>;
  wallRooms: Set<WallRoom>;
  wallRoomTiles: Map<string, WallRoom>;
  trackingUnits: Set<Unit>;
  baseWallGeometries: Map<WALL_GEOMETRY, BufferGeometry | null>;
}
export default class WallModule extends RoomModule<State> {
  static override TYPE = 'wall';

  state: State = {
    viewMode: WALL_VIEW_MODE.DYNAMIC,
    walls: [],
    wallMap: new Map(),
    targets: [],
    wallRoomTargets: [],
    activeWallRooms: new Map(),
    wallRooms: new Set(),
    wallRoomTiles: new Map(),
    trackingUnits: new Set<Unit>(),
    baseWallGeometries: new Map<WALL_GEOMETRY, BufferGeometry>()
  };

  viewMode$ = new ReplaySubject<WALL_VIEW_MODE>(0);
  currentWallRoom$ = new ReplaySubject<WallRoomDescription>(0);

  addUnitForTracking(unit: Unit) {
    this.state.trackingUnits.add(unit);
  }
  removeUnitForTracking(unit: Unit) {
    this.state.trackingUnits.delete(unit);
  }

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

  selectionPosition: Vector3 = new Vector3();
  override async setup(): Promise<void> {
    const description = this.room.description;
    if (!description) {
      throw new Error('Room description is not set');
    }
    this.state.baseWallGeometries = await loadWallGeometries(
      this.room.app.assetLoader,
      MeshWall
    );

    this.addedWalls(description.walls);

    this.subscription.add(
      this.room.app.modules.player.currentPlayer$
        .pipe(
          switchMap(player => player.unit$),
          switchMap(unit => unit.ready$),
          switchMap(unit => unit.position$),
          map(position => position.clone().ceil()),
          distinctUntilChanged((a, b) => a.equals(b))
        )
        .subscribe(() => {
          if (this.updateActiveWallRooms()) {
            console.log('Wall rooms changed');
            this.updateVisibility(this.room.app.renderer.camera);
          }
        })
    );

    this.subscription.add(
      this.room.modules.selection.position$
        .pipe(debounceTime(500))
        .subscribe(position => {
          this.selectionPosition = position;
          // this.updateTotalVisibility({ camera: this.room.app.renderer.camera });
        })
    );

    this.subscription.add(
      this.room.modules.selection.selectionVisible$.subscribe(visible => {
        const selectionObject =
          this.room.modules.selection.state.selectionMesh?.getObjectByName(
            OBJECT_NAME.RAYCASTER
          ) as Mesh;
        if (!selectionObject) {
          return;
        }
        if (visible) {
          this.addTarget(selectionObject);
        } else {
          this.removeTarget(selectionObject);
        }
      })
    );

    this.subscription.add(
      this.room.app.modules.player.currentPlayer$
        .pipe(switchMap(player => player.unit$))
        .subscribe(unit => {
          this.addUnitForTracking(unit);
        })
    );

    this.room.app.modules.player.currentPlayer$
      .pipe(
        switchMap(player => player.unit$),
        switchMap(unit => unit.ready$),
        map(unit => unit.mesh),
        filter(Boolean)
      )
      .subscribe(mesh => {
        this.state.targets.push(mesh);
      });
  }

  getViewMode() {
    return this.state.viewMode;
  }

  toggleViewMode() {
    const modes = Object.values(WALL_VIEW_MODE);
    this.state.viewMode =
      modes[(modes.indexOf(this.state.viewMode) + 1) % modes.length]!;
    this.updateVisibility(this.room.app.renderer.camera);
    this.viewMode$.next(this.state.viewMode);
  }

  getWalls() {
    return this.state.walls.map(wall => wall);
  }

  getWallByPosition(position: Vector2, direction?: WALL_DIRECTION) {
    return this.state.walls.find(
      wall =>
        wall.position.x === position.x &&
        wall.position.z === position.y &&
        (!direction || wall.direction === direction)
    );
  }

  addedWalls(wallDescriptions: WallDescription[]) {
    wallDescriptions = wallDescriptions.filter(
      ({ position, direction }) =>
        !this.state.wallMap.has(getWallKey(position.x, position.y, direction))
    );

    if (wallDescriptions.length === 0) {
      return [];
    }

    const walls = createWalls(
      wallDescriptions,
      this.room.app.config.mode === APP_MODE.EDITOR,
      {
        assetLoader: this.room.app.assetLoader,
        wallGeometries: this.state.baseWallGeometries!
      }
    );

    walls.forEach(wall => {
      this.state.walls.push(wall);
      this.state.wallMap.set(
        getWallKey(wall.position.x, wall.position.z, wall.direction),
        wall
      );
    });

    walls.forEach(wall => {
      this.room.mesh.add(wall.root!);
    });

    this.createWallRooms(this.state.walls);

    const descriptions = this.state.walls.map(wall => wall.description);

    // const test2 = new Set<Wall>();
    // walls.forEach(wall => {
    //   const neighbors = findNeighbors(wall.description, descriptions);
    //   Array.from(neighbors.values())
    //     .flat()
    //     .map(neighborWall => {
    //       return this.state.wallMap.get(
    //         getWallKey(
    //           neighborWall.position.x,
    //           neighborWall.position.y,
    //           neighborWall.direction
    //         )
    //       );
    //     })
    //     .filter(Boolean)
    //     .forEach(neighborWall => test2.add(neighborWall!));

    //   test2.add(wall);
    // });
    // console.log('test', Array.from(test2));
    // test2.forEach(wall => {
    //   wall.update(descriptions);
    //   wall.refreshObjects();
    // });
    //
    this.state.walls.forEach(wall => {
      wall.update(descriptions);
      wall.refreshObjects();
    });

    this.updateVisibility(this.room.app.renderer.camera);

    return walls;
  }

  removeWallsByDescriptions(wallDescriptions: WallDescription[]) {
    const wallsToRemove = this.state.walls.filter(wall =>
      wallDescriptions.some(desc => {
        return (
          desc.position.x === wall.position.x &&
          desc.position.y === wall.position.z &&
          desc.direction === wall.direction
        );
      })
    );
    this.removeWalls(wallsToRemove);
  }

  removeWalls(walls: Wall[]) {
    walls = walls || this.state.walls;

    this.createWallRooms();

    // this.state.wallRooms.forEach(room => room.destroy());
    // this.state.wallRooms = [];
    // this.state.wallRoomTiles = new Map();

    walls.forEach(wall => {
      wall.destroy();
    });
    this.state.walls = this.state.walls.filter(w => !walls.includes(w));
    walls.forEach(wall => {
      this.state.wallMap.delete(
        getWallKey(wall.position.x, wall.position.z, wall.direction)
      );
    });
  }

  createWallRooms(walls: Wall[] = this.state.walls) {
    console.log('createWallRooms', walls);
    if (this.state.wallRooms.size) {
      // Remove existing wall rooms
      this.state.wallRooms.forEach(room => room.destroy());
      this.state.wallRooms.clear();
      this.state.wallRoomTiles.clear();
    }

    const roomsDescriptions = getWallRoomDescriptions(walls);
    console.log('roomsDescriptions', roomsDescriptions);
    const rooms = roomsDescriptions.map(
      desc => new WallRoom({ ...desc, debug: this.debug })
    );

    rooms.forEach(room => {
      room.tiles.forEach(tile => {
        this.room.mesh.add(tile.mesh);
      });
    });

    rooms.forEach(room => {
      this.state.wallRooms.add(room);
    });

    this.state.wallRoomTiles = rooms.reduce((result, room) => {
      room.tiles.forEach(tile => {
        result.set(tile.position.toArray().toString(), room);
      });
      return result;
    }, new Map<string, WallRoom>());
  }

  wallState: {
    direction: Vector3;
    targetBox: Box3;
    raycaster: Raycaster;
    matrix: Matrix4;
    frustum: Frustum;
    wallsToHide: Set<Wall>;
  } = {
    targetBox: new Box3(),
    direction: new Vector3(),
    raycaster: new Raycaster(),
    wallsToHide: new Set(),
    matrix: new Matrix4(),
    frustum: new Frustum()
  };

  private lastViewMode?: WALL_VIEW_MODE;

  updateVisibility(camera: Camera) {
    if (this.lastViewMode !== this.state.viewMode) {
      this.state.walls.forEach(wall => wall.show());
    }

    if (this.state.viewMode === WALL_VIEW_MODE.SMALL) {
      this.state.walls.forEach(wall => wall.hide());
      return;
    } else if (this.state.viewMode === WALL_VIEW_MODE.LARGE) {
      this.state.walls.forEach(wall => wall.show());
      return;
    } else if (this.state.viewMode === WALL_VIEW_MODE.DYNAMIC) {
      this.state.walls.forEach(wall => wall.show());
    }

    const objectsToKeepVisible = Array<Mesh>().concat(
      this.state.targets,
      this.state.wallRoomTargets
    );

    const { targetBox, direction, raycaster, matrix, frustum, wallsToHide } =
      this.wallState;

    wallsToHide.forEach(wall => {
      wall.show();
    });

    wallsToHide.clear();

    matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(matrix);

    const visibleWalls = this.state.walls.reduce((result, wall) => {
      if (frustum.intersectsBox(wall.tmpBox)) {
        result.push(wall.root!);
      }
      return result;
    }, [] as Object3D[]);

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
        // console.log(intersects);
        if (intersects.length > 0) {
          const distanceToCorner = camera.position.distanceTo(corner);
          if (intersects[0] && intersects[0].distance < distanceToCorner) {
            wallsToHide.add(intersects[0].object.parent!.userData.wall);
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
    wallsToHide.forEach(wall => {
      wall.hide();
    });
  }

  // override updateThrottle500ms(
  //   _time: number,
  //   options: { camera: Camera }
  // ): void {
  //   if (options.camera) {
  //     // this.updateVisibility(options.camera);
  //   }
  // }

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
          `${position.x},${position.z}`
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
    }
    return true;
  }
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
  line.userData = { ignoreSelect: true };
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
  room.mesh.add(line);

  setTimeout(() => {
    room.mesh.remove(line);
    line.geometry.dispose();
    (line.material as Material).dispose();
  }, 1000);
}
