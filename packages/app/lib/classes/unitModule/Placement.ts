import { ReplaySubject } from 'rxjs';
import UnitModule, {
  type UnitModuleObservables,
  type UnitModuleState
} from '../UnitModule';
import { findAllMeshes } from '@cuby-world/units/utils/mesh';
import { normalizeMaterialList } from '../../utils/material';
import type Unit from '../Unit';

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
    findAllMeshes(this.unit.root).forEach(mesh => {
      normalizeMaterialList(mesh.material).forEach(material => {
        this.lastMaterial.set(material.uuid, {
          transparent: material.transparent,
          opacity: material.opacity
        });
        material.transparent = true;
        material.opacity = 0.5;
      });
    });
    this.observables.startPlace$.next();
  }

  stopPlace() {
    findAllMeshes(this.unit.root).forEach(mesh => {
      normalizeMaterialList(mesh.material).forEach(material => {
        console.log(material.uuid, this.lastMaterial);
        const last = this.lastMaterial.get(material.uuid);
        if (last) {
          material.transparent = last.transparent;
          material.opacity = last.opacity;
        }
      });
    });
    this.observables.stopPlace$.next();
  }

  abortPlace() {
    this.observables.abortPlace$.next();
  }
}
