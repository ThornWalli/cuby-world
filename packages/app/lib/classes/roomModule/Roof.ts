import {
  ExtrudeGeometry,
  Mesh,
  MeshPhongMaterial,
  Shape,
  Vector2,
  Vector3,
  Object3D,
  DoubleSide
} from 'three';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import type { WallRoom } from './Wall';
import { WALL_VIEW_MODE } from './Wall';

import { FLOOR_HEIGHT } from '../../utils/ground';
import { disposeObject3D, OBJECT_USER_DATA } from '../../utils/object';
import { debounceTime, merge } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends RoomModuleObservables {}

interface State extends RoomModuleState {
  visible: boolean;
}

interface WallRoomDescription {
  floor: number;
  root: Object3D;
  room: WallRoom;
}

export default class RoofModule extends RoomModule<State, Observables> {
  static override TYPE = 'roof';

  state: State = {
    visible: false
  };

  root?: Object3D = new Object3D();
  descriptions: WallRoomDescription[] = [];

  override setup(): void {
    super.setup();

    this.setupRoot();

    this.subscription.add(
      merge(
        this.room.modules.floor.observables.floor$,
        this.room.modules.wall.observables.viewMode$
      )
        .pipe(debounceTime(100))
        .subscribe(() => {
          this.updateVisiblity();
        })
    );

    this.subscription.add(
      this.room.modules.wall.observables.activeWallRooms$.subscribe(
        this.onChangeActiveWallRooms.bind(this)
      )
    );

    this.subscription.add(
      this.room.modules.stair.observables.refresh$.subscribe(
        this.onRefresh.bind(this)
      )
    );
  }

  isRoofNeeded() {
    return this.room.modules.wall.state.viewMode === WALL_VIEW_MODE.LARGE;
  }

  //#region methods
  onRefresh() {
    this.updateDescriptions(this.room.modules.wall.getWallRooms());
  }

  //#region descriptions
  createDescriptions(wallRooms: Set<WallRoom>): WallRoomDescription[] {
    const depth = 0.11;
    const descriptions = [];

    for (const room of Array.from(wallRooms)) {
      const description = {
        floor: room.floor,
        root: new Object3D(),
        room
      };

      const stairPositions = new Set(
        room.tiles
          .filter(t =>
            this.room.modules.stair.isStairAt(
              new Vector3(t.position.x, room.floor, t.position.y)
            )
          )
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
            side: DoubleSide
          })
        );

        mesh.userData[OBJECT_USER_DATA.IGNORE_SELECT] = true;

        // if (this.room.modules.wall.state.viewMode !== WALL_VIEW_MODE.LARGE) {
        //   mesh.material.opacity = 0;
        //   (mesh.material as Material).depthWrite = false;
        // }

        mesh.castShadow = true;
        mesh.receiveShadow = false;
        // mesh.receiveShadow = true;
        mesh.rotateX(Math.PI / 2);
        mesh.position.set(-0.5, depth, -0.5);

        description.root.visible =
          description.floor < this.room.modules.floor.getFloor();
        description.root.add(mesh);
      }
      descriptions.push(description);
    }

    return descriptions;
  }

  updateDescriptions(wallRooms: Set<WallRoom>) {
    if (this.descriptions) {
      this.descriptions.forEach(d => {
        this.root?.remove(d.root);
        disposeObject3D(d.root);
      });
    }
    this.descriptions = this.createDescriptions(wallRooms);
    this.descriptions.forEach(description => {
      this.root!.add(description.root);
      description.root.position.y =
        (description.floor + 1) * FLOOR_HEIGHT - 0.2;
    });
    this.refreshCurrentRoofs();
  }

  //#endregion

  setupRoot() {
    this.subscription.add(
      this.room.modules.wall.observables.wallRooms$.subscribe(wallRooms => {
        if (this.root) {
          this.room.app.renderer.scene.remove(this.root);
        }
        this.root = new Object3D();
        this.root.userData[OBJECT_USER_DATA.IGNORE_SELECT] = true;

        this.updateDescriptions(wallRooms);

        this.root.raycast = () => void 0;
        this.room.app.renderer.scene.add(this.root);
      })
    );
  }

  setVisible(
    visible: boolean,
    descriptions = this.descriptions,
    hide: boolean = false
  ) {
    this.state.visible = visible;
    descriptions.forEach(({ root }) => {
      root.visible = visible;
      if (hide) {
        root.traverse(child => {
          if (child instanceof Mesh) {
            const material = child.material as MeshPhongMaterial;
            // Ausblenden für Kamera und dunkle Räume.
            if (visible) {
              material.colorWrite = false;
              material.depthWrite = false;
              material.transparent = false;
            } else {
              material.colorWrite = true;
              material.depthWrite = true;
              material.transparent = false;
            }
          }
        });
      }
    });
  }

  //#endregion

  //#region events

  /**
   * TODO: Wird das noch gebraucht?
   */
  onChangeActiveWallRooms(_wallRooms: Map<string, WallRoom>) {
    // const descriptions = this.descriptions.filter(description =>
    //   wallRooms.has(description.room.id)
    // );
    // this.setVisible(false, descriptions);
  }

  getRoofs() {
    return this.descriptions;
  }
  getRoofsByFloor(floor?: number) {
    floor = floor ?? this.room.modules.floor.getFloor();
    return this.descriptions.filter(d => d.floor === floor);
  }

  updateVisiblity(floorIndex?: number) {
    floorIndex = floorIndex ?? this.room.modules.floor.getFloor();

    const roofs = this.getRoofs();
    this.setVisible(false, roofs);

    for (let f = 0; f <= floorIndex; f++) {
      const roofs = this.getRoofsByFloor(f);
      if (f === floorIndex && !this.isRoofNeeded()) continue;
      this.setVisible(true, roofs);
    }

    this.refreshCurrentRoofs(floorIndex);
  }

  /**
   * Damit Raum abgedunkelt wird, muss aktuelle Decke unsichtbar anzeigt werden.
   */
  refreshCurrentRoofs(floorIndex?: number) {
    floorIndex = floorIndex ?? this.room.modules.floor.getFloor();
    this.setVisible(true, this.getRoofsByFloor(floorIndex), true);
  }

  //#endregion
}

declare module '../../utils/object' {
  interface ObjectUserData {
    WALL_ROOM: string;
  }
}

OBJECT_USER_DATA.WALL_ROOM = 'wallRoom';
