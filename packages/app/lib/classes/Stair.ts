import { Object3D, type Vector3 } from 'three';
import type { ROTATION } from '../types';
import type { StairIdentifier } from '../types/stair';
import { Subscription } from 'rxjs';
import type { AnimationLoopSubject } from './Renderer';

export interface StairDescription<Position = Vector3> {
  skin: StairIdentifier;
  position: Position;
  rotation: ROTATION;
}

export default class Stair {
  skin: StairIdentifier = 'default';
  position: Vector3;
  rotation: ROTATION;

  root = new Object3D();

  subscription = new Subscription();

  constructor({
    position,
    rotation
  }: {
    position: Vector3;
    rotation: ROTATION;
  }) {
    this.position = position;
    this.rotation = rotation;
  }

  toDescription(): StairDescription {
    return {
      skin: this.skin,
      position: this.position.clone(),
      rotation: this.rotation
    };
  }

  destroy(): void {
    this.subscription.unsubscribe();
    this.root.remove();
  }

  setup(_context: { animationLoop$: AnimationLoopSubject }): void {
    // Override in subclass if needed
  }

  // get key(): string {
  //   return (this.constructor as typeof WallExtension).KEY;
  // }
  // get type(): WALL_EXTENSION_TYPE {
  //   return (this.constructor as typeof WallExtension).TYPE;
  // }
}
