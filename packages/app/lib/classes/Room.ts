import { Object3D } from 'three';
import type Unit from './Unit';
import * as THREE from 'three';
import { createGroundChunks } from '../utils/ground';
import type RoomDescription from './RoomDescription';
import type App from './App';

export default class Room {
  units = new Map<string, Unit>();
  mesh = new Object3D();
  groundMesh?: Object3D;
  selectionMesh?: Object3D;
  description: RoomDescription | undefined;

  constructor(public app: App) {
    this.mesh = new Object3D();
    this.mesh.name = 'room';

    this.setupSelection();
  }

  get gridSize() {
    return new THREE.Vector2(
      this.description?.grid[0]?.length || 0,
      this.description?.grid.length || 0
    );
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
    const outerShape = new THREE.Shape();
    const outerSize = size;
    outerShape.moveTo(-outerSize / 2, -outerSize / 2);
    outerShape.lineTo(outerSize / 2, -outerSize / 2);
    outerShape.lineTo(outerSize / 2, outerSize / 2);
    outerShape.lineTo(-outerSize / 2, outerSize / 2);
    outerShape.lineTo(-outerSize / 2, -outerSize / 2);

    const innerShape = new THREE.Path();
    const innerSize = size * (4 / 5);
    innerShape.moveTo(-innerSize / 2, -innerSize / 2);
    innerShape.lineTo(innerSize / 2, -innerSize / 2);
    innerShape.lineTo(innerSize / 2, innerSize / 2);
    innerShape.lineTo(-innerSize / 2, innerSize / 2);
    innerShape.lineTo(-innerSize / 2, -innerSize / 2);

    outerShape.holes.push(innerShape);

    const geometry = new THREE.ShapeGeometry(outerShape);
    geometry.translate(0, 0, 0.1);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const selectionMesh = new THREE.Mesh(geometry, material);
    selectionMesh.position.set(0, 0, 0);

    this.mesh.add(selectionMesh);
    this.selectionMesh = selectionMesh;
  }

  groundChunks: THREE.InstancedMesh[] = [];
  setupGround(tileGrid: number[][]) {
    const groundMesh = new THREE.Object3D();
    groundMesh.name = 'ground';

    this.groundChunks = createGroundChunks(tileGrid, 16);
    this.groundChunks.forEach(chunk => groundMesh.add(chunk));

    this.groundMesh = groundMesh;
    this.mesh.add(groundMesh);
  }

  updateUnitsVisibility(camera: THREE.Camera) {
    const frustum = new THREE.Frustum();
    const projScreenMatrix = new THREE.Matrix4();
    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(projScreenMatrix);
    this.units.forEach(unit => {
      const box = new THREE.Box3().setFromObject(unit.root);
      unit.root.visible = frustum.intersectsBox(box);
    });
  }
  updateChunksVisibility(camera: THREE.Camera) {
    const frustum = new THREE.Frustum();
    const projScreenMatrix = new THREE.Matrix4();

    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(projScreenMatrix);
    this.groundChunks.forEach(chunk => {
      const box = new THREE.Box3().setFromObject(chunk);
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
    return new THREE.Vector2(
      this.description?.grid[0]?.length || 0,
      this.description?.grid.length || 0
    );
  }

  update(_time: number) {
    this.updateChunksVisibility(this.app.renderer.camera);
    this.units.forEach(unit => {
      unit.update(_time);
    });
  }
}
