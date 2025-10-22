export type SkinIdentifier = string;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SkinOptions {}
export interface SkinDescription<Options = SkinOptions, Id = SkinIdentifier> {
  id: Id;
  name: string;
  description?: string;
  tags?: SKIN_TAG[];
  options: Options;
}

export enum SKIN_TAG {
  COLOR = 'color',
  TEXTURE = 'texture',
  HIDE = 'hide'
}
