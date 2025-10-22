import type { SkinDescription } from './skin';

export type CatalogItemIdentifier = string;

export interface CatalogItem<
  Skin = SkinDescription,
  Id = CatalogItemIdentifier
> {
  id: Id;
  name: string;
  description?: string;
  skins?: Skin[];
  tags?: string[];
}
