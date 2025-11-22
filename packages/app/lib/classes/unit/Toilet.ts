import { LoopOnce, type AnimationAction, type Vector3 } from 'three';
import Unit, {
  type SetupContext,
  type UnitConstructorOptions,
  type UnitModuleList,
  type UnitModules,
  type UnitOptions
} from '@cuby-world/app/lib/classes/Unit';
import ToiletUnitModule from '@cuby-world/app/lib/classes/unitModule/Toilet';
import { AnimationUnitModule } from '@cuby-world/app/lib/classes/unitModule/Animation';
import { ANIMATION_ACTION } from '../../types/animation';
import { delay } from 'rxjs';
import { getEntryConditionDirections } from '../../utils/pathfindng';

export interface ToiletUnitOptions extends UnitOptions {
  offset: Vector3;
}

export type ToiletUnitModules = UnitModules & {
  toilet: ToiletUnitModule;
};

export type ToiletUnitModuleList = (typeof ToiletUnitModule)[] & UnitModuleList;
export default class ToiletUnit<
  Options extends ToiletUnitOptions = ToiletUnitOptions,
  Modules extends ToiletUnitModules = ToiletUnitModules,
  ModuleList extends ToiletUnitModuleList = ToiletUnitModuleList
> extends Unit<Options, Modules, ModuleList> {
  duration: number = 0;
  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(ToiletUnitModule);
    moduleList.push(AnimationUnitModule);
    super(options, moduleList);
  }

  override setup(context: SetupContext): Promise<void> {
    this.subscription.add(
      this.modules.animation?.observables.addAction$.subscribe(
        (action: AnimationAction) => {
          action.setDuration(this.duration / 1000);
          action.setLoop(LoopOnce, 0);
          action.clampWhenFinished = true;
        }
      )
    );
    this.subscription.add(
      this.modules.toilet.observables.addUnit$.subscribe(() => {
        this.modules.animation?.setAnimationAction(ANIMATION_ACTION.OPEN, 0);
      })
    );
    this.subscription.add(
      this.modules.toilet.observables.removeUnit$
        .pipe(delay(500))
        .subscribe(() => {
          this.modules.animation?.setAnimationAction(ANIMATION_ACTION.CLOSE);
        })
    );
    return super.setup(context);
  }

  override getConditionDirections() {
    return getEntryConditionDirections(
      this.getPosition().clone(),
      this.getRotation()
    );
  }
}
