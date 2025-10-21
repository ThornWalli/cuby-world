import { FLOOR_HEIGHT } from './../../utils/ground';
import { Object3D, Vector3 } from 'three';
import {
  TELEPORT_TYPE,
  type TELEPORT_ROTATION,
  type TeleportDescription
} from '../../types/room';
import type { RoomModuleObservables, RoomModuleState } from '../RoomModule';
import RoomModule from '../RoomModule';
import {
  disposeObject3D,
  setMainObjectRecursive
} from '@cuby-world/app/lib/utils/object';
import { loadGltf } from '../../utils/gltf';

import defaultTeleport from '../../../assets/objects/teleports/default.glb?url';
import assetLoader from '@cuby-world/app/services/assetLoader';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends RoomModuleObservables {}

interface State extends RoomModuleState {
  teleports: Teleport[];
}

export default class TeleportModule extends RoomModule<State, Observables> {
  static override TYPE = 'teleport';

  root: Object3D = new Object3D();

  state: State = {
    teleports: []
  };

  override destroy(): void {
    super.destroy();
    this.root.removeFromParent();
    disposeObject3D(this.root);
    this.root.remove();
  }

  override async setup() {
    super.setup();

    const description = this.room.description;

    this.setupRoot();

    await this.addTeleports(description.teleports);
  }

  setupRoot() {
    this.root.name = 'teleports';
    this.room.root.add(this.root);

    setMainObjectRecursive(this.root, this.root);

    this.room.addToRoot(this.root);
  }

  async addTeleports(descriptions: TeleportDescription[]) {
    for (const description of descriptions) {
      const Class = getTeleportClass(description);
      const teleporter = new Class(description);
      this.state.teleports.push(teleporter);
      this.addToRoot(await this.createMesh(teleporter));
    }
  }

  addToRoot(object: Object3D) {
    this.root.add(object);
  }

  async createMesh(teleporter: Teleport) {
    const { object } = await loadGltf(defaultTeleport, assetLoader);
    object.position.copy(
      teleporter.position.clone().multiply(new Vector3(1, FLOOR_HEIGHT, 1))
    );
    return object;
  }

  getTeleports() {
    return this.state.teleports;
  }

  getTeleportsByType(type: TELEPORT_TYPE) {
    return this.state.teleports.filter(teleport => teleport.type === type);
  }
}

function getTeleportClass(description: TeleportDescription) {
  switch (description.type) {
    case TELEPORT_TYPE.ENTRANCE:
      return EntranceTeleport;
    case TELEPORT_TYPE.ROOM:
      return RoomTeleport;
    default:
      return Teleport;
  }
}

class Teleport {
  static TYPE = TELEPORT_TYPE.DEFAULT;
  position: Vector3;
  rotation: TELEPORT_ROTATION;

  constructor({
    position,
    rotation
  }: {
    position: Vector3;
    rotation: TELEPORT_ROTATION;
  }) {
    this.position = position;
    this.rotation = rotation;
  }

  get type() {
    return (this.constructor as typeof Teleport).TYPE;
  }

  toDescription(): TeleportDescription {
    return {
      type: this.type,
      position: this.position,
      rotation: this.rotation
    };
  }
}

export class EntranceTeleport extends Teleport {
  static override TYPE = TELEPORT_TYPE.ENTRANCE;
}

export class RoomTeleport extends Teleport {
  static override TYPE = TELEPORT_TYPE.ROOM;
  roomId?: string;
  roomTeleportId?: string;

  constructor({
    position,
    rotation,
    roomId,
    roomTeleportId
  }: {
    position: Vector3;
    rotation: TELEPORT_ROTATION;
    roomId?: string;
    roomTeleportId?: string;
  }) {
    super({ position, rotation });
    this.roomId = roomId;
    this.roomTeleportId = roomTeleportId;
  }

  override toDescription() {
    return {
      ...super.toDescription(),
      roomId: this.roomId,
      roomTeleportId: this.roomTeleportId
    };
  }
}
