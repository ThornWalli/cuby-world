import AppModule, { type AppModuleState } from '../AppModule';
import type Player from '../Player';

interface State extends AppModuleState {
  player?: Player;
}
export default class PlayerAppModule extends AppModule<State> {
  static override TYPE = 'player';
  state: State = {
    player: undefined
  };

  getPlayer() {
    return this.state.player;
  }

  setPlayer(player: Player | undefined) {
    this.state.player = player;
  }
}
