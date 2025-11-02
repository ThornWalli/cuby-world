import Ground, { createMaterial } from '../classes/Ground';
import { type Mesh, type BufferGeometry, Vector2, FrontSide } from 'three';
import { InstancedMesh, MeshPhongMaterial, Vector3, Object3D } from 'three';

import type AssetLoader from '../classes/AssetLoader';
import {
  GROUND_GEOMETRY,
  type GroundGeometryMap,
  type GrountStyleIdentifier
} from '../types/ground';
import { LOADER } from '../classes/AssetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type GroundStyleMap from '../classes/GroundStyleMap';
import { groundTextureMap } from '@cuby-world/grounds';
import {
  OBJECT_NAME,
  OBJECT_USER_DATA
} from '@cuby-world/app/lib/utils/object';
import { catalog } from '@cuby-world/grounds/grounds/catalog';

declare module './object' {
  interface ObjectName {
    GROUND: string;
  }
}

OBJECT_NAME.GROUND = 'ground';

export interface GroundChunk {
  mesh: InstancedMesh;
  floor: number;
}

export const FLOOR_HEIGHT = 2.2;

// eslint-disable-next-line complexity
export function createGroundChunks(
  gridSize: Vector2,
  floor: number,
  groundStyleMap: GroundStyleMap,
  chunkSize = 16,
  editMode = false,
  {
    tileChecker,
    assetLoader,
    geometryMap
  }: {
    tileChecker: (position: Vector2) => boolean;
    assetLoader: AssetLoader;
    geometryMap: GroundGeometryMap;
  }
): GroundChunk[] {
  const rows = gridSize.x;
  const cols = gridSize.y;
  const chunks: {
    mesh: InstancedMesh;
    floor: number;
  }[] = [];

  const y = floor;
  const helper = new Object3D();
  const positionHelper = new Vector2();
  for (let z = 0; z < cols; z += chunkSize) {
    for (let x = 0; x < rows; x += chunkSize) {
      const groundTypes = new Set<GrountStyleIdentifier>();
      const positionsByType = new Map<GrountStyleIdentifier, Vector3[]>();
      for (let r = z; r < z + chunkSize && r < cols; r++) {
        for (let c = x; c < x + chunkSize && c < rows; c++) {
          let skinId = (groundStyleMap.get(c, y, r) ?? {}).skinId;
          if (!skinId) {
            if (editMode) {
              skinId = 'default_editor_empty';
            } else {
              skinId = 'default_empty';
            }
          }
          positionHelper.set(c, r);
          if (tileChecker(positionHelper) && skinId) {
            if (!positionsByType.has(skinId)) {
              positionsByType.set(skinId, positionsByType.get(skinId) || []);
            }
            positionsByType.get(skinId)?.push(new Vector3(c, y, r));
            groundTypes.add(skinId);
          }
        }
      }

      const instanceMap: [string, InstancedMesh][] = Array.from(
        groundTypes
      ).map(type => {
        const skin = catalog.get('default')?.skins?.find(s => s.id === type);

        const { accessible, color, opacity, texture } = skin!.options;
        const tile = new Ground({
          accessible,
          color,
          opacity,
          texture
        });

        const geometry = tile.createGeometry(geometryMap);

        const instancedMesh = new InstancedMesh(
          geometry,
          new MeshPhongMaterial({ color: tile.color }),
          positionsByType.get(type)!.length
        );

        instancedMesh.name = OBJECT_NAME.GROUND;
        instancedMesh.userData[OBJECT_USER_DATA.MAIN_OBJECT] = instancedMesh.id;
        instancedMesh.userData[OBJECT_USER_DATA.IGNORE_GROUND_INTERSECTION] =
          editMode ? false : !tile.accessible;

        createMaterial(tile.texture, tile.type, tile.color, tile.opacity, {
          assetLoader,
          textureMap: groundTextureMap
        }).then(material => {
          // material.onBeforeCompile = shader => useGroundTileShader(shader);
          instancedMesh.material = material;
          instancedMesh.material.needsUpdate = true;
        });

        instancedMesh.instanceColor = null;
        instancedMesh.material.side = FrontSide;
        instancedMesh.castShadow = false;
        instancedMesh.receiveShadow = true;

        return [type, instancedMesh];
      });

      const instancesMeshByType = new Map<string, InstancedMesh>(instanceMap);

      positionsByType.entries().forEach(([type, tiles]) => {
        const instancedMesh = instancesMeshByType.get(type)!;

        tiles.forEach((tile, index) => {
          helper.updateMatrix();
          helper.matrix.makeTranslation(tile.x, tile.y * FLOOR_HEIGHT, tile.z);
          instancedMesh.setMatrixAt(index, helper.matrix);
        });

        instancedMesh.instanceMatrix.needsUpdate = true;

        chunks.push({
          mesh: instancedMesh,
          floor
        });
      });
    }
  }

  return chunks;
}

export function loadGroundGeometries(assetLoader: AssetLoader, url: string) {
  return assetLoader
    .add<GLTF>({ loader: LOADER.GLTF, value: url })
    .then(gltf => {
      return Object.values(GROUND_GEOMETRY).reduce((result, value: string) => {
        const mesh = gltf.scene.getObjectByName(value) as Mesh;
        if (!mesh) {
          console.warn(`Ground geometry "${value}" not found in glTF`);
          result.set(value as GROUND_GEOMETRY, null);
        } else {
          const geometry = mesh?.geometry.clone();

          geometry.applyMatrix4(mesh.matrixWorld);

          geometry.computeBoundingBox();
          const box = geometry.boundingBox!.clone();

          // Scale berücksichtigen
          box.min.multiply(mesh.scale);
          box.max.multiply(mesh.scale);

          const offset = new Vector3();

          box.getCenter(offset);
          offset.y = box.min.y; // Pivot auf Boden statt Mitte

          // Pivot in die Mitte setzen
          geometry.translate(-offset.x, -offset.y, -offset.z);
          geometry.rotateY(-Math.PI / 2);
          geometry.rotateX(Math.PI);

          result.set(value as GROUND_GEOMETRY, geometry);
        }
        return result;
      }, new Map<GROUND_GEOMETRY, BufferGeometry | null>());
    });
}
