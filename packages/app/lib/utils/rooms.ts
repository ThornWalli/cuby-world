import { roomMap } from '../roomMap';
import { jsonParse, parseRoomDescription } from './parse';

export async function loadRoomById(id: string) {
  if (!roomMap[id as string]) {
    console.warn(`Room with key "${id}" not found, loading default room.`);
    id = 'default';
  }
  const url = await roomMap[id as string]!();
  const room = await fetch(url)
    .then(async res => res.text())
    .then(async raw => parseRoomDescription(jsonParse(raw)));
  return room;
}
