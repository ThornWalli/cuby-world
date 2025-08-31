import firebase, {
  type FirebaseFullConfig
} from '@cuby-world/app/services/firebase';
import AppModule, { type AppModuleState } from '../AppModule';
import { selfId, type DataPayload, type Room as TrysteroRoom } from 'trystero';

import type { FirebaseApp } from 'firebase/app';
import { Observable, Subject, Subscription } from 'rxjs';
import Player from '../Player';
import { Vector3 } from 'three';

export interface Message {
  timestamp: number;
  message: string;
  playerId: string;
}

interface State extends AppModuleState {
  active: boolean;
  roomId: string;
  // Trystero
  room?: TrysteroRoom;
  playerId: string;
}

declare module '../App' {
  interface AppConfig {
    firebase?: FirebaseFullConfig;
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    multiplayer?: {};
  }
}

type MoveToPayload = DataPayload & {
  position: [number, number, number];
};
type MessagePayload = DataPayload & Message;

const DEFAULT_ROOM_ID = 'lobby';
export default class MultiplayerAppModule extends AppModule<State> {
  static override TYPE = 'multiplayer';

  players: Player[] = [];

  state: State = {
    active: true,
    roomId: DEFAULT_ROOM_ID,
    playerId: selfId
  };

  // #region firebase
  firebaseAppId?: string;
  firebaseApp?: FirebaseApp;
  // #endregion

  observables?: {
    peerJoin$: Observable<string>;
    peerLeave$: Observable<string>;
    moveTo$?: Observable<{
      data: MoveToPayload;
      peerId: string;
    }>;
    message$?: Subject<{ data: MessagePayload; peerId: string }>;
  };

  actions: {
    setMoveTo?: (data: MoveToPayload, targetPeers?: string[]) => void;
    sendMessage?: (data: MessagePayload, targetPeers?: string[]) => void;
  } = {};

  getOtherPlayers() {
    return this.players.filter(p => !p.client).map(p => p.id);
  }

  get playerId() {
    return this.state.playerId;
  }

  override async setup() {
    super.setup();

    if (!this.state.active) {
      return;
    }
    window.setTimeout(() => {
      window.localStorage.removeItem('firebase:previous_websocket_failure');
    }, 2000);

    await this.setupFirebase();

    if (!this.app.config.multiplayer) {
      throw new Error('No multiplayer config found');
    }

    await this.join();

    this.setupRoomEvents();
    this.setupActions();

    let playerSubscription = new Subscription();
    this.subscription.add(
      this.app.modules.player.currentPlayer$.subscribe(player => {
        playerSubscription?.unsubscribe();
        playerSubscription = new Subscription();
        playerSubscription.add(
          player.unit$.subscribe(unit => {
            playerSubscription.add(
              unit.modules.movement.moveStart$.subscribe(position => {
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
            );
          })
        );
      })
    );

    this.observables?.moveTo$?.subscribe(({ data, peerId }) => {
      const player = this.players.find(p => p.id === peerId);
      console.log('Received moveTo from', peerId, data);
      if (player && player.unit) {
        player.unit.modules.movement.moveTo(
          new Vector3().fromArray(data.position)
        );
      }
    });

    // #region room event handlers

    this.subscription.add(
      this.observables?.peerJoin$?.subscribe(peerId => {
        const player = new Player({ id: peerId, name: 'Player ' + peerId });
        this.app.modules.player.addPlayer(player);
        this.players.push(player);
        console.log('Peer joined:', peerId);
      })
    );
    this.subscription.add(
      this.observables?.peerLeave$?.subscribe(peerId => {
        const player = this.players.find(p => p.id === peerId);
        if (player && player.unit) {
          this.app.modules.player.removePlayer(player);
          this.players = this.players.filter(({ id }) => id !== player.id);
          player.destroy();
        }
        console.log('Peer left:', peerId);
      })
    );

    // #endregion
  }

  async setupFirebase() {
    if (!this.app.config.firebase) {
      throw new Error('No firebase config found');
    }

    const config = this.app.config.firebase;
    firebase.initApp(this.app.config.firebase);
    const modules = await firebase.get();
    this.firebaseAppId = config.appId;
    const firebaseApp = modules.app.initializeApp(
      {
        apiKey: config.apiKey,
        databaseURL: config.databaseURL
      },
      'default'
    );
    this.firebaseApp = firebaseApp;
    console.log('Firebase initialized', firebaseApp);
  }

  async join() {
    if (this.state.room) {
      throw new Error('Already in a room');
    }
    const { joinRoom } = await import('trystero/firebase').then(
      m => m.default || m
    );
    if (!this.firebaseApp || !this.firebaseAppId) {
      throw new Error('Firebase not initialized');
    }
    this.state.room = joinRoom(
      { firebaseApp: this.firebaseApp, appId: this.firebaseAppId },
      this.state.roomId
    );
  }

  setupRoomEvents() {
    const room = this.state.room;
    if (!room) {
      throw new Error('Not in a room');
    }
    const peerJoin$ = new Observable<string>(subscriber => {
      room.onPeerJoin(peerId => subscriber.next(peerId));
    });
    const peerLeave$ = new Observable<string>(subscriber => {
      room.onPeerLeave(peerId => subscriber.next(peerId));
    });
    this.observables = { peerJoin$, peerLeave$ };
  }

  setupActions() {
    if (!this.state.room) {
      throw new Error('Not in a room');
    }
    if (!this.observables) {
      throw new Error('Observables not registered');
    }

    const room = this.state.room;

    // #region player moveTo action
    const [setMoveTo, getMoveTo] =
      room.makeAction<MoveToPayload>('playerMoveTo');

    const moveTo$ = new Observable<{
      data: MoveToPayload;
      peerId: string;
    }>(subscriber => {
      getMoveTo((data, peerId) => subscriber.next({ data, peerId }));
    });

    if (this.observables) {
      this.observables.moveTo$ = moveTo$;
    }
    this.actions.setMoveTo = setMoveTo;

    // #endregion

    // #region send message action

    const [sendMessage, getMessage] = room.makeAction<Message & DataPayload>(
      'plyMessage'
    );

    const message$ = new Subject<{
      data: Message & DataPayload;
      peerId: string;
    }>();
    getMessage((data, peerId) => message$.next({ data, peerId }));

    // const message$ = new Observable<{
    //   data: Message & DataPayload;
    //   peerId: string;
    // }>(subscriber => {
    //   getMessage((data, peerId) => subscriber.next({ data, peerId }));
    // });

    if (this.observables) {
      this.observables.message$ = message$;
    }
    this.actions.sendMessage = sendMessage;

    // #endregion
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
      this.observables?.message$?.next({
        data,
        peerId: player.id
      });
    }
  }
}
