<template>
  <cw-panel title="Wall Settings">
    <cw-form-field-select
      :model-value="modelValue.type"
      mode="compact"
      label="Type"
      @update:model-value="onUpdateType">
      <cw-form-field-select-option
        v-for="option in wallTypeOptions"
        :key="option.value"
        v-bind="option" />
    </cw-form-field-select>
  </cw-panel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CwPanel from '@cuby-world/app/components/Panel.vue';
import {
  WALL_TYPE,
  type WallDescription
} from '@cuby-world/app/lib/classes/RoomDescription';

import CwFormFieldSelect from '@cuby-world/app/components/formField/Select.vue';
import CwFormFieldSelectOption from '@cuby-world/app/components/formField/select/Option.vue';

const wallTypeOptions = computed(() => {
  return Object.values(WALL_TYPE).map(value => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1)
  }));
});

const $props = defineProps<{
  modelValue: WallDescription;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: WallDescription): void;
}>();

function onUpdateType(value: WALL_TYPE) {
  $emit('update:model-value', { ...$props.modelValue, type: value });
}
</script>
