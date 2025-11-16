/* eslint-disable complexity */
import { EMPTY, map, Subject, switchMap, type Observable } from 'rxjs';
import {
  concatMap,
  from,
  ReplaySubject,
  Subscription,
  throttleTime,
  toArray
} from 'rxjs';
import type App from '../App';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import Room from '../Room';
import { preparePosition, type PreparedPosition } from '../../utils/matrix';
import type { Object3D } from 'three';
import { Vector3 } from 'three';
import type Player from '../Player';

import { catalog } from '@cuby-world/units';
import type { RoomDescription } from '../../types/room';
import { OBJECT_USER_DATA } from '@cuby-world/app/lib/utils/object';
import { OBJECT_NAME } from '../../utils/object';
import type Unit from '../Unit';
import type { IntersectionListener } from '../rendererModule/Intersection';
import CharacterUnitModule from '../unitModule/Character';
import type TeleporterUnit from '../unit/Teleporter';
import type { UnitIdentifier } from '../../types/unit';
import BedUnitModule from '../unitModule/Bed';
import ChairUnitModule from '../unitModule/Chair';
import TeleporterUnitModule, {
  TELEPORTER_TYPE
} from '../unitModule/Teleporter';
import BenchUnitModule from '../unitModule/Bench';
import SlotUnitModule from '../unitModule/Slot';

interface Observables extends AppModuleObservables {
  room$: Observable<Room | undefined>;
  select$: Subject<{ preparedPositions: PreparedPosition[]; abort: boolean }>;
  hover$: Subject<PreparedPosition[]>;
}

interface State extends AppModuleState {
  room?: Room;
}
export default class RoomAppModule extends AppModule<State, Observables> {
  static override TYPE = 'room';

  roomSubscription: Subscription | undefined;

  state: State = {
    room: undefined
  };

  private roomSubject = new ReplaySubject<Room | undefined>(0);

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.room$ = this.roomSubject.pipe();
    this.observables.select$ = new Subject<{
      preparedPositions: PreparedPosition[];
      abort: boolean;
    }>();
    this.observables.hover$ = new Subject<PreparedPosition[]>();
    //#endregion
  }

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
      Object.values(room.modules).map(module => module.setup())
    );

    //#region units

    const units = [];
    for (const {
      id,
      unit: key,
      options: { skin, position, rotation, moduleStates }
    } of roomDescription.units) {
      // }
      // const units = roomDescription.units.map(
      //   async ({
      //     unit: key,
      //     options: { position, rotation, options, moduleStates }
      //   }) => {
      const UnitClass = await catalog.get(key)!.instance();
      if (!UnitClass) {
        throw new Error(`Unit class with key ${key} not found in catalog`);
      }
      const unit = new UnitClass({
        name: UnitClass.NAME,
        id,
        skin,
        position,
        rotation,
        moduleStates
      });

      units.push(unit);
      //   }
      // );
    }
    //#endregion

    await room.modules.units.setupUnits(units);

    room.root.name = roomDescription.info.name;
    return room;
  }

  getRoom() {
    return this.state.room;
  }

  async addPlayer(player: Player, teleportUnitId?: UnitIdentifier) {
    const room = this.getRoom()!;

    // await player.recreateUnit();

    /**
     * Player Unit
     */

    this.roomSubscription?.add(
      player.observables.unit$.subscribe(async ({ unit, lastUnit }) => {
        if (lastUnit) {
          await room.modules.units.remove(lastUnit);
          lastUnit.destroy();
        }

        await room.modules.units.add(unit);

        let unitTeleporter = null;
        if (teleportUnitId) {
          const teleportUnit =
            room.modules.units.getById<TeleporterUnit>(teleportUnitId);
          if (!teleportUnit) {
            throw new Error(
              `Teleporter unit with id ${teleportUnitId} not found in the room`
            );
          }
          unitTeleporter = teleportUnit;
        } else if (unit.getPosition().equals(new Vector3(0, 0, 0))) {
          const entranceTeleporter = room.modules.units
            .getUnits()
            .filter(unit => unit.hasModuleType(TeleporterUnitModule))
            .find(
              teleporterUnit =>
                teleporterUnit.getModuleByType<TeleporterUnitModule>(
                  TeleporterUnitModule
                ).state.type == TELEPORTER_TYPE.ENTRANCE
            ) as TeleporterUnit;

          unitTeleporter = entranceTeleporter;
        }

        if (player.client) {
          this.app.modules.selection.setSelectedUnit(unit);
          this.app.renderer.updateCamera(
            (unitTeleporter || unit).getScenePosition()
          );

          this.app.renderer.controls.object.position.copy(
            this.app.renderer.camera.position
          );
          this.app.renderer.controls.target.copy(
            (unitTeleporter || unit).getScenePosition()
          );

          this.app.modules.unitFocus.setPlayerAsFocusedUnit();
        }

        if (unitTeleporter) {
          await unitTeleporter.modules.teleporter.leave(unit);
        }
      })
    );

    if (player.state.characterType) {
      await player.setCharacterType(player.state.characterType);
    }
  }

  removeRoom() {
    if (this.roomSubscription) {
      const roomModule = this.app.modules.room;
      const renderer = this.app.renderer;
      this.roomSubscription.unsubscribe();
      const lastRoom = roomModule.getRoom();
      if (lastRoom) {
        renderer.scene.remove(lastRoom.root);
      }
      lastRoom?.destroy();
      roomModule.setRoom(undefined);
    }
  }

  /**
   * Set the current room from a room description.
   * @param roomDescription
   */
  async fromDescription(roomDescription: RoomDescription) {
    const app = this.app;
    const renderer = app.renderer;
    const { room: roomModule } = app.modules!;

    const room = await RoomAppModule.roomFromDescription(app, roomDescription);

    roomModule.setRoom(room);
    renderer.scene.add(room.root);

    this.roomSubscription = this.registerRoomSubscriptions(app);

    room.modules.units.getUnits().forEach(unit => {
      this.registerUnitIntersection(unit);
    });

    this.subscription.add(
      renderer.observables.animationLoop$
        .pipe(throttleTime(250))
        .subscribe(v => {
          room.updateThrottle(v);
        })
    );
    this.subscription.add(
      renderer.observables.animationLoop$
        .pipe(throttleTime(500))
        .subscribe(v => {
          room.updateThrottle500ms(v);
        })
    );
    this.subscription.add(
      renderer.observables.animationLoop$
        .pipe(throttleTime(1000))
        .subscribe(v => {
          room.updateThrottle1Sec(v);
        })
    );

    console.log('Set room:', roomDescription.info.name, room);
    return room;
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

    // /**
    //  * Wenn nicht im Edit Mode, dann Wände ignorieren
    //  */
    // if (!this.app.isEditMode()) {
    //   preparedPositions = preparedPositions.filter(
    //     pos => !pos.object?.userData[OBJECT_NAME.WALL]
    //   );
    // }
    Object.values(app.modules).some((module: AppModule) => {
      return module.onSceneHover({ preparedPositions, player });
    });
    this.observables.hover$.next(preparedPositions);
  }

  intersectionListener?: IntersectionListener;
  private registerUnitIntersection(unit: Unit) {
    const renderer = this.app.renderer;

    if (!renderer.modules.intersection) {
      throw new Error('Intersection module is not available');
    }
    renderer.modules.intersection.globalListener.addMeshes(
      unit.getRaycasterMeshes()
    );
  }

  private unregisterUnitIntersection(unit: Unit) {
    if (!this.intersectionListener) {
      return;
    }
    this.intersectionListener.removeMeshes(unit.getRaycasterMeshes());
  }

  private registerRoomSubscriptions(app: App) {
    const subscription = new Subscription();
    const renderer = app.renderer;

    const { unitFocus: unitFocusModule } = app.modules!;

    if (!renderer.modules.intersection) {
      throw new Error('Intersection module is not available');
    }

    subscription.add(
      this.observables.room$
        .pipe(
          switchMap(room => room?.modules.units.observables.addUnit$ ?? EMPTY),
          concatMap(async unit => {
            this.registerUnitIntersection(unit);
          })
        )
        .subscribe(void 0)
    );
    subscription.add(
      this.observables.room$
        .pipe(
          switchMap(
            room => room?.modules.units.observables.removeUnit$ ?? EMPTY
          ),
          concatMap(async unit => {
            this.unregisterUnitIntersection(unit);
          })
        )
        .subscribe(void 0)
    );

    const listener = renderer.modules.intersection.globalListener;

    subscription.add(
      listener.hoverIntersect$
        .pipe(
          concatMap(interactions => {
            return from(interactions).pipe(preparePosition(), toArray());
          })
        )
        .subscribe(this.onHover.bind(this))
    );
    subscription.add(
      listener.clickIntersects$
        .pipe(
          concatMap(interactions => {
            return from(
              interactions.filter(interaction => {
                return (
                  (!interaction.object.userData[
                    OBJECT_USER_DATA.IGNORE_GROUND_INTERSECTION
                  ] &&
                    interaction.object.name === OBJECT_NAME.GROUND) ||
                  interaction.object.name !== OBJECT_NAME.GROUND
                );
              })
            ).pipe(preparePosition(), toArray());
          })
        )
        .subscribe(this.onSelect.bind(this))
    );

    subscription.add(
      this.observables.room$
        .pipe(
          switchMap(room =>
            room
              ? renderer.observables.animationLoop$.pipe(
                  map(context => {
                    return { room, context };
                  })
                )
              : EMPTY
          )
        )
        .subscribe(({ room, context }) => {
          room.update(context);
          if (unitFocusModule?.focusedUnit) {
            const position = unitFocusModule.focusedUnit.getScenePosition();
            renderer.updateCamera(position);
            // renderer.modules.light.updateLight(position);
          }
        })
    );

    //#region intersection

    if (renderer.modules.intersection) {
      // subscription.add(this.subscribeGroundSelection());
      // const { hoverIntersect$, clickIntersects$ } =
      //   renderer.modules.intersection.register(room.root);
      // subscription.add(
      //   hoverIntersect$
      //     .pipe(
      //       concatMap(interactions => {
      //         return from(interactions).pipe(preparePosition(), toArray());
      //       })
      //     )
      //     .subscribe(this.onHover.bind(this))
      // );
      // subscription.add(
      //   clickIntersects$
      //     .pipe(
      //       concatMap(interactions => {
      //         return from(
      //           interactions.filter(interaction => {
      //             return (
      //               (!interaction.object.userData[
      //                 OBJECT_USER_DATA.IGNORE_GROUND_INTERSECTION
      //               ] &&
      //                 interaction.object.name === OBJECT_NAME.GROUND) ||
      //               interaction.object.name !== OBJECT_NAME.GROUND
      //             );
      //           })
      //         ).pipe(preparePosition(), toArray());
      //       })
      //     )
      //     .subscribe(this.onSelect.bind(this))
      // );
    }

    //#endregion
    return subscription;
  }

  _position: Vector3 = new Vector3();

  async onSelect(preparedPositions: PreparedPosition[]) {
    const app = this.app;

    const player = app.modules.player.getCurrentPlayer();
    if (!player) {
      throw new Error('No player available');
    }

    /**
     * Wenn nicht im Edit Mode, dann Wände ignorieren
     */
    if (!this.app.isEditMode()) {
      preparedPositions = preparedPositions.filter(
        pos => !pos.object?.userData[OBJECT_NAME.WALL]
      );
    }

    if (preparedPositions.length > 0) {
      const abort = Object.values(app.modules).some((module: AppModule) => {
        return module.onSceneSelect({ preparedPositions, player });
      });

      this.observables.select$.next({
        preparedPositions,
        abort
      });

      if (abort) {
        return;
      }

      const room = app.modules.room.getRoom()!;

      if (
        preparedPositions[0] &&
        preparedPositions[0].wallExtension &&
        preparedPositions[0].wall
      ) {
        const wall = room.modules.wall.getWallById(preparedPositions[0].wall);
        const extension = wall?.getExtensionById(
          preparedPositions[0].wallExtension
        );
        console.log('Wall Extension selected:', extension);
        if (wall) {
          player.moveTo(wall.position);
        }
      } else {
        preparedPositions = preparedPositions.filter(pos => !pos.wall);
        let unit;
        const { unit: u, worldPosition, object } = preparedPositions[0]!;
        unit = u;

        const usedUnit = player.unit
          ?.getModule<CharacterUnitModule>(CharacterUnitModule.TYPE)
          .getUsedUnit();

        if (object && isStair(object)) {
          const stair = getStairFromObject(app, object);
          if (stair) {
            const position = Object.values(stair?.getEntryPositions()).find(
              pos => pos.y !== player.unit?.getPosition().y
            );
            player.moveTo(position!);
          }
        } else if (
          worldPosition &&
          unit &&
          app.modules.selection.getSelectedUnit()?.equal(unit) &&
          player.unit &&
          !usedUnit?.equals(player.unit) &&
          !usedUnit?.getPosition().equals(worldPosition)
        ) {
          const units = room.modules.units.getUnitsByPosition(worldPosition);
          const slotUnit = units.find(u =>
            u.getModuleByType<SlotUnitModule>(SlotUnitModule)
          );

          unit = slotUnit || unit;
          app.modules.selection.setSelectedUnit(null);
          const playerUnit = player.unit!;
          if (unit) {
            const position =
              unit
                .getModuleByType<SlotUnitModule>(SlotUnitModule)
                ?.findFreeSlotPosition(worldPosition) || unit.position;

            await playerUnit.modules.movement.resolveMoveTo(
              position || unit.getPosition(),
              unit,
              position
            );
          } else {
            console.log('FFFFF', !!unit);
            await playerUnit.modules.movement.resolveMoveTo(
              worldPosition!,
              unit
            );
          }
        } else if (unit) {
          app.modules.selection.setSelectedUnit(unit);
        } else if (
          worldPosition &&
          player.unit &&
          !usedUnit?.equals(player.unit) &&
          !usedUnit?.getPosition().equals(worldPosition)
        ) {
          const units = room.modules.units.getUnitsByPosition(worldPosition);
          const unit = units.find(u => {
            console.log(
              u,
              BenchUnitModule.TYPE,
              u.modules,
              BenchUnitModule.TYPE in u.modules
            );
            return (
              BedUnitModule.TYPE in u.modules ||
              ChairUnitModule.TYPE in u.modules ||
              BenchUnitModule.TYPE in u.modules
            );
          });

          app.modules.selection.setSelectedUnit(null);
          if (unit) {
            let position = unit
              .getModuleByType<SlotUnitModule>(SlotUnitModule)
              .findFreeSlotPosition(worldPosition);
            if (!position) {
              throw new Error('No free slot position found');
            }
            // position = position.clone().add(unit.getPosition());
            position = position || unit.position;
            player.moveTo(position || unit.getPosition(), unit, position);
          } else {
            player.moveTo(worldPosition, unit);
          }
        }
      }
    } else {
      console.log('No intersected object');
    }
  }
}

function isStair(object: Object3D): boolean {
  return !!object.userData[OBJECT_NAME.STAIR];
}

function getStairFromObject(app: App, object: Object3D) {
  return app.modules.room
    .getRoom()
    ?.modules.stair.getStairById(object.userData[OBJECT_NAME.STAIR]);
}
