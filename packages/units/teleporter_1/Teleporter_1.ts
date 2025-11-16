import type { AnimationAction } from 'three';
import { LoopOnce, Object3D, Vector2, Vector3 } from 'three';
import { fromEvent } from 'rxjs';
import type {
  SetupContext,
  UnitConstructorOptions
} from '@cuby-world/app/lib/classes/Unit';
import { loadGltf } from '@cuby-world/app/lib/utils/gltf';
import glbBase from './assets/teleporter_1.glb?url';
import type { TeleporterUnitOptions } from '@cuby-world/app/lib/classes/unit/Teleporter';
import TeleporterUnit from '@cuby-world/app/lib/classes/unit/Teleporter';
import {
  getEntryConditionDirections,
  type ConditionDirectionsDescription
} from '@cuby-world/app/lib/utils/pathfindng';
import {
  DOOR_ACTION,
  doorActionToAnimtionAction
} from '@cuby-world/app/lib/classes/wallExtension/Door';
import { ANIMATION_ACTION } from '@cuby-world/app/lib/types/animation';

export interface TeleporterOptions extends TeleporterUnitOptions {
  opened?: boolean;
  /**
   * Milliseconds
   */
  duration: number;
}
export default class Teleporter_1 extends TeleporterUnit<TeleporterOptions> {
  static override KEY = 'teleporter_1';
  static override NAME = 'Teleporter_1';
  private action = DOOR_ACTION.CLOSED;
  constructor(
    options: Omit<
      UnitConstructorOptions<TeleporterOptions>,
      'name' | 'selectable'
    > = {}
  ) {
    super({
      ...options,
      name: 'Teleporter 1',
      accessible: true,
      selectable: true,
      placeable: true,
      size: new Vector3(1, 0.3, 1),
      options: {
        duration: 300,
        offset: new Vector3(0, -0.3, 0),
        entryPosition: new Vector2(0, 1)
      }
    });
  }

  override async setup(context: SetupContext): Promise<void> {
    this.subscription.add(
      this.modules.animation!.observables.addAction$.subscribe(
        (action: AnimationAction) => {
          action.setDuration(this.options.duration / 1000);
          action.setLoop(LoopOnce, 0);
          action.clampWhenFinished = true;
        }
      )
    );

    await super.setup(context);
    this.subscription.add(
      fromEvent(this.modules.animation!.mixer, 'finished').subscribe(() => {
        if (this.isOpening()) {
          this.setOpened(true);
        } else if (this.isClosing()) {
          this.setOpened(false);
        }
      })
    );
  }

  setAction(action: DOOR_ACTION) {
    this.action = action;

    this.modules.animation!.setAnimationAction(
      doorActionToAnimtionAction(action),
      this.options.duration / 1000
    );
  }

  isOpening() {
    return (
      this.action === DOOR_ACTION.OPEN_LEFT ||
      this.action === DOOR_ACTION.OPEN_RIGHT
    );
  }

  isClosing() {
    return (
      this.action === DOOR_ACTION.CLOSE_LEFT ||
      this.action === DOOR_ACTION.CLOSE_RIGHT
    );
  }

  isOpen() {
    return this.options.opened;
  }

  setOpened(opened: boolean) {
    this.options.opened = opened;
  }

  override getConditionDirections(): ConditionDirectionsDescription[] {
    return getEntryConditionDirections(
      this.getPosition().clone(),
      this.getRotation()
    );
  }

  override async createMesh(_context: SetupContext) {
    const meshRoot = new Object3D();

    const { object, animations } = await loadGltf(glbBase);
    this.modules.animation?.setAnimations(animations);

    meshRoot.position.set(0, 0, 0);

    this.setMaterialReady();

    meshRoot.add(object);

    meshRoot.traverse(child => {
      child.castShadow = true;
    });

    return meshRoot;
  }

  override async beforeEnter(): Promise<void> {
    this.modules.animation?.setAnimationAction(
      ANIMATION_ACTION.OPEN_RIGHT,
      this.options.duration / 1000
    );

    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, this.options.duration);
    });
  }

  override async afterEnter() {
    this.modules.animation?.setAnimationAction(
      ANIMATION_ACTION.CLOSED,
      this.options.duration / 1000
    );

    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, this.options.duration);
    });
  }

  override async beforeLeave(): Promise<void> {
    this.modules.animation?.setAnimationAction(
      ANIMATION_ACTION.OPEN_RIGHT,
      this.options.duration / 1000
    );

    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, this.options.duration);
    });
  }

  override async afterLeave(): Promise<void> {
    this.modules.animation?.setAnimationAction(
      this.modules.animation.getCurrentAction() === ANIMATION_ACTION.OPEN_LEFT
        ? ANIMATION_ACTION.CLOSE_LEFT
        : ANIMATION_ACTION.CLOSE_RIGHT,
      this.options.duration / 1000
    );

    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, this.options.duration);
    });
  }
}
