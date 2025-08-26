<template>
  <cw-panel class="cw-panel-unit-manager">
    <cw-form-field-upload @file="$emit('file', $event)"></cw-form-field-upload>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../../Panel.vue';
import CwFormFieldUpload from '../../formField/Upload.vue';

const $emit = defineEmits<{
  (e: 'file', value: File | undefined): void;
}>();
</script>

<style lang="postcss" scoped>
.cw-panel-unit-manager {
  /* empty */
}
</style>
