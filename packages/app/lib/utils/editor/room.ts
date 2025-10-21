import type { RoomDescription } from '../../types/room';
import type { Vector2 } from 'three';
import { Vector3 } from 'three';
import { ORIGIN } from '@cuby-world/app/types';

/**
 * Wird verwendet, um die Raumgröße zu ändern und alle Elemente entsprechend zu verschieben.
 * @param description Ursprüngliche Raum-Beschreibung.
 * @param gridSize Neue Rastergröße.
 * @param gridOrigin Ausrichtung des neuen Rasters relativ zum alten Raster.
 * @returns Neue Raum-Beschreibung mit angepasster Größe und Positionen.
 */
export function resizeRoom(
  description: RoomDescription,
  gridSize: Vector2,
  gridOrigin: ORIGIN = ORIGIN.TOP_LEFT
): RoomDescription {
  const offset = new Vector3();

  switch (gridOrigin) {
    case ORIGIN.TOP_LEFT:
      offset.set(0, 0, 0);
      break;
    case ORIGIN.TOP_RIGHT:
      offset.set(gridSize.x - description.gridSize.x, 0, 0);
      break;
    case ORIGIN.BOTTOM_LEFT:
      offset.set(0, 0, gridSize.y - description.gridSize.y);
      break;
    case ORIGIN.BOTTOM_RIGHT:
      offset.set(
        gridSize.x - description.gridSize.x,
        0,
        gridSize.y - description.gridSize.y
      );
      break;
    case ORIGIN.TOP:
      offset.set(0, 0, 0);
      break;
    case ORIGIN.BOTTOM:
      offset.set(0, 0, gridSize.y - description.gridSize.y);
      break;
    case ORIGIN.LEFT:
      offset.set(gridSize.x - description.gridSize.x, 0, 0);
      break;
    case ORIGIN.RIGHT:
      offset.set(0, 0, 0);
      break;
    case ORIGIN.CENTER:
      offset.set(
        Math.floor((gridSize.x - description.gridSize.x) / 2),
        0,
        Math.floor((gridSize.y - description.gridSize.y) / 2)
      );
      break;
  }

  //#region teleports
  const teleports = description.teleports
    .map(teleport => ({
      ...teleport,
      position: teleport.position.clone().add(offset)
    }))
    .filter(
      teleport =>
        teleport.position.x < gridSize.x && teleport.position.y < gridSize.y
    );
  //#endregion

  //#region groundstyles
  const groundStyles = description.groundStyles.map(groundStyle => ({
    ...groundStyle,
    positions: groundStyle.positions
      .map(position => position.clone().add(offset))
      .filter(({ x, y }) => x < gridSize.x && y < gridSize.y)
  }));
  //#endregion

  //#region walls
  const walls = description.walls
    .map(wall => ({
      ...wall,
      position: wall.position.clone().add(offset)
    }))
    .filter(
      wall => wall.position.x < gridSize.x && wall.position.y < gridSize.y
    );
  //#endregion

  //#region stairs
  const stairs = description.stairs
    .map(stair => ({
      ...stair,
      position: stair.position.clone().add(offset)
    }))
    .filter(
      stair => stair.position.x < gridSize.x && stair.position.z < gridSize.y
    );
  //#endregion

  //#region units
  const units = description.units
    .map(unit => ({
      ...unit,
      options: {
        ...unit.options,
        position: unit.options.position.clone().add(offset)
      }
    }))
    .filter(
      u =>
        u.options.position.x < gridSize.x && u.options.position.z < gridSize.y
    );
  //#endregion

  console.log(description.groundStyles, groundStyles);

  return {
    id: crypto.randomUUID(),
    info: description.info,
    teleports,
    gridSize,
    //
    groundStyles,
    walls,
    stairs,
    units
  };
}
