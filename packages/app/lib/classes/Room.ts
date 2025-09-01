import type { Vector3, Camera, InstancedMesh } from 'three';
import {
  Box3,
  Frustum,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Path,
  Shape,
  ShapeGeometry,
  Vector2
} from 'three';
import type Unit from './Unit';
import { createGroundChunks } from '../utils/ground';
import type RoomDescription from './RoomDescription';
import type App from './App';
import RoomGrid from './RoomGrid';
import { distinctUntilChanged, map } from 'rxjs';
import UnitChunkManager from './UnitChunkManager';

class PositionMap {
  data = new Map<string, Unit[]>();
  listsByUnits = new Map<string, Unit[][]>();

  getKey(position: Vector3) {
    return position.clone().floor().toArray().toString();
  }

  getByPosition(position: Vector3) {
    const key = this.getKey(position);
    return this.data.get(key) || [];
  }

  remove(unit: Unit) {
    if (this.listsByUnits.has(unit.id)) {
      const lists = this.listsByUnits.get(unit.id)!;
      lists.forEach(list => {
        const index = list.indexOf(unit);
        if (index !== -1) {
          list.splice(index, 1);
        }
      });
    }
  }

  add(unit: Unit) {
    // Entferne die Unit aus allen vorherigen Positionen
    this.remove(unit);

    unit.getMatrixPositions().forEach(pos => {
      const key = this.getKey(pos);
      const list = this.data.get(key) || [];
      list.push(unit);
      if (!this.listsByUnits.has(unit.id)) {
        this.listsByUnits.set(unit.id, []);
      }
      this.listsByUnits.get(unit.id)?.push(list);

      this.data.set(key, list);
    });
  }
}

export default class Room {
  mesh = new Object3D();
  groundMesh?: Object3D;
  selectionMesh?: Object3D;

  units = new Map<string, Unit>();

  /**
   * Gibt eine Liste an Units zurück die auf der Position liegen.
   */
  untiPositionMap = new PositionMap();
  chunkManager: UnitChunkManager = new UnitChunkManager();

  private _grid: RoomGrid;
  get grid() {
    return this._grid;
  }

  description?: RoomDescription;

  constructor(
    public app: App,
    grid: RoomGrid = new RoomGrid([], 0, 0)
  ) {
    this._grid = grid;
    this.mesh = new Object3D();
    this.mesh.name = 'room';

    this.setupSelection();
  }

  get gridSize() {
    return new Vector2(this.grid.width, this.grid.height);
  }
  async add(unit: Unit) {
    await unit.setup({
      unit,
      assetLoader: this.app.texturePreloader,
      room: this
    });

    unit.subscription.add(
      unit.position$
        .pipe(
          map(pos => pos.clone().floor()),
          distinctUntilChanged((prev, next) => prev.equals(next))
        )
        .subscribe(() => {
          this.untiPositionMap.add(unit);
          this.chunkManager.assignToChunk(unit);
        })
    );
    this.units.set(unit.id, unit);
    this.chunkManager.assignToChunk(unit);
    this.mesh.add(unit.root);
  }

  remove(unit: Unit) {
    this.units.delete(unit.id);
    this.chunkManager.removeFromChunk(unit);
    this.mesh.remove(unit.root);
  }

  getById(id: string): Unit | undefined {
    return this.units.get(id);
  }

  isPositionFree(position: Vector3, ignoredUnits?: Unit[]) {
    return (
      this.untiPositionMap
        .getByPosition(position)
        .filter(
          unit =>
            !unit.accessible && (!ignoredUnits || !ignoredUnits.includes(unit))
        ).length === 0
    );
  }

  setupSelection() {
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
    const material = new MeshBasicMaterial({ color: 0xffffff });
    const selectionMesh = new Mesh(geometry, material);
    selectionMesh.position.set(0, 0, 0);

    this.mesh.add(selectionMesh);
    this.selectionMesh = selectionMesh;
  }

  groundChunks: InstancedMesh[] = [];
  setupGround(roomGrid: RoomGrid) {
    const groundMesh = new Object3D();
    groundMesh.name = 'ground';

    this.groundChunks = createGroundChunks(roomGrid, 16);
    this.groundChunks.forEach(chunk => groundMesh.add(chunk));

    this.groundMesh = groundMesh;
    this.mesh.add(groundMesh);
  }

  updateVisibility(camera: Camera) {
    const frustum = new Frustum();
    const projScreenMatrix = new Matrix4();
    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );

    const units = this.chunkManager.updateVisibility(camera);
    this.updateChunksVisibility(frustum, projScreenMatrix);
    return { units };
  }

  updateUnitsVisibility(frustum: Frustum, projScreenMatrix: Matrix4) {
    frustum.setFromProjectionMatrix(projScreenMatrix);
    return this.units.values().reduce((result, unit) => {
      const box = new Box3().setFromObject(unit.root);
      unit.root.visible = frustum.intersectsBox(box);
      result.push(unit);
      return result;
    }, [] as Unit[]);
  }
  updateChunksVisibility(frustum: Frustum, projScreenMatrix: Matrix4) {
    frustum.setFromProjectionMatrix(projScreenMatrix);
    this.groundChunks.forEach(chunk => {
      const box = new Box3().setFromObject(chunk);
      chunk.visible = frustum.intersectsBox(box);
    });
  }

  async setupUnits(units: Unit[]) {
    await Promise.all(
      units.map(unit => {
        this.add(unit);
      })
    );
  }

  getSize() {
    return new Vector2(this.grid.width, this.grid.height);
  }

  update(time: number) {
    this.visibleUnits.forEach(unit => {
      unit.update(time);
    });
  }

  visibleUnits: Unit[] = [];
  updateThrottle(_time: number) {
    const { units: visibleUnits } = this.updateVisibility(
      this.app.renderer.camera
    );
    this.visibleUnits = visibleUnits;
  }

  setSelectionPosition(position: Vector3) {
    this.selectionMesh!.position.copy(position);
  }
}
