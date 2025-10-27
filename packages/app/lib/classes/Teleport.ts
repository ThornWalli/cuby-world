import type { Vector3 } from 'three';
import {
  TELEPORT_TYPE,
  type TELEPORT_ROTATION,
  type TeleportDescription
} from '../types/teleport';

export default class Teleport {
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
