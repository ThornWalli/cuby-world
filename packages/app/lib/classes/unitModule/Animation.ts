import { AnimationClip, type AnimationAction } from 'three';
import { AnimationMixer, Object3D } from 'three';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleOptions,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import { OBJECT_NAME } from '../../utils/object';
import type { Subject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import type Unit from '../Unit';
import type { AnimationLoopValue } from '../Renderer';
import { ANIMATION_ACTION } from '../../types/animation';

type Actions = { [key: string]: AnimationAction };

interface Observables extends UnitModuleObservables {
  action$: ReplaySubject<ANIMATION_ACTION>;
  addAction$: Subject<AnimationAction>;
}

type Options = UnitModuleOptions;

type State = UnitModuleState;

export class AnimationUnitModule extends UnitModule<
  Options,
  State,
  Observables
> {
  static override TYPE = 'animation';

  mixer!: AnimationMixer;
  actions: Actions = {};
  animations: AnimationClip[] = [];
  private action: ANIMATION_ACTION;

  getCurrentAction() {
    return this.action;
  }

  constructor(unit: Unit, options: Options, state: State, debug: boolean) {
    super(unit, options, state, debug);

    this.action = ANIMATION_ACTION.NONE;

    //#region observables
    this.observables.action$ = new ReplaySubject<ANIMATION_ACTION>(1);
    this.observables.action$.next(this.action);
    this.observables.addAction$ = new ReplaySubject<AnimationAction>(1);
    //#endregion
  }

  override async setup(context: UnitModuleSetupContext): Promise<Object3D> {
    const animationWrapper = new Object3D();
    animationWrapper.name = OBJECT_NAME.MESH_ANIMATION;
    this.mixer = new AnimationMixer(animationWrapper);

    this.animations.forEach(clip => {
      const tracks = clip.tracks.filter(track => {
        // Entfernt alle Tracks, die Hips auf X oder Z bewegen
        return (
          !track.name.includes('Hips.position') ||
          track.name.includes('Hips.position[y]')
        );
      });
      this.addAction(
        clip.name,
        this.mixer.clipAction(
          new AnimationClip(clip.name, clip.duration, tracks)
        )
      );
    });

    animationWrapper.add(context.mesh);

    return animationWrapper;
  }

  override destroy(): void {
    super.destroy();
    this.mixer?.stopAllAction();
  }

  getAction(name: string) {
    return this.actions[name];
  }

  private addAction(name: string, action: AnimationAction) {
    this.observables.addAction$.next(action);
    this.actions[name] = action;
  }

  setAnimations(animations: AnimationClip[]) {
    this.animations = animations;
  }

  setAnimationAction(type: ANIMATION_ACTION, duration = 0.2) {
    if (this.action === type) return;
    this.action = type;
    this.fadeToAction(this.mixer ? this.actions : {}, type, duration);
    this.observables.action$.next(type);
  }

  override update({ delta }: AnimationLoopValue) {
    this.mixer?.update(delta);
  }

  activeAction: AnimationAction | null = null;
  fadeToAction(actions: Actions, name: string, duration = 0.5) {
    const next = actions[name];
    if (!next || next === this.activeAction) return;

    if (this.activeAction) {
      this.activeAction.fadeOut(duration);
    }

    next.reset().fadeIn(duration).play();
    this.activeAction = next;
  }
}
