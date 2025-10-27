import type { SkinDescription, SkinIdentifier } from './skin';

export type CatalogItemIdentifier = string;

export interface CatalogItem<
  Skin = SkinDescription,
  Id = CatalogItemIdentifier,
  SkinId = SkinIdentifier
> {
  /**
   * Whether the item should be hidden from the catalog.
   */
  hide?: boolean;
  id: Id;
  name: string;
  description?: string;
  defaultSkinId?: SkinId;
  skins?: Skin[];
  tags?: string[];
}
