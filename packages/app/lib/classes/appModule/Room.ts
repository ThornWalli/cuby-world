import {
  concatAll,
  distinctUntilChanged,
  filter,
  ReplaySubject,
  Subscription,
  throttleTime
} from 'rxjs';
import type App from '../App';
import AppModule, { type AppModuleState } from '../AppModule';
import Room from '../Room';
import type RoomDescription from '../RoomDescription';
import Cuby from '@cuby-world/units/cuby/Cuby';
import {
  matrixPositionToPosition,
  preparePosition,
  type PreparedPosition
} from '../../utils/matrix';
import { Vector3 } from 'three';
import { getYPositionByPosition } from '../../utils/room';
import type Player from '../Player';

interface State extends AppModuleState {
  room?: Room;
}
export default class RoomAppModule extends AppModule<State> {
  static override TYPE = 'room';

  private _selectionPosition$ = new ReplaySubject<Vector3>(0);
  selectionPosition$ = this._selectionPosition$.pipe(
    distinctUntilChanged((prev, curr) => prev.equals(curr))
  );

  roomSubscription: Subscription | undefined;

  state: State = {
    room: undefined
  };

  static async roomFromDescription(
    app: App,
    roomDescription: RoomDescription
  ): Promise<Room> {
    const room = new Room(app, roomDescription.grid);
    room.description = roomDescription;

    await Promise.all(
      Object.values(room.modules).map(async module => {
        await module.setup();
      })
    );

    await room.modules.units.setupUnits(roomDescription.units || []);
    room.mesh.name = roomDescription.info.name;
    return room;
  }

  getRoom() {
    return this.state.room;
  }

  async addPlayerUnit(player: Player) {
    const { unitFocus: unitFocusModule } = this.app.modules!;
    const room = this.getRoom()!;
    const cuby = new Cuby({
      options: {
        color: player.state.color
      },
      position: room.description!.start!.position.clone(),
      rotation: room.description!.start!.rotation
    });

    player.setUnit(cuby);

    await room.modules.units.add(cuby);

    if (player.client) {
      this.app.modules.selection.setSelectedUnit(cuby);
      unitFocusModule?.setFocusedUnit(cuby);
    }
  }

  /**
   * Set the current room from a room description.
   * @param roomDescription
   */
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

    this.roomSubscription = this.registerRoomSubscriptions(app);

    if (playerModule && room.description?.start) {
      playerModule.addPlayer$.subscribe(player => {
        this.addPlayerUnit(player);
      });
      playerModule.getPlayers().forEach(player => {
        this.addPlayerUnit(player);
      });
      // setTimeout(async () => {
      // await
      // this.addPlayerUnit(playerModule.getCurrentPlayer()!);
      // const cuby = new Cuby({
      //   position: room.description.start.position.clone(),
      //   rotation: room.description.start.rotation
      // });

      // const player = playerModule.getCurrentPlayer()!;
      // player.setUnit(cuby);

      // await room.add(cuby);
      // app.modules.selection.setSelectedUnit(cuby);

      // unitFocusModule?.setFocusedUnit(cuby);
    }

    this.subscription.add(
      renderer.animationLoop$.pipe(throttleTime(250)).subscribe(tim => {
        room.updateThrottle(tim);
      })
    );

    this.subscription.add(
      renderer.animationLoop$.subscribe(time => {
        room.update(time);
        if (unitFocusModule?.focusedUnit) {
          const position = unitFocusModule.focusedUnit.getScenePosition();
          renderer.updateCamera(position);
          renderer.updateLight(position);
        }
      })
    );

    console.log('Set room:', roomDescription.info.name, room);
  }

  setRoom(room: Room | undefined) {
    this.state.room = room;
  }

  subscribeGroundSelection() {
    const intersection = this.app.renderer.modules.intersection;
    if (!intersection) {
      throw new Error('Intersection module is not available');
    }
    // const subscription = new Subscription();
    const room = this.getRoom()!;

    const groundIntersectionListener = intersection.register(
      room.mesh.getObjectByName('ground')!
    );

    return groundIntersectionListener.hoverIntersect$
      .pipe(
        concatAll(),
        filter(intersection => intersection.object?.parent?.name === 'ground'),
        preparePosition(),
        filter(({ worldPosition }) => !!worldPosition)
      )
      .subscribe(this.onHover.bind(this));
  }

  subscribePlacement() {
    const subscription = new Subscription();
    const app = this.app;
    const room = this.getRoom();

    if (!room) {
      throw new Error('No room available for placement subscription');
    }

    let placeSubscription: Subscription;
    let lastPosition: Vector3 | null = null;
    subscription.add(
      app.modules.placement.startPlace$.subscribe(unit => {
        lastPosition = unit.getPosition().clone();
        placeSubscription = this.selectionPosition$.subscribe(position => {
          unit.setPosition(
            matrixPositionToPosition(
              new Vector3(
                position.x,
                getYPositionByPosition(room, position),
                position.z
              )
            )
          );
        });
      })
    );
    subscription.add(
      app.modules.placement.stopPlace$.subscribe(() => {
        placeSubscription?.unsubscribe();
      })
    );

    subscription.add(
      app.modules.placement.abortPlace$.subscribe(unit => {
        if (lastPosition) {
          unit.setPosition(lastPosition);
        }
      })
    );

    return subscription;
  }

  private registerRoomSubscriptions(app: App) {
    const subscription = new Subscription();
    const room = app.modules.room.getRoom()!;
    const renderer = app.renderer;

    this.subscribePlacement();

    // #region intersection

    if (renderer.modules.intersection) {
      subscription.add(this.subscribeGroundSelection());

      subscription.add(
        renderer.modules.intersection
          .register(room.mesh)
          .clickIntersect$.pipe(preparePosition())
          .subscribe(this.onSelect.bind(this))
      );
    }

    // #endregion
    return subscription;
  }

  onHover({ worldPosition }: PreparedPosition) {
    const room = this.app.modules.room.getRoom()!;
    room.modules.selection.setSelectionPosition(worldPosition!);
    this._selectionPosition$.next(worldPosition!);
  }

  _position: Vector3 = new Vector3();

  onSelect(data: PreparedPosition) {
    const app = this.app;
    const player = app.modules.player.getCurrentPlayer();
    if (!player) {
      throw new Error('No player available');
    }
    if (data) {
      const { unit, worldPosition } = data;
      if (app.modules.placement.hasPlace()) {
        // placing mode
        app.modules.placement.stopPlace();
        app.modules.selection.setSelectedUnit(null);
      } else if (
        unit &&
        app.modules.selection.getSelectedUnit()?.id === unit?.id
      ) {
        console.log('Move player to selected unit');
        player.moveTo(unit.getPosition());
      } else if (unit) {
        app.modules.selection.setSelectedUnit(unit);
      } else {
        app.modules.selection.setSelectedUnit(null);
        player.moveTo(worldPosition!);
      }
      // } else if (worldPosition?.equals(this._position)) {
      //   app.modules.selection.setSelectedUnit(null);
      //   console.log(worldPosition);
      //   player.moveTo(worldPosition!);
      // } else {
      //   this._position.copy(worldPosition!);
      //   player.unit?.setRotation(
      //     player.unit?.getRotationByPosition(worldPosition!)
      //   );
      //   console.log('Set position', worldPosition);
      // }
    } else {
      console.log('No intersected object');
    }
  }
}
