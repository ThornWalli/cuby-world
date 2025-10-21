<template>
  <cw-panel
    class="cw-panel-editor-stair-actions"
    hide-title
    style-type="none"
    title="Wall Actions">
    <div>
      <div
        v-for="{ icon, label, value: { primary, secondary } } in actions"
        :key="label">
        <cw-toggle-icon
          :icon="icon"
          :label="label"
          hide-label
          :model-value="modelValue.primary === primary"
          @update:model-value="
            val =>
              onUpdateModelValue({
                primary: val ? primary : STAIR_ACTION.NONE,
                secondary: val ? secondary : undefined
              })
          " />
      </div>
    </div>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import { onUnmounted, ref } from 'vue';
import { Subscription } from 'rxjs';
import CwToggleIcon from '../../toggle/Icon.vue';
import { STAIR_ACTION } from '@cuby-world/app/lib/types/editor';
import icons from '@cuby-world/app/utils/icons';
import type { Icon } from '@cuby-world/app/lib/types/icon';

const $emit = defineEmits<{
  (e: 'update:model-value', value: StairAction): void;
}>();

defineProps<{
  modelValue: StairAction;
}>();

const actions = ref<
  {
    icon: Icon;
    label: string;
    value: StairAction;
  }[]
>([
  {
    icon: icons.add,
    label: 'Add',
    value: {
      primary: STAIR_ACTION.ADD
    }
  },
  {
    icon: icons.add_remove,
    label: 'Select',
    value: {
      primary: STAIR_ACTION.SELECT
    }
  }
]);

const subscription = new Subscription();

function onUpdateModelValue(action: StairAction) {
  $emit('update:model-value', action);
}

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>

<script lang="ts">
export interface StairAction {
  primary: STAIR_ACTION;
  secondary?: string;
}
</script>

<style lang="css" scoped>
.cw-panel-editor-stair-actions {
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
