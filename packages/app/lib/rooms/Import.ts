import type { EditorRoomDescription } from '@cuby-world/room-editor/types';
import RoomDescription from '../classes/RoomDescription';
import RoomGrid from '../classes/RoomGrid';

import units from '@cuby-world/units';

const unitClasses = units.reduce(
  (result, unitClass) => {
    result[unitClass.KEY] = unitClass as (typeof units)[0];
    return result;
  },
  {} as Record<string, (typeof units)[0]>
);
export default class ImportRoom extends RoomDescription {
  constructor(data: EditorRoomDescription) {
    const grid = RoomGrid.fromGrid(data.grid);
    const units = data.units.map(
      ({ unit: key, options: { position, rotation } }) => {
        const unit = new unitClasses[key]!({
          position: position,
          rotation: rotation
        });
        return unit;
      }
    );

    super({
      ...data,
      grid,
      units
    });
  }
}
