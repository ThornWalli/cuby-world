<template>
  <cw-panel
    class="cw-panel-editor-actions"
    hide-title
    title="Actions"
    style-type="transparent">
    <cw-toggle-icon
      v-for="{ icon, label, value } in actions"
      :key="label"
      :icon="icon"
      :label="label"
      :model-value="modelValue === value"
      @update:model-value="
        val => onUpdateModelValue(val ? value : EDITOR_ACTION.NONE)
      " />
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwToggleIcon from '../../toggle/Icon.vue';

import type App from '../../../lib/classes/App';
import { EDITOR_ACTION } from '@cuby-world/app/lib/types/editor';
import type icons from '@cuby-world/app/utils/icons';
import type { FunctionalComponent } from 'vue';

const $props = defineProps<{
  app: App;
  modelValue: EDITOR_ACTION;
  selected?: boolean;
  actions?: {
    icon: keyof typeof icons | FunctionalComponent;
    label: string;
    value: EDITOR_ACTION;
  }[];
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: EDITOR_ACTION): void;
}>();

function onUpdateModelValue(value: EDITOR_ACTION) {
  if (value === $props.modelValue) {
    value = EDITOR_ACTION.NONE;
  }
  $emit('update:model-value', value);
}
</script>
