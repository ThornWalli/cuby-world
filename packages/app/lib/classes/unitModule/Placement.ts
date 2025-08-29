import { ReplaySubject } from 'rxjs';
import UnitModule from '../UnitModule';
import type { Material } from 'three';
import { findAllMeshes } from '@cuby-world/units/utils/mesh';

export class PlacementUnitModule extends UnitModule {
  static override TYPE = 'placement';

  startPlace$ = new ReplaySubject<void>(1);
  stopPlace$ = new ReplaySubject<void>(1);
  abortPlace$ = new ReplaySubject<void>(1);

  lastMaterial = new Map<
    string,
    {
      transparent: boolean;
      opacity: number;
    }
  >();

  startPlace() {
    this.lastMaterial.clear();
    findAllMeshes(this.unit.root).forEach(mesh => {
      getMaterial(mesh.material).forEach(material => {
        this.lastMaterial.set(material.uuid, {
          transparent: material.transparent,
          opacity: material.opacity
        });
        material.transparent = true;
        material.opacity = 0.5;
      });
    });
    this.startPlace$.next();
  }

  stopPlace() {
    findAllMeshes(this.unit.root).forEach(mesh => {
      getMaterial(mesh.material).forEach(material => {
        console.log(material.uuid, this.lastMaterial);
        const last = this.lastMaterial.get(material.uuid);
        if (last) {
          material.transparent = last.transparent;
          material.opacity = last.opacity;
        }
      });
    });
    this.stopPlace$.next();
  }

  abortPlace() {
    this.abortPlace$.next();
  }
}

function getMaterial(material: Material | Material[]) {
  if (Array.isArray(material)) {
    return material;
  } else {
    return [material];
  }
}
