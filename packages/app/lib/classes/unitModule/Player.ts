import type Player from '../Player';
import UnitModule from '../UnitModule';

export default class PlayerUnitModule extends UnitModule {
  static override TYPE = 'player';
  player?: Player;
  setPlayer(player: Player) {
    this.player = player;
  }
}
