import type {
  SettingControlItem,
  SetupContext,
  UnitConstructorOptions,
  UnitModuleList,
  UnitModules,
  UnitOptions
} from '../Unit';
import LightUnitModule from '../unitModule/Light';
import Unit, { reactiveValueToggle } from '../Unit';

export type Options = UnitOptions;
export type Modules = UnitModules & {
  light: LightUnitModule;
};
export type ModuleList = (typeof LightUnitModule)[] & UnitModuleList;

export default class LightUnit<
  O extends UnitOptions = UnitOptions,
  M extends Modules = Modules,
  ML extends ModuleList = ModuleList
> extends Unit<O, M, ML> {
  constructor(
    options: UnitConstructorOptions<O>,
    moduleList: ML = [] as unknown as ML
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
          'light_on',
          'light_off'
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
          import('../../../components/unitSettings/Light.vue')
      }
    ];
  }
}
