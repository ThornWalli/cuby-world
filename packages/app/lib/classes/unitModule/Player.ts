import type Player from '../Player';
import UnitModule, { type UnitModuleState } from '../UnitModule';

type State = UnitModuleState;

export default class PlayerUnitModule extends UnitModule<State> {
  static override TYPE = 'player';

  player?: Player;

  setPlayer(player: Player) {
    this.player = player;
  }
}
