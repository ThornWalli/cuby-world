import GroundTile from '../classes/GroundTile';
import {
  InstancedMesh,
  Vector3,
  Matrix4,
  DoubleSide,
  MeshStandardMaterial
} from 'three';
import { useGroundTileShader } from './shader';
import type RoomGrid from '../classes/RoomGrid';

export function createGroundChunks(
  roomGrid: RoomGrid,
  chunkSize = 16
): InstancedMesh[] {
  const rows = roomGrid.width;
  const cols = roomGrid.height;
  const chunks: InstancedMesh[] = [];

  const matrix = roomGrid.toMatrix();
  // Grundgeometrie für alle Tiles
  // const baseGeometry = new PlaneGeometry(1, 1);
  // baseGeometry.rotateX(-Math.PI / 2);

  // In Chunks durchlaufen
  for (let y = 0; y < rows; y += chunkSize) {
    for (let x = 0; x < cols; x += chunkSize) {
      const tilesInChunk: GroundTile[] = [];
      for (let r = y; r < y + chunkSize && r < rows; r++) {
        for (let c = x; c < x + chunkSize && c < cols; c++) {
          if (matrix[r]![c] === 1) {
            tilesInChunk.push(new GroundTile(new Vector3(c, 0, r)));
          }
        }
      }

      if (tilesInChunk.length === 0) continue;

      const splittedTiles = tilesInChunk.reduce(
        (result: { [key: string]: GroundTile[] }, groundTile) => {
          result[groundTile.type] = result[groundTile.type] || [];
          result[groundTile.type]!.push(groundTile);
          return result;
        },
        {}
      );

      const customMaterial = new MeshStandardMaterial({ color: 0xcccccc });
      const tiles = Object.entries(splittedTiles);

      customMaterial.onBeforeCompile = shader => useGroundTileShader(shader);

      tiles.forEach(([type, tiles]) => {
        const instancedMesh = new InstancedMesh(
          // baseGeometry,
          tiles[0]!.plane.geometry,
          customMaterial,
          tiles.length
        );
        instancedMesh.material.side = DoubleSide;
        instancedMesh.castShadow = false;
        instancedMesh.receiveShadow = true;
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
