/* eslint-disable complexity */
import {
  type Vector2,
  Box3,
  Frustum,
  Matrix4,
  Object3D,
  Vector3,
  type Camera
} from 'three';
import RoomModule, {
  type RoomModuleObservables,
  type RoomModuleState
} from '../RoomModule';
import type Room from '../Room';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject
} from 'rxjs';
import { preparePosition, type PreparedPosition } from '../../utils/matrix';
import type {
  GroundGeometryMap,
  TileCostDescription
} from '../../types/ground';

import { default_mesh as MeshGround } from '@cuby-world/grounds';
import GroundStyleMap from '../GroundStyleMap';
import {
  createGroundChunks,
  loadGroundGeometries,
  type GroundChunk
} from '../../utils/ground';
import {
  disposeObject3D,
  OBJECT_USER_DATA
} from '@cuby-world/app/lib/utils/object';
import { catalog as groundCatalog } from '@cuby-world/grounds/grounds/catalog';
import type { GroundSkinIdentifier } from '../../types/ground/skins';

declare module '../../../lib/utils/object' {
  interface ObjectUserData {
    IGNORE_GROUND_INTERSECTION: string;
  }
}
OBJECT_USER_DATA.IGNORE_GROUND_INTERSECTION = 'ignoreGroundIntersection';

export const GRID_BLOCKED = 0;

interface Observables extends RoomModuleObservables {
  hover$: Subject<Vector3>;
  click$: Subject<Vector3>;
  pointerDown$: Subject<PointerEvent>;
  pointerOut$: Subject<PointerEvent>;
  pointerEnter$: Subject<PointerEvent>;
  refreshGround$: Subject<GroundStyleMap>;
}

interface State extends RoomModuleState {
  groundStyleMap: GroundStyleMap;
  groundChunks: GroundChunk[];
  groundMesh: Object3D | null;
}
export default class GroundModule extends RoomModule<State, Observables> {
  static override TYPE = 'ground';

  private frustum: Frustum;
  private projScreenMatrix: Matrix4;

  state: State = {
    groundStyleMap: new GroundStyleMap(),
    groundChunks: [],
    groundMesh: null
  };
  private groundGeometryMap: GroundGeometryMap = new Map();

  constructor(room: Room, debug: boolean = false) {
    super(room, debug);

    //#region observables
    this.observables.hover$ = new Subject<Vector3>();
    this.observables.click$ = new Subject<Vector3>();
    this.observables.pointerDown$ = new Subject<PointerEvent>();
    this.observables.pointerOut$ = new Subject<PointerEvent>();
    this.observables.pointerEnter$ = new Subject<PointerEvent>();
    this.observables.refreshGround$ = new Subject<GroundStyleMap>();
    //#endregion

    this.frustum = new Frustum();
    this.projScreenMatrix = new Matrix4();

    this.state.groundStyleMap = GroundStyleMap.fromGroundsStyles(
      room.description.groundStyles
    );
  }

  override destroy() {
    this.state.groundChunks.forEach(({ mesh }) => {
      disposeObject3D(mesh);
    });
    if (this.state.groundMesh) {
      this.room.root.remove(this.state.groundMesh);
      this.state.groundMesh = null;
    }
    super.destroy();
  }

  override async setup() {
    this.groundGeometryMap = await loadGroundGeometries(
      this.room.app.assetLoader,
      MeshGround
    );
    this.setupGround();

    const renderer = this.room.app.renderer!;

    const intersection = renderer.modules.intersection!;
    const room = this.room;

    const groundIntersectionListener = intersection.register(
      room.root.getObjectByName('ground')!
    );

    this.subscription.add(
      this.room.modules.floor.observables.floor$.subscribe(() => {
        this.refreshGround();
      })
    );
    this.subscription.add(
      groundIntersectionListener.clickIntersect$
        .pipe(
          filter(intersection => {
            return (
              !intersection.object.userData[
                OBJECT_USER_DATA.IGNORE_GROUND_INTERSECTION
              ] && intersection.object?.name === 'ground'
            );
          }),
          preparePosition(),
          filter(({ worldPosition }) => !!worldPosition),
          distinctUntilChanged(
            (prev, curr) =>
              !curr.worldPosition ||
              !prev.worldPosition ||
              prev.worldPosition.equals(curr.worldPosition)
          )
        )
        .subscribe(this.onClick.bind(this))
    );
    this.subscription.add(
      groundIntersectionListener.hoverIntersect$
        .pipe(
          map(
            intersections =>
              intersections.filter(intersection => {
                return (
                  !intersection.object.userData[
                    OBJECT_USER_DATA.IGNORE_GROUND_INTERSECTION
                  ] && intersection.object?.name === 'ground'
                );
              })[0]!
          ),
          filter(Boolean),
          preparePosition(),
          filter(({ worldPosition }) => !!worldPosition),
          distinctUntilChanged(
            (prev, curr) =>
              !curr.worldPosition ||
              !prev.worldPosition ||
              prev.worldPosition.equals(curr.worldPosition)
          ),
          concatMap(this.onHover.bind(this))
        )
        .subscribe(void 0)
    );
    this.subscription.add(
      groundIntersectionListener.hoverIntersect$
        .pipe(
          filter(intersections => intersections.length < 1),
          debounceTime(100)
        )
        .subscribe(() => {
          this.room.modules.selection.hideSelection();
        })
    );
    this.subscription.add(
      groundIntersectionListener.pointerdown$.subscribe(e =>
        this.observables.pointerDown$.next(e)
      )
    );
    this.subscription.add(
      groundIntersectionListener.pointerup$.subscribe(e =>
        this.observables.pointerOut$.next(e)
      )
    );
    this.subscription.add(
      groundIntersectionListener.pointermove$.subscribe(e =>
        this.observables.pointerEnter$.next(e)
      )
    );
    this.subscription.add(
      groundIntersectionListener.pointerenter$.subscribe(
        this.onPointerEnter.bind(this)
      )
    );
    this.subscription.add(
      groundIntersectionListener.pointerout$.subscribe(
        this.onPointerOut.bind(this)
      )
    );
  }

  //#region getters/setters

  getGroundStyleMap() {
    return this.state.groundStyleMap;
  }

  setGroundStyles(groundStyleMap: GroundStyleMap) {
    this.state.groundStyleMap = groundStyleMap;
    this.refreshGround();
  }

  //#endregion

  //#region events

  private onClick({ worldPosition }: PreparedPosition) {
    this.observables.click$.next(worldPosition!);
  }

  private async onHover({ worldPosition }: PreparedPosition) {
    this.room.modules.selection.showSelection();
    this.room.modules.selection.setSelectionPosition(worldPosition!);
    this.observables.hover$.next(worldPosition!);
  }

  private onPointerEnter(e: PointerEvent) {
    this.room.modules.selection.showSelection();
    this.observables.pointerEnter$.next(e);
  }

  private onPointerOut(e: PointerEvent) {
    this.room.modules.selection.hideSelection();
    this.observables.pointerOut$.next(e);
  }

  //#endregion

  override updateThrottle500ms(
    _time: number,
    options: { camera: Camera }
  ): void {
    this.updateVisibility(options.camera);
  }

  private setupGround() {
    const groundMesh = new Object3D();
    groundMesh.name = 'ground';

    this.state.groundMesh = groundMesh;
    this.room.addToRoot(groundMesh);

    this.refreshGround();
  }

  getGridByFloor(
    foorIndex: number = 0,
    tileCostMap?: Map<string, TileCostDescription>
  ) {
    const groundStyleMap = this.state.groundStyleMap;
    const values = [];
    for (let y = 0; y < this.room.gridSize.y; y++) {
      for (let x = 0; x < this.room.gridSize.x; x++) {
        const groundStyle = groundStyleMap.get(x, foorIndex, y);
        console.log(groundStyle);
        if (groundStyle) {
          const skin = groundCatalog
            .get(groundStyle.type)
            ?.skins?.find(s => s.id === groundStyle.skinId);
          if (groundStyle && (skin?.options.accessible ?? true)) {
            console.log(
              this.getTileCostKey(groundStyle.type, groundStyle.skinId),
              tileCostMap?.get(
                this.getTileCostKey(groundStyle.type, groundStyle.skinId)
              )
            );
            values.push(
              tileCostMap?.get(
                this.getTileCostKey(groundStyle.type, groundStyle.skinId)
              )?.index ?? 1
            );
          } else {
            values.push(GRID_BLOCKED);
          }
        } else {
          values.push(GRID_BLOCKED);
        }
      }
    }
    return values;
  }

  getGrids() {
    const groundStyleMap = this.room.modules.ground.getGroundStyleMap();
    const tileCostMap = this.getTileCostMap();

    // Etagen Anzahl wird vom Boden definiert.
    const floorCount = Array.from(groundStyleMap.map.values()).length;

    return Array(floorCount)
      .fill(null)
      .map((_, floor) => this.getGridByFloor(floor, tileCostMap));
  }

  getGroundChunks(floorIndex?: number) {
    if (floorIndex === undefined) {
      return this.state.groundChunks;
    }
    return this.state.groundChunks.filter(({ floor }) => floor === floorIndex);
  }

  removeGroundChunks(floorIndex?: number) {
    const { removes, chunks } = this.state.groundChunks.reduce(
      (result, chunk) => {
        if (floorIndex === undefined || chunk.floor >= floorIndex) {
          result.removes.push(chunk);
        } else {
          result.chunks.push(chunk);
        }

        return result;
      },
      {
        removes: [] as GroundChunk[],
        chunks: [] as GroundChunk[]
      }
    );

    this.state.groundChunks = chunks;

    removes.forEach(({ mesh }) => {
      disposeObject3D(mesh);
      this.state.groundMesh?.remove(mesh);
    });
  }

  refreshGround(floorIndex?: number) {
    this.removeGroundChunks(floorIndex ?? -1);

    const currentFloor = this.room.modules.floor.getFloor();
    console.log('refreshGround', { floorIndex, currentFloor });

    const tileChecker = (floor: number) => (position: Vector2) => {
      return !this.room.modules.stair.isStairAt(
        new Vector3(position.x, floor - 1, position.y)
      );
    };

    const groundChunks = [];
    for (
      let floor = floorIndex ?? 0;
      floor <= (floorIndex ?? currentFloor);
      floor++
    ) {
      const chunks = createGroundChunks(
        this.room.gridSize,
        floor,
        this.state.groundStyleMap,
        16,
        this.isEditMode(),
        {
          tileChecker: tileChecker(floor),
          assetLoader: this.room.app.assetLoader,
          geometryMap: this.groundGeometryMap
        }
      );
      groundChunks.push(...chunks);
    }

    this.state.groundChunks = groundChunks;
    this.state.groundChunks.forEach(chunk =>
      this.state.groundMesh!.add(chunk.mesh)
    );
    this.observables.refreshGround$.next(this.state.groundStyleMap);
  }

  getTileCostKey(type: string, skinId: GroundSkinIdentifier) {
    return `${type}:${skinId}`;
  }

  getTileCostMap() {
    return this.room.modules.ground
      .getGroundStyleMap()
      .values()
      .reduce((result, { type, skinId }, index) => {
        const key = this.getTileCostKey(type, skinId);
        if (!result.has(key)) {
          const ground = groundCatalog.get(type);
          const skin = ground?.skins?.find(s => s.id === skinId);
          result.set(key, {
            index: index + 1,
            cost: skin?.options.cost ?? 0
          });
        }
        return result;
      }, new Map<string, TileCostDescription>());
  }

  private updateVisibility(camera: Camera) {
    this.projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    this.frustum.setFromProjectionMatrix(this.projScreenMatrix);
    this.state.groundChunks.forEach(chunk => {
      const box = new Box3().setFromObject(chunk.mesh);
      chunk.mesh.visible = this.frustum.intersectsBox(box);
    });
  }
}
