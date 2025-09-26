import {
  Box3,
  type Camera,
  Frustum,
  Matrix4,
  Object3D,
  type InstancedMesh
} from 'three';
import RoomModule, { type RoomModuleState } from '../RoomModule';
import { createGroundChunks } from '../../utils/ground';
import type Room from '../Room';

interface State extends RoomModuleState {
  groundChunks: InstancedMesh[];
  groundMesh: Object3D | null;
}
export default class GroundModule extends RoomModule<State> {
  static override TYPE = 'ground';

  private frustum: Frustum;
  private projScreenMatrix: Matrix4;

  state: State = {
    groundChunks: [],
    groundMesh: null
  };

  constructor(room: Room, debug: boolean = false) {
    super(room, debug);
    this.frustum = new Frustum();
    this.projScreenMatrix = new Matrix4();
  }

  override destroy(): void {
    this.state.groundChunks.forEach(chunk => {
      chunk.geometry.dispose();
      if (Array.isArray(chunk.material)) {
        chunk.material.forEach(mat => mat.dispose());
      } else {
        chunk.material.dispose();
      }
    });
    if (this.state.groundMesh) {
      this.room.mesh.remove(this.state.groundMesh);
      this.state.groundMesh = null;
    }
    super.destroy();
  }

  override setup(): void {
    this.setupGround();
  }

  override updateThrottle500ms(
    _time: number,
    options: { camera: Camera }
  ): void {
    this.updateVisibility(options.camera);
  }

  setupGround() {
    const description = this.room.description;
    if (!description) {
      throw new Error('Room description is not set');
    }
    const groundMesh = new Object3D();
    groundMesh.name = 'ground';

    this.state.groundChunks = createGroundChunks(this.room.grid, 16);
    this.state.groundChunks.forEach(chunk => groundMesh.add(chunk));

    this.state.groundMesh = groundMesh;
    this.room.mesh.add(groundMesh);
  }

  updateVisibility(camera: Camera) {
    this.projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    this.frustum.setFromProjectionMatrix(this.projScreenMatrix);
    this.state.groundChunks.forEach(chunk => {
      const box = new Box3().setFromObject(chunk);
      chunk.visible = this.frustum.intersectsBox(box);
    });
  }
}
