<template>
  <cw-panel
    class="cw-panel-editor-wall-actions"
    hide-title
    style-type="transparent"
    title="Wall Actions">
    <div>
      <cw-toggle-icon
        v-for="{ icon, label, value } in actions"
        :key="label"
        :icon="icon"
        :label="label"
        :model-value="modelValue === value"
        @update:model-value="
          val => onUpdateModelValue(val ? value : WALL_ACTION.NONE)
        " />
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

const $emit = defineEmits<{
  (e: 'update:model-value', value: WALL_ACTION): void;
}>();

defineProps<{
  modelValue: WALL_ACTION;
}>();

const actions = ref([
  {
    icon: icons.add,
    label: 'Add',
    value: WALL_ACTION.ADD
  },
  {
    icon: icons.remove,
    label: 'Remove',
    value: WALL_ACTION.REMOVE
  },
  {
    icon: icons.door,
    label: 'Door',
    value: WALL_ACTION.DOOR
  },
  {
    icon: icons.color,
    label: 'Color',
    value: WALL_ACTION.STYLE
  }
]);

const subscription = new Subscription();

function onUpdateModelValue(value: WALL_ACTION) {
  $emit('update:model-value', value);
}

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>

<style lang="css" scoped>
.cw-panel-editor-wall-actions {
  & div {
    display: flex;
    gap: 10px;
  }
}
</style>
