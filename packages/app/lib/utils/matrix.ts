import { map, type Observable } from 'rxjs';
import type { Intersection, Object3D, Object3DEventMap } from 'three';
import { Vector3 } from 'three';
import type Unit from '../classes/Unit';

import type * as THREE from 'three';

export function positionToMatrixPosition(
  position: THREE.Vector3
): THREE.Vector3 {
  return new Vector3(
    Math.round(position.x),
    Math.round(position.y),
    Math.round(position.z)
  );
}
//---
export function matrixPositionToPosition(
  matrixPosition: THREE.Vector3
): THREE.Vector3 {
  const x = matrixPosition.x;
  const y = matrixPosition.y;
  const z = matrixPosition.z;
  return new Vector3(x, y, z);
}

export function preparePosition(onlyTopFace = false) {
  return (source: Observable<Intersection<Object3D<Object3DEventMap>>>) =>
    source.pipe(
      map(intersection => {
        const point = intersection.point;

        // Überprüfe, ob der Raycast die Oberseite der Geometrie getroffen hat
        const isTopFace = intersection.face && intersection.face.normal.y > 0.9;

        let matrixPosition: Vector3 | null = null;
        let worldPosition: THREE.Vector3 | null = null;

        if (!onlyTopFace || (onlyTopFace && isTopFace)) {
          matrixPosition = positionToMatrixPosition(point);
          worldPosition = matrixPositionToPosition(matrixPosition);
        }

        let object: Object3D | null = intersection.object;
        let unit: Unit | undefined;
        while (object) {
          const objUnit = object.userData.unit;
          if (objUnit && objUnit.modules && objUnit.modules.selection) {
            unit = objUnit;
            break;
          }
          object = object.parent;
        }

        return {
          unit,
          object,
          matrixPosition,
          worldPosition
        };
      })
    );
}
