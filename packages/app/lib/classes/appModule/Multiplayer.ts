import firebase, {
  type FirebaseFullConfig
} from '@cuby-world/app/services/firebase';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import { selfId, type DataPayload, type Room as TrysteroRoom } from 'trystero';

import type { FirebaseApp } from 'firebase/app';
import { concatMap, Subject, Subscription, switchMap } from 'rxjs';
import type { PLAYER_COLOR, PlayerSettings } from '../Player';
import Player from '../Player';
import { Vector3 } from 'three';
// import {
//   createUser,
//   getUser,
//   hasUser,
//   type User
// } from './multiplayer/database';
import CurrentPlayer from '../player/Current';
import { CUBY_COLOR } from '@cuby-world/units/cuby/Cuby';
import type App from '../App';

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
};
type MessagePayload = DataPayload & Message;
type PlayerInfoPayload = DataPayload & Partial<PlayerInfo>;

export const DEFAULT_ROOM_ID = 'lobby';

interface PlayerInfo {
  // peerId: string;
  name: string;
  color: PLAYER_COLOR;
  position: [number, number, number];
}
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
    this.observables.message$ = new Subject<{
      data: MessagePayload;
      peerId: string;
    }>();
    //#endregion
  }

  actions: {
    setMoveTo?: (data: MoveToPayload, targetPeers?: string[]) => void;
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
          player.unit$
            .pipe(
              switchMap(unit => unit.modules.movement.observables.moveStart$),
              concatMap(async position => {
                console.log('Player started moving');
                if (!this.actions?.setMoveTo) {
                  throw new Error('No setMoveTo action available');
                }
                this.actions.setMoveTo(
                  {
                    position: position.toArray()
                  },
                  this.getOtherPlayers()
                );
              })
            )
            .subscribe(void 0)
        );
        playerSubscription.add(
          player.playerSettings$.subscribe(playerSettings => {
            this.sendPlayerInfo(playerSettings);
          })
        );
      })
    );

    this.observables?.moveTo$?.subscribe(({ data, peerId }) => {
      const player = this.players.get(peerId);
      console.log('Received moveTo from', peerId, data);
      if (player && player.unit) {
        player.unit.modules.movement.moveTo(
          new Vector3().fromArray(data.position)
        );
      }
    });

    //#region room event handlers

    this.subscription.add(
      this.observables?.peerJoin$?.subscribe(peerId => {
        const player = new Player({ id: peerId, name: peerId });
        const currentPlayer = this.app.modules.player.getCurrentPlayer();
        if (currentPlayer && this.actions.sendPlayerInfo) {
          this.actions.sendPlayerInfo(
            {
              name: currentPlayer.state.name,
              color: currentPlayer.state.color,
              position: currentPlayer.unit?.getPosition().toArray() || [0, 0, 0]
            },
            [peerId]
          );
        }
        this.app.modules.player.addPlayer(player);
        this.players.set(player.id, player);
        console.log('Peer joined:', peerId);
      })
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
      name: playerSettings.name || 'Unknown',
      color: playerSettings.color || CUBY_COLOR.BLUE
      // firebase: {
      //   userId: userCredential.user.uid
      // }
    });

    return player;
  }

  async joinRoom(roomId: string) {
    console.log('Joining room', roomId);
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
    const room = joinRoom(
      { firebaseApp: this.firebaseApp, appId: this.firebaseAppId },
      roomId
    );

    this.setupRoomEvents(room);

    const currentPlayer = this.app.modules.player.getCurrentPlayer()!;
    this.actions.sendPlayerInfo?.(
      {
        peerId: this.state.playerId,
        name: currentPlayer.state.name || 'Unknown',
        color: currentPlayer.state.color,
        position: currentPlayer.unit?.getPosition().toArray() || [0, 0, 0]
      },
      this.getOtherPlayers()
    );

    this.setupRoomActions(room);
    this.state.room = room;
  }

  sendPlayerInfo(playerSettings: PlayerSettings) {
    console.log(this.getOtherPlayers());
    this.actions.sendPlayerInfo?.(
      {
        ...playerSettings
      },
      this.getOtherPlayers()
    );
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

    getPlayerInfo((data, peerId) => {
      const player = this.players.get(peerId);
      if (player) {
        this.setPlayerInfo(player, data as PlayerInfo);
      }
    });

    this.actions.sendPlayerInfo = sendPlayerInfo;

    //#endregion
  }

  setPlayerInfo(player: Player, info: PlayerInfo) {
    player.setSettings({
      name: info.name,
      color: info.color
    });
    // set position if available
    if (info.position) {
      const position = new Vector3().fromArray(info.position);
      player.unit?.setPosition(position);
    }
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
