import { jsonParse, parseRoomDescription } from './parse';

export async function loadRoomById(path: string) {
  if (!path) {
    throw new Error('Room id is required to load a room.');
  }

  try {
    const url = new URL(window.location.href);
    url.pathname = `/rooms/${path}.json`;
    const room = await fetch(url.toString())
      .then(async res => res.text())
      .then(async raw => parseRoomDescription(jsonParse(raw)));
    return room;
  } catch (error) {
    console.error('Error loading room:', error);
    throw error;
  }
}
