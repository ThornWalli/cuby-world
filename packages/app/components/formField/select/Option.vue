<template>
  <option :label="label" :value="value" :selected="preparedSelected" />
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';

const $props = defineProps<{
  label: string;
  value: string | number;
  selected?: boolean;
}>();
const selectValue = inject('parentSelectValue', null);
const preparedSelected = computed(() => {
  return (selectValue === String($props.value) || $props.selected) ?? false;
});
</script>
