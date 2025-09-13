import type Room from '../Room';
import UnitModule, {
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';

type State = UnitModuleState;

export default class RoomUnitModule extends UnitModule {
  static override TYPE = 'room';

  state: State = {};

  override async setup(context: UnitModuleSetupContext) {
    this.room = context.room;
    return context.mesh;
  }

  private room?: Room;

  getRoom() {
    return this.room;
  }
}
