import { fromEvent, ReplaySubject } from 'rxjs';
import type { Object3D, Intersection as ThreeIntersection } from 'three';
import { Raycaster, Vector2 } from 'three';
import type Renderer from '../Renderer';
import RendererModule, { type RendererModuleState } from '../RendererModule';
import { OBJECT_USER_DATA } from '../../utils/object';

export interface Intersection
  extends Pick<ThreeIntersection, 'point' | 'face' | 'faceIndex'> {
  object: Object3D;
}

declare module '../../utils/object' {
  interface ObjectUserData {
    IGNORE_INTERSECTION_SELECT: string;
    IGNORE_INTERSECTION_HOVER: string;
    IGNORE_RAYCASTER: string;
  }
}

OBJECT_USER_DATA.IGNORE_INTERSECTION_SELECT = 'ignoreSelect';
OBJECT_USER_DATA.IGNORE_INTERSECTION_HOVER = 'ignoreIntersectionHover';
OBJECT_USER_DATA.IGNORE_RAYCASTER = 'ignoreRaycaster';

export interface IntersectionListener {
  id: string;
  meshes: Object3D[];
  clickIntersect$: ReplaySubject<Intersection>;
  clickIntersects$: ReplaySubject<Intersection[]>;
  hoverIntersect$: ReplaySubject<Intersection[]>;
  //
  pointerdown$: ReplaySubject<PointerEvent>;
  pointerup$: ReplaySubject<PointerEvent>;
  pointermove$: ReplaySubject<PointerEvent>;
  pointerenter$: ReplaySubject<PointerEvent>;
  pointerout$: ReplaySubject<PointerEvent>;

  addMeshes: (newMeshes: Object3D[]) => void;
  removeMeshes: (removeMeshes: Object3D[]) => void;
}

export type State = RendererModuleState;
export default class IntersectionRendererModule extends RendererModule<State> {
  static override TYPE = 'intersection';

  state: State = {};

  raycaster: Raycaster;
  private mouse: Vector2;

  listeners = new Map<string, IntersectionListener>();
  globalListener: IntersectionListener;

  constructor(renderer: Renderer) {
    super(renderer);
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.globalListener = this.registerListener();
  }

  override setup() {
    let offset = getOffset(this.renderer.el);
    this.subscription.add(
      fromEvent<PointerEvent>(this.renderer.el, 'pointermove').subscribe(e => {
        const dimension = new Vector2(
          this.renderer.el.offsetWidth,
          this.renderer.el.offsetHeight
        );
        const x = ((e.clientX - offset.x) / dimension.x) * 2 - 1;
        const y = -((e.clientY - offset.y) / dimension.y) * 2 + 1;
        this.mouse = new Vector2(x, y);
        this.listeners.forEach(listener => {
          listener.pointermove$.next(e);
        });
      })
    );
    this.subscription.add(
      fromEvent<PointerEvent>(this.renderer.el, 'pointerdown').subscribe(e => {
        const dimension = new Vector2(
          this.renderer.el.offsetWidth,
          this.renderer.el.offsetHeight
        );
        offset = getOffset(this.renderer.el);
        const x = ((e.clientX - offset.x) / dimension.x) * 2 - 1;
        const y = -((e.clientY - offset.y) / dimension.y) * 2 + 1;
        this.raycaster.setFromCamera(new Vector2(x, y), this.renderer.camera);
        this.listeners.forEach(listener => {
          const intersects = this.raycaster.intersectObjects(
            listener.meshes,
            false
          );

          const result = prepareIntersections(this.renderer, intersects);

          if (result.length > 0 && result[0]) {
            listener.clickIntersect$.next(result[0]);
            listener.clickIntersects$.next(result);
          }
        });
        this.listeners.forEach(listener => {
          listener.pointerdown$.next(e);
        });
      })
    );

    this.subscription.add(
      fromEvent<PointerEvent>(this.renderer.el, 'pointerenter').subscribe(e => {
        this.listeners.forEach(listener => {
          listener.pointerenter$.next(e);
        });
      })
    );

    this.subscription.add(
      fromEvent<PointerEvent>(this.renderer.el, 'pointerout').subscribe(e => {
        this.listeners.forEach(listener => {
          listener.pointerout$.next(e);
        });
      })
    );

    this.subscription.add(
      fromEvent<PointerEvent>(this.renderer.el, 'pointermove').subscribe(e => {
        this.listeners.forEach(listener => {
          listener.pointermove$.next(e);
          this.listeners.forEach(listener => {
            const intersects = this.raycaster.intersectObjects(
              listener.meshes.filter(mesh => {
                return (
                  mesh.visible &&
                  !mesh.userData[OBJECT_USER_DATA.IGNORE_RAYCASTER] &&
                  !mesh.userData[OBJECT_USER_DATA.IGNORE_INTERSECTION_HOVER]
                );
              }),
              false
            );
            const result = prepareIntersections(this.renderer, intersects);
            listener.hoverIntersect$.next(result);
          });
        });
      })
    );
  }

  registerListener(): IntersectionListener {
    const listener = createListener();
    this.listeners.set(listener.id, listener);
    return listener;
  }

  unregisterListener(id: string) {
    this.listeners.delete(id);
  }

  override update() {
    const mouse = this.mouse;
    this.mouse.copy(mouse);
    this.raycaster.setFromCamera(mouse, this.renderer.camera);
  }
}

function getOffset(el: HTMLElement) {
  const { left: offsetX, top: offsetY } = el.getBoundingClientRect();
  return new Vector2(offsetX, offsetY);
}

function prepareIntersections(
  renderer: Renderer,
  intersects: ThreeIntersection[]
): Intersection[] {
  return Array.from(
    new Set(
      intersects
        .map(intersect => {
          return {
            point: intersect.point,
            face: intersect.face,
            faceIndex: intersect.faceIndex,
            object: renderer.scene.getObjectById(
              intersect.object.userData[OBJECT_USER_DATA.MAIN_OBJECT]
            )
          } as Intersection;
        })
        .filter(o => o?.object?.visible)
        .filter(
          i =>
            i?.object &&
            !i.object.userData[OBJECT_USER_DATA.IGNORE_INTERSECTION_SELECT]
        )
    )
  ) as Intersection[];
}

function createListener() {
  const hoverIntersect$ = new ReplaySubject<Intersection[]>(0);
  const clickIntersect$ = new ReplaySubject<Intersection>(0);
  const clickIntersects$ = new ReplaySubject<Intersection[]>(0);

  // pointer events
  const pointerdown$ = new ReplaySubject<PointerEvent>(0);
  const pointerup$ = new ReplaySubject<PointerEvent>(0);
  const pointermove$ = new ReplaySubject<PointerEvent>(0);
  const pointerenter$ = new ReplaySubject<PointerEvent>(0);
  const pointerout$ = new ReplaySubject<PointerEvent>(0);

  const id = crypto.randomUUID();
  const listener: IntersectionListener = {
    id,
    meshes: [],
    hoverIntersect$,
    clickIntersect$,
    clickIntersects$,
    addMeshes: (newMeshes: Object3D[]) => {
      listener.meshes.push(...newMeshes);
    },
    removeMeshes: (removeMeshes: Object3D[]) => {
      listener.meshes = listener.meshes.filter(
        mesh => !removeMeshes.includes(mesh)
      );
    },
    // pointer events
    pointerdown$,
    pointerup$,
    pointermove$,
    pointerenter$,
    pointerout$
  };
  return listener;
}
