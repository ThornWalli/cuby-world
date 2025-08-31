import { ReplaySubject, Subject } from 'rxjs';
import AppModule, { type AppModuleState } from '../AppModule';
import type Player from '../Player';

interface State extends AppModuleState {
  currentPlayer?: Player;
  players: Player[];
}
export default class PlayerAppModule extends AppModule<State> {
  static override TYPE = 'player';
  state: State = {
    players: []
  };

  currentPlayer$ = new ReplaySubject<Player>(0);
  addPlayer$ = new Subject<Player>();
  removePlayer$ = new Subject<Player>();

  override destroy(): void {
    super.destroy();
    this.currentPlayer$.unsubscribe();
    this.addPlayer$.unsubscribe();
    this.removePlayer$.unsubscribe();
    this.state.players.forEach(player => player.destroy());
  }

  getPlayerById(id: string) {
    return this.state.players.find(player => player.id === id);
  }

  getCurrentPlayer() {
    return this.state.currentPlayer;
  }

  private setCurrentPlayer(player: Player) {
    this.state.currentPlayer = player;
    this.currentPlayer$.next(player);
  }

  getPlayers() {
    return this.state.players;
  }

  addPlayer(player: Player) {
    this.state.players.push(player);
    this.addPlayer$.next(player);
    if (player.client) {
      this.setCurrentPlayer(player);
    }
  }

  removePlayer(player: Player) {
    this.state.players = this.state.players.filter(p => p.id !== player.id);
    this.removePlayer$.next(player);
    player.destroy();
  }
}
