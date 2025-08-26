export enum ASSET_TYPE {
  TEXTURE = 'texture',
  CUBE_TEXTURE = 'cubeTexture'
}

export interface AssetDescription {
  id?: ASSET | string; // Optional key for easier reference
  type: ASSET_TYPE;
  url: string | string[];
}

export enum ASSET {
  CUBY_TOP = 'cubyTop',
  CUBY_BOTTOM = 'cubyBottom',
  CUBY_LEFT = 'cubyLeft',
  CUBY_RIGHT = 'cubyRight',
  CUBY_FRONT = 'cubyFront',
  CUBY_BACK = 'cubyBack',
  SKY_BOX_1 = 'skyBox1'
}

export const assets: AssetDescription[] = [];
