import { Vector3 } from 'three';
import RoomDescription from '../classes/RoomDescription';
import Lamp from '@cuby-world/units/lamp/Lamp';
import Mirror from '@cuby-world/units/Mirror';
import type Unit from '../classes/Unit';
import { UNIT_ROTATION } from '../classes/Unit';
import Block from '@cuby-world/units/Block';
import RoomGrid from '../classes/RoomGrid';
import Door from '@cuby-world/units/Door';
import Geometry, { GEOMETRY_TYPE } from '@cuby-world/units/Geometry';

export default class DefaultRoom extends RoomDescription {
  constructor() {
    console.log(Array(50).fill(Array(5).fill(1)));
    super({
      id: 'default',
      info: {
        name: 'Default',
        description: 'This is the default room'
      },
      // grid: RoomGrid.fromGrid(Array(50).fill(Array(5).fill(1))),
      grid: RoomGrid.fromGrid([
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
      ]),
      start: {
        position: new Vector3(0, 0, 2),
        rotation: UNIT_ROTATION.EAST
      },
      units: getUnits()
    });
  }
}

function getUnits() {
  const units: Unit[] = [
    new Door({
      position: new Vector3(0, 0, 2),
      rotation: UNIT_ROTATION.WEST
    }),
    // new Block({
    //   position: new Vector3(1, 0, 0),
    //   options: { color: 0xff0000, size: new Vector3(1, 1, 1) }
    // }),
    // new Block({
    //   size: new Vector3(1, 1, 2),
    //   position: new Vector3(2, 0, 0),
    //   rotation: UNIT_ROTATION.UP,
    //   options: { color: 0x00ff00 }
    // }),
    // new Block({
    //   size: new Vector3(3, 1, 3),
    //   position: new Vector3(3, 0, 0),
    //   rotation: UNIT_ROTATION.UP,
    //   options: { color: 0x00ff00 }
    // }),
    // new Block({
    //   position: new Vector3(3, 0, 0),
    //   options: { color: 0x0000ff, size: new Vector3(1, 1, 1) }
    // }),
    // new Block({
    //   position: new Vector3(1, 0, 0),
    //   options: { color: 0xff0000, size: new Vector3(1, 1 / 3, 1) }
    // }),
    // new Block({
    //   position: new Vector3(1, 1 / 3, 0),
    //   options: { color: 0x00ff00, size: new Vector3(1, 1 / 3, 1) }
    // }),
    // new Block({
    //   position: new Vector3(1, 2 / 3, 0),
    //   options: { color: 0x0000ff, size: new Vector3(1, 1 / 3, 1) }
    // }),
    new Lamp({
      position: new Vector3(1, 0, 0)
    }),
    new Mirror({
      position: new Vector3(3, 0, 0),
      rotation: UNIT_ROTATION.SOUTH
    }),
    new Lamp({
      position: new Vector3(6, 0, 0)
    }),
    new Lamp({
      position: new Vector3(6, 0, 4)
    }),
    new Lamp({
      position: new Vector3(1, 0, 4)
    }),

    // new Debug({
    //   position: new Vector3(2, 0, 0)
    // })
    ...Object.values(GEOMETRY_TYPE).map((type, i) => {
      return new Geometry({
        position: new Vector3(5, 0, i + 2),
        options: {
          type,
          color: ['#FFCCCC', '#ADD8E6', '#CCFFCC', '#FFFFCC', '#CCCCFF'][i % 4]
        }
      });
    })
    //
  ];

  // #region blocks
  const count = 5;
  for (let i = 0; i < count; i++) {
    units.push(
      new Block({
        accessible: true,
        size: new Vector3(1, 1 / count, 1),
        position: new Vector3(2, (1 / count) * i, 0),
        options: { color: getColorByIndex(i, count) }
      })
    );
  }
  // #endregion

  const size = 1 / 5;
  const test = [
    [0, 0, 0],
    [0, size, 1],
    [0, size * 2, 2],
    [0, size * 3, 3],
    [1, size * 3, 3],
    [1, size * 3, 4]
  ];
  test.forEach((b, i) => {
    units.push(
      new Block({
        accessible: true,
        size: new Vector3(1, size, 1),
        position: new Vector3((b[0] ?? 0) + 2, b[1], (b[2] ?? 0) + 3),
        options: { color: getColorByIndex(i, test.length) }
      })
    );
  });

  return units;
}

function getColorByIndex(index: number, total: number) {
  const hue = (index / total) * 360;
  return `hsl(${hue}, 100%, 50%)`;
}
