import type { Vector3 } from 'three';
import type Unit from './Unit';
import PlayerUnitModule from './unitModule/Player';
import { ReplaySubject, Subject, type SubscriptionLike } from 'rxjs';
import { Subscription } from 'rxjs';
import Cuby from '@cuby-world/units/cuby/Cuby';
import { catalog } from '@cuby-world/units';
import Character from '@cuby-world/units/character/Character';
import PolyMan from '@cuby-world/units/poly_man/PolyMan';
import { ShadowQuality } from './Renderer';
import type { PlayerSettings } from '../types/player';

export type PlayerSkinIdentifier = string;

export const DEFAULT_PLAYER_SKIN_ID: PlayerSkinIdentifier = 'default';

export enum CHARACHTER_TYPE {
  CUBY = 'cuby',
  DEFAULT = 'character',
  POLY_MAN = 'poly_man'
}

export enum PLAYER_STATE {
  IDLE = 'idle',
  SLEEP_1 = 'sleep_1',
  SLEEP_2 = 'sleep_2',
  SPEAK_1 = 'speak_1',
  DEAD = 'dead'
}

export interface PlayerState extends PlayerSettings {
  state: PLAYER_STATE;
}

export interface PlayerConstructorOptions {
  client?: boolean;
  id?: string;
  settings: Partial<PlayerSettings>;
}

export interface Observables {
  playerSettings$: Subject<PlayerSettings>;
  unit$: ReplaySubject<{
    lastUnit?: Unit;
    unit: Unit;
  }>;
}

export default class Player {
  setReady(value: boolean) {
    this.ready = value;
  }
  isReady() {
    return this.ready;
  }
  private _client: boolean = false;
  get client() {
    return this._client;
  }

  private ready: boolean = false;
  state: PlayerState;

  id: string;
  unit?: Unit;

  observables: Observables = {} as Observables;
  subscription = new Subscription();

  constructor({ client, id, settings }: PlayerConstructorOptions) {
    this._client = client ?? false;
    this.id = id || crypto.randomUUID();
    this.state = {
      characterType: settings.characterType ?? null,
      state: PLAYER_STATE.IDLE,
      name: settings.name || '',
      skin: settings.skin || DEFAULT_PLAYER_SKIN_ID,
      graphic: {
        shadowQuality: ShadowQuality.OFF
      },
      ...settings
    };

    this.observables = {
      playerSettings$: new Subject<PlayerSettings>(),
      unit$: new ReplaySubject<{
        lastUnit?: Unit;
        unit: Unit;
      }>(1)
    };
    this.observables.playerSettings$.next(this.getSettings());
  }

  destroy() {
    this.unit?.destroy();
    Object.values(this.observables).forEach(o =>
      (o as SubscriptionLike).unsubscribe()
    );
    this.subscription.unsubscribe();
  }

  setUnit(unit: Unit) {
    const lastUnit = this.unit;
    this.unit = unit;

    if (PlayerUnitModule.TYPE in this.unit.modules) {
      this.unit.modules.player.setPlayer(this);
    }

    this.observables.unit$.next({ unit, lastUnit });
  }

  async moveTo(position: Vector3, targetUnit?: Unit, targetPosition?: Vector3) {
    if (this.unit) {
      await this.unit.modules.movement.resolveMoveTo(
        position,
        targetUnit,
        targetPosition
      );
    } else {
      throw new Error('Player unit is not set, cannot move to position');
    }
  }

  async createUnit() {
    let UnitClass: typeof Unit;
    let skinMap;
    switch (this.state.characterType) {
      case CHARACHTER_TYPE.POLY_MAN:
        UnitClass = await catalog.get('poly_man')!.instance()!;
        skinMap = catalog.get('poly_man')!.skinMap;
        break;
      case CHARACHTER_TYPE.CUBY:
        UnitClass = await catalog.get('cuby')!.instance()!;
        skinMap = catalog.get('cuby')!.skinMap;
        break;
      default:
        UnitClass = Character as typeof Unit;
        skinMap = catalog.get('character')!.skinMap;
        break;
    }

    const unit = new UnitClass({
      id: this.id,
      name: UnitClass.NAME,
      options: {
        ...skinMap?.get(this.state.skin)?.options
      }
    });

    return unit;
  }

  async recreateUnit() {
    const newUnit = await this.createUnit();
    this.setUnit(newUnit);
    return newUnit;
  }

  async setCharacterType(characterType: CHARACHTER_TYPE) {
    if (this.unit && this.state.characterType === characterType) {
      return;
    }
    this.state.characterType = characterType;
    // refresh unit
    this.setUnit(await this.createUnit());
  }

  setSkin(skin: PlayerSkinIdentifier) {
    if (this.state.skin === skin) {
      return;
    }
    this.state.skin = skin;
    if (this.unit instanceof Cuby || this.unit instanceof PolyMan) {
      this.unit.setSkin(skin);
    }
  }

  getSettings(): PlayerSettings {
    return {
      characterType: this.state.characterType,
      name: this.state.name,
      skin: this.state.skin,
      graphic: {
        shadowQuality: this.state.graphic.shadowQuality
      }
    };
  }

  async setSettings(settings: Partial<PlayerState>) {
    if (settings.characterType) {
      this.state.characterType = settings.characterType;
      await this.setCharacterType(settings.characterType);
    }

    if (settings.name !== undefined) {
      this.state.name = settings.name;
    }
    if (settings.skin !== undefined) {
      this.setSkin(settings.skin);
    }
    if (settings.graphic?.shadowQuality !== undefined) {
      this.state.graphic.shadowQuality = settings.graphic.shadowQuality;
    }

    this.observables.playerSettings$.next(this.getSettings());
  }
}
