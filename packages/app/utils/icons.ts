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
  )
};
