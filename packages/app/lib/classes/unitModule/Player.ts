import type Player from '../Player';
import UnitModule, { type UnitModuleState } from '../UnitModule';

type State = UnitModuleState;

export default class PlayerUnitModule extends UnitModule {
  static override TYPE = 'player';

  state: State = {};

  player?: Player;
  setPlayer(player: Player) {
    this.player = player;
  }
}
