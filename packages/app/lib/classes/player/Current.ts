import Player, {
  type PlayerConstructorOptions,
  type PlayerSettings
} from '../Player';

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

  override setSettings(settings: Partial<PlayerSettings>) {
    super.setSettings(settings);

    this.playerSettings$.next(this.getSettings());
  }
}
