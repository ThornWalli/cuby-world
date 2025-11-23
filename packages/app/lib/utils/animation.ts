import { AnimationClip, VectorKeyframeTrack } from 'three';
import { ANIMATION_ACTION } from '../types/animation';

export function getHoverClip(strength = 0.05, duration = 2): AnimationClip {
  const times = [0, duration];
  const values = [-strength, strength];

  const hoverTrack = new VectorKeyframeTrack('.position[y]', times, values);
  const clip = new AnimationClip(ANIMATION_ACTION.IDLE, -1, [hoverTrack]);

  return clip;
}

export function getNoneClip(): AnimationClip {
  const times = [0, 1];
  const values = [0, 0];

  const noneTrack = new VectorKeyframeTrack('.position[y]', times, values);
  const clip = new AnimationClip(ANIMATION_ACTION.NONE, -1, [noneTrack]);

  return clip;
}
