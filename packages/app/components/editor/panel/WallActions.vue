<template>
  <cw-panel
    class="cw-panel-editor-wall-actions"
    hide-title
    style-type="none"
    title="Wall Actions">
    <div>
      <div
        v-for="{ icon, label, value: { primary, secondary } } in actions"
        :key="label">
        <cw-toggle-icon
          hide-label
          :icon="icon"
          :label="label"
          :model-value="modelValue.primary === primary"
          label-direction="left"
          @update:model-value="
            val =>
              onUpdateModelValue({
                primary: val ? primary : WALL_ACTION.NONE,
                secondary
              })
          " />
        <div class="subs">
          <cw-toggle-icon
            v-for="item in actions.find(a => a.value.primary === primary)
              ?.items || []"
            :key="item.label"
            :icon="item.icon"
            :label="item.label"
            label-direction="left"
            :model-value="
              modelValue.primary === primary &&
              modelValue.secondary === item.value.secondary
            "
            @update:model-value="
              val =>
                onUpdateModelValue({
                  primary,
                  secondary: val ? item.value.secondary : undefined
                })
            " />
        </div>
      </div>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import { onUnmounted, ref } from 'vue';
import { Subscription } from 'rxjs';
import CwToggleIcon from '../../toggle/Icon.vue';
import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';
import icons from '@cuby-world/app/utils/icons';
import type { WALL_WINDOW_SIZE } from '@cuby-world/app/lib/types/wall';
import type { Icon } from '@cuby-world/app/lib/types/icon';
import { MASON_MODE } from '@cuby-world/app/lib/classes/appModule/editor/wall/MasonController';

const $emit = defineEmits<{
  (e: 'update:model-value', value: WallAction): void;
}>();

defineProps<{
  modelValue: WallAction;
}>();

interface Item {
  icon: Icon;
  label: string;
  value: WallAction;
  items?: Item[];
}

const actions = ref<Item[]>([
  {
    icon: icons.mode_wall_mason,
    label: 'Mason',
    value: {
      primary: WALL_ACTION.MODE_MASON,
      secondary: MASON_MODE.ADD
    },
    items: [
      {
        icon: icons.add,
        label: 'Add',
        value: {
          primary: WALL_ACTION.MODE_MASON,
          secondary: MASON_MODE.ADD
        }
      },
      {
        icon: icons.remove,
        label: 'Remove',
        value: {
          primary: WALL_ACTION.MODE_MASON,
          secondary: MASON_MODE.REMOVE
        }
      }
    ]
  },
  {
    icon: icons.color,
    label: 'Color',
    value: {
      primary: WALL_ACTION.MODE_PAINTER
    }
  },
  {
    icon: icons.mode_wall_door,
    label: 'Door',
    value: {
      primary: WALL_ACTION.MODE_DOOR
    }
  },
  {
    icon: icons.mode_wall_window,
    label: 'Window',
    value: {
      primary: WALL_ACTION.MODE_WINDOW
    }
  }
]);

const subscription = new Subscription();

function onUpdateModelValue(action: WallAction) {
  $emit('update:model-value', action);
}

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>

<script lang="ts">
export interface WallAction {
  primary: WALL_ACTION;
  secondary?: WALL_WINDOW_SIZE | MASON_MODE | string;
}
</script>

<style lang="css" scoped>
.cw-panel-editor-wall-actions {
  position: relative;

  & div {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &:active,
    &:hover {
      & > .subs {
        display: flex;
      }
    }
  }

  & .subs {
    position: absolute;
    right: 100%;
    display: none;
    flex-direction: column;
    gap: 10px;
    padding-right: 10px;
  }
}
</style>
