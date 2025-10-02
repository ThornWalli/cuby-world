import {
  concatMap,
  filter,
  from,
  ReplaySubject,
  Subscription,
  throttleTime,
  toArray
} from 'rxjs';
import type App from '../App';
import AppModule, { type AppModuleState } from '../AppModule';
import Room from '../Room';
import Cuby from '@cuby-world/units/cuby/Cuby';
import {
  matrixPositionToPosition,
  preparePosition,
  type PreparedPosition
} from '../../utils/matrix';
import { Vector3 } from 'three';
import { getYPositionByPosition } from '../../utils/room';
import type Player from '../Player';

import allUnits from '@cuby-world/units';
import type { RoomDescription } from '../RoomDescription';

interface State extends AppModuleState {
  room?: Room;
}
export default class RoomAppModule extends AppModule<State> {
  static override TYPE = 'room';

  roomSubscription: Subscription | undefined;

  state: State = {
    room: undefined
  };

  private roomSubject = new ReplaySubject<Room | undefined>(0);
  observables = {
    room$: this.roomSubject.pipe()
  };

  override destroy(): void {
    super.destroy();
    this.roomSubject.unsubscribe();
  }

  static async roomFromDescription(
    app: App,
    roomDescription: RoomDescription
  ): Promise<Room> {
    const room = new Room(app, roomDescription);
    await room.setupModules();

    await Promise.all(
      Object.values(room.modules).map(async module => {
        await module.setup();
      })
    );

    // #region units
    const unitClasses = allUnits.reduce(
      (result, unitClass) => {
        result[unitClass.KEY] = unitClass as (typeof allUnits)[0];
        return result;
      },
      {} as Record<string, (typeof allUnits)[0]>
    );

    const units = roomDescription.units.map(
      ({ unit: key, options: { position, rotation, options } }) => {
        const unit = new unitClasses[key]!({
          position,
          rotation,
          options
        });
        return unit;
      }
    );
    // #endregion

    await room.modules.units.setupUnits(units);
    room.mesh.name = roomDescription.info.name;
    return room;
  }

  getRoom() {
    return this.state.room;
  }

  async addPlayerUnit(player: Player) {
    // const { unitFocus: unitFocusModule } = this.app.modules!;
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
      // unitFocusModule?.setFocusedUnit(cuby);
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
      lastRoom?.destroy();
      roomModule.setRoom(undefined);
    }

    roomModule.setRoom(room);
    renderer.scene.add(room.mesh);

    this.roomSubscription = this.registerRoomSubscriptions(app);

    if (playerModule && room.description?.start) {
      playerModule.observables.addPlayer$.subscribe(player => {
        this.addPlayerUnit(player);
      });
      playerModule.getPlayers().forEach(player => {
        this.addPlayerUnit(player);
      });
    }

    this.subscription.add(
      renderer.observables.animationLoop$
        .pipe(throttleTime(250))
        .subscribe(tim => {
          room.updateThrottle(tim);
        })
    );
    this.subscription.add(
      renderer.observables.animationLoop$
        .pipe(throttleTime(500))
        .subscribe(tim => {
          room.updateThrottle500ms(tim);
        })
    );
    this.subscription.add(
      renderer.observables.animationLoop$
        .pipe(throttleTime(1000))
        .subscribe(tim => {
          room.updateThrottle1Sec(tim);
        })
    );

    this.subscription.add(
      renderer.observables.animationLoop$.subscribe(time => {
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
    this.roomSubject.next(room);
  }

  subscribeGroundSelection() {
    const intersection = this.app.renderer.modules.intersection;
    if (!intersection) {
      throw new Error('Intersection module is not available');
    }
    // const subscription = new Subscription();
    // const room = this.getRoom()!;

    // const groundIntersectionListener = intersection.register(
    //   room.mesh.getObjectByName('ground')!
    // );

    // return groundIntersectionListener.hoverIntersect$
    //   .pipe(
    //     concatAll(),
    //     filter(intersection => intersection.object?.parent?.name === 'ground'),
    //     preparePosition(),
    //     filter(({ worldPosition }) => !!worldPosition),
    //     distinctUntilChanged(
    //       (prev, curr) =>
    //         !curr.worldPosition ||
    //         !prev.worldPosition ||
    //         prev.worldPosition.equals(curr.worldPosition)
    //     )
    //   )
    //   .subscribe(this.onHoverGround.bind(this));
  }

  onHover(preparedPositions: PreparedPosition[]) {
    const app = this.app;
    const player = app.modules.player.getCurrentPlayer();
    Object.values(app.modules).some((module: AppModule) => {
      return module.onSceneHover({ preparedPositions, player });
    });
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
      app.modules.placement.observables.startPlace$.subscribe(unit => {
        lastPosition = unit.getPosition().clone();
        placeSubscription = room.modules.ground.observables.hover$.subscribe(
          position => {
            unit.setPosition(
              matrixPositionToPosition(
                new Vector3(
                  position.x,
                  getYPositionByPosition(room, position),
                  position.z
                )
              )
            );
          }
        );
      })
    );
    subscription.add(
      app.modules.placement.observables.stopPlace$.subscribe(() => {
        placeSubscription?.unsubscribe();
      })
    );

    subscription.add(
      app.modules.placement.observables.abortPlace$.subscribe(unit => {
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
      // subscription.add(this.subscribeGroundSelection());

      const { hoverIntersect$, clickIntersects$ } =
        renderer.modules.intersection.register(room.mesh);
      subscription.add(
        hoverIntersect$
          .pipe(
            concatMap(interactions => {
              return from(interactions).pipe(
                filter(Boolean),
                preparePosition(),
                toArray()
              );
            })
          )
          .subscribe(this.onHover.bind(this))
      );
      subscription.add(
        clickIntersects$
          .pipe(
            concatMap(interactions => {
              return from(interactions).pipe(preparePosition(), toArray());
            })
          )
          .subscribe(this.onSelect.bind(this))
      );
    }

    // #endregion
    return subscription;
  }

  _position: Vector3 = new Vector3();

  onSelect(preparedPositions: PreparedPosition[]) {
    const app = this.app;
    const player = app.modules.player.getCurrentPlayer();
    if (!player) {
      throw new Error('No player available');
    }
    if (preparedPositions.length > 0) {
      const { unit, worldPosition } = preparedPositions[0]!;

      const abort = Object.values(app.modules).some((module: AppModule) => {
        return module.onSceneSelect({ preparedPositions, player });
      });

      if (abort) {
        return;
      }

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
    } else {
      console.log('No intersected object');
    }
  }
}
