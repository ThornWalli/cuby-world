<template>
  <cw-panel
    class="cw-panel-editor-ground-actions"
    hide-title
    style-type="transparent"
    title="Wall Actions">
    <div>
      <div v-for="{ icon, label, value: { primary } } in actions" :key="label">
        <cw-toggle-icon
          :icon="icon"
          :label="label"
          :model-value="modelValue.primary === primary"
          @update:model-value="
            val =>
              onUpdateModelValue({
                primary: val ? primary : GROUND_ACTION.NONE
              })
          " />
        <div class="subs">
          <cw-toggle-icon
            v-for="item in actions.find(a => a.value.primary === primary)
              ?.items || []"
            :key="item.label"
            :icon="item.icon"
            :label="item.label"
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
import { GROUND_ACTION } from '@cuby-world/app/lib/types/editor';
import icons from '@cuby-world/app/utils/icons';

const $emit = defineEmits<{
  (e: 'update:model-value', value: GroundAction): void;
}>();

defineProps<{
  modelValue: GroundAction;
}>();

const actions = ref([
  {
    icon: icons.color,
    label: 'Color',
    value: {
      primary: GROUND_ACTION.MODE_STYLE
    },
    items: [
      {
        icon: icons.ground_single_set,
        label: 'Single',
        value: {
          primary: GROUND_ACTION.MODE_STYLE,
          secondary: GROUND_ACTION.GROUND_SINGLE_SET
        }
      },
      {
        icon: icons.ground_multiple_set,
        label: 'Multiple',
        value: {
          primary: GROUND_ACTION.MODE_STYLE,
          secondary: GROUND_ACTION.GROUND_MULTIPLE_SET
        }
      }
    ]
  }
]);

const subscription = new Subscription();

function onUpdateModelValue(action: GroundAction) {
  $emit('update:model-value', action);
}

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>

<script lang="ts">
export interface GroundAction {
  primary: GROUND_ACTION;
  secondary?: string;
}
</script>

<style lang="css" scoped>
.cw-panel-editor-ground-actions {
  position: relative;

  & div {
    position: relative;
    display: flex;
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
    bottom: 100%;
    display: none;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
  }
}
</style>
