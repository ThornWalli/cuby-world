export type CatalogItemIdentifier = string;

export interface CatalogItem<Id = CatalogItemIdentifier> {
  id: Id;
  name: string;
  description?: string;
  tags?: string[];
}
