import { CHARACHTER_TYPE, DEFAULT_PLAYER_SKIN_ID } from '../classes/Player';
import { ShadowQuality } from '../classes/Renderer';
import type { PlayerSettings } from '../types/player';

export function getDefaultPlayerSettings(): PlayerSettings {
  return {
    name: '',
    characterType: CHARACHTER_TYPE.DEFAULT,
    skin: DEFAULT_PLAYER_SKIN_ID,
    graphic: {
      shadowQuality: ShadowQuality.LOW
    }
  };
}
