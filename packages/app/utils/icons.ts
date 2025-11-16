import { defineAsyncComponent, markRaw } from 'vue';
export default {
  wall: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/wall.svg?component')
    )
  ),
  wall_dashed: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/wall_dashed.svg?component')
    )
  ),
  add_remove: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/add_remove.svg?component')
    )
  ),
  add: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/add.svg?component')
    )
  ),
  remove: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/remove.svg?component')
    )
  ),
  remove_2: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/remove_2.svg?component')
    )
  ),
  mode_ground: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_ground.svg?component')
    )
  ),
  ground_single_set: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/ground_single.svg?component')
    )
  ),
  ground_multiple_set: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/ground_multiple.svg?component')
    )
  ),
  mode_wall: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_wall.svg?component')
    )
  ),
  mode_wall_mason: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_wall_mason.svg?component')
    )
  ),
  mode_wall_door: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_wall_door.svg?component')
    )
  ),
  mode_wall_window: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_wall_window.svg?component')
    )
  ),
  color: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/color.svg?component')
    )
  ),
  settings: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/settings.svg?component')
    )
  ),
  window_small: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/window_small.svg?component')
    )
  ),
  window_medium: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/window_medium.svg?component')
    )
  ),
  window_large: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/window_large.svg?component')
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
      () => import('../assets/icons/actions/mode_stair.svg?component')
    )
  ),

  check: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/check.svg?component')
    )
  ),

  apply: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/check.svg?component')
    )
  ),

  cancel: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/cancel.svg?component')
    )
  ),
  abort: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/cancel.svg?component')
    )
  ),

  rotate: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/rotate.svg?component')
    )
  ),

  move: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/move.svg?component')
    )
  ),

  trash: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/trash.svg?component')
    )
  ),

  edit: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/edit.svg?component')
    )
  ),

  arrow_navigation_default_bottom: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/arrow-navigation/default_bottom.svg?component')
    )
  ),
  arrow_navigation_default_left: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/arrow-navigation/default_left.svg?component')
    )
  ),
  arrow_navigation_default_right: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/arrow-navigation/default_right.svg?component')
    )
  ),
  arrow_navigation_default_top: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/default_top.svg?component')
    )
  ),
  arrow_navigation_slim_bottom: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/slim_bottom.svg?component')
    )
  ),
  arrow_navigation_slim_left: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/slim_left.svg?component')
    )
  ),
  arrow_navigation_slim_right: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/slim_right.svg?component')
    )
  ),
  arrow_navigation_slim_top: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/slim_top.svg?component')
    )
  ),
  inventory_open: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/inventory_open.svg?component')
    )
  ),
  inventory_close: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/inventory_close.svg?component')
    )
  ),
  cart: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/cart.svg?component')
    )
  ),
  editor: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/editor.svg?component')
    )
  ),
  play: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/play.svg?component')
    )
  ),
  pause: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/pause.svg?component')
    )
  ),
  rotate_left: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/rotate_left.svg?component')
    )
  ),
  rotate_right: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/rotate_right.svg?component')
    )
  )
};
