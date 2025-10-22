import { stairCatalog } from '@cuby-world/stairs';
import type Stair from '../classes/Stair';
import type { StairDescription } from '../types/stair';

export async function resolveStairs(
  descriptions: StairDescription[]
): Promise<Array<[typeof Stair, StairDescription]>> {
  const instanceMap = new Map(
    await Promise.all(
      stairCatalog.values().map(async stair => {
        const instance = await stair.instance();
        return [instance.KEY, instance] as [string, typeof Stair];
      })
    )
  );

  return descriptions.map(description => {
    const { type } = description;
    const StairClass = instanceMap.get(type);
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
