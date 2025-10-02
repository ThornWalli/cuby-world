/* eslint-disable complexity */
import Ground from '../classes/Ground';
import { InstancedMesh, Vector3, Matrix4, DoubleSide } from 'three';
import { useGroundTileShader } from './shader';
import type RoomGrid from '../classes/RoomGrid';
import type { GroundStyleMap } from '../classes/roomModule/Ground';

export function createGroundChunks(
  roomGrid: RoomGrid,
  groundStyleMap: GroundStyleMap,
  chunkSize = 16
): InstancedMesh[] {
  const rows = roomGrid.width;
  const cols = roomGrid.height;
  const chunks: InstancedMesh[] = [];

  const matrix = roomGrid.toMatrix();

  for (let y = 0; y < cols; y += chunkSize) {
    for (let x = 0; x < rows; x += chunkSize) {
      const tilesInChunk: Ground[] = [];
      for (let r = y; r < y + chunkSize && r < cols; r++) {
        for (let c = x; c < x + chunkSize && c < rows; c++) {
          if (matrix[r]?.[c] === 1) {
            if (groundStyleMap.get(c, r).id === 'default') {
              tilesInChunk.push(
                new Ground({
                  color: groundStyleMap.get(c, r).options?.color || '#ff00ff',
                  position: new Vector3(c, 0, r)
                })
              );
            } else {
              tilesInChunk.push(new Ground({ position: new Vector3(c, 0, r) }));
            }
          }
        }
      }

      if (tilesInChunk.length === 0) continue;

      const splittedTiles = tilesInChunk.reduce(
        (result: { [key: string]: Ground[] }, groundTile) => {
          result[groundTile.identifier] = result[groundTile.identifier] || [];
          result[groundTile.identifier]!.push(groundTile);
          return result;
        },
        {}
      );

      const tiles = Object.entries(splittedTiles);

      const instancesMeshByType = new Map(
        Object.keys(splittedTiles).map(type => {
          const tiles = splittedTiles[type]!;
          const tile = tiles[0]!;
          const material = tile.plane.material.clone();
          material.onBeforeCompile = shader => useGroundTileShader(shader);
          const instancedMesh = new InstancedMesh(
            tile.plane.geometry,
            material,
            tiles.length
          );
          instancedMesh.material.side = DoubleSide;
          instancedMesh.castShadow = false;
          instancedMesh.receiveShadow = true;
          return [type, instancedMesh];
        })
      );

      tiles.forEach(([type, tiles]) => {
        const instancedMesh = instancesMeshByType.get(type)!.clone();
        instancedMesh.name = `chunk_${y}_${x}_${type}`;

        const matrix = new Matrix4();
        tiles.forEach((tile, index) => {
          matrix.makeTranslation(
            tile.position.x,
            tile.position.y,
            tile.position.z
          );
          instancedMesh.setMatrixAt(index, matrix);
        });

        chunks.push(instancedMesh);
      });
    }
  }

  return chunks;
}
