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
  mode_ground: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/mode_ground.svg?component')
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
  mode_wall: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/mode_wall.svg?component')
    )
  ),
  mode_wall_mason: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/editor/actions/mode_wall_mason.svg?component')
    )
  ),
  mode_wall_door: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/editor/actions/mode_wall_door.svg?component')
    )
  ),
  mode_wall_window: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/editor/actions/mode_wall_window.svg?component')
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
  ),

  mode_stair: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/mode_stair.svg?component')
    )
  ),

  check: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/check.svg?component')
    )
  ),

  apply: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/check.svg?component')
    )
  ),

  cancel: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/cancel.svg?component')
    )
  ),
  abort: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/cancel.svg?component')
    )
  ),

  rotate: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/rotate.svg?component')
    )
  ),

  move: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/move.svg?component')
    )
  ),

  trash: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/trash.svg?component')
    )
  ),

  edit: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/editor/actions/edit.svg?component')
    )
  )
};
