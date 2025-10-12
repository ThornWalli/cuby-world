export default class RoomGrid {
  private readonly grid: number[][][];
  readonly data: number[];
  readonly width: number;
  readonly depth: number;
  readonly height: number;
  constructor(grid: number[][][] = []) {
    this.height = grid.length;
    this.depth = grid[0]?.length ?? 0;
    this.width = grid[0]?.[0]?.length ?? 0;
    this.grid = grid;
    this.data = grid.flat().flat().flat();
  }

  clone() {
    return new RoomGrid(this.grid.map(row => [...row]));
  }

  get(x: number, y: number, z: number) {
    if (this.grid[z] && this.grid[z]![y]) {
      return this.grid[z]![y]![x];
    }
    return undefined;
  }
  set(x: number, y: number, z: number, value: number) {
    if (this.grid[y] && this.grid[y]![z]) {
      this.grid[y]![z]![x] = value;
      this.data[y * this.depth * this.width + y * this.width + x] = value;
    }
  }

  toMatrix() {
    const rows = [];
    for (let y = 0; y < this.height; y++) {
      const data_ = this.data.slice(
        y * this.depth * this.width,
        (y + 1) * this.depth * this.width
      );
      const floor = [];
      for (let i = 0; i < data_.length; i += this.width) {
        floor.push(data_.slice(i, i + this.width));
      }
      rows.push(floor);
    }
    return rows;
  }

  toJSON() {
    return this.grid;
  }

  static fromData(data: number[][], width: number) {
    return new RoomGrid(
      data.map(data_ => {
        const floor = [];
        for (let i = 0; i < data_.length / width; i++) {
          floor.push(data_.slice(i * width, (i + 1) * width));
        }
        return floor;
      })
    );
    // for (let y = 0; y < data.length; y++) {
    //   const floor = [];
    //   const data_ = data[y]!;
    //   for (let i = 0; i < data_.length / width; i++) {
    //     floor.push(data_.slice(i * width, (i + 1) * width));
    //   }
    //   rows.push(floor);
    // }
    // return new RoomGrid(rows);
  }
}
