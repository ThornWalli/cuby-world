import { ReplaySubject } from 'rxjs';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleState
} from '../UnitModule';
import { normalizeMaterialList } from '../../utils/material';
import type Unit from '../Unit';
import { Mesh } from 'three';

interface TransparentDescription {
  transparent: boolean;
  opacity: number;
}

interface Observables extends UnitModuleObservables {
  startPlace$: ReplaySubject<void>;
  stopPlace$: ReplaySubject<void>;
  abortPlace$: ReplaySubject<void>;
}

type State = UnitModuleState;

export class PlacementUnitModule extends UnitModule<State, Observables> {
  static override TYPE = 'placement';

  lastMaterial = new Map<string, TransparentDescription>();

  constructor(unit: Unit, state: State, debug: boolean) {
    super(unit, state, debug);
    this.observables.startPlace$ = new ReplaySubject<void>(1);
    this.observables.stopPlace$ = new ReplaySubject<void>(1);
    this.observables.abortPlace$ = new ReplaySubject<void>(1);
  }

  startPlace() {
    this.lastMaterial.clear();
    this.unit.root.traverse(obj => {
      if (obj instanceof Mesh) {
        normalizeMaterialList(obj.material).forEach(material => {
          if (!this.lastMaterial.has(material.uuid)) {
            this.lastMaterial.set(material.uuid, {
              transparent: material.transparent,
              opacity: material.opacity
            });
            material.transparent = true;
            material.opacity = 0.5;
          }
        });
      }
    });
    this.observables.startPlace$.next();
  }

  stopPlace() {
    this.unit.root.traverse(obj => {
      if (obj instanceof Mesh) {
        normalizeMaterialList(obj.material).forEach(material => {
          const last = this.lastMaterial.get(material.uuid);
          if (last) {
            console.log('XXXX', last);
            material.transparent = last.transparent;
            material.opacity = last.opacity;
          }
        });
      }
    });
    this.observables.stopPlace$.next();
  }

  abort() {
    this.observables.abortPlace$.next();
  }
}
