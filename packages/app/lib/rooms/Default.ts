import { Vector3 } from 'three';
import RoomDescription from '../classes/RoomDescription';
import Debug from '@cuby-world/units/Debug';
import Lamp from '@cuby-world/units/lamp/Lamp';
import Mirror from '@cuby-world/units/Mirror';
import { UNIT_ROTATION } from '../classes/Unit';
import Block from '@cuby-world/units/Block';

// const count = [6, 6];
// const test = Array(count[0])
//   .fill(0)
//   .map(() => Array(count[1]).fill(1));

export default class DefaultRoom extends RoomDescription {
  constructor() {
    super({
      id: 'default',
      name: 'Default Room',
      description: 'This is the default room in Cuby World.',
      grid: [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0]
      ],
      start: {
        position: new Vector3(2, 0, 2),
        rotation: UNIT_ROTATION.RIGHT
      },
      units: [
        new Block({
          position: new Vector3(1, 0, 0),
          options: { color: 0xff0000, size: new Vector3(1, 1 / 3, 1) }
        }),
        new Block({
          position: new Vector3(1, 1 / 3, 0),
          options: { color: 0x00ff00, size: new Vector3(1, 1 / 3, 1) }
        }),
        new Block({
          position: new Vector3(1, 2 / 3, 0),
          options: { color: 0x0000ff, size: new Vector3(1, 1 / 3, 1) }
        }),
        new Lamp({
          position: new Vector3(0, 0, 0)
        }),
        new Mirror({
          position: new Vector3(0, 0, 2),
          rotation: UNIT_ROTATION.RIGHT
        }),
        new Lamp({
          position: new Vector3(4, 0, 0)
        }),
        new Lamp({
          position: new Vector3(4, 0, 4)
        }),
        new Lamp({
          position: new Vector3(0, 0, 4)
        }),
        new Debug({
          position: new Vector3(2, 0, 0)
        })
      ]
    });
  }
}
