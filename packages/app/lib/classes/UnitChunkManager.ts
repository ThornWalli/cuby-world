import type { Camera } from 'three';
import { Box3, Frustum, Matrix4, Vector3 } from 'three';
import type Unit from './Unit';

export interface UnitChunking {
  currentChunkKeys: string[];
}

class Chunk {
  visible = false;
  constructor(
    public position: Vector3,
    public units: Set<Unit> = new Set()
  ) {}

  get size() {
    return this.units.size;
  }
}

export default class UnitChunkManager {
  size: number;
  chunks: Map<string, Chunk> = new Map();
  worldChunks: Map<string, Vector3> = new Map();

  constructor(size: number = 2) {
    this.size = size;
  }

  getChunkKey(position: Vector3) {
    return position
      .clone()
      .floor()
      .divide(new Vector3(this.size, this.size, this.size))
      .toArray()
      .toString();
  }

  assignToChunk(unit: Unit) {
    this.removeFromChunk(unit);
    const keys = Array.from(
      new Set(unit.getMatrixPositions().map(pos => this.getChunkKey(pos)))
    );
    keys.forEach(key => {
      if (!this.chunks.has(key)) {
        const position = new Vector3(...key.split(',').map(Number));
        this.worldChunks.set(key, position);
        this.chunks.set(key, new Chunk(position));
      }
      this.chunks.get(key)!.units.add(unit);
    });
    if ('currentChunkKeys' in unit) {
      unit.currentChunkKeys = keys;
    } else {
      throw new Error('Unit does not implement UnitChunking interface');
    }
  }

  removeFromChunk(unit: Unit) {
    unit.currentChunkKeys.forEach(key => {
      if (key && this.chunks.has(key)) {
        this.chunks.get(key)!.units.delete(unit);
        unit.currentChunkKeys = [];
        if (this.chunks.get(key)!.size === 0) {
          this.worldChunks.delete(key);
          this.chunks.delete(key);
        }
      }
    });
  }

  updateVisibility(camera: Camera) {
    const visibleChunks = this.findVisibleChunks(camera); // Finde alle sichtbaren Chunks

    this.chunks.forEach(chunk => {
      chunk.visible = false;
      chunk.units
        .values()
        .filter(unit => !unit.modules.player.player?.client)
        .forEach(unit => unit.setChunkVisible(false));
    });

    const visibleUnits = new Set<Unit>();
    visibleChunks.forEach(key => {
      if (this.chunks.has(key)) {
        const chunk = this.chunks.get(key)!;
        chunk.visible = true;
        chunk.units.forEach(unit => {
          unit.setChunkVisible(true);
          visibleUnits.add(unit);
        });
      }
    });
    return visibleUnits;
  }

  getChunkPositions() {
    const positions = [];
    for (const key of this.worldChunks.keys()) {
      const [x, y, z] = key.split(',').map(Number) as [number, number, number];
      positions.push(new Vector3(x * this.size, y * this.size, z * this.size));
    }
    return positions;
  }

  findVisibleChunks(camera: Camera) {
    const frustum = new Frustum();
    const projScreenMatrix = new Matrix4();
    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(projScreenMatrix);

    const visibleChunkKeys = new Set<string>();

    const allChunkPositions = this.getChunkPositions();

    for (const pos of allChunkPositions) {
      const chunkBox = new Box3().setFromCenterAndSize(
        new Vector3(
          pos.x + this.size / 2,
          pos.y + this.size / 2,
          pos.z + this.size / 2
        ),
        new Vector3(this.size, this.size, this.size)
      );

      if (frustum.intersectsBox(chunkBox)) {
        const chunkKey = this.getChunkKey(pos);
        visibleChunkKeys.add(chunkKey);
      }
    }
    return visibleChunkKeys;
  }
}
