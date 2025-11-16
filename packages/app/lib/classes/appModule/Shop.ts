import { concatMap, ReplaySubject, Subscription } from 'rxjs';
import type { CatalogItemIdentifier } from '../../types/catalog';
import type { SkinIdentifier } from '../../types/skin';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import type App from '../App';
import { catalog } from '@cuby-world/units';
import type Unit from '../Unit';

interface ItemDescription {
  catalogItemId: CatalogItemIdentifier;
  skinId: SkinIdentifier;
}

interface Observables extends AppModuleObservables {
  currentItem$: ReplaySubject<ItemDescription>;
  purchased$: ReplaySubject<ItemDescription>;
}

interface State extends AppModuleState {
  currentItem?: ItemDescription | null;
}
export default class ShopAppModule extends AppModule<State, Observables> {
  override state: State = {} as State;
  static override TYPE = 'shop';

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.currentItem$ = new ReplaySubject<ItemDescription>(1);
    this.observables.purchased$ = new ReplaySubject<ItemDescription>();
    //#endregion
  }
  private placeSubscription: Subscription | null = null;
  override setup(): void {
    super.setup();

    this.subscription.add(
      this.observables.currentItem$
        .pipe(
          concatMap(async item => {
            const room = this.app.modules.room.getRoom()!;
            if (this.tmpUnit) {
              this.removeTmpUnit();
            }
            if (item) {
              const unit = await createTmpUnit(item);
              this.tmpUnit = unit;

              await room.modules.units.add(unit);

              this.app.modules.selection.setSelectedUnit(unit);

              // this.app.modules.placement.setDisallowPlace(true);
              this.app.modules.placement.startPlace(unit);

              const subscription = new Subscription();
              this.placeSubscription = subscription;
              subscription.add(
                this.app.modules.placement.observables.abort$.subscribe(() => {
                  subscription.unsubscribe();
                })
              );
              subscription.add(
                this.app.modules.placement.observables.apply$.subscribe(() => {
                  /**
                   * Übernehmen der Unit
                   */
                  this.tmpUnit = null;
                  this.observables.purchased$.next(item);
                  subscription.unsubscribe();
                })
              );
            }
          })
        )
        .subscribe(void 0)
    );
  }

  setItem(description?: ItemDescription | null): void {
    console.log('ShopAppModule setItem', description);
    this.state.currentItem = description;
    this.observables.currentItem$.next(description!);
  }

  override destroy(): void {
    super.destroy();
    this.removeTmpUnit();
    this.placeSubscription?.unsubscribe();
  }

  removeTmpUnit() {
    if (this.tmpUnit) {
      const room = this.app.modules.room.getRoom()!;
      this.app.modules.selection.setSelectedUnit(null);
      room.modules.units.remove(this.tmpUnit);
      this.tmpUnit = null;
    }
  }

  tmpUnit: Unit | null = null;
}

async function createTmpUnit(item: ItemDescription) {
  const catalogItem = catalog.get(item.catalogItemId)!;
  const UnitClass = await catalogItem.instance();
  const unit = new UnitClass({
    name: UnitClass.NAME,
    skin: item.skinId
    // const skin = catalogItem.skinMap?.get(item.skinId);
    // options: {
    //   ...(skin ?? { options: {} }).options
    // }
  });
  return unit;
}
