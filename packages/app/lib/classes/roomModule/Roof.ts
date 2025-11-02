import {
  Mesh,
  Vector3,
  Object3D,
  DoubleSide,
  BoxGeometry,
  ShadowMaterial
} from 'three';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import type { WallRoom } from './Wall';
import { WALL_VIEW_MODE } from './Wall';

import { FLOOR_HEIGHT } from '../../utils/ground';
import { disposeObject3D, OBJECT_USER_DATA } from '../../utils/object';
import { debounceTime, merge } from 'rxjs';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends RoomModuleObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State extends RoomModuleState {}

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

      // geometries erzugen und ein merge erzeugen

      const geometries = [];
      for (const tile of room.tiles) {
        const x = tile.position.x;
        const y = tile.position.y;
        if (stairPositions.has(`${x},${y}`)) continue;
        const geometry = new BoxGeometry(1, depth, 1);

        geometries.push(geometry);
        geometry.translate(x, depth / -2, y);
      }

      if (geometries.length > 0) {
        const mergedGeometry = mergeGeometries(geometries);

        const mesh = new Mesh(
          mergedGeometry,
          new ShadowMaterial({
            color: 0x333333,
            side: DoubleSide
          })
        );

        mesh.userData[OBJECT_USER_DATA.IGNORE_INTERSECTION_SELECT] = true;

        mesh.castShadow = true; // wichtig!
        mesh.receiveShadow = false;
        mesh.position.set(0, depth, 0);

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
    this.updateVisiblity();
  }

  //#endregion

  setupRoot() {
    this.subscription.add(
      this.room.modules.wall.observables.wallRooms$.subscribe(wallRooms => {
        if (this.root) {
          this.room.app.renderer.scene.remove(this.root);
        }
        this.root = new Object3D();
        this.root.userData[OBJECT_USER_DATA.IGNORE_INTERSECTION_SELECT] = true;

        this.updateDescriptions(wallRooms);

        this.root.raycast = () => void 0;
        this.room.app.renderer.scene.add(this.root);
      })
    );
  }

  /**
   * Wenn gesetzt, wird oberstes Dach angezeigt.
   */
  setVisible(visible: boolean, descriptions = this.descriptions) {
    descriptions.forEach(({ root }) => {
      root.visible = true;
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

    // Ebenen abgehen
    for (let f = 0; f <= this.room.modules.floor.getMaxFloor(); f++) {
      // Aktuelle Ebene wird ausgelassen.
      // Alles über der aktuellen Ebene wird nicht angezeigt.
      const roofs = this.getRoofsByFloor(f);
      const visible =
        f < floorIndex || (this.isRoofNeeded() && f <= floorIndex);
      this.setVisible(visible, roofs);
    }
  }

  //#endregion
}

declare module '../../utils/object' {
  interface ObjectUserData {
    WALL_ROOM: string;
  }
}

OBJECT_USER_DATA.WALL_ROOM = 'wallRoom';
