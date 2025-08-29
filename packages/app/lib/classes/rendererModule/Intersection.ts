import { fromEvent, ReplaySubject } from 'rxjs';
import type { Intersection, Object3D, Object3DEventMap } from 'three';
import { Raycaster, Vector2 } from 'three';
import type Renderer from '../Renderer';
import RendererModule, { type RendererModuleState } from '../RendererModule';

export type State = RendererModuleState;
export default class IntersectionRendererModule extends RendererModule<State> {
  static override TYPE = 'intersection';

  state: State = {};

  raycaster: Raycaster;
  private mouse: Vector2;

  listeners: {
    mesh: Object3D;
    clickIntersect$: ReplaySubject<Intersection<Object3D<Object3DEventMap>>>;
    clickIntersects$: ReplaySubject<Intersection<Object3D<Object3DEventMap>>[]>;
    hoverIntersect$: ReplaySubject<Intersection<Object3D<Object3DEventMap>>[]>;
    unregister: () => void;
  }[] = [];

  constructor(renderer: Renderer) {
    super(renderer);
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
  }

  override setup() {
    let offset = getOffset(this.renderer.el);
    this.subscription.add(
      fromEvent<PointerEvent>(this.renderer.el, 'pointermove').subscribe(
        event => {
          const dimension = new Vector2(
            this.renderer.el.offsetWidth,
            this.renderer.el.offsetHeight
          );
          const x = ((event.clientX - offset.x) / dimension.x) * 2 - 1;
          const y = -((event.clientY - offset.y) / dimension.y) * 2 + 1;
          this.mouse = new Vector2(x, y);
        }
      )
    );
    this.subscription.add(
      fromEvent<PointerEvent>(this.renderer.el, 'pointerdown').subscribe(
        event => {
          const dimension = new Vector2(
            this.renderer.el.offsetWidth,
            this.renderer.el.offsetHeight
          );
          offset = getOffset(this.renderer.el);
          const x = ((event.clientX - offset.x) / dimension.x) * 2 - 1;
          const y = -((event.clientY - offset.y) / dimension.y) * 2 + 1;
          this.raycaster.setFromCamera(new Vector2(x, y), this.renderer.camera);
          this.listeners.forEach(listener => {
            const intersects = this.raycaster.intersectObject(
              listener.mesh,
              true
            );

            if (intersects.length > 0 && intersects[0]) {
              listener.clickIntersect$.next(intersects[0]);
              listener.clickIntersects$.next(intersects);
            }
          });
        }
      )
    );
  }

  register(mesh: Object3D) {
    const hoverIntersect$ = new ReplaySubject<
      Intersection<Object3D<Object3DEventMap>>[]
    >(0);
    const clickIntersect$ = new ReplaySubject<
      Intersection<Object3D<Object3DEventMap>>
    >(0);
    const clickIntersects$ = new ReplaySubject<
      Intersection<Object3D<Object3DEventMap>>[]
    >(0);

    const existingListener = this.listeners.find(l => l.mesh === mesh);
    if (existingListener) {
      return existingListener;
    }

    const unregister = () => {
      const index = this.listeners.findIndex(l => l.mesh === mesh);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
    const listener = {
      mesh,
      hoverIntersect$,
      clickIntersect$,
      clickIntersects$,
      unregister
    };
    this.listeners.push(listener);
    return listener;
  }

  override update() {
    const mouse = this.mouse;
    this.mouse.copy(mouse);
    this.raycaster.setFromCamera(mouse, this.renderer.camera);

    this.listeners.forEach(listener => {
      const intersects = this.raycaster.intersectObject(listener.mesh, true);

      listener.hoverIntersect$.next(intersects);
    });
  }
}

function getOffset(el: HTMLElement) {
  const { left: offsetX, top: offsetY } = el.getBoundingClientRect();
  return new Vector2(offsetX, offsetY);
}
