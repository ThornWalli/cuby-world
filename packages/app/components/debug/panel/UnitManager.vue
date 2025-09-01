<template>
  <cw-panel class="cw-debug-panel-unit-manager">
    <cw-form-field-upload @file="$emit('file', $event)"></cw-form-field-upload>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwFormFieldUpload from '../../formField/small/Upload.vue';

const $emit = defineEmits<{
  (e: 'file', value: File | undefined): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-debug-panel-unit-manager {
  /* empty */
}
</style>
