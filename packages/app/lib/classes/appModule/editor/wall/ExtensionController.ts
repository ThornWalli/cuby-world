import {
  getFaceGroupIndex,
  getWallIdentifierFromObject,
  resolveWallExtensions
} from '../../../../utils/wall';
import type App from '../../../App';
import type {
  AppModuleControllerObservables,
  AppModuleControllerState
} from '../../../AppModuleController';
import AppModuleController from '../../../AppModuleController';
import type { Object3D } from 'three';
import type { FACE_INDEX } from '../../../../types/wall';
import { ReplaySubject, type Observable } from 'rxjs';
import { concatMap, map } from 'rxjs';
import { OBJECT_NAME } from '../../../../utils/object';
import { OBJECT_USER_DATA } from '../../../../../lib/utils/object';
import type { PreparedPosition } from '../../../../utils/matrix';
import type Wall from '../../../Wall';
import type WallExtension from '../../../WallExtension';
import { WALL_EXTENSION_TYPE } from '../../../WallExtension';
import type { WallExtensionItem } from '../../../../types/wall/extension/catalog';
import { OUTLINE_TYPE } from '../../../Renderer';
import type { WallExtensionSkinIdentifier } from '@cuby-world/app/lib/types/wall/extension/skins';

export interface Observables extends AppModuleControllerObservables {
  currentWall$: ReplaySubject<{ wall: Wall; faceIndex: FACE_INDEX }>;
  current$: ReplaySubject<WallExtension | null>;
}

export interface State extends AppModuleControllerState {
  current: WallExtension | null;
  extension?: WallExtensionItem | null;
  skin?: WallExtensionSkinIdentifier | null;
  last?: {
    wall: Wall;
    newExtension?: WallExtension;
    lastExtensions?: WallExtension[];
  } | null;
}
export default class ExtensionController<
  S extends State = State,
  O extends Observables = Observables
> extends AppModuleController<S, O> {
  override state: S = {
    current: null,
    extension: null
  } as S;

  constructor(app: App) {
    super(app);

    //#region observables
    this.observables.currentWall$ = new ReplaySubject<{
      wall: Wall;
      faceIndex: FACE_INDEX;
    }>(0);
    this.observables.current$ = new ReplaySubject<WallExtension | null>(0);
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
    room?.modules.selection.hideSelection();
  }

  override destroy(): void {
    this.reset();
    super.destroy();
  }

  //#region events

  public async onSelect({
    wall,
    wallExtension
  }: {
    wall?: Wall;
    wallExtension?: WallExtension;
  }) {
    if (this.state.extension) {
      if (wall) {
        await this.updateExtension(wall);
      }
      await this.resetLast();
    } else {
      await this.selectExtension(wallExtension ?? null);
    }
  }

  private async onHover({ current }: { current: Object3D | null }) {
    const wallId = getWallIdentifierFromObject(current)!;
    const wall = this.app.modules.room
      .getRoom()!
      .modules.wall.getWallById(wallId);

    if (
      wall &&
      (!this.state.last ||
        (this.state.last && !wall?.equal(this.state.last.wall)))
    ) {
      await this.resetLast();
      const currentExtension = this.state.extension;

      if (currentExtension) {
        const lastExtensions = wall.getExtensionByTypes([
          WALL_EXTENSION_TYPE.DOOR,
          WALL_EXTENSION_TYPE.WINDOW
        ]);
        if (lastExtensions.length) {
          lastExtensions.forEach(lastExtensions => {
            console.log(lastExtensions);
            lastExtensions.disable();
          });
        }

        const [resolveExtension] = await resolveWallExtensions([
          {
            key: currentExtension.extension!,
            state: currentExtension.options
          }
        ]);

        const newExtension = await wall.addExtension(
          resolveExtension![0],
          this.app.renderer.observables.animationLoop$,
          resolveExtension![1]
        );

        await wall.refresh();

        this.state.last = {
          newExtension,
          lastExtensions: lastExtensions,
          wall
        };
      }
    } else if (!wall) {
      await this.resetLast();
    }
  }

  //#endregion

  //#region methods

  private async resetLast() {
    if (this.state.last) {
      (this.state.last.lastExtensions ?? []).forEach(ext => ext.enable());
      if (this.state.last.newExtension) {
        this.state.last.wall.removeExtension(this.state.last.newExtension);
      }

      await this.state.last.wall.refresh();
      this.state.last = null;
    }
  }

  public async apply() {
    this.reset();
  }

  public async abort() {
    this.reset();
  }

  async reset() {
    if (this.state.current) {
      this.setCurrent(null);
    }
    await this.resetLast();
  }

  public async remove() {
    const extension = this.state.current!;
    const wall = extension.wall;
    wall?.removeExtension(extension);
    await wall.refresh();
    this.reset();
  }

  //#endregion

  //#region getters/setters

  private setCurrent(extension: WallExtension | null) {
    if (this.state.current) {
      this.app.renderer.unregisterOutlineObject(
        this.state.current.root,
        OUTLINE_TYPE.ADD
      );
    }
    this.state.current = extension;
    this.observables.current$.next(extension);
  }

  setExtension(extension?: WallExtensionItem | null) {
    this.state.extension = extension;
  }

  async setSkin(skin: WallExtensionSkinIdentifier | null) {
    this.state.skin = skin;
    // if (this.state.current && this.state.skin) {
    //   // await this.createTmpObject(this.state.item, this.state.skin, {
    //   //   rotation: this.state.rotation
    //   // });
    // }
  }

  //#endregion

  //#region operators
  private prepareSelect() {
    return (source: Observable<PreparedPosition[]>) =>
      source.pipe(
        // eslint-disable-next-line complexity
        map(preparedPositions => {
          const position = preparedPositions.find(p =>
            p.object?.name.includes(OBJECT_NAME.GROUND)
          )?.worldPosition;

          const wallPosition = preparedPositions.find(({ object }) =>
            getWallIdentifierFromObject(object)
          );

          const wallId =
            preparedPositions[0]?.object?.userData[
              OBJECT_USER_DATA.WALL_EXTENSION_WALL
            ] || wallPosition?.object?.userData[OBJECT_USER_DATA.WALL];

          const wall = this.app.modules.room
            .getRoom()
            ?.modules.wall.getWallById(wallId);

          const extensionPosition = preparedPositions.find(
            ({ object }) => object?.userData[OBJECT_USER_DATA.WALL_EXTENSION]
          );

          // get wall extension
          let wallExtension: WallExtension | undefined;
          if (extensionPosition) {
            const extensionId =
              extensionPosition.object?.userData[
                OBJECT_USER_DATA.WALL_EXTENSION
              ];
            if (wall) {
              wallExtension = wall.getExtensionById(extensionId);
            }
          }

          // get face index on wall
          let wallFaceIndex = -1;
          if (wall) {
            wallFaceIndex = getFaceGroupIndex(
              wall.root,
              wallPosition?.faceIndex
            );
          }

          const object = preparedPositions[0]?.object;

          return {
            position: position ?? null,
            current: object ?? null,
            wall,
            wallExtension,
            wallFaceIndex
          };
        })
      );
  }
  //#endregion

  async updateExtension(wall: Wall) {
    const app = this.app;
    const state = this.state;
    const currentExtension = this.state.extension!;

    const [resolveExtension] = await resolveWallExtensions([
      {
        key: currentExtension.extension!,
        state: currentExtension.options
      }
    ]);

    if (
      resolveExtension?.[0] &&
      wall.getExtensionByType(resolveExtension[0].TYPE)
    ) {
      const existingExt = wall.getExtensionByType(resolveExtension[0].TYPE);
      if (existingExt) {
        wall.removeExtension(existingExt);
      }
    }

    await wall.addExtension(
      resolveExtension![0],
      app.renderer.observables.animationLoop$,
      resolveExtension![1]
    );

    if (state.last?.lastExtensions?.length) {
      state.last.lastExtensions.forEach(ext => wall.removeExtension(ext));
    }

    await wall.refresh();
  }

  async selectExtension(wallExtension: WallExtension | null) {
    const app = this.app;
    const observables = this.observables;
    const state = this.state;

    if (state.current) {
      app.renderer.unregisterOutlineObject(
        state.current.root,
        OUTLINE_TYPE.ADD
      );
    }

    let extension = wallExtension;

    if (wallExtension && this.extensionCheck(wallExtension)) {
      app.renderer.registerOutlineObject(wallExtension.root, OUTLINE_TYPE.ADD);
      observables.current$.next(wallExtension);
    } else {
      extension = null;
    }
    this.setCurrent(extension);
  }

  extensionCheck(_extension: WallExtension | null): boolean {
    return true;
  }
}
