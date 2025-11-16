import type { UnitIdentifier } from '../../types/unit';
import { ReplaySubject, Subject } from 'rxjs';
import AppModule, {
  type AppModuleObservables,
  type AppModuleState
} from '../AppModule';
import type Player from '../Player';
import type App from '../App';

interface Observables extends AppModuleObservables {
  currentPlayer$: ReplaySubject<Player>;
  addPlayer$: Subject<{ player: Player; teleporterUnitId?: UnitIdentifier }>;
  removePlayer$: Subject<Player>;
}

interface State extends AppModuleState {
  currentPlayer?: Player;
  players: Player[];
}
export default class PlayerAppModule extends AppModule<State, Observables> {
  static override TYPE = 'player';
  state: State = {
    players: []
  };

  constructor(app: App) {
    super(app);
    //#region observables
    this.observables.currentPlayer$ = new ReplaySubject<Player>(0);
    this.observables.addPlayer$ = new Subject<{
      player: Player;
      teleporterUnitId?: UnitIdentifier;
    }>();
    this.observables.removePlayer$ = new Subject<Player>();
    //#endregion
  }

  override destroy(): void {
    super.destroy();
    this.state.players.forEach(player => player.destroy());
  }

  getPlayerById(id: string) {
    return this.state.players.find(player => player.id === id);
  }

  getCurrentPlayer() {
    if (!this.state.currentPlayer) {
      throw new Error('Current player is not set');
    }
    return this.state.currentPlayer;
  }

  setCurrentPlayer(player: Player) {
    this.state.currentPlayer = player;
    this.observables.currentPlayer$.next(player);
    // TODO: Ist das hier richtig platziert?
    // this.subscription.add(
    //   this.state.currentPlayer.observables.unit$
    //     .pipe(
    //       switchMap(({ unit }) => unit.modules.movement.observables.moveEnd$)
    //     )
    //     .subscribe(() => {
    //       const unit = this.state.currentPlayer!.unit!;
    //       const room = this.app.modules.room.getRoom()!;

    //       //#region teleport
    //       const teleport = room.modules.teleport.getTeleportByPosition(
    //         unit.getPosition()
    //       );
    //       console.log('Player moved!', teleport);

    //       this.app.modules.teleport.resolveTeleport(teleport);
    //       //#endregion
    //     })
    // );

    this.subscription.add(
      this.state.currentPlayer.observables.playerSettings$.subscribe(
        playerSettings => {
          this.app.renderer.setShadowQuality(
            playerSettings.graphic.shadowQuality
          );
        }
      )
    );
  }

  getPlayers() {
    return this.state.players;
  }

  async addPlayer({
    player,
    teleporterUnitId
  }: {
    player: Player;
    teleporterUnitId?: UnitIdentifier;
  }) {
    this.state.players.push(player);
    this.observables.addPlayer$.next({
      player,
      teleporterUnitId
    });
    if (player.client) {
      this.setCurrentPlayer(player);
    }
  }

  removePlayer(player: Player) {
    this.state.players = this.state.players.filter(p => p.id !== player.id);
    this.observables.removePlayer$.next(player);
    player.destroy();
  }
}
