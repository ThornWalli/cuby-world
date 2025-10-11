import type { Material, Mesh } from 'three';
import { Object3D, BoxGeometry, MeshBasicMaterial, InstancedMesh } from 'three';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import { WALL_VIEW_MODE, type WallRoom } from './Wall';
import { OBJECT_NAME } from '../Unit';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends RoomModuleObservables {}

interface State extends RoomModuleState {
  visible: boolean;
}

export default class RoofModule extends RoomModule<State, Observables> {
  static override TYPE = 'roof';

  state: State = {
    visible: false
  };

  root?: Object3D = new Object3D();
  meshes: Mesh[] = [];

  override setup(): void {
    super.setup();

    // this.setupRoot();

    this.subscription.add(
      this.room.modules.wall.observables.activeWallRooms$.subscribe(
        this.onChangeActiveWallRooms.bind(this)
      )
    );

    this.subscription.add(
      this.room.modules.wall.observables.viewMode$.subscribe(viewMode => {
        this.toggle(viewMode === WALL_VIEW_MODE.LARGE);
      })
    );
  }

  //#region methods

  createMesh(wallRooms: Set<WallRoom>) {
    wallRooms.forEach(room => {
      const instancedMesh = new InstancedMesh(
        new BoxGeometry(1, 0.1, 1),
        new MeshBasicMaterial({
          color: 0x333333,
          transparent: true
        }),
        room.tiles.length
      );
      instancedMesh.name = OBJECT_NAME.MESH;
      room.tiles.forEach((tile, index) => {
        const helper = new Object3D();
        helper.updateMatrix();
        helper.matrix.makeTranslation(tile.position.x, 0, tile.position.y);
        instancedMesh.setMatrixAt(index, helper.matrix);
      });
      instancedMesh.userData.wallRoom = room;
      instancedMesh.instanceMatrix.needsUpdate = true;
      instancedMesh.castShadow = true;
      instancedMesh.receiveShadow = true;
      this.root!.add(instancedMesh);
      this.meshes.push(instancedMesh);
    });
  }

  setupRoot() {
    this.subscription.add(
      this.room.modules.wall.observables.wallRooms$.subscribe(wallRooms => {
        if (this.root) {
          this.room.app.renderer.scene.remove(this.root);
        }
        this.root = new Object3D();
        this.root.add(this.createMesh(wallRooms)!);
        this.root.position.y = 2;
        this.root.raycast = () => void 0;
        this.room.app.renderer.scene.add(this.root);
      })
    );
  }

  show(meshes = this.meshes) {
    meshes.forEach(mesh => {
      const material = mesh.material as Material;
      material.opacity = 1;
      material.depthWrite = true;
    });
  }

  hide(meshes = this.meshes) {
    meshes.forEach(mesh => {
      const material = mesh.material as Material;
      material.opacity = 0;
      material.depthWrite = false;
    });
  }

  toggle(value: boolean, meshes = this.meshes) {
    if (value) {
      this.show(meshes);
    } else {
      this.hide(meshes);
    }
  }

  //#endregion

  //#region events

  onChangeActiveWallRooms(wallRooms: Map<string, WallRoom>) {
    this.meshes.forEach(mesh => {
      this.toggle(!wallRooms.get((mesh.userData.wallRoom as WallRoom).id), [
        mesh
      ]);
    });
  }

  //#endregion
}
