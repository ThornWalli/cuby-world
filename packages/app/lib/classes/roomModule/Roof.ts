import {
  ExtrudeGeometry,
  Mesh,
  MeshPhongMaterial,
  Shape,
  Vector2,
  type Material
} from 'three';
import { Object3D, DoubleSide } from 'three';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import { WALL_VIEW_MODE, type WallRoom } from './Wall';

import { FLOOR_HEIGHT } from '../../utils/ground';

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

    this.setupRoot();

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

  createMesh(wallRooms: Set<WallRoom>): Mesh[] {
    const depth = 0.11;
    const meshes: Mesh[] = [];

    for (const room of wallRooms) {
      const stairPositions = new Set(
        room.tiles
          .filter(t => this.room.modules.stair.isStairAt(t.position))
          .map(t => `${t.position.x},${t.position.y}`)
      );

      for (const tile of room.tiles) {
        const x = tile.position.x;
        const y = tile.position.y;

        if (stairPositions.has(`${x},${y}`)) continue;

        const shape = new Shape([
          new Vector2(x, y),
          new Vector2(x + 1, y),
          new Vector2(x + 1, y + 1),
          new Vector2(x, y + 1)
        ]);

        const geom = new ExtrudeGeometry(shape, { depth, bevelEnabled: false });

        const mesh = new Mesh(
          geom,
          new MeshPhongMaterial({
            color: 0x9e9e9e,
            side: DoubleSide,
            transparent: true
          })
        );

        if (this.room.modules.wall.state.viewMode !== WALL_VIEW_MODE.LARGE) {
          mesh.material.opacity = 0;
          (mesh.material as Material).depthWrite = false;
        }

        mesh.receiveShadow = true;
        mesh.rotateX(Math.PI / 2);
        mesh.position.set(-0.5, depth, -0.5);

        meshes.push(mesh);
      }
    }

    return meshes;
  }

  setupRoot() {
    this.subscription.add(
      this.room.modules.wall.observables.wallRooms$.subscribe(wallRooms => {
        if (this.root) {
          this.room.app.renderer.scene.remove(this.root);
        }
        this.root = new Object3D();
        this.meshes = this.createMesh(wallRooms);
        this.meshes.forEach(mesh => this.root!.add(mesh));
        this.root.position.y = 1 * FLOOR_HEIGHT - 0.2;
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
    console.log('toggle roof');
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
