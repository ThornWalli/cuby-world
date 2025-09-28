import { defineAsyncComponent, markRaw } from 'vue';

export default {
  wall: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/wall.svg?component')
    )
  ),
  wall_dashed: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/wall_dashed.svg?component')
    )
  ),
  add_remove: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/add_remove.svg?component')
    )
  ),
  add: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/add.svg?component')
    )
  ),
  remove: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/remove.svg?component')
    )
  ),
  ground_mode: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/ground_mode.svg?component')
    )
  ),
  wall_mode: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/wall_mode.svg?component')
    )
  ),
  door_mode: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/door_mode.svg?component')
    )
  ),
  window_mode: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/window_mode.svg?component')
    )
  ),
  color: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/color.svg?component')
    )
  ),
  settings: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/settings.svg?component')
    )
  ),
  window_small: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/window_small.svg?component')
    )
  ),
  window_medium: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/window_medium.svg?component')
    )
  ),
  window_large: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/window_large.svg?component')
    )
  )
};
