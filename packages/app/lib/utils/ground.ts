import Ground from '../classes/Ground';
import type { Mesh, BufferGeometry, Vector2 } from 'three';
import {
  InstancedMesh,
  MeshPhongMaterial,
  Vector3,
  DoubleSide,
  Object3D
} from 'three';

import { groundTextureMap } from './ground/textures';
import type AssetLoader from '../classes/AssetLoader';
import { GROUND_GEOMETRY, type GroundGeometryMap } from '../types/ground';
import { LOADER } from '../classes/AssetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import styles, { type GrountStyleIdentifier } from './ground/skins';
import type GroundStyleMap from '../classes/GroundStyleMap';

export function createGroundChunks(
  gridSize: Vector2,
  groundStyleMap: GroundStyleMap,
  chunkSize = 16,
  {
    assetLoader,
    groundGeometryMap
  }: { assetLoader: AssetLoader; groundGeometryMap: GroundGeometryMap }
): InstancedMesh[] {
  const rows = gridSize.x;
  const cols = gridSize.y;
  const chunks: InstancedMesh[] = [];

  for (let y = 0; y < cols; y += chunkSize) {
    for (let x = 0; x < rows; x += chunkSize) {
      const groundTypes = new Set<GrountStyleIdentifier>();
      const positionsByType = new Map<GrountStyleIdentifier, Vector3[]>();

      // const tilesInChunk: Ground[] = [];
      for (let r = y; r < y + chunkSize && r < cols; r++) {
        for (let c = x; c < x + chunkSize && c < rows; c++) {
          const skinId = groundStyleMap.get(c, 0, r);
          if (skinId) {
            if (!positionsByType.has(skinId)) {
              positionsByType.set(skinId, positionsByType.get(skinId) || []);
            }
            positionsByType.get(skinId)?.push(new Vector3(c, 0, r));

            groundTypes.add(skinId);

            // else {
            //   tilesInChunk.push(new Ground({ position: new Vector3(c, 0, r) }));
            // }
          }
        }
      }

      const instanceMap: [string, InstancedMesh][] = Array.from(
        groundTypes
      ).map(type => {
        const { color, opacity, texture } = styles.get(type)?.skin || {};
        const tile = new Ground({
          color,
          opacity,
          texture
        });

        const geometry = tile.createGeometry({ groundGeometryMap });

        const instancedMesh = new InstancedMesh(
          geometry,
          new MeshPhongMaterial({ color: tile.color }),
          positionsByType.get(type)!.length
        );

        tile
          .createMaterial({
            assetLoader,
            groundTextureMap
          })
          .then(material => {
            // material.onBeforeCompile = shader => useGroundTileShader(shader);
            instancedMesh.material = material;
            instancedMesh.material.needsUpdate = true;
          });

        instancedMesh.instanceColor = null;
        instancedMesh.material.side = DoubleSide;
        instancedMesh.castShadow = false;
        instancedMesh.receiveShadow = true;

        return [type, instancedMesh];
      });

      const instancesMeshByType = new Map<string, InstancedMesh>(instanceMap);

      positionsByType.entries().forEach(([type, tiles]) => {
        const instancedMesh = instancesMeshByType.get(type)!;

        tiles.forEach((tile, index) => {
          const helper = new Object3D();
          helper.updateMatrix();
          helper.matrix.makeTranslation(tile.x, tile.y, tile.z);
          instancedMesh.setMatrixAt(index, helper.matrix);
        });

        instancedMesh.instanceMatrix.needsUpdate = true;

        chunks.push(instancedMesh);
      });
    }
  }

  return chunks;
}

export function loadGroundGeometries(assetLoader: AssetLoader, url: string) {
  return assetLoader.add<GLTF>({ loader: LOADER.GLTF, url }).then(gltf => {
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
