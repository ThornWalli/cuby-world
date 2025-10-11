import {
  Box3,
  Frustum,
  type Vector3,
  Matrix4,
  Object3D,
  type Camera,
  type InstancedMesh
} from 'three';
import RoomModule, {
  type RoomModuleObservables,
  type RoomModuleState
} from '../RoomModule';
import { createGroundChunks, loadGroundGeometries } from '../../utils/ground';
import type Room from '../Room';
import {
  concatAll,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject
} from 'rxjs';
import { preparePosition, type PreparedPosition } from '../../utils/matrix';
import type { GroundGeometryMap } from '../../types/ground';
import MeshGround from '@cuby-world/app/assets/ground/ground.glb?url';
import skins from '../../utils/ground/skins';
import GroundStyleMap from '../GroundStyleMap';

interface Observables extends RoomModuleObservables {
  hover$: Subject<Vector3>;
  click$: Subject<Vector3>;
  pointerOut$: Subject<PointerEvent>;
  pointerEnter$: Subject<PointerEvent>;
  refreshGround$: Subject<GroundStyleMap>;
}

interface State extends RoomModuleState {
  groundStyleMap: GroundStyleMap;
  groundChunks: InstancedMesh[];
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

  constructor(room: Room, debug: boolean = false) {
    super(room, debug);

    //#region observables
    this.observables.hover$ = new Subject<Vector3>();
    this.observables.click$ = new Subject<Vector3>();
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
    this.state.groundChunks.forEach(chunk => {
      const { geometry, material } = chunk;
      geometry.dispose();
      if (Array.isArray(material)) {
        material.forEach(mat => mat.dispose());
      } else {
        material.dispose();
      }
    });
    if (this.state.groundMesh) {
      this.room.mesh.remove(this.state.groundMesh);
      this.state.groundMesh = null;
    }
    super.destroy();
  }

  groundGeometryMap: GroundGeometryMap = new Map();
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
      room.mesh.getObjectByName('ground')!
    );

    this.subscription.add(
      groundIntersectionListener.clickIntersect$
        .pipe(
          filter(
            intersection => intersection.object?.parent?.name === 'ground'
          ),
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
          concatAll(),
          filter(
            intersection => intersection.object?.parent?.name === 'ground'
          ),
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
        this.observables.pointerEnter$.next(e)
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
    const description = this.room.description;
    if (!description) {
      throw new Error('Room description is not set');
    }
    const groundMesh = new Object3D();
    groundMesh.name = 'ground';

    this.state.groundMesh = groundMesh;
    this.room.mesh.add(groundMesh);

    this.refreshGround();
  }

  getGrid() {
    const groundStyleMap = this.state.groundStyleMap;

    return Array.from(groundStyleMap.map.values())
      .flat()
      .flat()
      .map(skinId => {
        return skinId && (skins.get(skinId)?.skin.accessible ?? 1) ? 1 : 0;
      });
  }
  getGrids() {
    const groundStyleMap = this.room.modules.ground.getGroundStyleMap();

    return Array.from(groundStyleMap.map.values()).map(data => {
      data.flat().map(skinId => {
        return skinId && (skins.get(skinId)?.skin.accessible ?? 1) ? 1 : 0;
      });
    });
  }

  refreshGround() {
    const groundMesh = this.state.groundMesh;
    if (!groundMesh) {
      throw new Error('Setup before refresh ground');
    }
    this.state.groundChunks.forEach(chunk => {
      const { geometry, material } = chunk;
      geometry.dispose();
      if (Array.isArray(material)) {
        material.forEach(mat => mat.dispose());
      } else {
        material.dispose();
      }
      this.state.groundMesh?.remove(chunk);
    });
    this.state.groundChunks = [];

    this.state.groundChunks = createGroundChunks(
      this.room.gridSize,
      this.state.groundStyleMap,
      16,
      {
        assetLoader: this.room.app.assetLoader,
        groundGeometryMap: this.groundGeometryMap
      }
    );
    this.state.groundChunks.forEach(chunk => this.state.groundMesh!.add(chunk));
    this.observables.refreshGround$.next(this.state.groundStyleMap);
  }

  private updateVisibility(camera: Camera) {
    this.projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    this.frustum.setFromProjectionMatrix(this.projScreenMatrix);
    this.state.groundChunks.forEach(chunk => {
      const box = new Box3().setFromObject(chunk);
      chunk.visible = this.frustum.intersectsBox(box);
    });
  }
}
