export default class RoomGrid {
  private readonly grid: number[][];
  readonly data: number[];
  readonly width: number;
  readonly height: number;
  constructor(grid: number[][] = []) {
    this.height = grid.length;
    this.width = grid[0]?.length || 0;
    this.grid = grid;
    this.data = grid.flat();
  }

  clone() {
    return new RoomGrid(this.grid.map(row => [...row]));
  }

  toMatrix() {
    const rows = [];
    for (let i = 0; i < this.data.length; i += this.width) {
      rows.push(this.data.slice(i, i + this.width));
    }
    return rows;
  }

  toJSON() {
    return this.grid;
  }

  static fromData(data: number[], width: number) {
    const rows = [];
    for (let i = 0; i < data.length; i += width) {
      rows.push(data.slice(i, i + width));
    }
    return new RoomGrid(rows);
  }
}
