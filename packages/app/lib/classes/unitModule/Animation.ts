import { AnimationMixer, Clock, Object3D } from 'three';
import UnitModule, {
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import { OBJECT_NAME } from '../Unit';

type State = UnitModuleState;

export class AnimationUnitModule extends UnitModule<State> {
  static override TYPE = 'animation';

  clock: Clock = new Clock();
  mixer!: AnimationMixer;

  override async setup(context: UnitModuleSetupContext): Promise<Object3D> {
    const animationWrapper = new Object3D();
    animationWrapper.name = OBJECT_NAME.MESH_ANIMATION;
    this.mixer = new AnimationMixer(animationWrapper);
    animationWrapper.add(context.mesh);
    return animationWrapper;
  }
}
