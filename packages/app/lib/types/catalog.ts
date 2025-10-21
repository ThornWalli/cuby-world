import type { SkinDescription } from './skin';

export type CatalogItemIdentifier = string;

export interface CatalogItem<Id = CatalogItemIdentifier> {
  id: Id;
  name: string;
  description?: string;
  skins?: SkinDescription[];
  tags?: string[];
}
