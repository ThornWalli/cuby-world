import type { RoomDescription } from '@cuby-world/app/lib/classes/RoomDescription';
import { jsonParse, jsonStringify } from './parse';

/**
 * Starts a download of the room description as a JSON file.
 */
export async function exportRoom(
  data: RoomDescription,
  filename: string = 'room.json'
) {
  const FileSaver = await import('file-saver').then(module => module.default);

  const blob = new Blob([jsonStringify(data)], {
    type: 'application/json;charset=utf-8'
  });

  await FileSaver.saveAs(blob, filename);
}

/**
 * Imports a room description from a JSON file.
 */
export async function importRoom(file: File) {
  return new Promise<RoomDescription>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const json = jsonParse(text);
          if (json) {
            resolve(json as RoomDescription);
          }
          reject(new Error('Invalid file'));
        }
      } catch (err) {
        console.error('Failed to import room', err);
      }
    };
    reader.readAsText(file);
  });
}
