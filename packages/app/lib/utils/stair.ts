import { skins } from '@cuby-world/stairs';
import type Stair from '../classes/Stair';
import type { StairDescription } from '../classes/Stair';

export async function resolveStairs(
  descriptions: StairDescription[]
): Promise<Array<[typeof Stair, StairDescription]>> {
  const { stairs } = await import('@cuby-world/stairs');
  const extList = [...Object.values(stairs)];
  return descriptions.map(description => {
    const { skin } = description;
    const { type } = skins.get(skin)!;
    const StairClass = extList.find(e => e.KEY === type);
    if (StairClass) {
      return [StairClass, description];
    } else {
      throw new Error(`Unknown stair: ${type}`);
    }
  });
}

export async function resolveStair(
  description: StairDescription
): Promise<[typeof Stair, StairDescription]> {
  const list = await resolveStairs([description]);
  return list[0]!;
}
