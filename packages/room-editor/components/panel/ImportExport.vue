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
import type { EditorRoomDescription } from '../../types';
import { jsonParse, jsonStringify } from '../../utils';

const $props = defineProps<{
  modelValue: EditorRoomDescription;
}>();

const $emit = defineEmits<{
  (e: 'update:model-value', value: EditorRoomDescription): void;
}>();

async function onClickExport() {
  const FileSaver = await import('file-saver').then(module => module.default);

  const blob = new Blob([jsonStringify($props.modelValue)], {
    type: 'application/json;charset=utf-8'
  });

  await FileSaver.saveAs(blob, `default.json`);
}

function onFile(file?: File) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const text = e.target?.result;
      if (typeof text === 'string') {
        const json = jsonParse(text);
        if (json) {
          $emit('update:model-value', json as EditorRoomDescription);
        }
      }
    } catch (err) {
      console.error('Failed to import room', err);
    }
  };
  reader.readAsText(file);
}
</script>
