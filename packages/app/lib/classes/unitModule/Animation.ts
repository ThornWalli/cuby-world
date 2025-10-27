import { AnimationClip, type AnimationAction } from 'three';
import { AnimationMixer, Clock, Object3D } from 'three';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleSetupContext,
  type UnitModuleState
} from '../UnitModule';
import { OBJECT_NAME } from '../../utils/object';
import { ReplaySubject } from 'rxjs';
import type Unit from '../Unit';
import type { AnimationLoopValue } from '../Renderer';

export enum ANIMATION_ACTION {
  IDLE = 'idle',
  WALK = 'walk',
  ASCENDING_STAIR = 'ascending_stair',
  DESCENDING_STAIR = 'descending_stair',
  STAIR_FALLBACK = 'stair_fallback'
}

type Actions = { [key: string]: AnimationAction };

interface Observables extends UnitModuleObservables {
  action$: ReplaySubject<ANIMATION_ACTION>;
}

interface State extends UnitModuleState {
  action: ANIMATION_ACTION;
}

export class AnimationUnitModule extends UnitModule<State, Observables> {
  static override TYPE = 'animation';

  clock: Clock = new Clock();
  mixer!: AnimationMixer;
  actions: Actions = {};
  animations: AnimationClip[] = [];

  constructor(unit: Unit, state: State, debug: boolean) {
    state.action = ANIMATION_ACTION.IDLE;
    super(unit, state, debug);
    //#region observables
    this.observables.action$ = new ReplaySubject<ANIMATION_ACTION>(1);
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
    this.actions[ANIMATION_ACTION.IDLE]?.play();
    return animationWrapper;
  }
  getAction(name: string) {
    return this.actions[name];
  }

  private addAction(name: string, action: AnimationAction) {
    this.actions[name] = action;
  }

  setAnimations(animations: AnimationClip[]) {
    this.animations = animations;
  }

  setAnimationAction(type: ANIMATION_ACTION) {
    if (this.state.action === type) return;
    console.log('setAnimationAction', type);
    this.state.action = type;
    fadeToAction(this.mixer ? this.actions : {}, type, 0.2);
    this.observables.action$.next(type);
  }

  override update({ delta }: AnimationLoopValue) {
    this.mixer?.update(delta);
  }
}

let activeAction: AnimationAction | null = null;
function fadeToAction(actions: Actions, name: string, duration = 0.5) {
  const next = actions[name];
  if (!next || next === activeAction) return;

  if (activeAction) {
    activeAction.fadeOut(duration);
  }

  next.reset().fadeIn(duration).play();
  activeAction = next;
}
