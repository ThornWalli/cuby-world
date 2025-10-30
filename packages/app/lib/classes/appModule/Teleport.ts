import { TELEPORT_TYPE } from '../../types/teleport';
import { loadRoomById } from '../../utils/rooms';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import type { RoomTeleport } from '../Teleport';
import type Teleport from '../Teleport';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Observables extends AppModuleObservables {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State extends AppModuleState {}
export default class TeleportAppModule extends AppModule<State, Observables> {
  static override TYPE = 'teleport';
  state: State = {};

  async resolveTeleport(teleport: Teleport | undefined) {
    if (teleport?.type === TELEPORT_TYPE.ROOM) {
      const roomTeleport = teleport as RoomTeleport;
      if (!roomTeleport.roomId) {
        throw new Error('RoomTeleport has no roomId defined');
      }
      // roomTeleport.roomId
      await this.app.enterRoom(await loadRoomById(roomTeleport.roomId));
    }
  }
}
