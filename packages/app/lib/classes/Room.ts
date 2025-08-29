import type { Camera, InstancedMesh, Vector3 } from 'three';
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

export default class Room {
  units = new Map<string, Unit>();
  mesh = new Object3D();
  groundMesh?: Object3D;
  selectionMesh?: Object3D;

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
    this.units.set(unit.id, unit);
    console.log('Adding unit:', unit.name, 'with ID:', unit.id);
    this.mesh.add(unit.root);
  }

  remove(unit: Unit) {
    this.units.delete(unit.id);
    this.mesh.remove(unit.root);
  }

  getById(id: string): Unit | undefined {
    return this.units.get(id);
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

  updateUnitsVisibility(camera: Camera) {
    const frustum = new Frustum();
    const projScreenMatrix = new Matrix4();
    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(projScreenMatrix);
    this.units.forEach(unit => {
      const box = new Box3().setFromObject(unit.root);
      unit.root.visible = frustum.intersectsBox(box);
    });
  }
  updateChunksVisibility(camera: Camera) {
    const frustum = new Frustum();
    const projScreenMatrix = new Matrix4();

    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
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

  update(_time: number) {
    this.updateChunksVisibility(this.app.renderer.camera);
    this.units.forEach(unit => {
      unit.update(_time);
    });
  }

  setSelectionPosition(position: Vector3) {
    this.selectionMesh!.position.copy(position);
  }
}
