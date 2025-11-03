import type { CHARACHTER_TYPE, PlayerSkinIdentifier } from '../classes/Player';
import type { ShadowQuality } from '../classes/Renderer';

export interface PlayerSettingsGraphic {
  shadowQuality: ShadowQuality;
}

export interface PlayerSettings {
  characterType: CHARACHTER_TYPE | null;
  name: string;
  skin: PlayerSkinIdentifier;
  graphic: PlayerSettingsGraphic;
}
