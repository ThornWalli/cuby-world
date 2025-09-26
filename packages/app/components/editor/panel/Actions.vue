<template>
  <cw-panel
    class="cw-panel-editor-actions"
    hide-title
    title="Actions"
    style-type="transparent">
    <slot name="before"></slot>
    <cw-toggle-icon
      v-for="action in preparedActions"
      :key="action.label"
      v-bind="action" />
    <slot name="after"></slot>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwToggleIcon from '../../toggle/Icon.vue';

import type App from '../../../lib/classes/App';
import { EDITOR_ACTION } from '@cuby-world/app/lib/types/editor';
import type icons from '@cuby-world/app/utils/icons';
import { computed, type FunctionalComponent } from 'vue';

const preparedActions = computed(() => {
  return ($props.actions ?? []).map(({ icon, label, value }) => ({
    icon,
    label,
    modelValue: $props.modelValue === value,
    'onUpdate:model-value': (val: boolean) =>
      onUpdateModelValue(val ? value : EDITOR_ACTION.NONE)
  }));
});

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
