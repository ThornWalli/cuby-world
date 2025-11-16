import type Room from '../Room';
import UnitModule, {
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';

type Options = UnitModuleOptions;
type State = UnitModuleState;

export default class RoomUnitModule extends UnitModule<Options, State> {
  static override TYPE = 'room';

  override async setup(context: UnitModuleSetupContext) {
    this.room = context.room;
    return context.mesh;
  }

  private room?: Room;

  getRoom() {
    return this.room;
  }
}
