import { concatAll, filter, Subscription } from 'rxjs';
import type App from '../App';
import AppModule, { type AppModuleState } from '../AppModule';
import Room from '../Room';
import type RoomDescription from '../RoomDescription';
import Cuby from '@cuby-world/units/cuby/Cuby';
import { positionToMatrixPosition, preparePosition } from '../../utils/matrix';

interface State extends AppModuleState {
  room?: Room;
}
export default class RoomAppModule extends AppModule<State> {
  static override TYPE = 'room';

  roomSubscription: Subscription | undefined;

  state: State = {
    room: undefined
  };

  static async roomFromDescription(
    app: App,
    roomDescription: RoomDescription
  ): Promise<Room> {
    const room = new Room(app);
    room.description = roomDescription;
    room.setupGround(roomDescription.grid);
    await room.setupUnits(roomDescription.units || []);
    room.mesh.name = roomDescription.name;
    return room;
  }

  getRoom() {
    return this.state.room;
  }

  async fromDescription(roomDescription: RoomDescription) {
    const app = this.app;
    const renderer = app.renderer;
    const {
      room: roomModule,
      player: playerModule,
      unitFocus: unitFocusModule
    } = app.modules!;
    const room = await RoomAppModule.roomFromDescription(app, roomDescription);
    // Clean up previous room if it exists
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
      const lastRoom = roomModule.getRoom();
      if (lastRoom) {
        renderer.scene.remove(lastRoom.mesh);
      }
      roomModule.setRoom(undefined);
    }

    roomModule.setRoom(room);
    renderer.scene.add(room.mesh);

    this.roomSubscription = registerRoomSubscriptions(app);

    if (playerModule && room.description?.start) {
      const cuby = new Cuby({
        position: room.description.start.position.clone(),
        rotation: room.description.start.rotation
      });

      const player = playerModule.getPlayer()!;
      player.setUnit(cuby);

      await room.add(cuby);
      app.modules.selection.setSelectedUnit(cuby);

      unitFocusModule?.setFocusedUnit(cuby);
    }

    renderer.animationLoop$.subscribe(time => {
      room.update(time);
      if (unitFocusModule?.focusedUnit) {
        const position = unitFocusModule.focusedUnit.getRootPosition();
        renderer.updateCamera(position);
        renderer.updateLight(position);
      }
    });

    console.log('Set room:', roomDescription.name, room);
  }

  setRoom(room: Room | undefined) {
    this.state.room = room;
  }
}

function registerRoomSubscriptions(app: App) {
  const subscription = new Subscription();
  const room = app.modules.room.getRoom()!;
  const player = app.modules.player.getPlayer()!;
  const renderer = app.renderer;
  if (renderer.modules.intersection) {
    const groundIntersectionListener = renderer.modules.intersection.register(
      room.mesh.getObjectByName('ground')!
    );
    subscription.add(
      groundIntersectionListener.hoverIntersect$
        .pipe(
          concatAll(),
          filter(
            intersection => intersection.object?.parent?.name === 'ground'
          ),
          preparePosition(),
          filter(({ worldPosition }) => !!worldPosition)
        )
        .subscribe(({ worldPosition }) => {
          room.selectionMesh!.position.copy(worldPosition!);
        })
    );

    subscription.add(
      renderer.modules.intersection
        .register(room.mesh)
        .clickIntersect$.pipe(preparePosition())
        .subscribe(data => {
          if (data) {
            const { unit, object, worldPosition } = data;
            if (app.modules.selection.getSelectedUnit()?.id === unit?.id) {
              player.moveTo(unit!.position);
            } else if (unit) {
              app.modules.selection.setSelectedUnit(unit);
            } else {
              console.log(
                'Current intersected object:',
                unit,
                object,
                worldPosition
              );
              player.moveTo(positionToMatrixPosition(worldPosition!));
            }
          } else {
            console.log('No intersected object');
          }
        })
    );
  }
  return subscription;
}
