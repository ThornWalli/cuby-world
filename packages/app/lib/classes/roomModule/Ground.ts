import {
  Box3,
  Frustum,
  Matrix4,
  Vector2,
  type Vector3,
  type Camera,
  Object3D,
  type InstancedMesh
} from 'three';
import RoomModule, { type RoomModuleState } from '../RoomModule';
import { createGroundChunks } from '../../utils/ground';
import type Room from '../Room';
import {
  concatAll,
  concatMap,
  distinctUntilChanged,
  filter,
  Subject,
  tap
} from 'rxjs';
import { preparePosition, type PreparedPosition } from '../../utils/matrix';

import type { GroundStyle } from '../../types/ground/style';
import type { GroundStyleDescription } from '../../types/ground';

export class GroundStyleMap {
  map: GroundStyle[][];

  constructor({
    map: map
  }: {
    map?: GroundStyle[][];
  } = {}) {
    this.map = map ?? [];
  }

  get(x: number, y: number) {
    if (this.map[y] && this.map[y][x]) {
      return this.map[y][x];
    }
    return {
      id: 'color_grey',
      options: {
        color: '#888888'
      }
    };
  }

  set(x: number, y: number, style: GroundStyle) {
    if (!this.map[y]) {
      this.map[y] = [];
    }
    this.map[y][x] = style;
  }

  toGroundStyles() {
    return Array.from(
      this.map
        .reduce(
          (result, map_, x) => {
            map_.forEach((groundStyle, y) => {
              result.set(
                groundStyle.id,
                result.get(groundStyle.id) ?? { ...groundStyle, positions: [] }
              );
              result.get(groundStyle.id)!.positions.push(new Vector2(x, y));
            });
            return result;
          },
          new Map() as Map<string, GroundStyleDescription<Vector2[]>>
        )
        .values()
    );
  }

  toJSON() {
    return {
      map: this.map
    };
  }

  static fromGroundsStyles(groundstyles: GroundStyleDescription[]) {
    const groundStyleMap = new GroundStyleMap();
    groundstyles.forEach(({ id, options, positions }) => {
      positions.forEach(position => {
        groundStyleMap.set(position.x, position.y, { id, options });
      });
    });
    return groundStyleMap;
  }
}

interface State extends RoomModuleState {
  groundStyleMap: GroundStyleMap;
  groundChunks: InstancedMesh[];
  groundMesh: Object3D | null;
}
export default class GroundModule extends RoomModule<State> {
  static override TYPE = 'ground';

  private frustum: Frustum;
  private projScreenMatrix: Matrix4;

  state: State = {
    groundStyleMap: new GroundStyleMap(),
    groundChunks: [],
    groundMesh: null
  };

  override observables = {
    hover$: new Subject<Vector3>(),
    click$: new Subject<Vector3>(),
    pointerOut$: new Subject<PointerEvent>(),
    pointerEnter$: new Subject<PointerEvent>()
  };

  constructor(room: Room, debug: boolean = false) {
    super(room, debug);
    this.frustum = new Frustum();
    this.projScreenMatrix = new Matrix4();

    this.state.groundStyleMap = GroundStyleMap.fromGroundsStyles(
      room.description.groundStyles
    );
  }

  override destroy() {
    this.state.groundChunks.forEach(chunk => {
      chunk.geometry.dispose();
      if (Array.isArray(chunk.material)) {
        chunk.material.forEach(mat => mat.dispose());
      } else {
        chunk.material.dispose();
      }
    });
    if (this.state.groundMesh) {
      this.room.mesh.remove(this.state.groundMesh);
      this.state.groundMesh = null;
    }
    super.destroy();
  }

  override setup() {
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
          tap(() => {
            console.log('no hover');
          })
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

  // #region events

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

  // #endregion

  override updateThrottle500ms(
    _time: number,
    options: { camera: Camera }
  ): void {
    this.updateVisibility(options.camera);
  }

  getGroundStyleMap() {
    return this.state.groundStyleMap;
  }

  setGroundStyles(groundStyleMap: GroundStyleMap) {
    this.state.groundStyleMap = groundStyleMap;
    this.refreshGround();
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

  refreshGround() {
    const groundMesh = this.state.groundMesh;
    if (!groundMesh) {
      throw new Error('Setup before refresh ground');
    }
    this.state.groundChunks.forEach(chunk => {
      chunk.geometry.dispose();
      if (Array.isArray(chunk.material)) {
        chunk.material.forEach(mat => mat.dispose());
      } else {
        chunk.material.dispose();
      }
      this.state.groundMesh?.remove(chunk);
    });
    this.state.groundChunks = [];

    this.state.groundChunks = createGroundChunks(
      this.room.grid,
      this.state.groundStyleMap,
      16
    );
    this.state.groundChunks.forEach(chunk => this.state.groundMesh!.add(chunk));
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
