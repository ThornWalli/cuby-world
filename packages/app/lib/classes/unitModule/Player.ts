import type Player from '../Player';
import UnitModule, {
  type UnitModuleOptions,
  type UnitModuleState
} from '../UnitModule';

type Options = UnitModuleOptions;
type State = UnitModuleState;

export default class PlayerUnitModule extends UnitModule<Options, State> {
  isClient() {
    return this.player?.client || false;
  }
  static override TYPE = 'player';

  player?: Player;

  setPlayer(player: Player) {
    this.player = player;
  }
}
