import { ReplaySubject, Subject, switchMap } from 'rxjs';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import type Player from '../Player';
import type App from '../App';

interface Observables extends AppModuleObservables {
  currentPlayer$: ReplaySubject<Player>;
  addPlayer$: Subject<Player>;
  removePlayer$: Subject<Player>;
}

interface State extends AppModuleState {
  currentPlayer?: Player;
  players: Player[];
}
export default class PlayerAppModule extends AppModule<State, Observables> {
  static override TYPE = 'player';
  state: State = {
    players: []
  };

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.currentPlayer$ = new ReplaySubject<Player>(0);
    this.observables.addPlayer$ = new Subject<Player>();
    this.observables.removePlayer$ = new Subject<Player>();
    //#endregion
  }

  override destroy(): void {
    super.destroy();
    this.state.players.forEach(player => player.destroy());
  }

  getPlayerById(id: string) {
    return this.state.players.find(player => player.id === id);
  }

  getCurrentPlayer() {
    if (!this.state.currentPlayer) {
      throw new Error('Current player is not set');
    }
    return this.state.currentPlayer;
  }

  setCurrentPlayer(player: Player) {
    this.state.currentPlayer = player;
    this.observables.currentPlayer$.next(player);

    // TODO: Ist das hier richtig platziert?
    this.state.currentPlayer.unit$
      .pipe(switchMap(unit => unit.modules.movement.observables.moveEnd$))
      .subscribe(() => {
        const unit = this.state.currentPlayer!.unit!;
        const room = this.app.modules.room.getRoom()!;

        //#region teleport
        const teleport = room.modules.teleport.getTeleportByPosition(
          unit.getPosition()
        );
        console.log('Player moved!', teleport);

        this.app.modules.teleport.resolveTeleport(teleport);
        //#endregion
      });
  }

  getPlayers() {
    return this.state.players;
  }

  addPlayer(player: Player) {
    this.state.players.push(player);
    this.observables.addPlayer$.next(player);
    if (player.client) {
      this.setCurrentPlayer(player);
    }
  }

  removePlayer(player: Player) {
    this.state.players = this.state.players.filter(p => p.id !== player.id);
    this.observables.removePlayer$.next(player);
    player.destroy();
  }
}
