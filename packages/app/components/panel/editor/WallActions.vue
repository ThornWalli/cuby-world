<template>
  <cw-panel
    class="cw-panel-editor-wall-actions"
    hide-title
    style-type="transparent"
    title="Wall Actions">
    <cw-toggle-icon
      icon="add_remove"
      :model-value="modelValue === WALL_ACTION.ADD_REMOVE"
      @update:model-value="
        val =>
          onUpdateModelValue(val ? WALL_ACTION.ADD_REMOVE : WALL_ACTION.NONE)
      " />
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import { onUnmounted } from 'vue';
import { Subscription } from 'rxjs';
import CwToggleIcon from '../../toggle/Icon.vue';
import { WALL_ACTION } from '@cuby-world/app/lib/types/editor';

const $emit = defineEmits<{
  (e: 'update:model-value', value: WALL_ACTION): void;
}>();

defineProps<{
  modelValue: WALL_ACTION;
}>();

const subscription = new Subscription();

function onUpdateModelValue(value: WALL_ACTION) {
  $emit('update:model-value', value);
}

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>
