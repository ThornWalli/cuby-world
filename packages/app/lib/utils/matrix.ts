import { map, type Observable } from 'rxjs';
import type { Object3D, Intersection, Object3DEventMap } from 'three';
import { Vector3 } from 'three';
import type Unit from '../classes/Unit';

import type * as THREE from 'three';
import type { FACE_INDEX } from '../types/wall';
import { FLOOR_HEIGHT } from './ground';

export function positionToMatrixPosition(
  position: THREE.Vector3
): THREE.Vector3 {
  return new Vector3(
    Math.round(position.x),
    Math.round(position.y / FLOOR_HEIGHT),
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

export interface PreparedPosition {
  unit?: Unit;
  object: Object3D | null;
  matrixPosition: THREE.Vector3 | null;
  worldPosition: THREE.Vector3 | null;
  faceIndex?: FACE_INDEX | null;
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
        object = object ?? intersection.object;

        const preparedPosition: PreparedPosition = {
          unit,
          object,
          matrixPosition: matrixPosition,
          worldPosition: worldPosition,
          faceIndex: intersection.faceIndex
        };

        return preparedPosition;
      })
    );
}
