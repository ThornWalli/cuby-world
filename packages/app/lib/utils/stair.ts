import type Stair from '../classes/Stair';
import type { StairDescription } from '../classes/Stair';

export async function resolveStairs(
  descriptions: StairDescription[]
): Promise<Array<[typeof Stair, StairDescription]>> {
  const { stairs } = await import('@cuby-world/stairs');
  const extList = [...Object.values(stairs)];
  return descriptions.map(description => {
    const { key } = description;
    const StairClass = extList.find(e => e.KEY === key);
    if (StairClass) {
      return [StairClass, description];
    } else {
      throw new Error(`Unknown stair: ${key}`);
    }
  });
}
