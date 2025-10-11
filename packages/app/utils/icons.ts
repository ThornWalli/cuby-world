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
  remove_2: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/remove_2.svg?component')
    )
  ),
  ground_mode: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/ground_mode.svg?component')
    )
  ),
  ground_single_set: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/ground_single.svg?component')
    )
  ),
  ground_multiple_set: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/editor/actions/ground_multiple.svg?component')
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
  ),

  arrow_navigation_filled_left: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation-filled/left.svg?component')
    )
  ),
  arrow_navigation_filled_right: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/arrow-navigation-filled/right.svg?component')
    )
  ),
  arrow_navigation_filled_up: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation-filled/up.svg?component')
    )
  ),
  arrow_navigation_filled_down: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation-filled/down.svg?component')
    )
  )
};
