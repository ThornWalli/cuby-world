import {
  getFaceGroupIndex,
  getWallIdentifierFromObject
} from '@cuby-world/app/lib/utils/wall';
import type App from '../../../App';
import type {
  AppModuleControllerObservables,
  AppModuleControllerState
} from '../../../AppModuleController';
import AppModuleController from '../../../AppModuleController';
import type { Object3D } from 'three';
import type { FACE_INDEX } from '@cuby-world/app/lib/types/wall';
import { ReplaySubject, type Observable } from 'rxjs';
import { concatMap, map } from 'rxjs';

import { OBJECT_NAME } from '../../../../utils/object';
import { OBJECT_USER_DATA } from '@cuby-world/app/lib/utils/object';
import type { PreparedPosition } from '@cuby-world/app/lib/utils/matrix';
import type {
  WallSkinDescription,
  WallSkins
} from '@cuby-world/app/lib/types/wall/skins';

import type Wall from '../../../Wall';

interface Observables extends AppModuleControllerObservables {
  currentWall$: ReplaySubject<{ wall: Wall; faceIndex: FACE_INDEX }>;
}

interface State extends AppModuleControllerState {
  skin?: WallSkinDescription | null;
  last?: {
    wall: Wall;
    skins: WallSkins;
  } | null;
}
export default class PainterController extends AppModuleController<
  State,
  Observables
> {
  override state: State = {
    skin: null
  };

  constructor(app: App) {
    super(app);

    //#region observables
    this.observables.currentWall$ = new ReplaySubject<{
      wall: Wall;
      faceIndex: FACE_INDEX;
    }>(0);
    //#endregion
  }

  override setup() {
    super.setup();

    this.subscription.add(
      this.app.modules.room.observables.select$
        .pipe(
          map(({ preparedPositions }) => preparedPositions),
          this.prepareSelect(),
          concatMap(this.onSelect.bind(this))
        )
        .subscribe(void 0)
    );
    this.subscription.add(
      this.app.modules.room.observables.hover$
        .pipe(this.prepareSelect(), concatMap(this.onHover.bind(this)))
        .subscribe(void 0)
    );

    const room = this.app.modules.room.getRoom()!;
    room.modules.selection.hideSelection();
  }

  //#region events

  public async onSelect({
    current,
    faceIndex
  }: {
    current: Object3D | null;
    faceIndex: FACE_INDEX;
  }) {
    const wallId = getWallIdentifierFromObject(current!)!;
    const wall = this.app.modules.room
      .getRoom()!
      .modules.wall.getWallById(wallId);
    if (faceIndex > -1) {
      if (wall) {
        this.state.last = null;
        wall.setStyle(this.state.skin!.id, faceIndex);
      }
    }
  }

  // eslint-disable-next-line complexity
  private async onHover({
    current,
    faceIndex
  }: {
    current: Object3D | null;
    faceIndex: FACE_INDEX;
  }) {
    await this.resetLast();
    if (current && faceIndex > -1 && [0, 1].includes(faceIndex)) {
      const wallId = getWallIdentifierFromObject(current!)!;
      const wall = this.app.modules.room
        .getRoom()!
        .modules.wall.getWallById(wallId)!;

      if (this.state.skin) {
        const skins: WallSkins = [
          wall.state.skins?.[0] || 'default',
          wall.state.skins?.[1] || 'default'
        ];

        if (!skins[faceIndex]) {
          throw new Error('Face index out of range');
        }

        if (this.state.skin?.id && this.state.skin.id !== skins[faceIndex]) {
          skins[faceIndex] = this.state.skin.id;

          this.observables.currentWall$.next({ wall, faceIndex });

          this.state.last = {
            skins: wall.state.skins,
            wall
          };

          wall.state.skins = skins;
          await wall.refresh();
        }
      }
    }
  }

  //#endregion

  //#region methods

  private async resetLast() {
    if (this.state.last) {
      this.state.last.wall.state.skins = this.state.last.skins;
      await this.state.last.wall.refresh();
      this.state.last = null;
    }
  }

  //#endregion

  //#region getters/setters

  setSkin(skin?: WallSkinDescription | null) {
    this.state.skin = skin;
  }

  //#endregion

  //#region operators
  private prepareSelect() {
    return (source: Observable<PreparedPosition[]>) =>
      source.pipe(
        /**
         * Falls Wand einfärbung ignoriert wird, hier werden die faceIndex gefiltert.
         */
        map(preparedPositions => {
          return preparedPositions.filter(
            preparedPosition =>
              !preparedPosition.faceIndex ||
              [0, 1, 2].includes(preparedPosition.faceIndex!)
          );
        }),
        map(preparedPositions => {
          const position = preparedPositions.find(p =>
            p.object?.name.includes(OBJECT_NAME.GROUND)
          )?.worldPosition;

          const wallId = preparedPositions.find(({ object }) =>
            getWallIdentifierFromObject(object)
          )?.object?.userData[OBJECT_USER_DATA.WALL];
          const wall = this.app.modules.room
            .getRoom()
            ?.modules.wall.getWallById(wallId);

          const preparedPosition = preparedPositions[0];
          const object = preparedPosition?.object;
          let faceIndex = -1;
          if (wall) {
            faceIndex = getFaceGroupIndex(
              wall.root,
              preparedPosition?.faceIndex
            );
          }

          return {
            position: position ?? null,
            current: object ?? null,
            faceIndex
          };
        })
      );
  }
  //#endregion
}
