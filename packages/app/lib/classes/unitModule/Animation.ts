import { AnimationMixer, Clock, Object3D } from 'three';
import UnitModule, { type UnitModuleSetupContext } from '../UnitModule';

export class AnimationUnitModule extends UnitModule {
  static override TYPE = 'animation';
  clock: Clock = new Clock();
  mixer!: AnimationMixer;

  override async setup(context: UnitModuleSetupContext): Promise<Object3D> {
    const animationWrapper = new Object3D();
    this.mixer = new AnimationMixer(animationWrapper);
    animationWrapper.add(context.mesh);
    return animationWrapper;
  }
}
