import { AnimationClip, type AnimationAction } from 'three';
import { AnimationMixer, Object3D } from 'three';
import type { UnitModuleObservables, UnitModuleState } from '../../UnitModule';
import { OBJECT_NAME } from '../../../utils/object';
import { ReplaySubject, Subject } from 'rxjs';
import type { AnimationLoopValue } from '../../Renderer';
import type WallExtension from '../../WallExtension';
import WallExtensionModule, {
  type WallExtensionModuleSetupContext
} from '../../WallExtensionModule';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/types/animation';

type Actions = { [key: string]: AnimationAction };

interface Observables extends UnitModuleObservables {
  action$: ReplaySubject<ANIMATION_ACTION>;
  addAction$: Subject<AnimationAction>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface State extends UnitModuleState {}

export class AnimationWallExtensionModule extends WallExtensionModule<
  State,
  Observables
> {
  getCurrentAction() {
    return this.action;
  }
  static override TYPE = 'animation';

  mixer!: AnimationMixer;
  actions: Actions = {};
  activeAction: AnimationAction | null = null;
  animations: AnimationClip[] = [];
  private action: ANIMATION_ACTION = ANIMATION_ACTION.NONE;

  constructor(wallExtension: WallExtension, debug: boolean) {
    super(wallExtension, debug);

    //#region observables
    this.observables.action$ = new ReplaySubject<ANIMATION_ACTION>(1);
    this.observables.action$.next(this.action);
    this.observables.addAction$ = new Subject<AnimationAction>();
    //#endregion
  }

  override async setup(
    context: WallExtensionModuleSetupContext
  ): Promise<Object3D> {
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
      const action = this.mixer.clipAction(
        new AnimationClip(clip.name, clip.duration, tracks)
      );
      this.addAction(clip.name, action);
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

  fadeToAction(actions: Actions, name: string, duration = 0.2) {
    const next = actions[name];
    if (!next || next === this.activeAction) return;

    if (this.activeAction) {
      this.activeAction.fadeOut(duration);
    }

    next.reset().fadeIn(duration).play();
    this.activeAction = next;
  }
}
