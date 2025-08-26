import { AnimationClip, VectorKeyframeTrack } from 'three';

export function getHoverClip(strength = 0.05, duration = 2): AnimationClip {
  const times = [0, duration];
  const values = [-strength, strength];

  const hoverTrack = new VectorKeyframeTrack('.position[y]', times, values);
  const clip = new AnimationClip('Hover', -1, [hoverTrack]);

  return clip;
}
