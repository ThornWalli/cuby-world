import { ICON } from '@cuby-world/app/utils/icons';
import {
  reactiveValueToggle,
  type SettingControlItem,
  type SetupContext,
  type UnitConstructorOptions,
  type UnitOptions
} from '../../Unit';
import LightUnitModule from '../../unitModule/Light';
import WallUnit, {
  type WallUnitModuleList,
  type WallUnitModules
} from '../Wall';

export type WallLightUnitModules = WallUnitModules & {
  light: LightUnitModule;
};
export type WallLightUnitModuleList = (typeof LightUnitModule)[] &
  WallUnitModuleList;

export default class WallLightUnit<
  Options extends UnitOptions = UnitOptions,
  Modules extends WallLightUnitModules = WallLightUnitModules,
  ModuleList extends WallLightUnitModuleList = WallLightUnitModuleList
> extends WallUnit<Options, Modules, ModuleList> {
  constructor(
    options: UnitConstructorOptions<Options>,
    moduleList: ModuleList = [] as unknown as ModuleList
  ) {
    moduleList.push(LightUnitModule);
    super(
      {
        accessible: false,
        ...options
      },
      moduleList
    );
  }

  override async setup(context: SetupContext) {
    await super.setup(context);
    if (!this.isPreview()) {
      this.subscription.add(
        this.modules.light.observables.active$.subscribe((active: boolean) => {
          if (!this.isPreview() && active) {
            this.onActive();
          } else {
            this.onInactive();
          }
        })
      );
      this.subscription.add(
        this.modules.light.observables.intensity$.subscribe(
          (intensity: number) => {
            if (!this.isPreview()) {
              this.onIntensity(intensity);
            }
          }
        )
      );
    }
  }

  onActive(): void {
    // Turn on the light when the unit becomes active
  }
  onInactive(): void {
    // Turn off the light when the unit becomes inactive
  }

  onIntensity(_intensity: number): void {
    // Handle intensity change
  }

  override getSettingControls(): SettingControlItem[] {
    return [
      {
        icon: reactiveValueToggle(
          this.modules.light.observables.active$,
          ICON.LIGHT_ON,
          ICON.LIGHT_OFF
        ),
        title: 'Light Active/Inactive',
        action: () => {
          console.log(
            'Light Active/Inactive settings clicked',
            this.modules.light.isActive()
          );
          this.modules.light.setActive(!this.modules.light.isActive());
        }
      },
      {
        title: 'Light Settings',
        dialogComponent: () =>
          import('../../../../components/unitSettings/Light.vue')
      }
    ];
  }
}
