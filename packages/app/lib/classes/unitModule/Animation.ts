import { AnimationMixer, Clock, Object3D } from 'three';
import UnitModule, {
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';

type State = UnitModuleState;

export class AnimationUnitModule extends UnitModule {
  static override TYPE = 'animation';

  state: State = {};

  clock: Clock = new Clock();
  mixer!: AnimationMixer;

  override async setup(context: UnitModuleSetupContext): Promise<Object3D> {
    const animationWrapper = new Object3D();
    this.mixer = new AnimationMixer(animationWrapper);
    animationWrapper.add(context.mesh);
    return animationWrapper;
  }
}
