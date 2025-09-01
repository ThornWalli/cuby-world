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
}
