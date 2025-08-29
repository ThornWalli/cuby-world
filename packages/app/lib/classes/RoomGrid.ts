export default class RoomGrid {
  constructor(
    public data: number[],
    public width: number,
    public height: number
  ) {
    if (data.length !== width * height) {
      throw new Error('Data length does not match width and height');
    }
  }
  static fromGrid(grid: number[][]) {
    const height = grid.length;
    const width = grid[0]?.length || 0;
    const data = grid.flat();
    return new RoomGrid(data, width, height);
  }
  clone() {
    return new RoomGrid([...this.data], this.width, this.height);
  }

  toMatrix() {
    const rows = [];
    for (let i = 0; i < this.data.length; i += this.width) {
      rows.push(this.data.slice(i, i + this.width));
    }
    return rows;
  }
}
