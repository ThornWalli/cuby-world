<template>
  <cw-panel class="cw-debug-panel-unit-manager">
    <cw-form-field-upload label="Upload" @file="onFile"></cw-form-field-upload>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwFormFieldUpload from '../../formField/compact/Upload.vue';

const $emit = defineEmits<{
  (e: 'file', value: File | undefined): void;
}>();

function onFile(file: File | undefined) {
  $emit('file', file);
}
</script>

<style lang="postcss" scoped>
.cw-debug-panel-unit-manager {
  /* empty */
}
</style>
