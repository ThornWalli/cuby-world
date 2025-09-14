<template>
  <cw-panel title="Settings">
    <cw-button mode="compact" @click="onClickExport">
      <template #icon><svg-indicator-download /></template>
      Export
    </cw-button>
    <cw-form-field-small-upload label="Import" @file="onFile" />
  </cw-panel>
</template>

<script lang="ts" setup>
import SvgIndicatorDownload from '@cuby-world/app/assets/icons/indicator/download.svg';
import CwPanel from '@cuby-world/app/components/Panel.vue';
import CwButton from '@cuby-world/app/components/Button.vue';
import CwFormFieldSmallUpload from '@cuby-world/app/components/formField/compact/Upload.vue';

import { exportRoom, importRoom } from '@cuby-world/room-editor/utils/file';
import type { RoomDescription } from '@cuby-world/app/lib/classes/RoomDescription';

const $props = defineProps<{
  modelValue: RoomDescription;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: RoomDescription): void;
}>();

async function onClickExport() {
  await exportRoom($props.modelValue);
}

async function onFile(file?: File) {
  if (!file) return;
  $emit('update:model-value', await importRoom(file));
}
</script>
