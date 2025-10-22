<template>
  <option :label="label" :value="value" :selected="preparedSelected">
    <slot>{{ label }}</slot>
  </option>
</template>

<script lang="ts" generic="T" setup>
import { computed, inject, onMounted } from 'vue';

const $props = defineProps<{
  label?: string;
  value?: T;
  selected?: boolean;
}>();
const selectValue = inject('parentSelectValue', null);
const preparedSelected = computed(() => {
  return (selectValue === String($props.value) || $props.selected) ?? false;
});

const setValue = inject<(value: T) => void>('setValue', () => void 0);

onMounted(() => {
  if (preparedSelected.value && $props.value) {
    setValue($props.value);
  }
});
</script>
