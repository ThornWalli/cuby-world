import type { SkinDescription, SkinOptions } from '../../types/skin';

export type UnitSkinIdentifier = string;

export type UnitSkinDescription<Options = SkinOptions> = SkinDescription<
  Options,
  UnitSkinIdentifier
>;
