import type { PlayerSettings } from '../../types/player';
import Player, { type PlayerConstructorOptions } from '../Player';

export default class CurrentPlayer extends Player {
  firebase?: {
    userId: string;
  };

  constructor({
    firebase,
    ...options
  }: { firebase?: { userId: string } } & PlayerConstructorOptions) {
    super({ client: true, ...options });
    this.firebase = firebase;
  }

  override async setSettings(settings: Partial<PlayerSettings>) {
    await super.setSettings(settings);

    this.observables.playerSettings$.next(this.getSettings());
  }
}
