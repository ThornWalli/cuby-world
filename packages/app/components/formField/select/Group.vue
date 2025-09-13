<template>
  <optgroup :label="label" :disabled="disabled">
    <slot></slot>
  </optgroup>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string;
  disabled?: boolean;
}>();
</script>
