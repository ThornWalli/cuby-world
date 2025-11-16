import firebase, {
  type FirebaseFullConfig
} from '@cuby-world/app/services/firebase';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import { selfId, type DataPayload, type Room as TrysteroRoom } from 'trystero';

import type { FirebaseApp } from 'firebase/app';
import { concatMap, filter, Subject, Subscription, switchMap } from 'rxjs';
import Player from '../Player';
import { Vector3 } from 'three';
// import {
//   createUser,
//   getUser,
//   hasUser,
//   type User
// } from './multiplayer/database';
import CurrentPlayer from '../player/Current';
import type App from '../App';
import type { PlayerSettings } from '../../types/player';
import type { UnitIdentifier } from '../Unit';

export interface Message {
  id: string;
  timestamp: number;
  name?: string;
  message: string;
  playerId: string;
}

interface Observables extends AppModuleObservables {
  peerJoin$: Subject<string>;
  peerLeave$: Subject<string>;
  moveTo$: Subject<{
    data: MoveToPayload;
    peerId: string;
  }>;
  setPosition$: Subject<{
    data: SetPositionPayload;
    peerId: string;
  }>;
  message$: Subject<{ data: MessagePayload; peerId: string }>;
}

interface State extends AppModuleState {
  roomId?: string | null;
  // Trystero
  room?: TrysteroRoom;
  playerId: string;
}

declare module '../App' {
  interface AppConfig {
    firebase?: FirebaseFullConfig;

    multiplayer?: {
      enabled: boolean;
    };
  }
}

type MoveToPayload = DataPayload & {
  position: [number, number, number];
  unit?: string;
};
type SetPositionPayload = DataPayload & {
  position: [number, number, number];
};
type MessagePayload = DataPayload & Message;

export const DEFAULT_ROOM_ID = 'lobby';

interface PlayerInfo extends PlayerSettings {
  // peerId: string;
  init?: boolean;
  position: [number, number, number];
  teleporterUnitId: UnitIdentifier | null;
}
type PlayerInfoPayload = DataPayload & Partial<PlayerInfo>;

export default class MultiplayerAppModule extends AppModule<
  State,
  Observables
> {
  static override TYPE = 'multiplayer';

  players = new Map<string, Player>();

  state: State = {
    roomId: null,
    playerId: selfId
  };

  //#region firebase
  firebaseAppId?: string;
  firebaseApp?: FirebaseApp;
  //#endregion

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.peerJoin$ = new Subject<string>();
    this.observables.peerLeave$ = new Subject<string>();
    this.observables.moveTo$ = new Subject<{
      data: MoveToPayload;
      peerId: string;
    }>();
    this.observables.setPosition$ = new Subject<{
      data: SetPositionPayload;
      peerId: string;
    }>();
    this.observables.message$ = new Subject<{
      data: MessagePayload;
      peerId: string;
    }>();
    //#endregion
  }

  actions: {
    setMoveTo?: (data: MoveToPayload, targetPeers?: string[]) => void;
    setPosition?: (data: SetPositionPayload, targetPeers?: string[]) => void;
    sendMessage?: (data: MessagePayload, targetPeers?: string[]) => void;
    sendPlayerInfo?: (data: PlayerInfoPayload, targetPeers?: string[]) => void;
  } = {};

  getOtherPlayers() {
    return Array.from(this.players.values())
      .filter(p => !p.client)
      .map(p => p.id);
  }

  get playerId() {
    return this.state.playerId;
  }

  override async setup() {
    super.setup();

    window.setTimeout(() => {
      window.localStorage.removeItem('firebase:previous_websocket_failure');
    }, 2000);

    await this.setupFirebase();

    if (!this.app.config.multiplayer) {
      throw new Error('No multiplayer config found');
    }

    let playerSubscription = new Subscription();
    this.subscription.add(
      this.app.modules.player.observables.currentPlayer$.subscribe(player => {
        playerSubscription?.unsubscribe();
        playerSubscription = new Subscription();
        playerSubscription.add(
          player.observables.unit$
            .pipe(
              switchMap(
                ({ unit }) => unit.modules.movement.observables.moveStart$
              ),
              filter(({ silence }) => !silence),
              concatMap(async ({ position, unit }) => {
                console.log('Player started moving');
                if (!this.actions?.setMoveTo) {
                  throw new Error('No setMoveTo action available');
                }
                this.initPayload = undefined;
                const data = {
                  position: position.toArray(),
                  unit: unit?.id
                } as MoveToPayload;
                this.actions.setMoveTo(data, this.getOtherPlayers());
              })
            )
            .subscribe(void 0)
        );

        playerSubscription.add(
          player.observables.unit$
            .pipe(
              switchMap(
                ({ unit }) => unit.modules.movement.observables.moveEnd$
              ),
              concatMap(async position => {
                console.log('Player stoped moving');
                if (!this.actions?.setPosition) {
                  throw new Error('No setMoveTo action available');
                }
                const data = {
                  position: position.toArray()
                } as SetPositionPayload;
                this.actions.setPosition(data, this.getOtherPlayers());
              })
            )
            .subscribe(void 0)
        );
        playerSubscription.add(
          player.observables.playerSettings$.subscribe(playerSettings => {
            this.sendPlayerInfo({ ...playerSettings } as PlayerInfoPayload);
          })
        );
      })
    );

    this.subscription.add(
      this.observables.setPosition$
        .pipe(
          concatMap(async ({ data, peerId }) => {
            const player = this.players.get(peerId);
            if (player && player.unit) {
              console.log(
                'Received setPosition from',
                peerId,
                data,
                player.unit
              );
              await player.unit.modules.movement.abortMoveTo(true);
              player.unit.setPosition(new Vector3().fromArray(data.position));

              await player.unit.modules.movement.applyPosition(
                new Vector3().fromArray(data.position)
              );
            }
          })
        )
        .subscribe(void 0)
    );

    this.subscription.add(
      this.observables?.moveTo$
        ?.pipe(
          concatMap(async ({ data, peerId }) => {
            const player = this.players.get(peerId);
            console.log('Received moveTo from', peerId, data);
            if (player && player.unit) {
              const targetUnit = data.unit
                ? player.unit.modules.room
                    ?.getRoom()
                    ?.modules.units.getUnitById(data.unit)
                : undefined;
              await player.unit.modules.movement.resolveMoveTo(
                new Vector3().fromArray(data.position),
                targetUnit
              );
              await player.unit.modules.movement.applyPosition(
                new Vector3().fromArray(data.position),
                targetUnit
              );
            }
          })
        )
        .subscribe(void 0)
    );

    //#region room event handlers

    this.subscription.add(
      this.observables?.peerJoin$
        .pipe(
          concatMap(async peerId => {
            const player = new Player({
              id: peerId,
              settings: {
                name: peerId
              }
            });
            const currentPlayer = this.app.modules.player.getCurrentPlayer();
            if (currentPlayer && this.actions.sendPlayerInfo) {
              this.sendPlayerInfo(
                this.getInitPayload() || {
                  init: true,
                  name: currentPlayer.state.name,
                  characterType: currentPlayer.state.characterType || null,
                  skin: currentPlayer.state.skin,
                  position: currentPlayer.unit?.getPosition().toArray() || [
                    0, 0, 0
                  ]
                },
                [peerId]
              );
            }

            this.newPlayers.set(player.id, player);
            console.log('Peer joined:', peerId);
          })
        )
        .subscribe(void 0)
    );

    this.subscription.add(
      this.observables?.peerLeave$?.subscribe(peerId => {
        const player = this.players.get(peerId);
        if (player && player.unit) {
          this.app.modules.player.removePlayer(player);
          this.players.delete(player.id);
          player.destroy();
        }
        console.log('Peer left:', peerId);
      })
    );

    //#endregion
  }

  async setupFirebase() {
    if (!this.app.config.firebase) {
      throw new Error('No firebase config found');
    }

    const config = this.app.config.firebase;
    console.log('Initializing firebase with config', config);
    firebase.initApp(config);
    const modules = await firebase.get();
    this.firebaseAppId = config.appId;
    const firebaseApp = modules.app.initializeApp(
      {
        apiKey: config.apiKey,
        databaseURL: config.databaseURL,
        projectId: config.projectId
      },
      'default'
    );
    this.firebaseApp = firebaseApp;
    console.log('Firebase initialized', firebaseApp);
  }

  async login(playerSettings: PlayerSettings): Promise<CurrentPlayer> {
    if (!this.firebaseApp) {
      throw new Error('Firebase not initialized');
    }

    // get or create user
    // const { auth, firestore } = await firebase.getImports();

    // const userCredential = await auth.signInAnonymously(
    //   auth.getAuth(this.firebaseApp)
    // );
    // console.log('Signed in anonymously', userCredential);

    // const user: User = {};
    // const userId = userCredential.user.uid;
    // const db = firestore.getFirestore(this.firebaseApp);
    // if (await hasUser(db, userId)) {
    //   user = await getUser(db, userId);
    // } else {
    //   user = await createUser(db, userId, { username: 'Player ' + userId });
    // }

    const player = new CurrentPlayer({
      id: selfId,
      settings: playerSettings
      // firebase: {
      //   userId: userCredential.user.uid
      // }
    });

    return player;
  }

  async joinRoom(roomId: string, targetTeleporterUnitId?: UnitIdentifier) {
    console.log('Joining room', roomId, targetTeleporterUnitId);
    if (this.state.room) {
      console.log('Leaving current room');
      this.state.room.leave();
    }
    const { joinRoom } = await import('trystero/firebase').then(
      m => m.default || m
    );
    if (!this.firebaseApp || !this.firebaseAppId) {
      throw new Error('Firebase not initialized');
    }

    const currentPlayer = this.app.modules.player.getCurrentPlayer()!;

    this.setInitPayload({
      init: true,
      characterType: currentPlayer.state.characterType,
      name: currentPlayer.state.name || 'Unknown',
      skin: currentPlayer.state.skin,
      position: currentPlayer.unit?.getPosition().toArray() || [0, 0, 0],
      teleporterUnitId: targetTeleporterUnitId || null
    });

    const room = joinRoom(
      { firebaseApp: this.firebaseApp, appId: this.firebaseAppId },
      roomId
    );

    this.setupRoomEvents(room);
    // if (targetTeleporterUnitId) {
    //   this.app.modules.room
    //   currentPlayer.unit?.setPosition();

    // if (targetTeleporterUnitId) {
    //   const teleporterUnit = this.app.modules.room
    //     .getRoom()
    //     ?.modules.units.getById<TeleporterUnit>(targetTeleporterUnitId);

    //   if (teleporterUnit) {
    //     teleporterUnit.modules.teleporter.leave(currentPlayer.unit!);
    //   }
    // }

    this.setupRoomActions(room);

    this.state.room = room;
  }

  private initPayload?: PlayerInfoPayload;
  setInitPayload(payload: PlayerInfoPayload) {
    this.initPayload = payload;
  }
  getInitPayload() {
    return this.initPayload;
  }

  sendPlayerInfo(
    payload: PlayerInfoPayload,
    players: string[] = this.getOtherPlayers()
  ) {
    console.error('XXXXXXXMULTI SEND', payload, players);
    if (this.actions.sendPlayerInfo) {
      this.actions.sendPlayerInfo(payload, players);
    }
  }

  setupRoomEvents(room: TrysteroRoom) {
    if (!room) {
      throw new Error('Not in a room');
    }

    room.onPeerJoin(peerId => this.observables.peerJoin$.next(peerId));
    room.onPeerLeave(peerId => this.observables.peerLeave$.next(peerId));
  }

  setupRoomActions(room: TrysteroRoom) {
    if (!this.observables) {
      throw new Error('Observables not registered');
    }

    //#region player moveTo action

    const [setMoveTo, getMoveTo] =
      room.makeAction<MoveToPayload>('playerMoveTo');

    getMoveTo((data, peerId) =>
      this.observables.moveTo$.next({ data, peerId })
    );

    this.actions.setMoveTo = setMoveTo;

    //#endregion

    //#region player setPosition action

    const [setPosition, getPosition] =
      room.makeAction<SetPositionPayload>('playerSetPos');

    getPosition((data, peerId) =>
      this.observables.setPosition$.next({ data, peerId })
    );

    this.actions.setPosition = setPosition;

    //#endregion

    //#region send message action

    const [sendMessage, getMessage] = room.makeAction<Message & DataPayload>(
      'messaging'
    );

    getMessage((data, peerId) =>
      this.observables.message$.next({ data, peerId })
    );

    this.actions.sendMessage = sendMessage;

    //#endregion

    //#region send player info action

    const [sendPlayerInfo, getPlayerInfo] =
      room.makeAction<PlayerInfoPayload>('playerInfo');

    getPlayerInfo(async (data, peerId) => {
      console.error('XXXXXXXMULTI GWT', data, peerId);

      if (this.newPlayers.has(peerId)) {
        const player = this.newPlayers.get(peerId)!;

        await this.app.modules.player.addPlayer({
          player,
          teleporterUnitId: data.teleporterUnitId!
        });
        this.players.set(player.id, player);
        this.newPlayers.delete(peerId);
      }

      const player = this.players.get(peerId);
      if (player) {
        if (player && data.init) {
          await this.setPlayerInfo(player, data as PlayerInfo);
        }
      }
    });

    this.actions.sendPlayerInfo = sendPlayerInfo;

    //#endregion
  }

  newPlayers = new Map<string, Player>();

  async setPlayerInfo(player: Player, info: PlayerInfo) {
    await player.setSettings({
      characterType: info.characterType,
      name: info.name,
      skin: info.skin
    });
    if (!player.isReady()) {
      player.unit?.setPosition(new Vector3().fromArray(info.position));
    }
    player.setReady(true);
  }

  sendMessage(message: Omit<Message, 'timestamp' | 'playerId'>) {
    const player = this.app.modules.player.getCurrentPlayer();
    if (!player) {
      throw new Error('No current player');
    }
    if (this.actions.sendMessage) {
      const data = {
        ...message,
        timestamp: Date.now(),
        playerId: player.id
      };
      this.actions.sendMessage(data, this.getOtherPlayers());

      this.observables.message$.next({
        data,
        peerId: player.id
      });
    }
  }
}
