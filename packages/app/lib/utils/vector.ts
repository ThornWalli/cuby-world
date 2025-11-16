import { Vector2 } from 'three';
import { ROTATION } from './rotation';

export function rotateVector2(vec: Vector2, rotation: ROTATION) {
  const { x, y } = vec.clone();
  let rx = x;
  let rz = y;

  switch (rotation) {
    // case ROTATION.NORTH:
    //   rx = y;
    //   rz = -x;
    //   break;
    // case ROTATION.SOUTH:
    //   rx = y;
    //   rz = x;
    //   break;

    // case ROTATION.EAST:
    //   rx = x;
    //   rz = y;
    //   break;
    // case ROTATION.WEST:
    //   rx = -x;
    //   rz = y;
    //   break;

    case ROTATION.SOUTH: // DEFAULT
      rx = x;
      rz = y;
      break;
    case ROTATION.WEST:
      rx = -y;
      rz = x;
      break;
    case ROTATION.NORTH:
      rx = x;
      rz = -y;
      break;
    case ROTATION.EAST:
      rx = y;
      rz = -x;
      break;

    // case ROTATION.EAST_UP:
    //   rx = y;
    //   rz = -x;
    //   break;
    // case ROTATION.WEST_UP:
    //   rx = -y;
    //   rz = x;
    //   break;
    // case ROTATION.EAST_DOWN:
    //   rx = y;
    //   rz = -x;
    //   break;
    // case ROTATION.WEST_DOWN:
    //   rx = -y;
    //   rz = x;
    //   break;

    default:
      rx = x;
      rz = y;
      break;
  }

  return new Vector2(rx, rz);
}
