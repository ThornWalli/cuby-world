import { defineAsyncComponent, markRaw } from 'vue';

export enum ICON {
  WALL = 'wall',
  WALL_DASHED = 'wall_dashed',
  ADD_REMOVE = 'add_remove',
  ADD = 'add',
  REMOVE = 'remove',
  REMOVE_2 = 'remove_2',
  MODE_GROUND = 'mode_ground',
  GROUND_SINGLE_SET = 'ground_single_set',
  GROUND_MULTIPLE_SET = 'ground_multiple_set',
  MODE_WALL = 'mode_wall',
  MODE_WALL_MASON = 'mode_wall_mason',
  MODE_WALL_DOOR = 'mode_wall_door',
  MODE_WALL_WINDOW = 'mode_wall_window',
  COLOR = 'color',
  SETTINGS = 'settings',
  WINDOW_SMALL = 'window_small',
  WINDOW_MEDIUM = 'window_medium',
  WINDOW_LARGE = 'window_large',
  ARROW_NAVIGATION_FILLED_LEFT = 'arrow_navigation_filled_left',
  ARROW_NAVIGATION_FILLED_RIGHT = 'arrow_navigation_filled_right',
  ARROW_NAVIGATION_FILLED_UP = 'arrow_navigation_filled_up',
  ARROW_NAVIGATION_FILLED_DOWN = 'arrow_navigation_filled_down',
  MODE_STAIR = 'mode_stair',
  CHECK = 'check',
  APPLY = 'apply',
  CANCEL = 'cancel',
  ABORT = 'abort',
  ROTATE = 'rotate',
  MOVE = 'move',
  TRASH = 'trash',
  EDIT = 'edit',
  ARROW_NAVIGATION_DEFAULT_BOTTOM = 'arrow_navigation_default_bottom',
  ARROW_NAVIGATION_DEFAULT_LEFT = 'arrow_navigation_default_left',
  ARROW_NAVIGATION_DEFAULT_RIGHT = 'arrow_navigation_default_right',
  ARROW_NAVIGATION_DEFAULT_TOP = 'arrow_navigation_default_top',
  ARROW_NAVIGATION_SLIM_BOTTOM = 'arrow_navigation_slim_bottom',
  ARROW_NAVIGATION_SLIM_LEFT = 'arrow_navigation_slim_left',
  ARROW_NAVIGATION_SLIM_RIGHT = 'arrow_navigation_slim_right',
  ARROW_NAVIGATION_SLIM_TOP = 'arrow_navigation_slim_top',
  INVENTORY_OPEN = 'inventory_open',
  INVENTORY_CLOSE = 'inventory_close',
  CART = 'cart',
  EDITOR = 'editor',
  PLAY = 'play',
  PAUSE = 'pause',
  ROTATE_LEFT = 'rotate_left',
  ROTATE_RIGHT = 'rotate_right',
  LIGHT_ON = 'light_on',
  LIGHT_OFF = 'light_off'
}

export default {
  [ICON.WALL]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/wall.svg?component')
    )
  ),
  [ICON.WALL_DASHED]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/wall_dashed.svg?component')
    )
  ),
  [ICON.ADD_REMOVE]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/add_remove.svg?component')
    )
  ),
  [ICON.ADD]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/add.svg?component')
    )
  ),
  [ICON.REMOVE]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/remove.svg?component')
    )
  ),
  [ICON.REMOVE_2]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/remove_2.svg?component')
    )
  ),
  [ICON.MODE_GROUND]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_ground.svg?component')
    )
  ),
  [ICON.GROUND_SINGLE_SET]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/ground_single.svg?component')
    )
  ),
  [ICON.GROUND_MULTIPLE_SET]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/ground_multiple.svg?component')
    )
  ),
  [ICON.MODE_WALL]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_wall.svg?component')
    )
  ),
  [ICON.MODE_WALL_MASON]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_wall_mason.svg?component')
    )
  ),
  [ICON.MODE_WALL_DOOR]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_wall_door.svg?component')
    )
  ),
  [ICON.MODE_WALL_WINDOW]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_wall_window.svg?component')
    )
  ),
  [ICON.COLOR]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/color.svg?component')
    )
  ),
  [ICON.SETTINGS]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/settings.svg?component')
    )
  ),
  [ICON.WINDOW_SMALL]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/window_small.svg?component')
    )
  ),
  [ICON.WINDOW_MEDIUM]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/window_medium.svg?component')
    )
  ),
  [ICON.WINDOW_LARGE]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/window_large.svg?component')
    )
  ),

  [ICON.ARROW_NAVIGATION_FILLED_LEFT]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation-filled/left.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_FILLED_RIGHT]: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/arrow-navigation-filled/right.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_FILLED_UP]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation-filled/up.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_FILLED_DOWN]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation-filled/down.svg?component')
    )
  ),

  [ICON.MODE_STAIR]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/mode_stair.svg?component')
    )
  ),

  [ICON.CHECK]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/check.svg?component')
    )
  ),

  [ICON.APPLY]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/check.svg?component')
    )
  ),

  [ICON.CANCEL]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/cancel.svg?component')
    )
  ),
  [ICON.ABORT]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/cancel.svg?component')
    )
  ),

  [ICON.ROTATE]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/rotate.svg?component')
    )
  ),

  [ICON.MOVE]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/move.svg?component')
    )
  ),

  [ICON.TRASH]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/trash.svg?component')
    )
  ),

  [ICON.EDIT]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/edit.svg?component')
    )
  ),

  [ICON.ARROW_NAVIGATION_DEFAULT_BOTTOM]: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/arrow-navigation/default_bottom.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_DEFAULT_LEFT]: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/arrow-navigation/default_left.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_DEFAULT_RIGHT]: markRaw(
    defineAsyncComponent(
      () =>
        import('../assets/icons/arrow-navigation/default_right.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_DEFAULT_TOP]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/default_top.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_SLIM_BOTTOM]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/slim_bottom.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_SLIM_LEFT]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/slim_left.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_SLIM_RIGHT]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/slim_right.svg?component')
    )
  ),
  [ICON.ARROW_NAVIGATION_SLIM_TOP]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/arrow-navigation/slim_top.svg?component')
    )
  ),
  [ICON.INVENTORY_OPEN]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/inventory_open.svg?component')
    )
  ),
  [ICON.INVENTORY_CLOSE]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/inventory_close.svg?component')
    )
  ),
  [ICON.CART]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/cart.svg?component')
    )
  ),
  [ICON.EDITOR]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/editor.svg?component')
    )
  ),
  [ICON.PLAY]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/play.svg?component')
    )
  ),
  [ICON.PAUSE]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/pause.svg?component')
    )
  ),
  [ICON.ROTATE_LEFT]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/rotate_left.svg?component')
    )
  ),
  [ICON.ROTATE_RIGHT]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/rotate_right.svg?component')
    )
  ),
  [ICON.LIGHT_ON]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/light_on.svg?component')
    )
  ),
  [ICON.LIGHT_OFF]: markRaw(
    defineAsyncComponent(
      () => import('../assets/icons/actions/light_off.svg?component')
    )
  )
};
