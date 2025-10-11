<template>
  <cw-panel
    class="cw-panel-editor-wall-actions"
    hide-title
    style-type="none"
    title="Wall Actions">
    <div>
      <div v-for="{ icon, label, value: { primary } } in actions" :key="label">
        <cw-toggle-icon
          hide-label
          :icon="icon"
          :label="label"
          :model-value="modelValue.primary === primary"
          label-direction="left"
          @update:model-value="
            val =>
              onUpdateModelValue({
                primary: val ? primary : WALL_ACTION.NONE
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

const $emit = defineEmits<{
  (e: 'update:model-value', value: WallAction): void;
}>();

defineProps<{
  modelValue: WallAction;
}>();

interface Item {
  icon: typeof icons.add;
  label: string;
  value: {
    primary: WALL_ACTION;
    secondary?: WALL_WINDOW_SIZE;
  };
  items?: Item[];
}

const actions = ref<Item[]>([
  {
    icon: icons.add,
    label: 'Add',
    value: {
      primary: WALL_ACTION.ADD
    }
  },
  {
    icon: icons.remove,
    label: 'Remove',
    value: {
      primary: WALL_ACTION.REMOVE
    }
  },
  {
    icon: icons.door_mode,
    label: 'Door',
    value: {
      primary: WALL_ACTION.MODE_DOOR
    }
  },
  {
    icon: icons.window_mode,
    label: 'Window',
    value: {
      primary: WALL_ACTION.MODE_WINDOW
    }
  },
  {
    icon: icons.color,
    label: 'Color',
    value: {
      primary: WALL_ACTION.MODE_STYLE
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
  secondary?: WALL_WINDOW_SIZE;
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
