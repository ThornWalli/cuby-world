import {
  type Object3D,
  type Material,
  type Camera,
  Box3,
  BufferGeometry,
  Frustum,
  Line,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  type Vector2,
  PlaneGeometry,
  Raycaster,
  Vector3
} from 'three';
import RoomModule, { type RoomModuleState } from '../RoomModule';
import type Wall from '../Wall';
import createWalls, {
  getWallRoomDescriptions,
  type WallRoomDescription
} from '../../utils/wall';
import { concatMap, ReplaySubject, map, filter } from 'rxjs';
import type Unit from '../Unit';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type Room from '../Room';
import { OBJECT_NAME } from '../Unit';

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

  private materials: {
    default: Material;
    track: Material;
    untrack: Material;
  } = {
    default: new MeshBasicMaterial({
      color: 0x000000,
      opacity: 0,
      transparent: true
    }),
    track: new MeshBasicMaterial({ color: 0x00ff00 }),
    untrack: new MeshBasicMaterial({
      color: 0xff0000
    })
  };

  constructor(desc: WallRoomDescription & { debug?: boolean }) {
    this.debug = desc.debug ?? false;
    this.id = desc.id;
    this.centroid = desc.centroid;
    this.size = desc.size;
    this.tiles = desc.tiles.map(tile => {
      const mesh = this.createWallRoomTileMergedMesh(tile);
      this.meshes.push(mesh);
      return { mesh, position: tile };
    });
  }

  track() {
    if (this.debug) {
      this.tiles.forEach(tile => {
        tile.mesh.material = this.materials.track;
      });
    }
  }
  untrack() {
    if (this.debug) {
      this.tiles.forEach(tile => {
        tile.mesh.material = this.materials.untrack;
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
      this.debug ? this.materials.untrack : this.materials.default
    );
  }
}

interface State extends RoomModuleState {
  currentWallRoom?: WallRoomDescription;
  walls: Wall[];
  targets: Mesh[];
  activeWallRooms: Map<string, WallRoom>;
  wallRooms: WallRoom[];
  wallRoomTiles: Map<string, WallRoom>;
  trackingUnits: Set<Unit>;
}
export default class WallModule extends RoomModule<State> {
  static override TYPE = 'wall';

  state: State = {
    walls: [],
    targets: [],
    activeWallRooms: new Map(),
    wallRooms: [],
    wallRoomTiles: new Map(),
    trackingUnits: new Set<Unit>()
  };

  addUnitForTracking(unit: Unit) {
    this.state.trackingUnits.add(unit);
  }
  removeUnitForTracking(unit: Unit) {
    this.state.trackingUnits.delete(unit);
  }

  currentWallRoom$ = new ReplaySubject<WallRoomDescription>(0);

  addTarget(mesh: Mesh | Object3D) {
    const raycasterMesh = mesh.getObjectByName(OBJECT_NAME.RAYCASTER) ?? mesh;
    if (raycasterMesh instanceof Mesh) {
      this.state.targets.push(raycasterMesh);
    } else {
      throw new Error('Only Mesh objects can be added as targets');
    }
  }
  override setup(): void {
    this.setupWalls();

    const selectionObject =
      this.room.modules.selection.state.selectionMesh?.getObjectByName(
        OBJECT_NAME.RAYCASTER
      ) as Mesh;
    if (selectionObject) {
      this.state.targets.push(selectionObject);
    }

    this.subscription.add(
      this.room.app.modules.player.currentPlayer$
        .pipe(concatMap(player => player.unit$))
        .subscribe(unit => {
          this.addUnitForTracking(unit);
        })
    );

    this.room.app.modules.player.currentPlayer$
      .pipe(
        concatMap(player => player.unit$),
        concatMap(unit => unit.ready$),
        map(unit => unit.mesh),
        filter(Boolean)
      )
      .subscribe(mesh => {
        this.state.targets.push(mesh);
      });
  }

  setupWalls() {
    const description = this.room.description;
    if (!description) {
      throw new Error('Room description is not set');
    }
    const walls = createWalls(description.walls, this.room.app.assetLoader);

    this.state.walls = walls;

    walls.forEach(wall => {
      this.room.mesh.add(wall.root!);
    });

    this.createWallRooms();
  }

  createWallRooms() {
    const description = this.room.description;
    if (!description) {
      throw new Error('Room description is not set');
    }
    const roomsDescriptions = getWallRoomDescriptions(description.walls);
    const rooms = roomsDescriptions.map(
      desc => new WallRoom({ ...desc, debug: this.debug })
    );

    rooms.forEach(room => {
      room.tiles.forEach(tile => {
        this.room.mesh.add(tile.mesh);
      });
    });

    this.state.wallRooms = rooms;
    this.state.wallRoomTiles = rooms.reduce((result, room) => {
      room.tiles.forEach(tile => {
        result.set(tile.position.toArray().toString(), room);
      });
      return result;
    }, new Map<string, WallRoom>());
  }

  wallDetectionHelper: {
    direction: Vector3;
    targetBox: Box3;
    raycaster: Raycaster;
    matrix: Matrix4;
    frustum: Frustum;
    tempBox: Box3;
    wallsToHide: Set<Wall>;
  } = {
    targetBox: new Box3(),
    direction: new Vector3(),
    raycaster: new Raycaster(),
    wallsToHide: new Set(),
    matrix: new Matrix4(),
    frustum: new Frustum(),
    tempBox: new Box3()
  };

  updateVisibility(camera: Camera) {
    const objectsToKeepVisible = this.state.targets;
    const allWalls = this.state.walls.map(wall => {
      wall.show();
      return wall.root!;
    });

    const {
      targetBox,
      direction,
      raycaster,
      matrix,
      frustum,
      tempBox,
      wallsToHide
    } = this.wallDetectionHelper;

    wallsToHide.clear();

    camera.updateMatrixWorld();
    matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(matrix);

    const visibleWalls = allWalls.filter(wall => {
      tempBox.setFromObject(wall);
      return frustum.intersectsBox(tempBox);
    });

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
        this.wallDetectionHelper.direction
          .subVectors(corner, camera.position)
          .normalize();
        raycaster.set(camera.position, direction);

        const intersects = raycaster.intersectObjects(visibleWalls, true);

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

  override updateThrottle(_time: number, options: { camera: Camera }): void {
    if (options.camera) {
      this.updateVisibility(options.camera);
    }

    const activeWallRooms = new Set<WallRoom>();
    this.state.trackingUnits.forEach(unit => {
      const position = unit.getPosition().ceil();
      const wallRoom = this.state.wallRoomTiles.get(
        `${position.x},${position.z}`
      );
      if (wallRoom) {
        activeWallRooms.add(wallRoom);
      }
    });

    this.state.activeWallRooms.values().forEach(wallRoom => {
      if (!activeWallRooms.has(wallRoom)) {
        wallRoom.untrack();
        this.state.targets = this.state.targets.filter(
          target => !wallRoom.meshes.includes(target)
        );
        this.state.activeWallRooms.delete(wallRoom.id);
      }
    });

    activeWallRooms.forEach(wallRoom => {
      if (!this.state.activeWallRooms.has(wallRoom.id)) {
        wallRoom.track();
        this.state.targets.push(...wallRoom.meshes);
        this.state.activeWallRooms.set(wallRoom.id, wallRoom);
      }
    });
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
