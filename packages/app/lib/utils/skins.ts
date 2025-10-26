import type { SkinDescription, SkinIdentifier } from '../types/skin';

export function mapSkins<
  I = SkinIdentifier,
  S extends SkinDescription = SkinDescription
>(skins: S[]): Map<I, S> {
  return skins.reduce((map, skin) => {
    map.set(skin.id as I, skin);
    return map;
  }, new Map<I, S>());
}
