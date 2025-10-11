export interface CatalogItem<Id = CatalogItemIdentifier> {
  id: Id;
  name: string;
  description?: string;
  tags?: string[];
}

export enum CATALOG_TAG {
  COLOR = 'color',
  TEXTURE = 'texture',
  HIDE = 'hide'
}

export type CatalogItemIdentifier = string;
